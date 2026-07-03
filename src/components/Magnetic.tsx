import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

interface Props {
  children: ReactNode
  strength?: number
}

/** Wraps a control so it leans toward the cursor and snaps back elastically. */
export function Magnetic({ children, strength = 0.32 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power3.out' })
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [strength, reduced])

  return (
    <span className="magnetic" ref={ref}>
      {children}
    </span>
  )
}
