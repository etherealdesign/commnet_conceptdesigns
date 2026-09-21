import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { AsciiImage } from '@/components/ui/ascii-image'
import { useReveal } from '@/hooks/useReveal'
import type { Crumb } from '@/utils/schema'

/**
 * Page anatomy steps 1-2 (CONTENT-REVAMP-REVIEW.md §5): the H1 with its
 * geography and the sourced definition. Every inner page opens the way the
 * home page does: dark ground, the title at display size with its second
 * clause dimmed, the page's photograph rendered as glyphs on the right,
 * and the metrics following as a ruled mono row on the light ground.
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
  muted?: string
  definition: string
  crumbs: Crumb[]
  meta?: { label: string; value: string }[]
  media?: string
  mediaAlt?: string
}) {
  const ref = useReveal<HTMLElement>([title])
  return (
    <>
      <Block ref={ref} isDark className="theme-dark relative overflow-clip pb-16 pt-36 md:pb-24 md:pt-44">
        <div className="grid-container relative">
          <nav aria-label="Breadcrumb" className="mono mb-12 text-fg-muted" data-reveal>
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-fg-light">{c.name}</span>
                  ) : (
                    <Link to={c.path} className="transition-colors hover:text-fg-light">{c.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid-layout gap-y-8">
            <div className="grid-span-12 lg:grid-span-7 relative z-1 flex flex-col gap-8">
              <p data-reveal className="label">
                {eyebrow}
              </p>
              <h1 data-reveal className="t-display max-w-[14ch]">
                {title}
                {muted && <span className="text-fg-muted"> {muted}</span>}
              </h1>
              <p data-reveal className="t-body max-w-xl text-fg-muted">
                {definition}
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block" aria-hidden="true">
          <AsciiImage src={media} alt={mediaAlt} cell={8} accentShare={0.28} floor={0.16} interactive={false} className="absolute inset-0" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-dark to-transparent" />
        </div>
      </Block>

      {meta && meta.length > 0 && (
        <div className="theme-light border-b border-line">
          <dl className="grid-container grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="mono text-fg-muted">{m.label}</dt>
                <dd className="t-h3 u-num mt-2 font-normal">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  )
}
