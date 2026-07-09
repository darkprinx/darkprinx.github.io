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

/** Punches a jagged hole into the shooting spot, like a chunk knocked out of a wall. */
export function spawnDamage(x: number, y: number) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const mark = document.createElement('span')
  mark.className = 'impact-mark'
  mark.style.left = `${x}px`
  mark.style.top = `${y}px`
  mark.style.setProperty('--rot', `${Math.random() * 360}deg`)
  document.body.appendChild(mark)
  mark.addEventListener('animationend', () => mark.remove(), { once: true })
}

/** The chunks that pop off the wall and tumble down when the hole gets punched. */
export function spawnDebris(x: number, y: number, count = 7) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5
    const dist = 16 + Math.random() * 34
    const chip = document.createElement('span')
    chip.className = 'impact-debris'
    chip.style.left = `${x}px`
    chip.style.top = `${y}px`
    chip.style.setProperty('--dx', `${Math.cos(angle) * dist}px`)
    chip.style.setProperty('--dy', `${Math.sin(angle) * dist}px`)
    chip.style.setProperty('--fall', `${34 + Math.random() * 28}px`)
    chip.style.setProperty('--rot', `${(Math.random() - 0.5) * 420}deg`)
    chip.style.setProperty('--s', `${4 + Math.random() * 4}px`)
    document.body.appendChild(chip)
    chip.addEventListener('animationend', () => chip.remove(), { once: true })
  }
}

/** The full shot: sparks, debris, a punched-hole mark, a sound, and — if a target landed — a punch. */
export function fireImpact(x: number, y: number, el?: Element, count = 8) {
  spawnImpact(x, y, count)
  spawnDebris(x, y)
  spawnDamage(x, y)
  playShot()
  if (el) punch(el)
}
