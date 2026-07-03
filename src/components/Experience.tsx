import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { SplitTitle } from './SplitTitle.tsx'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const list = listRef.current
    if (!list || reduced) return

    const barAnims = Array.from(list.querySelectorAll<HTMLElement>('.station-bar-fill')).map(
      (bar) => {
        const station = bar.closest<HTMLElement>('.station')
        return gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: station,
              start: 'top 72%',
              end: 'top 26%',
              scrub: 0.6,
            },
          },
        )
      },
    )

    const triggers = Array.from(list.querySelectorAll<HTMLElement>('.station')).map((station) =>
      ScrollTrigger.create({
        trigger: station,
        start: 'top 62%',
        onEnter: () => station.classList.add('is-lit'),
        once: true,
      }),
    )

    return () => {
      barAnims.forEach((a) => {
        a.scrollTrigger?.kill()
        a.kill()
      })
      triggers.forEach((t) => t.kill())
    }
  }, [reduced])

  return (
    <section
      className="section-dark experience"
      id="experience"
      aria-labelledby="experience-title"
      data-theme="dark"
    >
      <div className="section-dark-inner">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Experience
          </p>
        </Reveal>
        <SplitTitle
          id="experience-title"
          text="Two companies, four platforms,"
          accent="seven years of production."
        />

        <ol className={`timeline ${reduced ? 'is-static' : ''}`} role="list" ref={listRef}>
          {timeline.map((station, i) => (
            <Reveal as="li" key={station.company} className="station">
              {/* Horizontal accent bar — GSAP scrubs scaleX as you scroll */}
              <div className="station-bar" aria-hidden="true">
                <div className="station-bar-fill" />
              </div>

              <div className="station-body">
                {/* Ghost ordinal */}
                <span className="station-idx" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="station-content">
                  <header className="station-head">
                    <div className="station-titles">
                      <h3 className="station-role">{station.role}</h3>
                      <p className="station-company">{station.company}</p>
                    </div>
                    <div className="station-meta">
                      <span>{station.period}</span>
                      <span>{station.location}</span>
                    </div>
                  </header>

                  <p className="station-summary">{station.summary}</p>

                  <div className="engagements">
                    {station.engagements.map((engagement) => (
                      <article className="engagement" key={engagement.name}>
                        <p className="engagement-tag">{engagement.tag}</p>
                        <h4>{engagement.name}</h4>
                        <ul role="list">
                          {engagement.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
