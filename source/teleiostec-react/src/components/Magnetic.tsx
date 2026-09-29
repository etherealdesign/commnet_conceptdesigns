import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, finePointer, reducedMotion } from '@/lib/gsap'

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    (_, contextSafe) => {
      const el = ref.current
      if (!el || !finePointer() || reducedMotion() || !contextSafe) return
      const x = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const y = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const move = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - (r.left + r.width / 2)) * strength)
        y((e.clientY - (r.top + r.height / 2)) * strength)
      })
      const leave = contextSafe(() => { x(0); y(0) })
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
    },
    { scope: ref },
  )
  return <div ref={ref} className={className ?? 'inline-block'}>{children}</div>
}
