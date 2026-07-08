import { identity } from '../data/profile.ts'

export function Footer() {
  return (
    <footer className="footer" data-theme="dark">
      <p>© 2026 {identity.name}</p>
      <p>Chaos in, Solution out. React, TypeScript, GSAP, and a hand-rolled canvas.</p>
      <a href="#top">Back to the chaos ↑</a>
    </footer>
  )
}
