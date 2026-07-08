import { identity, stats, formationWords } from '../data/profile.ts'
import { ChaosCanvas } from './hero/ChaosCanvas.tsx'
import { Magnetic } from './Magnetic.tsx'

interface Props {
  reducedMotion: boolean
}

export function Hero({ reducedMotion }: Props) {
  const tickerItems = [...stats, ...stats]

  return (
    <section className="hero" id="top" aria-label="Introduction" data-theme="dark">
      <div className="hero-stage">
        <ChaosCanvas reducedMotion={reducedMotion} words={formationWords} />
      </div>

      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow intro-a">
          <span className="eyebrow-dot" aria-hidden="true" />
          {identity.name} - {identity.role}
        </p>
        <h1 className="hero-headline">
          <span className="hl-mask intro-b">
            <span className="hl-line">{identity.headline.plain}</span>
          </span>
          <span className="hl-mask intro-c">
            <span className="hl-line">
              <em>{identity.headline.accent}</em> {identity.headline.tail}
            </span>
          </span>
        </h1>
        <p className="hero-positioning intro-d">{identity.positioning}</p>
        <div className="hero-actions intro-e">
          <Magnetic>
            <a className="button button-primary" href="#work">
              Explore the work
            </a>
          </Magnetic>
          <a className="button button-ghost" href="#contact">
            Start a conversation
          </a>
        </div>
        <p className="hero-hint intro-f" aria-hidden="true">
          {identity.heroHint}
        </p>
      </div>

      <a className="hero-scroll intro-f" href="#about">
        <span className="hero-scroll-dot" aria-hidden="true" />
        Scroll
      </a>

      <div className="ticker" aria-label="Career facts">
        <div className="ticker-track">
          {tickerItems.map((stat, i) => (
            <span key={i} aria-hidden={i >= stats.length}>
              {stat}
              <span className="ticker-sep" aria-hidden="true">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
