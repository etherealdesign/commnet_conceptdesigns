import { useEffect, useRef } from 'react'
import { gsap, EASE, prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'

/**
 * The small accent square that marks the active item in a list. It does
 * not jump: it flies to the new `y` with the reference's overshoot curve
 * (0.68, -0.3, 0.32, 1.1) over 0.8 s, dipping back before it lands.
 */
export function Indicator({ y, visible, className, size = 8 }: { y: number | null; visible: boolean; className?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (y === null || !visible) {
      gsap.to(el, { opacity: 0, scale: 0, duration: 0.3, ease: 'power2.out' })
      return
    }
    if (prefersReducedMotion()) {
      gsap.set(el, { y, opacity: 1, scale: 1 })
      return
    }
    gsap.to(el, { y, opacity: 1, scale: 1, duration: 0.8, ease: EASE.overshoot })
  }, [y, visible])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute left-0 top-0 z-10 bg-accent', className)}
      style={{ width: size, height: size, opacity: 0, transform: 'scale(0)' }}
    />
  )
}
