import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  id?: string
  text: string
  accent?: string
  className?: string
}

/**
 * Section titles arrive word by word — each word rises out of its own mask
 * with a slight tilt that settles, echoing the fragments-into-order motif.
 */
export function SplitTitle({ id, text, accent, className = '' }: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const words = el.querySelectorAll<HTMLElement>('.st-w')
    gsap.set(words, { yPercent: 115, rotate: 5 })
    const tween = gsap.to(words, {
      yPercent: 0,
      rotate: 0,
      duration: 0.9,
      stagger: 0.055,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced, text, accent])

  const render = (chunk: string, isAccent: boolean) =>
    chunk
      .split(' ')
      .filter(Boolean)
      .map((word, i) => (
        <span className="st-mask" key={`${isAccent}-${i}`}>
          <span className={`st-w${isAccent ? ' st-accent' : ''}`}>{word}</span>{' '}
        </span>
      ))

  return (
    <h2 className={`section-title ${className}`.trim()} id={id} ref={ref}>
      {render(text, false)}
      {accent ? render(accent, true) : null}
    </h2>
  )
}
