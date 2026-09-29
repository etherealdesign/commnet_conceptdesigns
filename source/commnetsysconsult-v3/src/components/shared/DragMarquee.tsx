import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, Observer, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'

/**
 * An endless strip that drifts on its own, speeds up with the page scroll
 * and can be grabbed and thrown. The children are rendered twice; the
 * track's x is wrapped modulo half its width so it never runs out.
 *
 * Velocity, not position, is what scroll and drag feed in, so a fast
 * flick of the wheel gives a burst that decays back to the idle drift
 * instead of a jump.
 */
export function DragMarquee({
  children,
  className,
  itemClassName,
  speed = 0.6,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  itemClassName?: string
  /** idle px per frame at 60fps */
  speed?: number
  ariaLabel: string
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const w = wrap.current
    const t = track.current
    if (!w || !t) return
    if (prefersReducedMotion()) return

    let x = 0
    let velocity = 0
    let half = t.scrollWidth / 2
    const wrapX = gsap.utils.wrap(-half, 0)
    const idle = speed

    const measure = () => {
      half = t.scrollWidth / 2
    }
    const ro = new ResizeObserver(measure)
    ro.observe(t)

    const tick = () => {
      velocity += (idle - velocity) * 0.04
      x = wrapX(x - velocity)
      t.style.transform = `translate3d(${x}px,0,0)`
    }
    gsap.ticker.add(tick)

    // scroll velocity gives the strip a shove in the direction of travel
    const st = ScrollTrigger.create({
      trigger: w,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity() / 200
        velocity += gsap.utils.clamp(-40, 40, v) * 0.08
      },
    })

    const obs = Observer.create({
      target: w,
      type: 'pointer,touch',
      dragMinimum: 3,
      onPress: () => {
        w.dataset.dragging = ''
        document.body.classList.add('global-grabbing')
      },
      onDrag: (self) => {
        velocity = -self.deltaX
      },
      onRelease: () => {
        delete w.dataset.dragging
        document.body.classList.remove('global-grabbing')
      },
    })

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      obs.kill()
      ro.disconnect()
      document.body.classList.remove('global-grabbing')
    }
  }, [speed])

  return (
    <div
      ref={wrap}
      className={cn('group cursor-grab touch-pan-y overflow-clip', className)}
      aria-label={ariaLabel}
      role="region"
    >
      <div ref={track} className="flex w-max will-change-transform">
        <div className={cn('flex', itemClassName)}>{children}</div>
        <div className={cn('flex', itemClassName)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
