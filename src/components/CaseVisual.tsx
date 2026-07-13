import type { CaseVisualType } from '../data/profile.ts'

/* ---------- 1. Time-series chart — Volue Insight ---------- */
function TimeseriesViz() {
  const xTicks = [22, 57, 94, 131, 168]
  const labels = ['Jan', 'Apr', 'Jul', 'Oct', 'Dec']
  return (
    <g>
      {/* Grid lines */}
      {[38, 64, 90].map((y) => (
        <line key={y} x1="20" y1={y} x2="170" y2={y}
          stroke="var(--line)" strokeWidth="0.7" strokeDasharray="3 5" />
      ))}
      {/* Axes */}
      <line x1="20" y1="112" x2="170" y2="112" stroke="var(--line)" strokeWidth="1" />
      <line x1="20" y1="22" x2="20" y2="112" stroke="var(--line)" strokeWidth="1" />

      {/* Curve 1 — main (emerald, brightest) */}
      <path
        d="M22,82 C38,48 52,78 70,52 C88,26 106,66 126,40 C146,14 158,50 168,40"
        fill="none" stroke="var(--emerald)" strokeWidth="2.2" strokeLinecap="round" />

      {/* Curve 2 — secondary (em-mid, medium) */}
      <path
        d="M22,93 C38,72 52,90 70,75 C88,60 106,84 126,64 C146,44 158,72 168,62"
        fill="none" stroke="var(--em-mid)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />

      {/* Curve 3 — tertiary (ink, dim baseline) */}
      <path
        d="M22,104 C42,97 60,106 82,100 C104,94 120,104 142,99 C158,96 165,102 168,100"
        fill="none" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.18" />

      {/* Data dots on curve 1 */}
      {[[22, 82], [70, 52], [126, 40], [168, 40]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="var(--emerald)" />
      ))}
      {/* Highlight dot */}
      <circle cx="126" cy="40" r="5.5" fill="none" stroke="var(--emerald)" strokeWidth="1.5" strokeOpacity="0.45" />

      {/* X-axis labels */}
      {xTicks.map((x, i) => (
        <text key={x} x={x} y="124" fill="var(--ink-soft)" fontSize="7"
          textAnchor="middle" fontFamily="var(--font-display)">
          {labels[i]}
        </text>
      ))}

      {/* Top label */}
      <text x="95" y="14" fill="var(--em-deep)" fontSize="6.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600" letterSpacing="0.08em">
        500+ TIME-SERIES CURVES
      </text>
    </g>
  )
}

/* ---------- 2. Cloud deployment stack — SmartCruiter ---------- */
function CloudViz() {
  const layer = (y: number, label: string, sub: string, accent = false) => (
    <g key={label}>
      <rect x="30" y={y} width="120" height="26" rx="6"
        fill={accent ? 'var(--tint)' : 'var(--cream)'}
        stroke={accent ? 'var(--emerald)' : 'var(--line)'}
        strokeWidth={accent ? 1.5 : 1} />
      <text x="90" y={y + 11} fill={accent ? 'var(--em-deep)' : 'var(--ink)'}
        fontSize="8" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="600">
        {label}
      </text>
      <text x="90" y={y + 21} fill="var(--ink-soft)" fontSize="6.5"
        textAnchor="middle" fontFamily="var(--font-display)">
        {sub}
      </text>
    </g>
  )

  const arrow = (y: number) => (
    <g key={y}>
      <line x1="90" y1={y} x2="90" y2={y + 8} stroke="var(--line)" strokeWidth="1" />
      <polygon points={`87,${y + 8} 90,${y + 12} 93,${y + 8}`} fill="var(--line)" />
    </g>
  )

  return (
    <g>
      {/* Internet cloud (top) */}
      <ellipse cx="90" cy="16" rx="28" ry="10"
        fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="90" y="19" fill="var(--ink-soft)" fontSize="7" textAnchor="middle"
        fontFamily="var(--font-display)">INTERNET</text>

      {arrow(26)}
      {layer(38, 'Load Balancer', 'AWS ALB', false)}
      {arrow(64)}

      {/* ECS Fargate box with container rects */}
      <rect x="28" y="76" width="124" height="30" rx="6"
        fill="var(--tint)" stroke="var(--emerald)" strokeWidth="1.5" />
      <text x="90" y="87" fill="var(--em-deep)" fontSize="7.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600">ECS FARGATE</text>
      {[52, 82, 112].map((x) => (
        <rect key={x} x={x} y="92" width="16" height="9" rx="2"
          fill="var(--em-mid)" opacity="0.6" />
      ))}

      {arrow(106)}

      {/* Two side-by-side boxes */}
      <rect x="30" y="118" width="54" height="18" rx="5"
        fill="var(--cream)" stroke="var(--line)" strokeWidth="1" />
      <text x="57" y="130" fill="var(--ink)" fontSize="7" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600">ECR</text>

      <rect x="96" y="118" width="54" height="18" rx="5"
        fill="var(--cream)" stroke="var(--emerald)" strokeWidth="1.5" />
      <text x="123" y="130" fill="var(--em-deep)" fontSize="7" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600">PAYMENTS</text>
    </g>
  )
}

/* ---------- 3. Traffic rings / gauge — Robi ---------- */
function TrafficViz() {
  const cx = 90, cy = 68

  const arcPath = (r: number, fromDeg: number, toDeg: number) => {
    const rad = (d: number) => (d - 90) * (Math.PI / 180)
    const x1 = cx + r * Math.cos(rad(fromDeg))
    const y1 = cy + r * Math.sin(rad(fromDeg))
    const x2 = cx + r * Math.cos(rad(toDeg))
    const y2 = cy + r * Math.sin(rad(toDeg))
    const large = toDeg - fromDeg > 180 ? 1 : 0
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
  }

  return (
    <g>
      {/* Outer track (full ring, dim) */}
      <circle cx={cx} cy={cy} r="52" fill="none" stroke="var(--line)" strokeWidth="6" />

      {/* Outer fill (75% = 270°, showing load before optimization) */}
      <path d={arcPath(52, 0, 270)}
        fill="none" stroke="var(--em-mid)" strokeWidth="6"
        strokeLinecap="round" opacity="0.35" />

      {/* Middle track */}
      <circle cx={cx} cy={cy} r="40" fill="none" stroke="var(--line)" strokeWidth="5" />

      {/* Middle fill (after: 25% load, = 90°, representing savings) */}
      <path d={arcPath(40, 0, 90)}
        fill="none" stroke="var(--emerald)" strokeWidth="5"
        strokeLinecap="round" />

      {/* Inner track */}
      <circle cx={cx} cy={cy} r="28" fill="none" stroke="var(--line)" strokeWidth="4"
        strokeOpacity="0.5" />

      {/* Inner fill (30% engagement up = 108°) */}
      <path d={arcPath(28, 0, 108)}
        fill="none" stroke="var(--tint2)" strokeWidth="4"
        strokeLinecap="round" strokeOpacity="0.8" />

      {/* Center text */}
      <text x={cx} y={cy - 6} fill="var(--em-deep)" fontSize="18" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="800">5M</text>
      <text x={cx} y={cy + 8} fill="var(--ink-soft)" fontSize="7" textAnchor="middle"
        fontFamily="var(--font-display)">requests / day</text>

      {/* Bottom badges */}
      <rect x="18" y="128" width="60" height="10" rx="3" fill="var(--tint)" />
      <text x="48" y="136" fill="var(--em-deep)" fontSize="6.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="700">75% cost saved</text>

      <rect x="102" y="128" width="62" height="10" rx="3" fill="var(--tint)" />
      <text x="133" y="136" fill="var(--em-deep)" fontSize="6.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="700">+30% engagement</text>
    </g>
  )
}

/* ---------- 4. MPTT tree transformation — Ferdia ---------- */
function TreeViz() {
  const dot = (x: number, y: number, label: string, accent = false) => (
    <g key={`${x}-${y}`}>
      <circle cx={x} cy={y} r="7"
        fill={accent ? 'var(--emerald)' : 'var(--cream)'}
        stroke={accent ? 'var(--emerald)' : 'var(--ink)'}
        strokeOpacity={accent ? 1 : 0.4}
        strokeWidth="1.5" />
      <text x={x} y={y + 3} fill={accent ? 'var(--cream)' : 'var(--ink)'}
        fontSize="5.5" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700">
        {label}
      </text>
    </g>
  )
  const edge = (x1: number, y1: number, x2: number, y2: number, accent = false) => (
    <line key={`${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={accent ? 'var(--emerald)' : 'var(--ink)'}
      strokeWidth={accent ? 1.5 : 1}
      strokeOpacity={accent ? 0.7 : 0.2} />
  )

  return (
    <g>
      {/* Separator */}
      <line x1="90" y1="10" x2="90" y2="130"
        stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4" />

      {/* === LEFT: O(N) linear chain === */}
      <text x="44" y="12" fill="var(--ink-soft)" fontSize="7.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600">O(N)</text>

      {/* Vertical chain */}
      {edge(44, 26, 44, 46)}
      {edge(44, 60, 44, 78)}
      {edge(44, 92, 44, 110)}

      {dot(44, 20, 'A', true)}
      {dot(44, 54, 'B')}
      {dot(44, 86, 'C')}
      {dot(44, 118, 'D')}

      {/* Traversal indicator */}
      <text x="60" y="70" fill="var(--ink-soft)" fontSize="6" fontFamily="var(--font-display)">
        scan
      </text>
      <text x="60" y="80" fill="var(--ink-soft)" fontSize="6" fontFamily="var(--font-display)">
        all nodes
      </text>

      {/* === RIGHT: O(1) MPTT flat === */}
      <text x="136" y="12" fill="var(--em-deep)" fontSize="7.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="700">O(1)</text>

      {/* Root */}
      {dot(136, 28, 'A', true)}

      {/* Level 1 */}
      {edge(136, 35, 116, 54)}
      {edge(136, 35, 136, 54)}
      {edge(136, 35, 156, 54)}
      {dot(116, 60, 'B')}
      {dot(136, 60, 'C')}
      {dot(156, 60, 'D')}

      {/* Level 2 (leaves) */}
      {edge(116, 67, 106, 84)}
      {edge(116, 67, 126, 84)}
      {dot(106, 90, 'E')}
      {dot(126, 90, 'F')}

      {/* MPTT label */}
      <rect x="100" y="106" width="72" height="12" rx="3" fill="var(--tint)" />
      <text x="136" y="115" fill="var(--em-deep)" fontSize="6.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="700">MPTT · lft/rgt indexed</text>
    </g>
  )
}

/* ---------- 6. Contribution grid / star field — Python OSS ---------- */
function StarsViz() {
  const intensities = [
    [0, 1, 2, 3, 2, 1, 0],
    [1, 2, 3, 4, 3, 2, 1],
    [2, 3, 4, 4, 4, 3, 2],
    [1, 2, 3, 4, 3, 2, 1],
    [0, 1, 2, 3, 2, 1, 0],
  ]
  const opacities = [0.06, 0.22, 0.46, 0.72, 1.0]
  const cell = 16, gap = 3, step = cell + gap
  const ox = 22, oy = 26

  return (
    <g>
      {/* Star icon top-right */}
      <text x="166" y="20" fill="var(--ink)" fontSize="22" textAnchor="middle" opacity="0.1">★</text>

      {/* Count */}
      <text x="92" y="14" fill="var(--em-deep)" fontSize="8" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="700" letterSpacing="0.06em">
        3,100+ GITHUB STARS
      </text>

      {/* Contribution grid */}
      {intensities.map((row, r) =>
        row.map((v, c) => (
          <rect key={`${r}-${c}`}
            x={ox + c * step} y={oy + r * step}
            width={cell} height={cell}
            rx="3"
            fill="var(--emerald)"
            opacity={opacities[v]}
          />
        ))
      )}

      {/* "1,500+ forks" badge */}
      <rect x="22" y="112" width="70" height="12" rx="3" fill="var(--tint)" />
      <text x="57" y="121" fill="var(--em-deep)" fontSize="6.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="700">1,500+ forks</text>

      {/* Language badge */}
      <rect x="100" y="112" width="56" height="12" rx="3" fill="var(--ink)" opacity="0.08" />
      <text x="128" y="121" fill="var(--ink)" fontSize="6.5" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600">Python · OOP</text>

      {/* Star trail accent */}
      {[[142, 62], [155, 48], [164, 74], [148, 82], [170, 56]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2"
          fill="var(--emerald)" opacity="0.4" />
      ))}
      <text x="156" y="92" fill="var(--emerald)" fontSize="14" textAnchor="middle" opacity="0.7">★</text>
    </g>
  )
}

/* ---------- 7. RAG pipeline / cited chat — Marginalia ---------- */
function RagViz() {
  return (
    <g>
      {/* Document (PDF/TXT/MD) */}
      <rect x="8" y="34" width="34" height="46" rx="4"
        fill="var(--cream)" stroke="var(--line)" strokeWidth="1.5" />
      <polygon points="34,34 42,34 34,42" fill="var(--line)" opacity="0.7" />
      {[44, 52, 60, 68].map((y) => (
        <rect key={y} x="14" y={y} width={y === 68 ? 14 : 22} height="3" rx="1.5"
          fill="var(--ink)" opacity="0.18" />
      ))}
      <text x="25" y="94" fill="var(--ink-soft)" fontSize="6" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600">PDF·TXT·MD</text>

      {/* Arrow: doc -> chunks */}
      <line x1="46" y1="52" x2="58" y2="52" stroke="var(--line)" strokeWidth="1" />
      <polygon points="56,49 60,52 56,55" fill="var(--line)" />

      {/* Overlapping chunk stack */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={62 + i * 4} y={38 + i * 8} width="26" height="16" rx="3"
          fill="var(--tint)" stroke="var(--emerald)" strokeWidth="1"
          opacity={0.55 + i * 0.2} />
      ))}
      <text x="75" y="94" fill="var(--ink-soft)" fontSize="6" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600">1,400-char chunks</text>

      {/* Arrow: chunks -> vectors */}
      <line x1="94" y1="52" x2="106" y2="52" stroke="var(--line)" strokeWidth="1" />
      <polygon points="104,49 108,52 104,55" fill="var(--line)" />

      {/* Embedding vector cloud, top hit highlighted */}
      {[[112, 40], [122, 46], [116, 56], [128, 58], [110, 64], [124, 34], [120, 66]].map(
        ([x, y], i) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={i === 3 ? 4 : 2.6}
            fill={i === 3 ? 'var(--emerald)' : 'var(--em-mid)'}
            opacity={i === 3 ? 1 : 0.4} />
        ),
      )}
      <circle cx="128" cy="58" r="7" fill="none" stroke="var(--emerald)" strokeWidth="1.2" opacity="0.5" />
      <text x="120" y="94" fill="var(--ink-soft)" fontSize="6" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="600">cosine rank</text>

      {/* Arrow: vectors -> answer */}
      <line x1="132" y1="54" x2="144" y2="54" stroke="var(--emerald)" strokeWidth="1.3" />
      <polygon points="142,51 147,54 142,57" fill="var(--emerald)" />

      {/* Cited chat bubble */}
      <rect x="146" y="30" width="30" height="34" rx="6"
        fill="var(--forest)" opacity="0.95" />
      <rect x="151" y="37" width="20" height="3" rx="1.5" fill="var(--cream)" opacity="0.85" />
      <rect x="151" y="44" width="20" height="3" rx="1.5" fill="var(--cream)" opacity="0.85" />
      <rect x="151" y="51" width="13" height="3" rx="1.5" fill="var(--cream)" opacity="0.85" />
      {[[168.5, 39.5], [168.5, 46.5]].map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="3" fill="var(--emerald)" />
          <text x={x} y={y + 2} fill="var(--forest)" fontSize="4.5" textAnchor="middle"
            fontFamily="var(--font-display)" fontWeight="700">{i + 1}</text>
        </g>
      ))}

      {/* Margin panel echoing the cited source */}
      <rect x="150" y="98" width="26" height="24" rx="3"
        fill="var(--tint)" stroke="var(--emerald)" strokeWidth="1" />
      <rect x="153" y="103" width="18" height="2.4" rx="1.2" fill="var(--em-deep)" opacity="0.7" />
      <rect x="153" y="108" width="20" height="2.4" rx="1.2" fill="var(--em-deep)" opacity="0.5" />
      <rect x="153" y="113" width="14" height="2.4" rx="1.2" fill="var(--em-deep)" opacity="0.5" />
      <line x1="163" y1="64" x2="163" y2="96" stroke="var(--emerald)" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      <text x="163" y="132" fill="var(--em-deep)" fontSize="6" textAnchor="middle"
        fontFamily="var(--font-display)" fontWeight="700">margin cite</text>
    </g>
  )
}

/* ---------- Main export ---------- */

export function CaseVisual({ type }: { type: CaseVisualType }) {
  return (
    <svg className="case-visual" viewBox="0 0 180 140" aria-hidden="true">
      {type === 'timeseries' && <TimeseriesViz />}
      {type === 'cloud' && <CloudViz />}
      {type === 'traffic' && <TrafficViz />}
      {type === 'tree' && <TreeViz />}
      {type === 'stars' && <StarsViz />}
      {type === 'rag' && <RagViz />}
    </svg>
  )
}
