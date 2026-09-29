import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { environments } from '@/data/home'
import { solutions } from '@/data/solutions'
import { projectsByEnvironment } from '@/data/projects'
import { serviceByCode } from '@/data/services'

/**
 * Axis B: the statement, then the six environments as cards, each with
 * its photograph, what it is, the systems it consumes and the evidence
 * count.
 */
export function Environments() {
  const ref = useReveal<HTMLElement>()

  return (
    <Block ref={ref} section={environments.label} className="margin-px-1 border-t border-ink/10 bg-paper py-20 md:py-28">
      <SectionLabel index={4} aside={`${solutions.length} environments · Axis B`}>
        {environments.label}
      </SectionLabel>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-6">
        <h2 className="d-1 md:col-span-7" data-reveal>
          {environments.words[0]} {environments.words[1]} <strong>{environments.words[2]}</strong>
        </h2>
        <p data-reveal className="max-w-md text-16 text-grey md:col-span-4 md:col-start-9 md:self-end">
          {environments.body}
        </p>
      </div>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
        {solutions.map((s) => {
          const count = projectsByEnvironment(s.slug).length
          return (
            <li key={s.slug} data-reveal>
              <Link
                to={`/solutions/${s.slug}`}
                className="group flex h-full flex-col overflow-clip rounded-[var(--r-card)] border border-ink/10 bg-white transition-[transform,box-shadow] duration-700 ease-[var(--ease-expo)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(11,26,46,0.35)]"
              >
                <div className="relative aspect-[16/9] overflow-clip bg-ink">
                  <img
                    src={s.media}
                    alt={s.mediaAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-105"
                  />
                  <span className="chip chip--tint absolute left-4 top-4">
                    {count} project{count === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="mono text-grey">{s.code}</p>
                  <h3 className="d-3 transition-colors duration-500 group-hover:text-primary">{s.title}</h3>
                  <p className="text-14 text-grey">{s.summary}</p>
                  <p className="mt-auto flex items-center justify-between gap-3 border-t border-ink/10 pt-4 text-13 text-grey">
                    <span>{s.uses.map((c) => serviceByCode(c)?.title.split(' & ')[0].split(',')[0]).join(' · ')}</span>
                    <Arrow className="size-4 shrink-0 text-ink transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </Block>
  )
}
