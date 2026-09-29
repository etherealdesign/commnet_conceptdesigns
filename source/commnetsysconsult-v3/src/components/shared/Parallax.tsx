import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'

/**
 * Scroll-scrubbed vertical drift for full-bleed media. The child travels
 * `distance` px over the time its wrapper crosses the viewport, so a photo
 * behind a title moves slower than the page and reads as depth. The wrapper
 * clips, so the child is scaled up just enough that its edges never show.
 */
export function Parallax({
  children,
  distance = 120,
  className,
  innerClassName,
}: {
  children: ReactNode
  distance?: number
  className?: string
  innerClassName?: string
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const w = wrap.current
    const i = inner.current
    if (!w || !i || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        i,
        { y: -distance },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, w)
    return () => ctx.revert()
  }, [distance])

  return (
    <div ref={wrap} className={cn('overflow-clip', className)}>
      <div
        ref={inner}
        className={cn('h-full w-full will-change-transform', innerClassName)}
        style={{ scale: 1 + (distance * 2) / 900 }}
      >
        {children}
      </div>
    </div>
  )
}
