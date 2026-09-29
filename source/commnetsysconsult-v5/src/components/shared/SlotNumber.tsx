import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * The reference's number roller. Each digit is a column of three 0-9
 * stacks (30 em tall) clipped to one line. It rests at -10 em (the middle
 * stack's zero) and, when scrolled into view, rolls to -(20 + d) em - a
 * whole revolution plus the digit - over 1.5 s with expo in-out, the
 * right-most column leaving first and each column to its left 0.08 s
 * behind. Non-digits are printed as they are.
 */
export function SlotNumber({ value, className, duration = 1.5, stagger = 0.08, delay = 0 }: { value: string; className?: string; duration?: number; stagger?: number; delay?: number }) {
  const root = useRef<HTMLSpanElement>(null)
  const played = useRef(false)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const cols = el.querySelectorAll<HTMLElement>('[data-roller-inner]')
    played.current = false
    if (prefersReducedMotion()) {
      cols.forEach((c) => gsap.set(c, { y: `${-20 - Number(c.dataset.digit)}em` }))
      return
    }
    gsap.set(cols, { y: '-10em' })
    const play = () => {
      if (played.current) return
      played.current = true
      const n = cols.length
      cols.forEach((c, i) => {
        gsap.fromTo(c, { y: '-10em' }, { y: `${-20 - Number(c.dataset.digit)}em`, duration, delay: delay + (n - 1 - i) * stagger, ease: 'expo.inOut' })
      })
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', once: true, onEnter: play })
    return () => st.kill()
  }, [value, duration, stagger, delay])

  return (
    <span ref={root} className={cn('flex items-start justify-start overflow-hidden leading-none', className)} style={{ height: '1em' }} aria-label={value}>
      {value.split('').map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="relative flex flex-col items-center justify-start overflow-hidden" style={{ width: '1ch', height: '1em' }} aria-hidden="true">
            <span data-roller-inner data-digit={ch} className="flex flex-col will-change-transform" style={{ transform: 'translateY(-10em)' }}>
              {[...DIGITS, ...DIGITS, ...DIGITS].map((d, j) => (
                <span key={j} className="flex items-center justify-center leading-none" style={{ height: '1em', fontVariantNumeric: 'tabular-nums' }}>
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} className="flex items-center leading-none" style={{ fontVariantNumeric: 'tabular-nums' }} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  )
}
