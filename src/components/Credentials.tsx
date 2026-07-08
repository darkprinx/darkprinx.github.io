import { certifications } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { SplitTitle } from './SplitTitle.tsx'

function SealGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" className="cred-seal">
      <circle cx="17" cy="17" r="13" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="17" r="8.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M12.5 17.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Credentials() {
  return (
    <section className="section credentials" id="credentials" aria-labelledby="credentials-title">
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Licenses &amp; certifications
        </p>
      </Reveal>
      <SplitTitle id="credentials-title" text="Claims are cheap." accent="These are verified." />

      <div className="cred-grid" role="list">
        {certifications.map((cert, i) => (
          <Reveal as="article" className="cred-card" key={cert.name} delay={i * 90} role="listitem">
            <SealGlyph />
            <h3 className="cred-name">{cert.name}</h3>
            <p className="cred-issuer">{cert.issuer}</p>
            {cert.note && <p className="cred-note">{cert.note}</p>}
            <p className="cred-date">Issued {cert.date}</p>
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cred-link">
                View credential
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
