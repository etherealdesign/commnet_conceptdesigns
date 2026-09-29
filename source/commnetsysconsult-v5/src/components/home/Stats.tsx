import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SlotNumber } from '@/components/shared/SlotNumber'
import { stats } from '@/data/home'

/**
 * Cards rise from 25 % below with a 1 s expo-out, 0.1 s apart, the moment
 * the row reaches the bottom of the viewport; the digits inside them roll
 * once the cards are up.
 */
export function Stats() {
  const root = useRef<HTMLElement>(null)
  const cards = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    const items = cards.current.filter(Boolean)
    if (!el || !items.length || prefersReducedMotion()) return
    gsap.set(items, { yPercent: 25, opacity: 0 })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      once: true,
      onEnter: () => gsap.to(items, { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.1 }),
    })
    return () => st.kill()
  }, [])

  return (
    <Block ref={root} className="theme-light py-24 md:py-32" ariaLabel="Scale from the register">
      <div className="grid-container">
        <div className="grid-layout gap-y-4">
          <figure
            ref={(el) => {
              cards.current[0] = el
            }}
            className="grid-span-12 md:grid-span-3 aspect-[4/5] overflow-clip bg-card will-change-transform"
          >
            <img src={stats.photo} alt={stats.photoAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </figure>
          {stats.items.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => {
                cards.current[i + 1] = el
              }}
              className="grid-span-12 md:grid-span-3 flex aspect-[4/5] flex-col justify-between bg-card p-8 will-change-transform"
            >
              <SlotNumber value={s.value} className="t-stat" delay={0.4 + i * 0.1} />
              <p className="mono">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Block>
  )
}
