/** Inline project diagrams using existing CSS colour tokens only. */

type Bar = { label: string; value: number; decimals?: number }

function SimpleBarChart({
  title,
  caption,
  ariaLabel,
  bars,
  reference,
}: {
  title: string
  caption: string
  ariaLabel: string
  bars: Bar[]
  reference?: { value: number; label: string }
}) {
  const max = 1
  const chartH = 140
  const barW = 56
  const gap = 28
  const left = 48
  const top = 28
  const bottom = 48
  const width = Math.max(280, left + bars.length * (barW + gap) + 16)
  const height = top + chartH + bottom

  return (
    <figure className="project-visual-block">
      <p className="project-visual-heading">{title}</p>
      {reference ? (
        <p className="project-visual-key">Dashed line: {reference.label}</p>
      ) : null}
      <svg
        className="project-visual"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
      >
        {reference ? (
          <line
            x1={left - 8}
            x2={width - 12}
            y1={top + chartH - (reference.value / max) * chartH}
            y2={top + chartH - (reference.value / max) * chartH}
            stroke="var(--grey-2)"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
        ) : null}
        {bars.map((bar, i) => {
          const h = (bar.value / max) * chartH
          const x = left + i * (barW + gap)
          const barTop = top + chartH - h
          const inside = h >= 28
          const valueY = inside ? barTop + 14 : barTop - 8
          return (
            <g key={bar.label}>
              <rect x={x} y={barTop} width={barW} height={h} fill="var(--ice)" />
              <text
                className={inside ? undefined : 'project-visual-value'}
                x={x + barW / 2}
                y={valueY}
                textAnchor="middle"
                dominantBaseline={inside ? 'hanging' : undefined}
                fill={inside ? 'var(--bg)' : 'var(--slate)'}
                fontSize="12"
              >
                {bar.value.toFixed(bar.decimals ?? 3)}
              </text>
              <text
                x={x + barW / 2}
                y={top + chartH + 18}
                textAnchor="middle"
                fill="var(--grey-1)"
                fontSize="12"
              >
                {bar.label}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="project-visual-caption">{caption}</figcaption>
    </figure>
  )
}

export function StressF1Chart() {
  return (
    <div className="project-visual-stack">
      <SimpleBarChart
        title="Mean macro F1 by held-out dataset"
        caption="Mean macro F1 when each dataset is held out of training."
        ariaLabel="Bar chart of mean macro F1 by held-out dataset: UBFC-Phys 0.66, Wearable 0.47, WESAD 0.77."
        bars={[
          { label: 'UBFC-Phys', value: 0.66, decimals: 2 },
          { label: 'Wearable', value: 0.47, decimals: 2 },
          { label: 'WESAD', value: 0.77, decimals: 2 },
        ]}
      />
      <SimpleBarChart
        title="On-device macro F1 (Raspberry Pi Zero 2W)"
        caption="Macro F1 before and after pruning and INT8 on the Pi Zero 2W."
        ariaLabel="Bar chart of on-device macro F1: before pruning and INT8 0.890, after 0.787, with a dashed 5% tolerance line at 0.846."
        bars={[
          { label: 'Before', value: 0.89, decimals: 3 },
          { label: 'After', value: 0.787, decimals: 3 },
        ]}
        reference={{ value: 0.846, label: '5% tolerance (0.846)' }}
      />
    </div>
  )
}

export function AwsLampArch() {
  return (
    <div className="project-visual-scroll">
      <svg
        className="project-visual"
        viewBox="0 0 420 200"
        role="img"
        aria-label="Architecture diagram: custom VPC across two availability zones with a load balancer, an Auto Scaling group of 2 to 8 EC2 instances, Multi-AZ RDS, and security groups allowing HTTP and SSH only."
      >
        <rect
          x="8"
          y="8"
          width="404"
          height="184"
          rx="8"
          fill="var(--panel2)"
          stroke="var(--border)"
        />
        <text x="20" y="32" fill="var(--slate)" fontSize="14">
          Custom VPC · 2 AZs
        </text>
        <rect
          x="140"
          y="48"
          width="140"
          height="32"
          rx="4"
          fill="transparent"
          stroke="var(--ice-dim)"
        />
        <text x="210" y="68" textAnchor="middle" fill="var(--ice)" fontSize="13">
          Load balancer
        </text>
        <rect
          x="100"
          y="96"
          width="220"
          height="40"
          rx="4"
          fill="transparent"
          stroke="var(--border-h)"
        />
        <text x="210" y="120" textAnchor="middle" fill="var(--grey-1)" fontSize="13">
          Auto Scaling · 2–8 EC2
        </text>
        <rect
          x="120"
          y="152"
          width="180"
          height="28"
          rx="4"
          fill="transparent"
          stroke="var(--green)"
        />
        <text x="210" y="170" textAnchor="middle" fill="var(--green)" fontSize="13">
          Multi-AZ RDS
        </text>
      </svg>
      <p className="project-visual-caption">Security groups: HTTP + SSH only</p>
    </div>
  )
}
