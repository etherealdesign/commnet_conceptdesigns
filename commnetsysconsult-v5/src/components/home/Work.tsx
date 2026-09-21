import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollTrigger } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { useLenis } from '@/components/shared/SmoothScroll'
import { projectBySlug, type Project } from '@/data/projects'
import { work } from '@/data/home'
import { cn } from '@/lib/utils'

/**
 * Dark ground. A sticky column on the left - title, a line of context,
 * a strip of thumbnails with a square beside the one in view, and the
 * button to the full register - and on the right the contracts stacked
 * at full width, each with its name and its mono meta line underneath.
 */
export function Work() {
  const ref = useReveal<HTMLElement>()
  const lenis = useLenis()
  const items = work.slugs.map(projectBySlug).filter(Boolean) as Project[]
  const [active, setActive] = useState(0)
  const cards = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const triggers = cards.current.map((el, i) =>
      el
        ? ScrollTrigger.create({ trigger: el, start: 'top center', end: 'bottom center', onEnter: () => setActive(i), onEnterBack: () => setActive(i) })
        : null,
    )
    return () => triggers.forEach((t) => t?.kill())
  }, [items.length])

  const jump = (i: number) => {
    const el = cards.current[i]
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -120, duration: 1.2 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Block ref={ref} anchor="projects" isDark className="theme-dark py-24 md:py-32" ariaLabel="Selected contracts">
      <div className="grid-container">
        <div className="grid-layout gap-y-12">
          <div className="grid-span-12 lg:grid-span-4">
            <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:min-h-[calc(100svh-9rem)] lg:justify-between">
              <div>
                <h2 data-reveal className="t-h2">
                  {work.title}
                </h2>
                <p data-reveal className="t-body mt-6 max-w-xs text-fg-muted">
                  {work.lead}
                </p>
              </div>
              <ul className="hidden flex-col gap-2 lg:flex" aria-label="Jump to contract">
                {items.map((p, i) => (
                  <li key={p.slug} className="flex items-center gap-4">
                    <button type="button" onClick={() => jump(i)} className="block h-16 w-32 cursor-pointer overflow-clip bg-card" aria-label={p.name}>
                      <img src={work.media[p.environmentSlug]} alt="" className={cn('h-full w-full object-cover transition-opacity duration-500', i === active ? 'opacity-100' : 'opacity-50 hover:opacity-80')} loading="lazy" />
                    </button>
                    <span className={cn('sq size-2 transition-opacity duration-300', i === active ? 'opacity-100' : 'opacity-0')} aria-hidden="true" />
                  </li>
                ))}
              </ul>
              <div data-reveal>
                <Button to="/projects">View all</Button>
              </div>
            </div>
          </div>

          <div className="grid-span-12 lg:grid-span-8 flex flex-col gap-16 md:gap-24">
            {items.map((p, i) => (
              <article
                key={p.slug}
                ref={(el) => {
                  cards.current[i] = el
                }}
                data-reveal
              >
                <Link to={`/projects/${p.slug}`} className="group block">
                  <div className="aspect-[16/10] w-full overflow-clip bg-card">
                    <img
                      src={work.media[p.environmentSlug]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="mono mono-lg">{p.name}</h3>
                    <p className="mono text-fg-muted">
                      [{p.sector}] — [{p.quantities.split(' · ')[0]}]{p.prime && ` — [via ${p.prime}]`}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Block>
  )
}
