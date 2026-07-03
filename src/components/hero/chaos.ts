/**
 * ORDER OUT OF CHAOS — the hero installation.
 *
 * Hundreds of emerald fragments drift as a living, tangled swarm. On a
 * clock, they magnetically assemble into words — TUSHAR / BUILDS / SCALES /
 * SHIPS — hold formation, then dissolve back into chaos and reform. The
 * cursor bends the field; a click detonates a shockwave the system heals
 * from. Chaos becomes structure, on repeat: the actual job description.
 *
 * Hand-rolled canvas 2D. No textures, no WebGL — ~600 shapes, spring
 * physics, and a spatial-friendly link pass, all within a 60fps budget.
 */

const EMERALD = '#00AE8D'
const TINT = '#A8DDD4'
const FROST = '#E6F7F4'
const DEEP = '#008A71'
const CREAM = '#F1EFE8'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  hasTarget: boolean
  delay: number
  size: number
  shape: number // 0 circle · 1 square · 2 triangle · 3 capsule
  color: string
  rot: number
  rotV: number
  wander: number
  phase: number
  linker: boolean
}

interface Ripple {
  x: number
  y: number
  r: number
  alpha: number
}

export interface ChaosOptions {
  reducedMotion: boolean
  words: string[]
}

const CHAOS_TIME = 1.6
const FORM_TIME = 4.2
const SPRING = 5.4
const DAMP_FORM = 0.9
const DAMP_CHAOS = 0.985

export class ChaosField {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private opts: ChaosOptions

  private particles: Particle[] = []
  private ripples: Ripple[] = []
  private targets: { x: number; y: number }[][] = []
  private order: number[] = []

  private width = 0
  private height = 0
  private compact = false
  private phase: 'chaos' | 'form' = 'chaos'
  private phaseT = 0
  private wordIdx = -1
  private time = 0

  private cursor: { x: number; y: number } | null = null
  private lastTime = 0
  private raf = 0
  private running = false
  private inView = false
  private destroyed = false

  private resizeObserver: ResizeObserver
  private visObserver: IntersectionObserver
  private removeListeners: () => void

  constructor(canvas: HTMLCanvasElement, opts: ChaosOptions) {
    this.canvas = canvas
    this.opts = opts
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('canvas 2d context unavailable')
    this.ctx = ctx

    this.resizeObserver = new ResizeObserver(() => this.rebuild())
    this.resizeObserver.observe(canvas)

    this.visObserver = new IntersectionObserver(
      ([entry]) => {
        this.inView = entry.isIntersecting
        this.syncRunning()
      },
      { threshold: 0.02 },
    )
    this.visObserver.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      this.cursor = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      this.cursor = null
    }
    const onClick = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      this.shockwave(e.clientX - rect.left, e.clientY - rect.top)
    }
    const onVisibility = () => this.syncRunning()
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerdown', onClick)
    document.addEventListener('visibilitychange', onVisibility)
    this.removeListeners = () => {
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerdown', onClick)
      document.removeEventListener('visibilitychange', onVisibility)
    }

    this.rebuild()
    // Word shapes are sampled from rendered type — resample once the real
    // display face arrives so the formations are drawn in Poppins, not a
    // fallback.
    if (document.fonts?.load) {
      document.fonts.load('800 120px Poppins').then(() => {
        if (!this.destroyed) this.rebuild()
      })
    }
  }

  destroy() {
    this.destroyed = true
    cancelAnimationFrame(this.raf)
    this.resizeObserver.disconnect()
    this.visObserver.disconnect()
    this.removeListeners()
  }

  // ---------------------------------------------------------------- setup --

  private rebuild() {
    const rect = this.canvas.getBoundingClientRect()
    if (rect.width < 10 || rect.height < 10) return
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    this.canvas.width = Math.round(rect.width * dpr)
    this.canvas.height = Math.round(rect.height * dpr)
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.width = rect.width
    this.height = rect.height
    this.compact = rect.width < 900

    const count = this.compact ? 330 : 720
    this.buildParticles(count)
    this.buildTargets()

    this.order = this.particles.map((_, i) => i)
    for (let i = this.order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.order[i], this.order[j]] = [this.order[j], this.order[i]]
    }

    if (this.opts.reducedMotion) {
      // Static scene: the swarm already settled into the first word.
      this.wordIdx = 0
      this.assignTargets(0)
      for (const p of this.particles) {
        if (p.hasTarget) {
          p.x = p.tx
          p.y = p.ty
        }
      }
      this.drawFrame(true)
    } else {
      this.phase = 'chaos'
      this.phaseT = 0
      this.wordIdx = -1
    }
  }

  private buildParticles(count: number) {
    const palette: [string, number][] = [
      [EMERALD, 0.52],
      [TINT, 0.18],
      [DEEP, 0.14],
      [FROST, 0.1],
      [CREAM, 0.06],
    ]
    const pick = () => {
      let r = Math.random()
      for (const [c, w] of palette) {
        if ((r -= w) <= 0) return c
      }
      return EMERALD
    }
    this.particles = []
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 30,
        vy: (Math.random() - 0.5) * 30,
        tx: 0,
        ty: 0,
        hasTarget: false,
        delay: 0,
        size: 2.2 + Math.random() * 3.6,
        shape: Math.floor(Math.random() * 4),
        color: pick(),
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 2.4,
        wander: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        linker: i % 3 === 0,
      })
    }
  }

  /** Sample every word into a point cloud that fits the formation box. */
  private buildTargets() {
    this.targets = []
    // The formation lives in the clear zone below-right of the headline on
    // wide screens; on compact screens it hugs the bottom, above the ticker
    // and below the CTAs.
    const boxW = this.compact ? this.width * 0.92 : Math.min(this.width * 0.4, 620)
    const boxH = this.compact
      ? Math.min(this.height * 0.24, 210)
      : Math.min(this.height * 0.3, 310)
    const cx = this.compact ? this.width * 0.5 : this.width * 0.73
    const cy = this.compact ? this.height - 225 : this.height * 0.63
    const budget = Math.floor(this.particles.length * 0.82)

    const off = document.createElement('canvas')
    const octx = off.getContext('2d')
    if (!octx) return

    for (const word of this.opts.words) {
      const probe = 120
      octx.font = `800 ${probe}px Poppins, 'Trebuchet MS', sans-serif`
      const w = octx.measureText(word).width
      const size = Math.min((boxW * 0.96 * probe) / w, boxH * 0.92)
      off.width = Math.ceil(boxW) + 40
      off.height = Math.ceil(boxH) + 40
      octx.clearRect(0, 0, off.width, off.height)
      octx.font = `800 ${size}px Poppins, 'Trebuchet MS', sans-serif`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#000'
      octx.fillText(word, off.width / 2, off.height / 2)

      const img = octx.getImageData(0, 0, off.width, off.height).data
      // First pass: count ink to derive a sampling step that lands near the
      // particle budget, then sample on that grid.
      let ink = 0
      for (let i = 3; i < img.length; i += 16) if (img[i] > 128) ink++
      const inkPx = ink * 4
      const step = Math.max(3, Math.round(Math.sqrt(inkPx / budget)))
      const pts: { x: number; y: number }[] = []
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (img[(y * off.width + x) * 4 + 3] > 128) {
            pts.push({
              x: cx - off.width / 2 + x + (Math.random() - 0.5) * 2,
              y: cy - off.height / 2 + y + (Math.random() - 0.5) * 2,
            })
          }
        }
      }
      this.targets.push(pts)
    }
  }

  private assignTargets(wordIdx: number) {
    const pts = this.targets[wordIdx] ?? []
    for (let k = 0; k < this.order.length; k++) {
      const p = this.particles[this.order[k]]
      if (k < pts.length) {
        p.tx = pts[k].x
        p.ty = pts[k].y
        p.hasTarget = true
        p.delay = (k / pts.length) * 0.7 * Math.random()
      } else {
        p.hasTarget = false
      }
    }
  }

  private shockwave(x: number, y: number) {
    this.ripples.push({ x, y, r: 8, alpha: 0.7 })
    if (this.opts.reducedMotion) {
      this.drawFrame(true)
      return
    }
    for (const p of this.particles) {
      const dx = p.x - x
      const dy = p.y - y
      const d = Math.max(Math.hypot(dx, dy), 1)
      if (d < 420) {
        const force = (1 - d / 420) * 640
        p.vx += (dx / d) * force
        p.vy += (dy / d) * force
        p.rotV += (Math.random() - 0.5) * 6
      }
    }
  }

  // -------------------------------------------------------------- running --

  private syncRunning() {
    const next =
      this.inView && document.visibilityState === 'visible' && !this.opts.reducedMotion
    if (this.destroyed) return
    if (next && !this.running) {
      this.running = true
      this.lastTime = performance.now()
      this.raf = requestAnimationFrame(this.tick)
    } else if (!next && this.running) {
      this.running = false
      cancelAnimationFrame(this.raf)
    }
  }

  private tick = (now: number) => {
    if (!this.running || this.destroyed) return
    const dt = Math.min((now - this.lastTime) / 1000, 0.05)
    this.lastTime = now
    this.time += dt
    this.update(dt)
    this.drawFrame(false)
    this.raf = requestAnimationFrame(this.tick)
  }

  private update(dt: number) {
    this.phaseT += dt

    // The heartbeat: chaos → formation → chaos → next word.
    if (this.phase === 'chaos' && this.phaseT >= CHAOS_TIME) {
      this.phase = 'form'
      this.phaseT = 0
      this.wordIdx = (this.wordIdx + 1) % this.targets.length
      this.assignTargets(this.wordIdx)
    } else if (this.phase === 'form' && this.phaseT >= FORM_TIME) {
      this.phase = 'chaos'
      this.phaseT = 0
    }

    const forming = this.phase === 'form'
    for (const p of this.particles) {
      if (forming && p.hasTarget && this.phaseT > p.delay) {
        // Spring into formation; rotation calms as order arrives.
        p.vx += (p.tx - p.x) * SPRING * dt * 10
        p.vy += (p.ty - p.y) * SPRING * dt * 10
        p.vx *= DAMP_FORM
        p.vy *= DAMP_FORM
        p.rotV *= 0.94
      } else {
        // Wandering chaos with a soft pull toward the canvas.
        p.wander += (Math.random() - 0.5) * 0.5
        p.vx += Math.cos(p.wander) * 26 * dt
        p.vy += Math.sin(p.wander) * 26 * dt
        p.vx += (this.width / 2 - p.x) * 0.014 * dt
        p.vy += (this.height / 2 - p.y) * 0.014 * dt
        p.vx *= DAMP_CHAOS
        p.vy *= DAMP_CHAOS
      }

      if (this.cursor) {
        const dx = p.x - this.cursor.x
        const dy = p.y - this.cursor.y
        const d = Math.hypot(dx, dy)
        if (d < 130 && d > 0.5) {
          const force = ((1 - d / 130) * 340 * dt) / d
          p.vx += dx * force
          p.vy += dy * force
        }
      }

      p.x += p.vx * dt
      p.y += p.vy * dt
      p.rot += p.rotV * dt

      // Soft walls so the chaos never leaves the stage.
      if (p.x < -20) p.vx += 40 * dt
      if (p.x > this.width + 20) p.vx -= 40 * dt
      if (p.y < -20) p.vy += 40 * dt
      if (p.y > this.height + 20) p.vy -= 40 * dt
    }

    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i]
      r.r += dt * 620
      r.alpha -= dt * 1.15
      if (r.alpha <= 0) this.ripples.splice(i, 1)
    }
  }

  // -------------------------------------------------------------- drawing --

  private drawFrame(staticScene: boolean) {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.width, this.height)

    // Constellation links while the swarm is loose — the tangle reads as
    // "unstructured system" and vanishes as words lock in.
    if (!staticScene) {
      const loose = this.phase === 'chaos' || this.phaseT < 0.9
      if (loose) {
        const linkers = this.particles.filter((p) => p.linker)
        ctx.lineWidth = 1
        for (let i = 0; i < linkers.length; i++) {
          const a = linkers[i]
          for (let j = i + 1; j < linkers.length; j++) {
            const b = linkers[j]
            const dx = a.x - b.x
            if (dx > 74 || dx < -74) continue
            const dy = a.y - b.y
            if (dy > 74 || dy < -74) continue
            const d = Math.hypot(dx, dy)
            if (d < 74) {
              ctx.strokeStyle = `rgba(0, 174, 141, ${(1 - d / 74) * 0.16})`
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }
    }

    const forming = this.phase === 'form'
    for (const p of this.particles) {
      const tw = staticScene ? 0.9 : 0.72 + Math.sin(this.time * 1.6 + p.phase) * 0.24
      // Particles snap bright and slightly larger once they lock into place.
      const locked =
        (forming || staticScene) &&
        p.hasTarget &&
        Math.abs(p.x - p.tx) + Math.abs(p.y - p.ty) < 14
      ctx.globalAlpha = locked ? 1 : p.hasTarget ? Math.min(1, tw + 0.1) : tw * 0.8
      ctx.fillStyle = p.color
      const s = locked ? p.size * 1.22 : p.size
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      switch (p.shape) {
        case 0:
          ctx.beginPath()
          ctx.arc(0, 0, s * 0.62, 0, Math.PI * 2)
          ctx.fill()
          break
        case 1:
          ctx.fillRect(-s * 0.55, -s * 0.55, s * 1.1, s * 1.1)
          break
        case 2:
          ctx.beginPath()
          ctx.moveTo(0, -s * 0.72)
          ctx.lineTo(s * 0.65, s * 0.5)
          ctx.lineTo(-s * 0.65, s * 0.5)
          ctx.closePath()
          ctx.fill()
          break
        default:
          ctx.beginPath()
          ctx.roundRect(-s * 0.9, -s * 0.3, s * 1.8, s * 0.6, s * 0.3)
          ctx.fill()
      }
      ctx.restore()
    }
    ctx.globalAlpha = 1

    for (const r of this.ripples) {
      ctx.beginPath()
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(168, 221, 212, ${Math.max(0, r.alpha)})`
      ctx.lineWidth = 1.6
      ctx.stroke()
    }
  }
}
