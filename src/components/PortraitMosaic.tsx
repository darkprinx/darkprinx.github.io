import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

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
}

const COLS = 24
const ROWS = 30
const ASSEMBLE_SECS = 1.7

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
    let img: HTMLImageElement | null = null
    let crop = { x: 0, y: 0, w: 0, h: 0 }
    let width = 0
    let height = 0
    let progress = reduced ? 1 : 0
    let started = reduced
    let startAt = 0
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
          })
        }
      }
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

        ctx.save()
        ctx.globalAlpha = Math.min(1, e * 1.2)
        ctx.translate(x + tw / 2, y + th / 2)
        ctx.rotate(rot)
        ctx.drawImage(img, t.sx, t.sy, sw, sh, -tw / 2 - 0.4, -th / 2 - 0.4, tw + 0.8, th + 0.8)
        ctx.restore()
      }

      ctx.restore()
    }

    const loop = (now: number) => {
      if (destroyed) return
      draw(now)
      const settled = progress >= 1 && !cursor
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
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

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
    }
  }, [src, fallback, reduced])

  return (
    <div className="portrait" ref={wrapRef}>
      <canvas ref={canvasRef} className="portrait-canvas" role="img" aria-label={alt} />
      <div className="portrait-frame" aria-hidden="true" />
    </div>
  )
}
