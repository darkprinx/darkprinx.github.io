import { useEffect } from 'react'
import { fireImpact } from '../lib/impact.ts'

/**
 * Every small card or chip across the site is a target: click one and it
 * takes a hit. One delegated listener covers all of them, so any new card
 * that reuses these classes gets the effect for free.
 */
const SHOOTABLE =
  '.chip, .cluster-tilt, .cred-card, .proof-card, .engagement, .honor-item, .volunteer-item, .voice-dot, .case-glyph-box'

export function ShootZone() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const card = target.closest(SHOOTABLE)
      if (!card) return
      fireImpact(e.clientX, e.clientY, card)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
