import { principles } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { SplitTitle } from './SplitTitle.tsx'

export function Approach() {
  return (
    <section className="section-tint approach" id="approach" aria-labelledby="approach-title">
      <div className="section-tint-inner">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            How I build
          </p>
        </Reveal>
        <SplitTitle id="approach-title" text="The same loop," accent="every time." />
        <Reveal>
          <p className="section-lede">
            Five stages, run in order, on every system — each one backed by
            something that actually happened.
          </p>
        </Reveal>

        <ol className="stages" role="list">
          {principles.map((principle, i) => (
            <Reveal as="li" className="stage" key={principle.stage} delay={i * 90}>
              <p className="stage-num">{principle.stage}</p>
              <h3>{principle.name}</h3>
              <p className="stage-body">{principle.body}</p>
              <p className="stage-proof">{principle.proof}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
