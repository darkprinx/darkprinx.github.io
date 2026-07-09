import { about, portrait } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { SplitTitle } from './SplitTitle.tsx'
import { PortraitMosaic } from './PortraitMosaic.tsx'

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Engineering identity
        </p>
      </Reveal>
      <SplitTitle id="about-title" text="Systems thinking," accent="product instincts." />

      <div className="about-grid">
        <div className="about-main">
          <div className="about-facets">
            {about.facets.map((facet, i) => (
              <Reveal key={facet.title} delay={i * 90} className="facet">
                <span className="facet-index" aria-hidden="true" />
                <h3>{facet.title}</h3>
                <p>{facet.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <blockquote className="about-philosophy">
              <p>“{about.philosophy}”</p>
            </blockquote>
          </Reveal>
        </div>

        <div className="about-side">
          <Reveal delay={100}>
            <PortraitMosaic src={portrait.src} fallback={portrait.fallback} alt={portrait.alt} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
