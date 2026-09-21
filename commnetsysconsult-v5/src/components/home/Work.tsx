import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { AnimatedHeadline } from '@/components/shared/AnimatedHeadline'
import { AnimatedSubtext } from '@/components/shared/AnimatedSubtext'
import { Indicator } from '@/components/shared/Indicator'
import { Scramble } from '@/components/shared/Scramble'
import { useLenis } from '@/components/shared/SmoothScroll'
import { projectBySlug, type Project } from '@/data/projects'
import { work } from '@/data/home'
import { cn } from '@/lib/utils'

/**
 * Sticky column on the left, contracts stacked on the right. Which one is
 * in view is decided by an IntersectionObserver at 50 % with a 20 %
 * margin top and bottom, and the square beside the thumbnails flies to
 * it. Each photograph is scaled to 1.3 and drifts from -15 % to +15 % as
 * its frame crosses the viewport, so it moves slower than the page.
 */
export function Work() {
  const lenis = useLenis()
  const items = work.slugs.map(projectBySlug).filter(Boolean) as Project[]
  const [active, setActive] = useState(0)
  const [markerY, setMarkerY] = useState<number | null>(null)
  const cards = useRef<(HTMLElement | null)[]>([])
  const imgs = useRef<(HTMLImageElement | null)[]>([])
  const thumbs = useRef<(HTMLLIElement | null)[]>([])
  const thumbList = useRef<HTMLUListElement>(null)
  const still = prefersReducedMotion()

  useEffect(() => {
    const observers = cards.current.map((el, i) => {
      if (!el) return null
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && e.intersectionRatio >= 0.5 && setActive(i)),
        { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' },
      )
      io.observe(el)
      return io
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [items.length])

  useEffect(() => {
    if (still || window.matchMedia('(max-width: 1023px)').matches) return
    const ctx = gsap.context(() => {
      imgs.current.forEach((img) => {
        if (!img) return
        gsap.set(img, { scale: 1.3 })
        gsap.fromTo(img, { yPercent: -15 }, { yPercent: 15, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })
      })
    })
    return () => ctx.revert()
  }, [still])

  useEffect(() => {
    const t = thumbs.current[active]
    const l = thumbList.current
    if (!t || !l) return
    const a = t.getBoundingClientRect()
    const b = l.getBoundingClientRect()
    setMarkerY(a.top - b.top + a.height / 2 - 4)
  }, [active])

  const jump = (i: number) => {
    const el = cards.current[i]
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -120, duration: 1.2 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Block anchor="projects" isDark className="theme-dark py-24 md:py-32" ariaLabel="Selected contracts">
      <div className="grid-container">
        <div className="grid-layout gap-y-12">
          <div className="grid-span-12 lg:grid-span-4">
            <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:min-h-[calc(100svh-9rem)] lg:justify-between">
              <div>
                <AnimatedHeadline as="h2" trigger="scroll" className="t-h2">
                  {work.title}
                </AnimatedHeadline>
                <AnimatedSubtext trigger="scroll" className="t-body mt-6 max-w-xs text-fg-muted">
                  {work.lead}
                </AnimatedSubtext>
              </div>
              <ul ref={thumbList} className="relative hidden flex-col gap-2 lg:flex" aria-label="Jump to contract">
                <Indicator y={markerY} visible={markerY !== null} className="left-[calc(8rem+1rem)]" size={8} />
                {items.map((p, i) => (
                  <li
                    key={p.slug}
                    ref={(el) => {
                      thumbs.current[i] = el
                    }}
                    className="flex items-center gap-4"
                  >
                    <button type="button" onClick={() => jump(i)} className="block h-16 w-32 cursor-pointer overflow-clip bg-card" aria-label={p.name}>
                      <img src={work.media[p.environmentSlug]} alt="" className={cn('h-full w-full object-cover transition-opacity duration-500', i === active ? 'opacity-100' : 'opacity-50 hover:opacity-80')} loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
              <div>
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
              >
                <Link to={`/projects/${p.slug}`} className="group block">
                  <div className="aspect-[16/10] w-full overflow-clip bg-card">
                    <img
                      ref={(el) => {
                        imgs.current[i] = el
                      }}
                      src={work.media[p.environmentSlug]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover will-change-transform"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="mono mono-lg"><Scramble text={p.name} onHover /></h3>
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
