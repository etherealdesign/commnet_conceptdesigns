import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Arrow } from '@/components/shared/Button'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'

/**
 * Axis A. The left panel holds still while the five systems scroll past
 * on the right; whichever is nearest the centre of the screen is live: its
 * title at full weight, its scope open, its photograph and summary on the
 * panel, the progress bar at its number. The others sit collapsed and
 * dimmed above and below it.
 */
export function SystemsStack() {
  const [active, setActive] = useState(0)
  const itemsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const triggers = itemsRef.current.map((el, i) =>
      el
        ? ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          })
        : null,
    )
    return () => triggers.forEach((t) => t?.kill())
  }, [])

  const n = services.length

  return (
    <Block section="What we install" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <SectionLabel index={3} aside={`${n} systems · Axis A`}>
        What we install
      </SectionLabel>

      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-6">
        {/* pinned panel */}
        <div className="hidden lg:block">
          <div className="sticky top-6 flex h-[calc(100svh-3rem)] flex-col overflow-clip rounded-[var(--r-frame)] bg-ink text-white">
            {services.map((s, i) => (
              <img
                key={s.slug}
                src={s.media}
                alt=""
                loading="lazy"
                decoding="async"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-[var(--ease-expo)]',
                  i === active ? 'scale-100 opacity-70' : 'scale-105 opacity-0',
                )}
              />
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/20 to-ink/30" aria-hidden="true" />

            <div className="relative mt-auto p-8">
              <p className="mono bullet text-white/80">Axis A · Systems</p>
              <p className="d-2 mt-4">{services[active].title}</p>
              <p className="mt-3 max-w-md text-14 text-white/75">{services[active].summary}</p>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-13 font-medium text-white/80">
                  {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </span>
                <span className="relative h-0.5 flex-1 rounded-full bg-white/25">
                  <span className="absolute inset-y-0 left-0 rounded-full bg-white transition-[width] duration-700 ease-[var(--ease-expo)]" style={{ width: `${((active + 1) / n) * 100}%` }} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* stack */}
        <ol>
          {services.map((s, i) => {
            const live = i === active
            return (
              <li
                key={s.slug}
                ref={(el) => {
                  itemsRef.current[i] = el
                }}
                className={cn(
                  'border-t border-ink/12 py-8 transition-opacity duration-700 lg:min-h-[52svh] lg:py-10',
                  !live && 'lg:opacity-40',
                )}
              >
                <div className="grid gap-4 md:grid-cols-[4rem_1fr] md:gap-6">
                  <span className="mono pt-2 text-grey">{s.code}</span>
                  <div>
                    <Link to={`/services/${s.slug}`} className="group inline-block">
                      <h3 className="d-2 transition-colors duration-500 group-hover:text-primary">{s.title}</h3>
                    </Link>

                    {/* mobile photo */}
                    <img src={s.media} alt={s.mediaAlt} loading="lazy" decoding="async" className="mt-6 aspect-[16/9] w-full rounded-[var(--r-card)] object-cover lg:hidden" />

                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)]',
                        live ? 'grid-rows-[1fr]' : 'grid-rows-[1fr] lg:grid-rows-[0fr]',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-6 max-w-lg text-16 text-grey">{s.summary}</p>
                        <p className="mt-5 max-w-lg text-14 font-medium text-ink">{s.evidence}</p>
                        <ul className="mt-6 flex flex-wrap gap-1.5">
                          {s.deliver.slice(0, 4).map((d) => (
                            <li key={d.title} className="chip chip--tint">
                              {d.title}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8 flex items-center justify-between gap-6 border-t border-ink/12 pt-4">
                          <span className="text-13 text-grey">
                            {s.count} of 18 contracts
                          </span>
                          <Link to={`/services/${s.slug}`} className="group inline-flex items-center gap-2 text-14 font-medium text-primary">
                            What we deliver
                            <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </Block>
  )
}
