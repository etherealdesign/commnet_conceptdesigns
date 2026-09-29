import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  className?: string
  /** clip direction of the reveal */
  from?: 'bottom' | 'left' | 'right'
  /** inner vertical parallax as a percentage of height; 0 disables */
  parallax?: number
}

/** Clip-path curtain reveal with a counter-scale on the image, then a scrubbed parallax drift. */
export function RevealImage({ children, className, from = 'bottom', parallax = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reducedMotion()) return
      const clip = { bottom: 'inset(100% 0% 0% 0%)', left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)' }[from]
      gsap.fromTo(ref.current, { clipPath: clip }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
      gsap.fromTo(inner.current, { scale: 1.35 }, {
        scale: 1, duration: 2, ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
      if (parallax) {
        gsap.fromTo(inner.current, { yPercent: -parallax / 2 }, {
          yPercent: parallax / 2, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('relative overflow-hidden bg-ivory-2', className)}>
      <div ref={inner} className="relative w-full will-change-transform" style={{ height: `${100 + parallax}%`, top: `-${parallax / 2}%` }}>
        {children}
      </div>
    </div>
  )
}
