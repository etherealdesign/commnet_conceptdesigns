import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SectionHead } from '@/components/shared/SectionHead'
import { Indicator } from '@/components/shared/Indicator'
import { process } from '@/data/home'
import { cn } from '@/lib/utils'

/**
 * Not pinned. As the list scrolls between 55 % and 45 % of the viewport,
 * a position `t` runs from -1 to n; the item nearest `t` is the one in
 * play: it steps right 48 px (quickTo, back-out), the others fall back to
 * 30 % and rest. A square flies to the item in play with the overshoot
 * curve, and the photograph beside the list - sticky - crossfades to that
 * stage's picture.
 */
export function Process() {
  const root = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState<number | null>(null)
  const [markerY, setMarkerY] = useState<number | null>(null)
  const n = process.steps.length
  const still = prefersReducedMotion()

  useEffect(() => {
    const el = list.current
    const els = items.current.filter(Boolean) as HTMLLIElement[]
    if (!el || !els.length || still) return
    const movers = els.map((it) => gsap.quickTo(it, 'x', { duration: 0.5, ease: 'power2.out' }))
    const faders = els.map((it) => gsap.quickTo(it, 'opacity', { duration: 0.4, ease: 'power2.out' }))
    let current = -1
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 55%',
      end: 'bottom 45%',
      onUpdate: (self) => {
        const t = self.progress * (n - 1 + 2) - 1
        let best = -1
        let bestD = Infinity
        els.forEach((_, i) => {
          const d = Math.abs(i - t)
          if (d < bestD) {
            bestD = d
            best = i
          }
          movers[i](d < 0.5 ? 24 : 0)
          faders[i](d < 0.5 ? 1 : 0.55)
        })
        if (bestD > 0.75) best = -1
        if (best !== current) {
          current = best
          setActive(best >= 0 ? best : null)
        }
      },
      onLeave: () => {
        els.forEach((_, i) => {
          movers[i](0)
          faders[i](0.55)
        })
        current = -1
        setActive(null)
      },
      onLeaveBack: () => {
        els.forEach((_, i) => {
          movers[i](0)
          faders[i](0.55)
        })
        current = -1
        setActive(null)
      },
    })
    gsap.set(els, { opacity: 0.55 })
    return () => st.kill()
  }, [n, still])

  useEffect(() => {
    if (active === null || !list.current) {
      setMarkerY(null)
      return
    }
    const it = items.current[active]
    if (!it) return
    const a = it.getBoundingClientRect()
    const b = list.current.getBoundingClientRect()
    setMarkerY(a.top - b.top + 14)
  }, [active])

  const shown = active ?? 0

  return (
    <Block ref={root} anchor="method" className="theme-light py-24 md:py-32" ariaLabel="How we deliver">
      <div className="grid-container">
        <SectionHead title={process.title} label={process.label} indent />
        <div className="grid-layout mt-16 gap-y-10 md:mt-24">
          <ol ref={list} className="grid-span-12 lg:grid-span-5 lg:grid-start-3 relative flex flex-col gap-10 py-[10vh]">
            <Indicator y={markerY} visible={active !== null} className="-left-8 hidden lg:block" size={8} />
            {process.steps.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  items.current[i] = el
                }}
                className={cn('grid grid-cols-[2rem_1fr] gap-x-4 will-change-transform', still && 'opacity-100')}
              >
                <span className="mono pt-1 text-fg-muted">0{i + 1}</span>
                <div>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="t-body mt-2 max-w-md text-fg-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure className="grid-span-12 lg:grid-span-4 lg:grid-start-8 relative aspect-[4/5] w-full overflow-clip bg-card lg:sticky lg:top-28 lg:self-start">
            {process.steps.map((s, i) => (
              <img
                key={s.photo + i}
                src={s.photo}
                alt=""
                loading="lazy"
                decoding="async"
                className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out', i === shown ? 'opacity-100' : 'opacity-0')}
              />
            ))}
          </figure>
        </div>
      </div>
    </Block>
  )
}
