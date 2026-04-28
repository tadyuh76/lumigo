"use client";
import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { STUDY_PLAN, TUTOR_MESSAGES } from "@/lib/data";

export default function TutorPage() {
  const [active, setActive] = useState(0);
  const [messages, setMessages] = useState(TUTOR_MESSAGES);
  const [draft, setDraft] = useState("");
  const day = STUDY_PLAN[active];
  const totalMinutes = STUDY_PLAN.reduce((s, d) => s + d.minutes, 0);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "tutor",
        text:
          "Got it — I've added that to your queue. I'll adjust this week's plan based on your next session results.",
      },
    ]);
    setDraft("");
  };

  return (
    <>
      <Topbar title="AI Tutor" subtitle="Lumi builds your weekly plan and adapts as you learn." />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-semibold">This week's plan</div>
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
              lighter Thursday so you're fresh for Saturday's full-length test.
            </p>
          </Card>
        </div>

        <Card className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
            <div className="w-10 h-10 rounded-full bg-brand-soft text-brand grid place-items-center font-semibold">L</div>
            <div>
              <div className="font-semibold text-sm">Lumi</div>
              <div className="text-xs text-muted flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" /> Online
              </div>
            </div>
          </div>

          <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[420px]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed rounded-2xl px-4 py-2.5 max-w-[85%] ${
                  m.role === "tutor"
                    ? "bg-[var(--background)] text-[var(--foreground)]"
                    : "bg-brand text-white ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 bg-[var(--background)] rounded-full px-4 py-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask Lumi anything…"
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button onClick={send} className="w-8 h-8 rounded-full bg-brand text-white grid place-items-center disabled:opacity-40" disabled={!draft.trim()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
