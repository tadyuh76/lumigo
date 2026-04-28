"use client";
import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { Md } from "@/components/Md";
import { ERROR_LOG } from "@/lib/data";

const FILTERS = ["All", "Math", "Verbal"] as const;

const diffColors: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-rose-100 text-rose-700",
};

export default function ErrorsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState(ERROR_LOG[0].id);
  const items = ERROR_LOG.filter((e) => filter === "All" || e.section === filter);
  const current = ERROR_LOG.find((e) => e.id === selected) ?? ERROR_LOG[0];

  return (
    <>
      <Topbar title="Error Log" subtitle="Every question you missed, organized so you can master it." />

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-5 p-0 overflow-hidden">
          <div className="p-5 border-b border-[var(--border)] flex items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  filter === f ? "bg-brand text-white" : "bg-[var(--background)] text-muted"
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted">{items.length} mistakes</span>
          </div>
          <ul className="divide-y divide-[var(--border)] max-h-[640px] overflow-y-auto">
            {items.map((e) => (
              <li key={e.id}>
                <button
                  onClick={() => setSelected(e.id)}
                  className={`w-full text-left p-5 hover:bg-[var(--background)] transition ${
                    selected === e.id ? "bg-brand-soft/40" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${diffColors[e.difficulty]}`}>
                      {e.difficulty}
                    </span>
                    <span className="text-xs text-muted">{e.section} · {e.topic}</span>
                    <span className="ml-auto text-xs text-muted">{e.date}</span>
                  </div>
                  <div className="text-sm line-clamp-2 leading-snug"><Md>{e.question}</Md></div>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="col-span-12 lg:col-span-7">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${diffColors[current.difficulty]}`}>
              {current.difficulty}
            </span>
            <span className="text-xs text-muted">{current.section} · {current.topic}</span>
            <span className="ml-auto text-xs text-muted">{current.date}</span>
          </div>

          <div className="text-lg font-semibold leading-snug mb-6"><Md>{current.question}</Md></div>

          <div className="space-y-3 mb-6">
            <div className="border border-rose-200 bg-rose-50/50 rounded-xl p-4">
              <div className="text-xs font-semibold text-rose-700 mb-1">Your answer</div>
              <div className="text-sm">{current.yourAnswer}</div>
            </div>
            <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4">
              <div className="text-xs font-semibold text-emerald-700 mb-1">Correct answer</div>
              <div className="text-sm">{current.correctAnswer}</div>
            </div>
          </div>

          <div className="bg-[var(--background)] rounded-xl p-5">
            <div className="text-sm font-semibold mb-2">Explanation</div>
            <div className="text-sm text-muted leading-relaxed"><Md>{current.explanation}</Md></div>
          </div>
        </Card>
      </div>
    </>
  );
}
