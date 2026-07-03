import { systems } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { SplitTitle } from './SplitTitle.tsx'
import { CaseVisual } from './CaseVisual.tsx'

export function Work() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Systems built
        </p>
      </Reveal>
      <SplitTitle id="work-title" text="The work is invisible." accent="The results aren’t." />
      <Reveal>
        <p className="section-lede">
          Production systems from seven years of client platforms and independent
          R&D — told as engineering problems, not screenshots. Details stay
          NDA-safe.
        </p>
      </Reveal>

      <div className="case-list">
        {systems.map((system, i) => (
          <Reveal as="article" className="case" key={system.title} delay={(i % 2) * 60}>
            <div className="case-glyph">
              <div className="case-glyph-box">
                <CaseVisual type={system.visual} />
              </div>
              <p className="case-client">{system.client}</p>
            </div>
            <div className="case-body">
              <h3>{system.title}</h3>
              <dl className="case-facts">
                <div>
                  <dt>Context</dt>
                  <dd>{system.context}</dd>
                </div>
                <div>
                  <dt>Built</dt>
                  <dd>{system.built}</dd>
                </div>
                <div>
                  <dt>Impact</dt>
                  <dd>{system.impact}</dd>
                </div>
              </dl>
              <div className="case-foot">
                <ul className="chip-list" role="list">
                  {system.stack.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
                {system.link && (
                  <a
                    className="case-link"
                    href={system.link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {system.link.label} ↗
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
