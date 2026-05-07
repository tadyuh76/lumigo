import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/Card";
import { ScoreChart } from "@/components/ScoreChart";
import { USER, SCORE_HISTORY, SKILL_BREAKDOWN, RECENT_ACTIVITY } from "@/lib/data";

export default function ProfilePage() {
  return (
    <>
      <Topbar title="My Stats" subtitle="A clear picture of how you're improving." />

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 lg:col-span-4 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-brand-soft text-brand grid place-items-center text-2xl font-bold mb-3">
            {USER.initials}
          </div>
          <div className="font-semibold text-lg">{USER.name}</div>
          <div className="text-sm text-muted mb-4">SAT · Class of 2027</div>
          <div className="w-full grid grid-cols-3 gap-3 text-center">
            <div className="bg-[var(--background)] rounded-xl py-3">
              <div className="text-lg font-semibold">{USER.streak}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted">Streak</div>
            </div>
            <div className="bg-[var(--background)] rounded-xl py-3">
              <div className="text-lg font-semibold">42</div>
              <div className="text-[10px] uppercase tracking-wider text-muted">Tests</div>
            </div>
            <div className="bg-[var(--background)] rounded-xl py-3">
              <div className="text-lg font-semibold">82%</div>
              <div className="text-[10px] uppercase tracking-wider text-muted">Accuracy</div>
            </div>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-8">
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-sm text-muted">Predicted score</div>
              <div className="flex items-baseline gap-2">
                <div className="text-4xl font-bold">{USER.currentScore}</div>
                <div className="text-success text-sm font-semibold">+80 this month</div>
              </div>
            </div>
            <div className="text-right text-xs text-muted">
              Target {USER.targetScore} · {USER.targetScore - USER.currentScore} pts to go
            </div>
          </div>
          <div className="mt-4">
            <ScoreChart
              labels={SCORE_HISTORY.map((d) => d.label)}
              series={[
                { label: "Total", color: "#5b6cff", values: SCORE_HISTORY.map((d) => d.math + d.verbal) },
              ]}
              height={180}
            />
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-7">
          <div className="font-semibold mb-1">Mastery by skill</div>
          <div className="text-xs text-muted mb-5">Where you&apos;re strong, and what&apos;s next</div>
          <div className="space-y-3">
            {SKILL_BREAKDOWN.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{s.name}</span>
                  <span className="font-semibold text-muted">{s.mastery}%</span>
                </div>
                <div className="h-2 bg-[var(--background)] rounded-full overflow-hidden">
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
