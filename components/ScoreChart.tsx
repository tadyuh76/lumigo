type Series = { label: string; color: string; values: number[] };

export function ScoreChart({
  labels,
  series,
  height = 220,
}: {
  labels: string[];
  series: Series[];
  height?: number;
}) {
  const all = series.flatMap((s) => s.values);
  const rawMin = Math.min(...all);
  const rawMax = Math.max(...all);
  const pad = Math.max(20, (rawMax - rawMin) * 0.4);
  const min = Math.floor((rawMin - pad) / 20) * 20;
  const max = Math.ceil((rawMax + pad) / 20) * 20;
  const range = max - min;

  const W = 600;
  const H = 200;
  const padL = 36;
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const xAt = (i: number) => padL + (i / (labels.length - 1)) * innerW;
  const yAt = (v: number) => padT + (1 - (v - min) / range) * innerH;

  const ticks = 4;
  const tickValues = Array.from({ length: ticks + 1 }, (_, i) => Math.round(min + (range * i) / ticks));

  return (
    <div style={{ height }} className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {tickValues.map((v) => (
          <g key={v}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yAt(v)}
              y2={yAt(v)}
              stroke="var(--border)"
              strokeDasharray="3 4"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <text x={padL - 8} y={yAt(v) + 3} textAnchor="end" fontSize="9" fill="var(--muted)">
              {v}
            </text>
          </g>
        ))}

        {series.map((s) => {
          const path = s.values
            .map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(v)}`)
            .join(" ");
          return (
            <g key={s.label}>
              <path d={path} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {s.values.map((v, i) => (
                <circle key={i} cx={xAt(i)} cy={yAt(v)} r="3" fill="white" stroke={s.color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          );
        })}

        {labels.map((l, i) => (
          <text key={l} x={xAt(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="var(--muted)">
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}
