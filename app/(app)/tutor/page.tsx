"use client";
import { useEffect, useRef, useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { Md } from "@/components/Md";
import { STUDY_PLAN } from "@/lib/data";

type TutorMessage = {
  role: "user" | "tutor";
  text: string;
};

function LumiBlob({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" role="img" aria-label="Lumi mascot">
      <path
        d="M17 52c-4-24 13-40 33-39 19 1 32 14 31 34-1 23-16 36-38 35-16-1-24-12-26-30z"
        fill="#eef0ff"
      />
      <path
        d="M24 53c-3-18 10-30 25-29 15 1 24 10 23 25-1 17-12 26-29 25-11-1-18-8-19-21z"
        fill="#5b6cff"
        opacity="0.14"
      />
      <circle cx="39" cy="45" r="4" fill="#5b6cff" />
      <circle cx="58" cy="45" r="4" fill="#5b6cff" />
      <path d="M38 58c6 5 15 5 21 0" fill="none" stroke="#5b6cff" strokeWidth="5" strokeLinecap="round" />
      <path d="M70 24l6-8M76 30l10-3" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function TutorPage() {
  const [active, setActive] = useState(0);
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const day = STUDY_PLAN[active];
  const totalMinutes = STUDY_PLAN.reduce((s, d) => s + d.minutes, 0);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, sending]);

  const send = async () => {
    const text = draft.trim();
    if (!text || sending) return;

    const nextMessages: TutorMessage[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setDraft("");
    setError("");
    setSending(true);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Lumi could not reach the AI service.");
      }

      if (!data.reply?.trim()) {
        throw new Error("Lumi returned an empty response.");
      }

      setMessages([...nextMessages, { role: "tutor", text: data.reply.trim() }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lumi could not reach the AI service.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Topbar title="AI Tutor" subtitle="Lumi builds your weekly plan and adapts as you learn." />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-semibold">This week&apos;s plan</div>
                <div className="text-xs text-muted">
                  {totalMinutes} minutes scheduled · auto-balanced for your weak areas
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-6">
              {STUDY_PLAN.map((d, i) => (
                <button
                  key={d.day}
                  onClick={() => setActive(i)}
                  className={`flex flex-col items-center py-3 rounded-xl text-sm transition ${
                    active === i
                      ? "bg-brand text-white"
                      : "bg-[var(--background)] text-muted hover:text-[var(--foreground)]"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider opacity-70">{d.day}</span>
                  <span className="font-semibold">{d.date.split(" ")[1]}</span>
                </button>
              ))}
            </div>

            <div className="bg-[var(--background)] rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-muted">{day.day}, {day.date}</div>
                  <div className="font-semibold text-lg mt-0.5">{day.focus}</div>
                </div>
                <span className="text-xs font-semibold bg-white border border-[var(--border)] px-2.5 py-1 rounded-full">
                  {day.minutes} min
                </span>
              </div>
              <ul className="space-y-2.5">
                {day.tasks.map((t, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 text-sm">
                    <span
                      className={`w-5 h-5 rounded-md border grid place-items-center shrink-0 ${
                        t.done ? "bg-brand border-brand text-white" : "border-[var(--border)]"
                      }`}
                    >
                      {t.done && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                      )}
                    </span>
                    <span className={`flex-1 ${t.done ? "line-through text-muted" : ""}`}>{t.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card>
            <div className="font-semibold mb-1">Why this plan?</div>
            <p className="text-sm text-muted leading-relaxed">
              Lumi noticed your accuracy on geometry questions dropped 8% last week, while your reading
              comprehension improved. Tuesday and Wednesday are weighted toward your weak topics, with a
              lighter Thursday so you&apos;re fresh for Saturday&apos;s full-length test.
            </p>
          </Card>
        </div>

        <Card className="col-span-12 lg:col-span-4 flex min-h-[620px] flex-col">
          <div className="flex items-center gap-3 pb-5 border-b border-[var(--border)]">
            <LumiBlob />
            <div>
              <div className="font-semibold text-sm">Lumi</div>
              <div className="text-xs text-muted flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" /> Online
              </div>
            </div>
          </div>

          <div className="min-h-[360px] flex-1 py-5 space-y-3 overflow-y-auto">
            {messages.length === 0 && !sending && (
              <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">
                <LumiBlob className="mb-4 h-20 w-20" />
                <div className="font-semibold">Hi, I&apos;m Lumi.</div>
                <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-muted">
                  Send me a missed question, ask for a quick drill, or tell me what feels shaky today.
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed rounded-2xl px-4 py-2.5 max-w-[85%] ${
                  m.role === "tutor"
                    ? "bg-[var(--background)] text-[var(--foreground)]"
                    : "bg-brand text-white ml-auto"
                }`}
              >
                {m.role === "tutor" ? (
                  <Md inline={false}>{m.text}</Md>
                ) : (
                  <span className="whitespace-pre-wrap">{m.text}</span>
                )}
              </div>
            ))}
            {sending && (
              <div className="text-sm leading-relaxed rounded-2xl px-4 py-2.5 max-w-[85%] bg-[var(--background)] text-muted">
                Lumi is thinking...
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form
            className="pt-5 border-t border-[var(--border)]"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            {error && (
              <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {error}
              </div>
            )}
            <div className="flex items-center gap-2 bg-[var(--background)] rounded-full px-4 py-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask Lumi anything…"
                className="flex-1 bg-transparent text-sm outline-none"
                disabled={sending}
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-brand text-white grid place-items-center disabled:opacity-40"
                disabled={!draft.trim() || sending}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
