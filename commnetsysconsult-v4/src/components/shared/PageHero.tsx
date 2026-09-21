import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import type { Crumb } from '@/utils/schema'

/**
 * Page anatomy steps 1-2 (CONTENT-REVAMP-REVIEW.md §5): an H1 carrying the
 * discipline plus its geography, then a short sourced definition.
 *
 * A white band: breadcrumb, the H1 with its second clause dimmed, the
 * definition beside it, and the page's key figures as a ruled strip.
 */
export function PageHero({
  eyebrow,
  title,
  muted,
  definition,
  crumbs,
  meta,
}: {
  eyebrow: string
  index?: number
  title: string
  /** Optional second clause of the title, rendered at reduced contrast. */
  muted?: string
  definition: string
  crumbs: Crumb[]
  meta?: { label: string; value: string }[]
}) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const lines = el.querySelectorAll<HTMLElement>('[data-hero-line]')
    const items = el.querySelectorAll<HTMLElement>('[data-hero-item]')
    if (prefersReducedMotion()) {
      gsap.set([...lines, ...items], { opacity: 1, y: 0, yPercent: 0 })
      return
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.fromTo(lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.08 }, 0.15)
      .fromTo(items, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, stagger: 0.06 }, 0.5)
    return () => {
      tl.kill()
    }
  }, [title])

  return (
    <Block ref={root} section={crumbs[crumbs.length - 1]?.name ?? title} className="margin-px-1 border-b border-ink/10 bg-white pb-10 pt-28 md:pb-14 md:pt-36">
      <nav aria-label="Breadcrumb" data-hero-item className="opacity-0">
        <ol className="flex flex-wrap items-center gap-2 text-13 text-grey">
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

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <p data-hero-item className="mono bullet mb-5 text-grey opacity-0">
            {eyebrow}
          </p>
          <h1 className="d-hero" style={{ fontSize: 'var(--d-1)' }}>
            <span className="block overflow-clip">
              <span data-hero-line className="block opacity-0">
                {title}
              </span>
            </span>
            {muted && (
              <span className="block overflow-clip">
                <span data-hero-line className="block text-grey opacity-0">
                  {muted}
                </span>
              </span>
            )}
          </h1>
        </div>
        <p data-hero-item className="max-w-md text-16 text-grey opacity-0 md:col-span-4 md:col-start-9 md:self-end">
          {definition}
        </p>
      </div>

      {meta && meta.length > 0 && (
        <dl data-hero-item className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/10 pt-6 opacity-0 md:mt-16 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="mono text-grey">{m.label}</dt>
              <dd className="d-3 mt-2">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Block>
  )
}
