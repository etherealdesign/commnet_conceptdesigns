import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import type { Crumb } from '@/utils/schema'

/**
 * Page anatomy steps 1-2 (CONTENT-REVAMP-REVIEW.md §5): an H1 carrying the
 * discipline plus its geography, then a short sourced definition.
 *
 * Every inner page opens on paper: the breadcrumb, the headline left with
 * its second clause in grey, the definition in the last columns, and the
 * photograph underneath as a wide plate rather than behind the words. The
 * measured facts follow as a ruled row.
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
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const plate = el.querySelector('[data-hero-media]')
    const items = el.querySelectorAll('[data-hero-item]')
    if (prefersReducedMotion()) {
      gsap.set([plate, ...items].filter(Boolean), { opacity: 1, y: 0, scale: 1 })
      return
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.fromTo(items, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.1)
    if (plate) tl.fromTo(plate, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1.3 }, 0.25)
    return () => {
      tl.kill()
    }
  }, [title])

  return (
    <Block ref={root} className="margin-px-1 pb-14 pt-28 md:pb-20 md:pt-32" ariaLabel={title}>
      <nav aria-label="Breadcrumb" data-hero-item className="opacity-0">
        <ol className="flex flex-wrap items-center gap-2 text-11 text-grey">
          {crumbs.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === crumbs.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <Link to={c.path} className="transition-colors hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <p data-hero-item className="mt-10 text-13 text-grey opacity-0 md:mt-14">
        {eyebrow}
      </p>

      <div className="mt-4 grid items-end gap-8 md:grid-cols-12 md:gap-6">
        <h1 data-hero-item className="text-36 opacity-0 md:col-span-8 md:text-60">
          {title}
          {muted && (
            <>
              {' '}
              <span className="text-grey">{muted}</span>
            </>
          )}
        </h1>
        <p data-hero-item className="text-13 text-grey opacity-0 md:col-span-4 md:text-16">
          {definition}
        </p>
      </div>

      <div data-hero-media className="tile mt-12 aspect-[3/2] w-full opacity-0 after:hidden md:mt-16 md:aspect-[21/9]">
        <img
          src={media}
          alt={mediaAlt}
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {meta && meta.length > 0 && (
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/12 pt-8 sm:grid-cols-4 md:mt-16">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-11 text-grey">{m.label}</dt>
              <dd className="u-num mt-2 text-21 md:text-25">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Block>
  )
}
