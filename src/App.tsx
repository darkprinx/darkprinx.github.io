import { Nav } from './components/Nav.tsx'
import { Hero } from './components/Hero.tsx'
import { About } from './components/About.tsx'
import { Capabilities } from './components/Capabilities.tsx'
import { Credentials } from './components/Credentials.tsx'
import { Experience } from './components/Experience.tsx'
import { Work } from './components/Work.tsx'
import { Recommendations } from './components/Recommendations.tsx'
import { Community } from './components/Community.tsx'
import { Contact } from './components/Contact.tsx'
import { Footer } from './components/Footer.tsx'
import { Cursor } from './components/Cursor.tsx'
import { useReducedMotion } from './hooks/useReducedMotion.ts'

export default function App() {
  const reducedMotion = useReducedMotion()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero reducedMotion={reducedMotion} />
        <About />
        <Capabilities />
        <Credentials />
        <Experience />
        <Work />
        <Recommendations />
        <Community />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </>
  )
}
