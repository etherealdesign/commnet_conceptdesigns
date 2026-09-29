import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Scramble } from '@/components/shared/Scramble'

/**
 * The reference's preloader. Four 16 px squares start stacked off the left
 * edge of a 70 px slot; each slides to its place and turns a quarter turn
 * on its bottom-right corner (0.7 s expo in-out, the next starting at 75 %
 * of the last). LOADING resolves out of noise underneath. At 2.275 s the
 * plate is cut away along a diagonal - top-left corner to bottom-right -
 * over 1.5 s expo in-out, and at 90 % of that cut the page is told to
 * enter, so the first headline is already sweeping in as the last of the
 * colour leaves.
 */
export function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const squares = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReveal()
      onDone()
      return
    }
    const el = root.current
    if (!el) return
    document.body.classList.add('is-locked')
    const tl = gsap.timeline()
    squares.current.filter(Boolean).forEach((sq, i) => {
      tl.fromTo(sq, { x: i === 0 ? -16 : (i - 1) * 18, rotate: 0 }, { x: 18 * i - 16, rotate: 90, duration: 0.7, ease: 'expo.inOut', immediateRender: false }, i === 0 ? 0 : '>-25%')
    })
    const cut = 2.275
    tl.to(content.current, { opacity: 0, duration: 0.4, ease: 'power3.out' }, cut + 0.2)
    const p = { v: 0 }
    let revealed = false
    tl.to(
      p,
      {
        v: 1,
        duration: 1.5,
        ease: 'expo.inOut',
        onUpdate: () => {
          const e = p.v
          el.style.clipPath =
            e <= 0
              ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
              : e >= 1
                ? 'polygon(0% 100%, 0% 100%, 0% 100%)'
                : e <= 0.5
                  ? `polygon(0% 100%, ${2 * e * 100}% 0%, 100% 0%, 100% 100%)`
                  : `polygon(0% 100%, 100% ${(e - 0.5) * 200}%, 100% 100%)`
          if (!revealed && e >= 0.9) {
            revealed = true
            onReveal()
          }
        },
        onComplete: () => {
          document.body.classList.remove('is-locked')
          onDone()
        },
      },
      cut,
    )
    return () => {
      tl.kill()
      document.body.classList.remove('is-locked')
    }
  }, [onReveal, onDone])

  return (
    <div ref={root} className="fixed inset-0 z-[10000] flex items-center justify-center bg-accent text-dark" aria-hidden="true">
      <div ref={content} className="flex flex-col items-center gap-2">
        <div className="relative overflow-x-clip overflow-y-visible" style={{ width: 70, height: 16 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              ref={(n) => {
                squares.current[i] = n
              }}
              className="absolute left-0 top-0 bg-dark"
              style={{ width: 16, height: 16, transform: 'translateX(-16px)', transformOrigin: 'bottom right' }}
            />
          ))}
        </div>
        <div className="overflow-hidden">
          <Scramble text="LOADING" className="mono" duration={1} noiseClass="text-dark/60" />
        </div>
      </div>
    </div>
  )
}
