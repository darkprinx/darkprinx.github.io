import { useEffect, useState } from 'react'
import { identity } from '../data/profile.ts'
import { Magnetic } from './Magnetic.tsx'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#voices', label: 'Voices' },
  { href: '#community', label: 'Community' },
]

function BrandMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="6" width="52" height="52" rx="16" fill="var(--emerald)" />
      <rect x="20" y="19" width="24" height="7" rx="3.5" fill="var(--cream)" />
      <rect x="28.5" y="19" width="7" height="26" rx="3.5" fill="var(--cream)" />
      <circle cx="32" cy="49" r="1" fill="var(--cream)" opacity="0" />
    </svg>
  )
}

/**
 * The nav floats over both cream and forest sections; a scroll probe checks
 * which section sits under it and flips its ink accordingly.
 */
export function Nav() {
  const [open, setOpen] = useState(false)
  const [onDark, setOnDark] = useState(true)

  useEffect(() => {
    let raf = 0
    const probe = () => {
      raf = 0
      // Skip the nav itself — we want whatever section sits beneath it.
      const el = document
        .elementsFromPoint(24, 40)
        .find((node) => !node.closest('.nav'))
      setOnDark(!!el?.closest('[data-theme="dark"]'))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(probe)
    }
    probe()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className={`nav ${onDark ? 'nav-dark' : ''} ${open ? 'nav-menu-open' : ''}`}>
      <div className="nav-inner">
        <a className="nav-brand" href="#top" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="nav-name">{identity.shortName}</span>
        </a>

        <nav
          id="nav-links"
          className={`nav-links ${open ? 'is-open' : ''}`}
          aria-label="Site sections"
        >
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: open ? `${i * 45}ms` : undefined }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Magnetic strength={0.25}>
            <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
              Get in touch
            </a>
          </Magnetic>
        </nav>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  )
}
