import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { repeat, work } from '@/data/home'
import { projectBySlug } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * The strongest reference on the site, stated plainly: the same prime came
 * back three times. Three ledger entries, in sequence, each a register
 * record.
 */
export function Repeat({ index = 7 }: { index?: number }) {
  const ref = useReveal<HTMLElement>()
  const items = repeat.slugs.map(projectBySlug).filter(Boolean) as NonNullable<ReturnType<typeof projectBySlug>>[]

  return (
    <Block ref={ref} section={repeat.label} className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <SectionLabel index={index} aside="Client of record: GBM">
        {repeat.label}
      </SectionLabel>

      <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h2 className="d-1">
            {repeat.lines.map((l, i) => (
              <span key={i} className="block">
                <span dangerouslySetInnerHTML={{ __html: l }} />
              </span>
            ))}
          </h2>
          <p data-reveal className="mt-8 max-w-sm text-16 text-grey">
            {repeat.body}
          </p>
        </div>

        <ol className="grid gap-3 md:col-span-7 md:grid-cols-3">
          {items.map((p, i) => {
            const tone = ['bg-tint text-ink', 'bg-ink text-white', 'bg-stone text-ink'][i % 3]
            const muted = i === 1 ? 'text-white/60' : 'text-grey'
            return (
              <li key={p.slug} data-reveal>
                <Link
                  to={`/projects/${p.slug}`}
                  className={cn('group flex h-full min-h-80 flex-col rounded-[var(--r-card)] p-5 transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-1', tone)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative size-16 overflow-clip rounded-[var(--r-ctl)]">
                      <img src={work.media[p.environmentSlug]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                    <span className={cn('mono', muted)}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="mt-auto flex flex-col gap-2 pt-10">
                    <span className={cn('mono', muted)}>via {p.prime}</span>
                    <h3 className="d-3">{p.name}</h3>
                    <p className={cn('text-14', muted)}>{p.quantities}</p>
                    <p className={cn('mono flex items-center justify-between gap-3 pt-3', muted)}>
                      {p.duration}
                      <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </Block>
  )
}
