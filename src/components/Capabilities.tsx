import { useRef, type PointerEvent } from 'react'
import { clusters } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { SplitTitle } from './SplitTitle.tsx'

/** 3D tilt that follows the cursor — each capability card is an object. */
function TiltCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLLIElement>(null)

  const onMove = (e: PointerEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tilt-x', `${py * -7}deg`)
    el.style.setProperty('--tilt-y', `${px * 9}deg`)
    el.style.setProperty('--glow-x', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--glow-y', `${(py + 0.5) * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Reveal as="li" className="cluster" delay={delay}>
      <div
        className="cluster-tilt"
        ref={ref as never}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {children}
      </div>
    </Reveal>
  )
}

export function Capabilities() {
  return (
    <section
      className="section capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Core Competency
        </p>
      </Reveal>
      <SplitTitle
        id="capabilities-title"
        text="Not a list of logos."
        accent="A connected competency."
      />
      <Reveal>
        <p className="section-lede">
          Pull one thread and the rest moves. A new feature needs an API. The
          API needs a database. The database needs someone awake when it falls
          over at 2 a.m. Seven clusters, one nervous system.
        </p>
      </Reveal>

      <ul className="cluster-grid" role="list">
        {clusters.map((cluster, i) => (
          <TiltCard key={cluster.key} delay={(i % 3) * 80}>
            <div className="cluster-head">
              <span className="cluster-node" aria-hidden="true" />
              <h3>{cluster.name}</h3>
            </div>
            <p className="cluster-desc">{cluster.description}</p>
            <ul className="chip-list" role="list">
              {cluster.items.map((item) => (
                <li className="chip" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </TiltCard>
        ))}
      </ul>
    </section>
  )
}
