"use client";
import { useState } from "react";
import Link from "next/link";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { PRACTICE_TESTS } from "@/lib/data";

const FILTERS = ["All", "Full Test", "Math", "Verbal"] as const;

const accentClasses: Record<string, string> = {
  brand: "bg-brand-soft text-brand",
  warning: "bg-amber-100 text-amber-700",
  success: "bg-emerald-100 text-emerald-700",
  muted: "bg-[var(--background)] text-muted",
};

export default function PracticePage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const tests = PRACTICE_TESTS.filter((t) => filter === "All" || t.section === filter);

  return (
    <>
      <Topbar title="Practice Tests" subtitle="Realistic, adaptive practice modeled on the digital SAT." />

      <Card className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === f ? "bg-brand text-white" : "bg-[var(--background)] text-muted hover:text-[var(--foreground)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="text-sm text-muted">
          <span className="font-semibold text-[var(--foreground)]">12</span> completed ·{" "}
          <span className="font-semibold text-[var(--foreground)]">3</span> in progress
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {tests.map((t) => (
          <Card key={t.id} className="hover:shadow-sm hover:-translate-y-0.5 transition cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accentClasses[t.accent]}`}>
                {t.status}
              </span>
              <span className="text-xs text-muted">{t.section}</span>
            </div>
            <h3 className="font-semibold text-lg leading-snug mb-3">{t.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted mb-5">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                {t.duration}
              </span>
              <span>{t.questions} questions</span>
            </div>
            <Link
              href={`/practice/${t.id}`}
              className="block w-full text-center bg-brand text-white font-semibold py-2.5 rounded-full text-sm hover:opacity-90 transition"
            >
              {t.status === "In Progress" ? "Resume Test" : t.status === "Completed" ? "Review" : "Start Test"}
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
