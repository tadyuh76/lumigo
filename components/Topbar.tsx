import { USER } from "@/lib/data";

function Dot({ className = "" }: { className?: string }) {
  return <span className={`w-1.5 h-1.5 rounded-full ${className}`} />;
}

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 bg-card border border-[var(--border)] rounded-full px-4 py-2 text-sm">
          <Dot className="bg-warning" />
          <span className="text-muted">Exam in</span>
          <span className="font-semibold">{USER.examInDays}d</span>
        </div>
        <div className="flex items-center gap-2 bg-card border border-[var(--border)] rounded-full px-4 py-2 text-sm">
          <Dot className="bg-success" />
          <span className="font-semibold">{USER.streak}</span>
          <span className="text-muted">day streak</span>
        </div>
        <div className="flex items-center gap-2 bg-card border border-[var(--border)] rounded-full px-4 py-2 text-sm">
          <span className="text-muted">Score</span>
          <span className="font-semibold text-brand">{USER.currentScore}</span>
          <span className="text-muted">/ 1600</span>
        </div>
      </div>
    </div>
  );
}
