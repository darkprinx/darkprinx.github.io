import { honors, volunteering } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { SplitTitle } from './SplitTitle.tsx'

/**
 * Volunteering and honors share one section: both tell the competitive-
 * programming story — winning contests, then teaching others to.
 */
export function Community() {
  return (
    <section className="section community" id="community" aria-labelledby="community-title">
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Community &amp; contests
        </p>
      </Reveal>
      <SplitTitle id="community-title" text="Won the contests." accent="Then trained the next teams." />
      <Reveal>
        <p className="section-lede">
          Years of competitive programming, placing in national contests, then
          volunteering as a trainer at six universities and communities.
        </p>
      </Reveal>

      <div className="community-grid">
        <div className="community-col">
          <Reveal>
            <h3 className="community-col-title">Volunteering</h3>
          </Reveal>
          <ul className="volunteer-list" role="list">
            {volunteering.map((entry, i) => (
              <Reveal as="li" className="volunteer-item" key={entry.organization} delay={i * 60}>
                <p className="volunteer-period">{entry.period}</p>
                <div>
                  <h4 className="volunteer-role">
                    {entry.role} · {entry.organization}
                  </h4>
                  <p className="volunteer-desc">{entry.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="community-col">
          <Reveal>
            <h3 className="community-col-title">Honors &amp; awards</h3>
          </Reveal>
          <ul className="honor-list" role="list">
            {honors.map((honor, i) => (
              <Reveal as="li" className="honor-item" key={honor.title} delay={i * 60}>
                <span className="honor-mark" aria-hidden="true" />
                <div>
                  <h4 className="honor-title">{honor.title}</h4>
                  <p className="honor-meta">
                    {honor.issuer} · {honor.date}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
