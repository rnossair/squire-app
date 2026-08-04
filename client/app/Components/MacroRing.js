'use client'

// A single "what's left" ring. The coloured arc is what remains of the
// budget, so it visibly depletes as meals are logged.
export default function MacroRing({
  label,
  unit,
  remaining,
  total,
  color,
  track = '#e4dfce',
  size = 132,
  stroke = 12,
  big = false,
}) {
  const safeTotal = total > 0 ? total : 1
  const fraction = Math.max(0, Math.min(1, remaining / safeTotal))

  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - fraction)
  const shown = Math.max(0, Math.round(remaining))

  return (
    <figure
      className="flex flex-col items-center gap-2"
      role="img"
      aria-label={`${label}: ${shown} of ${Math.round(total)} ${unit} left`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{
              '--ring-c': c,
              transition: 'stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)',
              animation: 'ring-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-mono font-bold leading-none text-ink ${big ? 'text-4xl' : 'text-xl'}`}
          >
            {shown}
          </span>
          <span className="mt-1 font-mono text-[0.65rem] text-ink-faint">
            / {Math.round(total)} {unit}
          </span>
        </div>
      </div>
      <figcaption className="text-center">
        <span className="text-sm font-medium text-ink">{label}</span>
        <span className="ml-1 text-xs text-ink-faint">left</span>
      </figcaption>
    </figure>
  )
}
