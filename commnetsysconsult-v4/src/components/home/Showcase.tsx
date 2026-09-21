import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Arrow } from '@/components/shared/Button'
import { showcase, work } from '@/data/home'
import { projectBySlug } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * Four register entries on one stage. The stage holds the viewport while
 * the section scrolls through four screens' worth of travel; each entry
 * takes a quarter of it. The photograph drifts across as its quarter
 * plays, the spec strip beneath swaps to the next entry at the boundary.
 * It reads like a piece of kit being turned over for inspection.
 */
export function Showcase() {
  const outer = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const items = showcase.slugs.map(projectBySlug).filter(Boolean) as NonNullable<ReturnType<typeof projectBySlug>>[]
  const n = items.length

  useEffect(() => {
    const el = outer.current
    if (!el || prefersReducedMotion()) return
    const imgs = el.querySelectorAll<HTMLElement>('[data-stage-img]')
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress * n
          const i = Math.min(n - 1, Math.floor(p))
          const local = p - i
          setActive(i)
          imgs.forEach((img, k) => {
            gsap.set(img, { xPercent: k === i ? -4 + local * 8 : k < i ? 4 : -4, scale: 1.08 })
          })
        },
      })
    }, el)
    return () => ctx.revert()
  }, [n])

  return (
    <Block isDark section={showcase.label} className="px-4 py-4 md:px-6 md:py-6">
      <div ref={outer} style={{ height: `${n * 100}svh` }} className="relative">
        <div className="sticky top-4 flex h-[calc(100svh-2rem)] flex-col overflow-clip rounded-[var(--r-frame)] bg-ink text-white md:top-6 md:h-[calc(100svh-3rem)]">
          {/* stage */}
          {items.map((p, i) => (
            <div
              key={p.slug}
              className={cn(
                'absolute inset-0 transition-opacity duration-700',
                i === active ? 'opacity-100' : 'opacity-0',
              )}
            >
              <img
                data-stage-img
                src={work.media[p.environmentSlug]}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-transparent to-ink/70" aria-hidden="true" />

          <div className="relative flex h-full flex-col justify-between p-6 pb-8 pt-24 md:p-10 md:pt-28">
            <SectionLabel index={5} dark aside={`${n} of 18 contracts`}>
              {showcase.label}
            </SectionLabel>

            {/* spec strip */}
            <div>
              <div className="grid gap-4 rounded-[var(--r-card)] border border-white/15 bg-ink/40 p-5 backdrop-blur-md md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.4fr)_8rem] md:items-start md:gap-6 md:p-6">
                <div className="grid overflow-clip">
                  {items.map((p, i) => (
                    <Link
                      key={p.slug}
                      to={`/projects/${p.slug}`}
                      aria-hidden={i !== active}
                      tabIndex={i === active ? 0 : -1}
                      className={cn(
                        'd-3 group col-start-1 row-start-1 inline-flex items-start gap-3 transition-[opacity,transform] duration-700 ease-[var(--ease-expo)]',
                        i === active ? 'translate-y-0 opacity-100' : i < active ? '-translate-y-6 opacity-0' : 'translate-y-6 opacity-0',
                      )}
                    >
                      {p.name}
                      <Arrow className="mt-1 size-5 shrink-0 -rotate-45 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  ))}
                </div>
                <p className="text-14 text-white/75">
                  {items[active].environment}
                  <br />
                  {items[active].location} · {items[active].duration}
                  {items[active].prime && ` · via ${items[active].prime}`}
                </p>
                <p className="text-14 font-medium text-white">{items[active].quantities}</p>
                <p className="text-14 md:text-right">
                  <span className="font-medium text-white">{String(active + 1).padStart(2, '0')}</span>
                  <span className="text-white/50"> / {String(n).padStart(2, '0')}</span>
                </p>
              </div>
              <div className="mt-4 flex gap-1.5 px-1" aria-hidden="true">
                {items.map((p, i) => (
                  <span key={p.slug} className={cn('h-1 flex-1 rounded-full transition-colors duration-500', i <= active ? 'bg-white' : 'bg-white/25')} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Block>
  )
}
