import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/**
 * Minimal white loader: an abstract node-mark drawn with SVG stroke-dashoffset,
 * then the wordmark fades in, then the whole thing fades out — under 1.8s total.
 *
 * NOTE: the mark below is a placeholder geometric glyph (three connected nodes,
 * echoing the "network" motif used through the site) — swap the <path> data for
 * Commnet's real logo outline the moment a vector (SVG/AI) file is available.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone()
      return
    }

    const path = pathRef.current
    const word = wordRef.current
    const root = rootRef.current
    if (!path || !word || !root) return

    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    gsap.set(word, { opacity: 0, y: 8 })

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: onDone,
    })

    tl.to(path, { strokeDashoffset: 0, duration: 0.75 })
      .to(word, { opacity: 1, y: 0, duration: 0.4 }, '-=0.15')
      .to(root, { opacity: 0, duration: 0.35, pointerEvents: 'none' }, '+=0.25')

    return () => {
      tl.kill()
    }
  }, [onDone])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            ref={pathRef}
            d="M8 30 L8 16 A4 4 0 0 1 12 12 L20 12 A4 4 0 0 1 24 16 L24 22 A4 4 0 0 0 28 26 L32 26"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="30" r="2.5" fill="#2563EB" />
          <circle cx="32" cy="26" r="2.5" fill="#2563EB" />
        </svg>
        <span ref={wordRef} className="text-[--color-navy] font-semibold tracking-tight text-lg">
          COMMNET
        </span>
      </div>
    </div>
  )
}
