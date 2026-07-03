import { useEffect, useRef } from 'react'
import { ChaosField } from './chaos.ts'

interface Props {
  reducedMotion: boolean
  words: string[]
}

export function ChaosCanvas({ reducedMotion, words }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const field = new ChaosField(canvas, { reducedMotion, words })
    return () => field.destroy()
  }, [reducedMotion, words])

  return (
    <canvas
      ref={canvasRef}
      className="chaos-canvas"
      role="img"
      aria-label={`Hundreds of emerald fragments drift in chaos, then assemble themselves into the words ${words.join(
        ', ',
      )} — order out of chaos, on repeat.`}
    />
  )
}
