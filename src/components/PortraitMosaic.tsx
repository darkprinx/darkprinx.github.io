import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import { fireImpact } from '../lib/impact.ts'

interface Props {
  src: string
  fallback: string
  alt: string
}

interface Tile {
  sx: number
  sy: number
  dx: number
  dy: number
  ox: number
  oy: number
  rot: number
  delay: number
  // Click-shot physics: a spring-damped kick that scatters the tile, then
  // pulls it back into place — independent of the entrance animation above.
  kx: number
  ky: number
  kvx: number
  kvy: number
  krot: number
  kvrot: number
}

interface Ripple {
  x: number
  y: number
  r: number
  alpha: number
}

const COLS = 24
const ROWS = 30
const ASSEMBLE_SECS = 1.7
const KICK_RADIUS = 130
const KICK_FORCE = 950
const KICK_SPRING = 46
const KICK_DAMP = 0.86
const KICK_EPSILON = 0.05

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * The portrait is built from the same fragment language as the hero: tiles
 * fly in from scatter and lock into a duotone emerald mosaic when the
 * section scrolls into view. Hovering ripples the tiles apart; they heal.
 */
export function PortraitMosaic({ src, fallback, alt }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let tiles: Tile[] = []
    let ripples: Ripple[] = []
    let img: HTMLImageElement | null = null
    let crop = { x: 0, y: 0, w: 0, h: 0 }
    let width = 0
    let height = 0
    let progress = reduced ? 1 : 0
    let started = reduced
    let startAt = 0
    let lastFrame = 0
    let cursor: { x: number; y: number } | null = null
    let raf = 0
    let inView = false
    let destroyed = false

    const buildTiles = () => {
      tiles = []
      const tw = width / COLS
      const th = height / ROWS
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const angle = Math.random() * Math.PI * 2
          const dist = 180 + Math.random() * 360
          tiles.push({
            sx: crop.x + (c / COLS) * crop.w,
            sy: crop.y + (r / ROWS) * crop.h,
            dx: c * tw,
            dy: r * th,
            ox: Math.cos(angle) * dist,
            oy: Math.sin(angle) * dist,
            rot: (Math.random() - 0.5) * 1.4,
            delay: (r / ROWS) * 0.5 + Math.random() * 0.3,
            kx: 0,
            ky: 0,
            kvx: 0,
            kvy: 0,
            krot: 0,
            kvrot: 0,
          })
        }
      }
    }

    /** A click "shoots" the mosaic: nearby tiles scatter, then spring home. */
    const shoot = (x: number, y: number) => {
      if (reduced || progress < 1) return
      const tw = width / COLS
      const th = height / ROWS
      for (const t of tiles) {
        const cx = t.dx + tw / 2
        const cy = t.dy + th / 2
        const dx = cx - x
        const dy = cy - y
        const d = Math.max(Math.hypot(dx, dy), 1)
        if (d >= KICK_RADIUS) continue
        const force = (1 - d / KICK_RADIUS) * KICK_FORCE
        t.kvx += (dx / d) * force
        t.kvy += (dy / d) * force
        t.kvrot += (Math.random() - 0.5) * force * 0.012
      }
      ripples.push({ x, y, r: 6, alpha: 0.6 })
      wake()
    }

    /** Integrates the click-kick spring-damper; returns true while it's still moving. */
    const stepKicks = (dt: number) => {
      let moving = false
      for (const t of tiles) {
        t.kvx += -t.kx * KICK_SPRING * dt
        t.kvy += -t.ky * KICK_SPRING * dt
        t.kvx *= KICK_DAMP
        t.kvy *= KICK_DAMP
        t.kx += t.kvx * dt
        t.ky += t.kvy * dt

        t.kvrot += -t.krot * KICK_SPRING * dt
        t.kvrot *= KICK_DAMP
        t.krot += t.kvrot * dt

        if (
          Math.abs(t.kx) > KICK_EPSILON ||
          Math.abs(t.ky) > KICK_EPSILON ||
          Math.abs(t.kvx) > KICK_EPSILON ||
          Math.abs(t.kvy) > KICK_EPSILON
        ) {
          moving = true
        }
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.r += dt * 300
        r.alpha -= dt * 1.2
        if (r.alpha <= 0) ripples.splice(i, 1)
      }
      return moving || ripples.length > 0
    }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      if (rect.width < 10 || !img) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Cover-crop the source to the canvas ratio.
      const ratio = width / height
      const iratio = img.naturalWidth / img.naturalHeight
      if (iratio > ratio) {
        const w = img.naturalHeight * ratio
        crop = { x: (img.naturalWidth - w) / 2, y: 0, w, h: img.naturalHeight }
      } else {
        const h = img.naturalWidth / ratio
        crop = { x: 0, y: (img.naturalHeight - h) / 2, w: img.naturalWidth, h }
      }
      buildTiles()
      if (reduced) draw(performance.now())
    }

    const draw = (now: number) => {
      if (!img) return
      if (started && progress < 1) {
        progress = Math.min(1, (now - startAt) / 1000 / ASSEMBLE_SECS)
      }
      ctx.clearRect(0, 0, width, height)
      const tw = width / COLS
      const th = height / ROWS
      const sw = crop.w / COLS
      const sh = crop.h / ROWS

      ctx.save()
      ctx.beginPath()
      ctx.roundRect(0, 0, width, height, 22)
      // While assembling, tiles fly outside the frame — only clip at rest.
      if (progress >= 1 && !cursor) ctx.clip()

      for (const t of tiles) {
        const local = Math.min(1, Math.max(0, (progress * 1.8 - t.delay) / 1))
        if (local <= 0) continue
        const e = easeOutCubic(local)
        let x = t.dx + t.ox * (1 - e)
        let y = t.dy + t.oy * (1 - e)
        let rot = t.rot * (1 - e)

        if (cursor && progress >= 1) {
          const cx = t.dx + tw / 2
          const cy = t.dy + th / 2
          const dx = cx - cursor.x
          const dy = cy - cursor.y
          const d = Math.hypot(dx, dy)
          if (d < 110 && d > 0.5) {
            const f = (1 - d / 110) * 16
            x += (dx / d) * f
            y += (dy / d) * f
            rot += (dx / d) * 0.06
          }
        }

        x += t.kx
        y += t.ky
        rot += t.krot

        ctx.save()
        ctx.globalAlpha = Math.min(1, e * 1.2)
        ctx.translate(x + tw / 2, y + th / 2)
        ctx.rotate(rot)
        ctx.drawImage(img, t.sx, t.sy, sw, sh, -tw / 2 - 0.4, -th / 2 - 0.4, tw + 0.8, th + 0.8)
        ctx.restore()
      }

      for (const r of ripples) {
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(168, 221, 212, ${Math.max(0, r.alpha)})`
        ctx.lineWidth = 1.6
        ctx.stroke()
      }

      ctx.restore()
    }

    const loop = (now: number) => {
      if (destroyed) return
      const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0
      lastFrame = now
      const kicking = stepKicks(dt)
      draw(now)
      const settled = progress >= 1 && !cursor && !kicking
      if (!settled || !started) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
      }
    }
    const wake = () => {
      if (!raf && !reduced && inView) raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (entry.isIntersecting && !started) {
          started = true
          startAt = performance.now()
        }
        if (entry.isIntersecting) wake()
      },
      { threshold: 0.25 },
    )
    io.observe(wrap)

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      cursor = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (!reduced) wake()
    }
    const onLeave = () => {
      cursor = null
      wake()
    }
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      shoot(e.clientX - rect.left, e.clientY - rect.top)
      fireImpact(e.clientX, e.clientY, undefined, 10)
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerdown', onDown)

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    let triedFallback = false
    img = new Image()
    img.onload = () => {
      resize()
      wake()
      if (reduced) draw(performance.now())
    }
    img.onerror = () => {
      if (img && !triedFallback) {
        triedFallback = true
        img.src = fallback
      }
    }
    img.src = src

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerdown', onDown)
    }
  }, [src, fallback, reduced])

  return (
    <div className="portrait" ref={wrapRef}>
      <canvas ref={canvasRef} className="portrait-canvas" role="img" aria-label={alt} />
      <div className="portrait-frame" aria-hidden="true" />
    </div>
  )
}
