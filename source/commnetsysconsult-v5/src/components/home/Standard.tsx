import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SectionHead } from '@/components/shared/SectionHead'
import { Scramble } from '@/components/shared/Scramble'
import { standard } from '@/data/home'

/**
 * Light ground. Strap line with a pulsing square, then six points that
 * rise from 25 % below, 1 s expo-out, 0.1 s apart. Titles resolve out of
 * noise on arrival and again on hover.
 */
export function Standard() {
  const grid = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const el = grid.current
    if (!el || prefersReducedMotion()) return
    const items = el.children
    gsap.set(items, { yPercent: 25, opacity: 0 })
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', once: true, onEnter: () => gsap.to(items, { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.1 }) })
    return () => st.kill()
  }, [])

  return (
    <Block anchor="compliance" className="theme-light py-24 md:py-32" ariaLabel="What is in a contract">
      <div className="grid-container">
        <SectionHead title={standard.title} label={standard.label} />
        <p className="mono mt-10 flex items-center gap-3">
          <span className="sq sq--pulse" />
          <Scramble text={standard.strap} />
        </p>
        <ul ref={grid} className="grid-layout mt-16 gap-y-16 md:mt-24">
          {standard.items.map((it, i) => (
            <li key={it.title} className="grid-span-12 md:grid-span-6 lg:grid-span-4 flex flex-col gap-6 will-change-transform">
              <h3 className="mono">
                <Scramble text={it.title} onHover delay={i * 0.06} />
              </h3>
              <span className="block h-px w-full bg-line" aria-hidden="true" />
              <p className="t-body max-w-xs text-fg-muted">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  )
}
