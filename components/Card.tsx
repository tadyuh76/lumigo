export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const hasBg = /(\s|^)bg-/.test(className);
  return (
    <div
      className={`${hasBg ? "" : "bg-card"} border border-[var(--border)] rounded-[var(--radius-card)] p-6 ${className}`}
    >
      {children}
    </div>
  );
}
