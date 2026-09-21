import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Container } from '@/components/shared/Container'
import { Parallax } from '@/components/shared/Parallax'
import { useReveal } from '@/hooks/useReveal'
import type { Crumb } from '@/utils/schema'

/**
 * Page anatomy steps 1-2 (CONTENT-REVAMP-REVIEW.md §5): an H1 carrying the
 * discipline plus its geography, then a short sourced definition.
 *
 * Every inner page opens the way the home page does: a full-bleed photograph
 * under a dark wash, one centred headline in cream, the second clause of it
 * dimmed so the eye lands on the first. The breadcrumb sits in the top-left
 * corner of the picture; the metrics follow on paper as a ruled row.
 */
export function PageHero({
  eyebrow,
  title,
  muted,
  definition,
  crumbs,
  meta,
  media = '/media/infrastructure-fiber.jpg',
  mediaAlt = '',
}: {
  eyebrow: string
  title: string
  /** Optional second clause of the title, rendered at reduced contrast. */
  muted?: string
  definition: string
  crumbs: Crumb[]
  meta?: { label: string; value: string }[]
  media?: string
  mediaAlt?: string
}) {
  const ref = useReveal<HTMLDivElement>([title])
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const media = el.querySelector('[data-hero-media]')
    const items = el.querySelectorAll('[data-hero-item]')
    if (!media) return
    if (prefersReducedMotion()) {
      gsap.set([media, ...items], { opacity: 1, y: 0, scale: 1 })
      return
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.fromTo(media, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.6 }, 0).fromTo(
      items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 },
      0.3,
    )
    return () => {
      tl.kill()
    }
  }, [title])

  return (
    <>
      <Block ref={root} isDark className="min-h-[82svh] w-full overflow-clip bg-ink text-cream" ariaLabel={title}>
        <Parallax distance={140} className="absolute inset-0 z-0">
          <div data-hero-media className="relative h-full w-full opacity-0">
            <img
              src={media}
              alt={mediaAlt}
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-ink/50" aria-hidden="true" />
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/70 to-transparent"
              aria-hidden="true"
            />
          </div>
        </Parallax>

        <div className="margin-px-1 relative z-1 flex min-h-[82svh] flex-col pb-14 pt-28 md:pb-20 md:pt-32">
          <nav aria-label="Breadcrumb" data-hero-item className="opacity-0">
            <ol className="flex flex-wrap items-center gap-2 text-11 text-cream/60">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-cream">
                      {c.name}
                    </span>
                  ) : (
                    <Link to={c.path} className="transition-colors hover:text-cream">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-1 flex-col items-center justify-center gap-7 py-16 text-center md:gap-8">
            <span data-hero-item className="chip chip--line-dark text-13 opacity-0">
              {eyebrow}
            </span>
            <h1 data-hero-item className="md:span-w-10 max-w-5xl text-36 opacity-0 md:text-60">
              {title}
              {muted && (
                <>
                  {' '}
                  <span className="text-cream/50">{muted}</span>
                </>
              )}
            </h1>
            <p data-hero-item className="md:span-w-6 max-w-2xl text-14 leading-[1.5] text-cream/75 opacity-0 md:text-16">
              {definition}
            </p>
          </div>
        </div>
      </Block>

      {meta && meta.length > 0 && (
        <div ref={ref} className="border-b border-ink/12">
          <Container>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-4 md:py-10" data-reveal>
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-11 text-grey">{m.label}</dt>
                  <dd className="u-num mt-2 text-16 md:text-21">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      )}
    </>
  )
}
