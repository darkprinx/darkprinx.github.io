import { useEffect, useState } from 'react'
import { recommendations } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { SplitTitle } from './SplitTitle.tsx'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

const ROTATE_MS = 10000

/**
 * LinkedIn recommendations as a rotating spotlight: one full quote at a
 * time, with an avatar rail to jump between voices. Auto-advances unless
 * hovered, focused, or reduced motion is on.
 */
export function Recommendations() {
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || held) return
    const id = setInterval(
      () => setActive((current) => (current + 1) % recommendations.length),
      ROTATE_MS,
    )
    return () => clearInterval(id)
  }, [reduced, held])

  const rec = recommendations[active]

  return (
    <section
      className="section-dark voices"
      id="voices"
      aria-labelledby="voices-title"
      data-theme="dark"
    >
      <div className="section-dark-inner">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Recommendations
          </p>
        </Reveal>
        <SplitTitle
          id="voices-title"
          text="Ten people I’ve worked with,"
          accent="in their own words."
        />
        <Reveal>
          <p className="section-lede">
            Every recommendation on my LinkedIn, unedited: managers, clients,
            designers, and the engineers I mentored.
          </p>
        </Reveal>

        <Reveal
          className="voice-stage"
          // Hovering or focusing anywhere in the stage holds the rotation.
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)}
          onBlurCapture={() => setHeld(false)}
        >
          <figure className="voice-card" key={rec.name} aria-live="polite">
            <span className="voice-quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote className="voice-text">{rec.text}</blockquote>
            <figcaption className="voice-meta">
              <img
                className="voice-avatar"
                src={rec.image}
                alt={`Portrait of ${rec.name}`}
                width="56"
                height="56"
                loading="lazy"
              />
              <div className="voice-who">
                <p className="voice-name">{rec.name}</p>
                <p className="voice-title">{rec.title}</p>
                <p className="voice-relation">
                  {rec.relationship} · {rec.date}
                </p>
              </div>
              <span className="voice-count" aria-hidden="true">
                {String(active + 1).padStart(2, '0')} /{' '}
                {String(recommendations.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>

          <div className="voice-rail" role="tablist" aria-label="Choose a recommendation">
            {recommendations.map((person, i) => (
              <button
                key={person.name}
                role="tab"
                aria-selected={i === active}
                aria-label={`Recommendation from ${person.name}`}
                className={`voice-dot ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <img
                  src={person.image}
                  alt=""
                  width="44"
                  height="44"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
