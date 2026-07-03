/**
 * A small generative system diagram, deterministic per seed, so each case
 * study gets its own abstract "architecture" drawn in the brand palette.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Props {
  seed: number
}

export function SystemGlyph({ seed }: Props) {
  const rand = mulberry32(seed * 2654435761)
  const cols = [26, 90, 154]
  const layers = [2 + Math.floor(rand() * 2), 2 + Math.floor(rand() * 2), 1 + Math.floor(rand() * 2)]

  const nodes: { x: number; y: number; layer: number }[] = []
  layers.forEach((count, li) => {
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: cols[li],
        y: 20 + ((i + 0.5) / count) * 100 + (rand() - 0.5) * 10,
        layer: li,
      })
    }
  })

  const edges: [number, number][] = []
  nodes.forEach((node, a) => {
    if (node.layer === 2) return
    const targets = nodes
      .map((n, i) => ({ n, i }))
      .filter(({ n }) => n.layer === node.layer + 1)
    const count = 1 + (rand() < 0.4 ? 1 : 0)
    for (let k = 0; k < count; k++) {
      const pick = targets[Math.floor(rand() * targets.length)]
      if (pick) edges.push([a, pick.i])
    }
  })

  const highlight = Math.floor(rand() * edges.length)

  return (
    <svg className="system-glyph" viewBox="0 0 180 140" aria-hidden="true">
      {edges.map(([a, b], i) => {
        const na = nodes[a]
        const nb = nodes[b]
        const bend = (nb.x - na.x) * 0.5
        return (
          <path
            key={i}
            d={`M ${na.x} ${na.y} C ${na.x + bend} ${na.y}, ${nb.x - bend} ${nb.y}, ${nb.x} ${nb.y}`}
            fill="none"
            stroke={i === highlight ? 'var(--em-deep)' : 'var(--ink)'}
            strokeOpacity={i === highlight ? 0.9 : 0.16}
            strokeWidth={i === highlight ? 1.6 : 1}
          />
        )
      })}
      {edges[highlight] && (
        <circle
          cx={(nodes[edges[highlight][0]].x + nodes[edges[highlight][1]].x) / 2}
          cy={(nodes[edges[highlight][0]].y + nodes[edges[highlight][1]].y) / 2}
          r="3"
          fill="var(--em-deep)"
        />
      )}
      {nodes.map((n, i) =>
        n.layer === 2 ? (
          <circle key={i} cx={n.x} cy={n.y} r="7" fill="var(--ink)" />
        ) : n.layer === 0 ? (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="4.5"
            fill="var(--cream)"
            stroke="var(--ink)"
            strokeOpacity="0.7"
            strokeWidth="1.3"
          />
        ) : (
          <circle key={i} cx={n.x} cy={n.y} r="5.5" fill="var(--emerald)" />
        ),
      )}
    </svg>
  )
}
