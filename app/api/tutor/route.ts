import { ERROR_LOG, SKILL_BREAKDOWN, STUDY_PLAN, USER } from "@/lib/data";

const FIREWORKS_URL = "https://api.fireworks.ai/inference/v1/chat/completions";
const FIREWORKS_MODEL = "accounts/fireworks/models/minimax-m2p7";

export const runtime = "nodejs";

type FireworksRole = "system" | "user" | "assistant";

type FireworksMessage = {
  role: FireworksRole;
  content: string;
};

type ClientMessage = {
  role?: unknown;
  text?: unknown;
  content?: unknown;
};

function normalizeMessages(value: unknown): FireworksMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((message): FireworksMessage | null => {
      const candidate = message as ClientMessage;
      const content = candidate.text ?? candidate.content;
      if (typeof content !== "string") return null;

      const trimmed = content.trim();
      if (!trimmed) return null;

      const role =
        candidate.role === "user"
          ? "user"
          : candidate.role === "assistant" || candidate.role === "tutor"
            ? "assistant"
            : null;

      if (!role) return null;
      return { role, content: trimmed.slice(0, 12_000) };
    })
    .filter((message): message is FireworksMessage => message !== null)
    .slice(-24);
}

function buildSystemPrompt() {
  const plan = STUDY_PLAN.map((day) => {
    const tasks = day.tasks.map((task) => `${task.done ? "done" : "todo"}: ${task.title}`).join("; ");
    return `${day.day} ${day.date}: ${day.focus}, ${day.minutes} min (${tasks})`;
  }).join("\n");

  const skills = SKILL_BREAKDOWN.map((skill) => `${skill.name}: ${skill.mastery}%`).join(", ");
  const recentErrors = ERROR_LOG.slice(0, 5)
    .map((error) => `${error.section} / ${error.topic} / ${error.difficulty}: ${error.question}`)
    .join("\n");

  return [
    "You are Lumi, a warm, practical AI SAT tutor inside the Lumigo prep app.",
    `Student: ${USER.name}. Current predicted score: ${USER.currentScore}. Target score: ${USER.targetScore}. Exam in ${USER.examInDays} days. Current streak: ${USER.streak} days.`,
    `Mastery snapshot: ${skills}.`,
    "This week's study plan:",
    plan,
    "Recent missed-question context:",
    recentErrors,
    "Tutor behavior:",
    "- Answer the student's actual question first.",
    "- Keep responses concise, specific, and SAT-focused.",
    "- When useful, suggest one concrete next action or short drill.",
    "- Explain math and grammar step by step when asked.",
    "- You can reference the plan and student profile, but do not claim you permanently changed stored app data.",
  ].join("\n");
}

function extractReply(data: unknown): string {
  const choices = (data as { choices?: unknown }).choices;
  if (!Array.isArray(choices)) return "";

  const content = (choices[0] as { message?: { content?: unknown } } | undefined)?.message?.content;
  return contentToText(content);
}

function contentToText(content: unknown, trim = true): string {
  if (typeof content === "string") return trim ? content.trim() : content;

  if (Array.isArray(content)) {
    const text = content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object" && "text" in part) {
          const text = (part as { text?: unknown }).text;
          return typeof text === "string" ? text : "";
        }
        return "";
      })
      .join("");
    return trim ? text.trim() : text;
  }

  return "";
}

function extractStreamDelta(data: unknown): string {
  const choices = (data as { choices?: unknown }).choices;
  if (!Array.isArray(choices)) return "";

  const choice = choices[0] as
    | {
        delta?: { content?: unknown };
        message?: { content?: unknown };
        text?: unknown;
      }
    | undefined;

  return contentToText(choice?.delta?.content ?? choice?.message?.content ?? choice?.text, false);
}

function parseStreamEvent(event: string) {
  return event
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith("data:"))
    .map((line) => line.replace(/^data:\s*/, "").trim());
}

async function readStreamedReply(response: Response) {
  if (!response.body) return "";

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let reply = "";

  const consume = (chunk: string) => {
    buffer += chunk;
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() ?? "";

    for (const event of events) {
      for (const payload of parseStreamEvent(event)) {
        if (!payload || payload === "[DONE]") continue;
        try {
          reply += extractStreamDelta(JSON.parse(payload));
        } catch {
          continue;
        }
      }
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    consume(decoder.decode(value, { stream: true }));
  }

  consume(decoder.decode());
  if (buffer.trim()) consume("\n\n");

  return reply.trim();
}

function extractError(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "error" in data) {
    const error = (data as { error?: { message?: unknown } | string }).error;
    if (typeof error === "string") return error;
    if (error && typeof error.message === "string") return error.message;
  }

  return fallback;
}

export async function POST(request: Request) {
  const apiKey = process.env.FIREWORKS_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Missing FIREWORKS_API_KEY. Add it to .env.local or .env and restart the dev server." },
      { status: 500 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const messages = normalizeMessages(body.messages);
  if (!messages.some((message) => message.role === "user")) {
    return Response.json({ error: "Send at least one user message." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(FIREWORKS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: FIREWORKS_MODEL,
        max_tokens: 24576,
        stream: true,
        top_p: 1,
        top_k: 40,
        presence_penalty: 0,
        frequency_penalty: 0,
        temperature: 0.6,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      }),
    });
  } catch {
    return Response.json({ error: "Could not reach the Fireworks API." }, { status: 502 });
  }

  if (!upstream.ok) {
    const raw = await upstream.text();
    let data: unknown;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }

    return Response.json(
      { error: extractError(data, `Fireworks request failed with status ${upstream.status}.`) },
      { status: upstream.status },
    );
  }

  const contentType = upstream.headers.get("content-type") ?? "";
  const reply = contentType.includes("text/event-stream")
    ? await readStreamedReply(upstream)
    : extractReply(await upstream.json().catch(() => null));

  if (!reply) {
    return Response.json({ error: "Fireworks returned an empty response." }, { status: 502 });
  }

  return Response.json({ reply });
}
