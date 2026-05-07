import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { ScoreChart } from "@/components/ScoreChart";
import { USER, STUDY_PLAN, RECENT_ACTIVITY, SCORE_HISTORY, SKILL_BREAKDOWN } from "@/lib/data";
import Link from "next/link";

export default function Dashboard() {
  const today = STUDY_PLAN[0];
  const progress = Math.round((USER.currentScore / USER.targetScore) * 100);

  return (
    <>
      <Topbar title={`Welcome back, ${USER.name.split(" ")[0]}`} subtitle="Here's your study snapshot for today." />

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-8 bg-brand text-white border-0">
          <div className="max-w-md">
            <div className="text-xs uppercase tracking-wider opacity-80 mb-2">Today&apos;s focus</div>
            <h2 className="text-2xl font-semibold mb-2">{today.focus}</h2>
            <p className="text-white/80 text-sm mb-6">
              {today.minutes}-minute session, {today.tasks.length} tasks. You&apos;re on a {USER.streak}-day streak.
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 bg-white text-brand font-semibold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition"
            >
              Start session
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <div className="text-sm text-muted mb-1">Goal progress</div>
          <div className="flex items-baseline gap-1 mb-4">
            <div className="text-3xl font-bold">{USER.currentScore}</div>
            <div className="text-muted text-sm">/ {USER.targetScore}</div>
          </div>
          <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-brand rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-xs text-muted mb-5">{progress}% to your target score</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--background)] rounded-xl p-3">
              <div className="text-xs text-muted">This week</div>
              <div className="text-lg font-semibold">4h 32m</div>
            </div>
            <div className="bg-[var(--background)] rounded-xl p-3">
              <div className="text-xs text-muted">Accuracy</div>
              <div className="text-lg font-semibold text-success">82%</div>
            </div>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">Score trend</div>
              <div className="text-xs text-muted">Last 8 weeks</div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand" />Math</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-400" />Verbal</span>
            </div>
          </div>
          <ScoreChart
            labels={SCORE_HISTORY.map((d) => d.label)}
            series={[
              { label: "Math", color: "#5b6cff", values: SCORE_HISTORY.map((d) => d.math) },
              { label: "Verbal", color: "#a78bfa", values: SCORE_HISTORY.map((d) => d.verbal) },
            ]}
          />
        </Card>

        <Card className="col-span-12 lg:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold">Today&apos;s tasks</div>
            <Link href="/tutor" className="text-xs text-brand font-medium">View plan</Link>
          </div>
          <ul className="space-y-3">
            {today.tasks.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span
                  className={`mt-0.5 w-5 h-5 rounded-md border grid place-items-center shrink-0 ${
                    t.done ? "bg-brand border-brand text-white" : "border-[var(--border)] bg-white"
                  }`}
                >
                  {t.done && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  )}
                </span>
                <span className={t.done ? "line-through text-muted" : ""}>{t.title}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="col-span-12 lg:col-span-7">
          <div className="font-semibold mb-1">Skill mastery</div>
          <div className="text-xs text-muted mb-5">Updated after every practice set</div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {SKILL_BREAKDOWN.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{s.name}</span>
                  <span className="font-semibold text-muted">{s.mastery}%</span>
                </div>
                <div className="h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.mastery}%`,
                      background: s.mastery > 80 ? "var(--success)" : s.mastery > 65 ? "var(--brand)" : "var(--warning)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-5">
          <div className="font-semibold mb-4">Recent activity</div>
          <ul className="divide-y divide-[var(--border)]">
            {RECENT_ACTIVITY.map((a, i) => (
              <li key={i} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">{a.label}</div>
                  <div className="text-xs text-muted">{a.when}</div>
                </div>
                <div className="font-semibold text-brand">{a.score}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
