import { proofQuotes } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'

/**
 * A compact preview of the recommendations, surfaced right after About so
 * proof of the claims above shows up before the reader has to go looking.
 */
export function ProofStrip() {
  return (
    <section className="section proof-strip" aria-label="What people say about working with me">
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          From the people I’ve worked with
        </p>
      </Reveal>

      <ul className="proof-grid" role="list">
        {proofQuotes.map((q, i) => (
          <Reveal as="li" className="proof-card" key={q.name} delay={i * 90}>
            <p className="proof-quote">“{q.quote}”</p>
            <p className="proof-attr">
              {q.name} <span>· {q.relationship}</span>
            </p>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <a className="proof-more" href="#voices">
          Read all recommendations →
        </a>
      </Reveal>
    </section>
  )
}
