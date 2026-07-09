import { playShot } from './sound.ts'

const SPARK_COLORS = ['#00AE8D', '#A8DDD4', '#008A71']

/**
 * Fires a small burst of emerald sparks from a viewport point — the shared
 * "hit" feedback for anything clickable-and-shootable (portrait, cards,
 * chips). Plain DOM + CSS, no canvas: cheap enough to spawn from any click.
 */
export function spawnImpact(x: number, y: number, count = 8) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6
    const dist = 22 + Math.random() * 38
    const spark = document.createElement('span')
    spark.className = 'impact-spark'
    spark.style.left = `${x}px`
    spark.style.top = `${y}px`
    spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`)
    spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`)
    spark.style.setProperty('--c', SPARK_COLORS[i % SPARK_COLORS.length])
    document.body.appendChild(spark)
    spark.addEventListener('animationend', () => spark.remove(), { once: true })
  }
}

/** Punches a brief hit reaction onto an element, then cleans its own class up. */
export function punch(el: Element) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  el.classList.remove('is-hit')
  // Restart the animation even if it's still finishing from a rapid re-click.
  void (el as HTMLElement).offsetWidth
  el.classList.add('is-hit')
  el.addEventListener('animationend', () => el.classList.remove('is-hit'), { once: true })
}

/** The full shot: sparks, a sound, and — if a target landed — a punch. */
export function fireImpact(x: number, y: number, el?: Element, count = 8) {
  spawnImpact(x, y, count)
  playShot()
  if (el) punch(el)
}
