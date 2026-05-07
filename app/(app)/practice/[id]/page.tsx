"use client";
import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Md } from "@/components/Md";
import { PRACTICE_TESTS, QUESTIONS } from "@/lib/data";

export default function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const test = PRACTICE_TESTS.find((t) => t.id === id);
  const questions = QUESTIONS[id];
  if (!test || !questions) notFound();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [done, setDone] = useState(false);

  const q = questions[index];
  const picked = answers[index];
  const isSubmitted = submitted[index];

  const select = (i: number) => {
    if (isSubmitted) return;
    setAnswers((a) => ({ ...a, [index]: i }));
  };
  const submit = () => {
    if (picked === undefined) return;
    setSubmitted((s) => ({ ...s, [index]: true }));
  };
  const next = () => {
    if (index < questions.length - 1) setIndex(index + 1);
    else setDone(true);
  };

  if (done) {
    const correct = questions.filter((qq, i) => answers[i] === qq.correct).length;
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto py-12">
        <Card>
          <div className="text-sm text-muted mb-1">Test complete</div>
          <h1 className="text-2xl font-semibold mb-6">{test.title}</h1>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-[var(--background)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{correct}/{questions.length}</div>
              <div className="text-xs text-muted">Correct</div>
            </div>
            <div className="bg-[var(--background)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-brand">{pct}%</div>
              <div className="text-xs text-muted">Score</div>
            </div>
            <div className="bg-[var(--background)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{questions.length - correct}</div>
              <div className="text-xs text-muted">To review</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/practice"
              className="flex-1 text-center bg-brand text-white font-semibold py-2.5 rounded-full text-sm"
            >
              Back to tests
            </Link>
            <Link
              href="/errors"
              className="flex-1 text-center bg-[var(--background)] text-[var(--foreground)] font-semibold py-2.5 rounded-full text-sm"
            >
              View error log
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6">
        <Link href="/practice" className="text-sm text-muted hover:text-[var(--foreground)] flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Exit test
        </Link>
        <div className="text-sm font-medium">
          Question {index + 1} <span className="text-muted">of {questions.length}</span>
        </div>
      </div>

      <div className="h-1.5 bg-[var(--background)] rounded-full overflow-hidden mb-6">
        <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-soft text-brand">
            {q.topic}
          </span>
          <span className="text-xs text-muted">{test.section}</span>
        </div>
        <div className="text-lg font-medium leading-relaxed mb-6">
          <Md>{q.prompt}</Md>
        </div>

        <div className="space-y-2.5 mb-6">
          {q.choices.map((c, i) => {
            const isPicked = picked === i;
            const isCorrect = i === q.correct;
            let cls = "border-[var(--border)] hover:border-brand";
            let badgeCls = "bg-[var(--background)] text-muted";
            if (isSubmitted) {
              if (isCorrect) {
                cls = "border-success bg-success text-white";
                badgeCls = "bg-white/20 text-white";
              } else if (isPicked) {
                cls = "border-danger bg-danger text-white";
                badgeCls = "bg-white/20 text-white";
              } else {
                cls = "border-[var(--border)] opacity-60";
              }
            } else if (isPicked) {
              cls = "border-brand bg-brand-soft";
              badgeCls = "bg-brand text-white";
            }

            return (
              <button
                key={i}
                onClick={() => select(i)}
                disabled={isSubmitted}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition ${cls}`}
              >
                <span className={`w-7 h-7 rounded-full grid place-items-center text-xs font-semibold ${badgeCls}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm flex-1"><Md>{c}</Md></span>
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div className={`rounded-xl p-4 mb-4 ${picked === q.correct ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
            <div className="text-sm font-semibold mb-1">
              {picked === q.correct ? "Correct" : "Not quite"}
            </div>
            <div className="text-sm leading-relaxed"><Md>{q.explanation}</Md></div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => index > 0 && setIndex(index - 1)}
            disabled={index === 0}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-muted disabled:opacity-40"
          >
            Previous
          </button>
          {!isSubmitted ? (
            <button
              onClick={submit}
              disabled={picked === undefined}
              className="px-6 py-2.5 rounded-full text-sm font-semibold bg-brand text-white disabled:opacity-40"
            >
              Submit answer
            </button>
          ) : (
            <button
              onClick={next}
              className="px-6 py-2.5 rounded-full text-sm font-semibold bg-brand text-white"
            >
              {index === questions.length - 1 ? "Finish" : "Next question"}
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
