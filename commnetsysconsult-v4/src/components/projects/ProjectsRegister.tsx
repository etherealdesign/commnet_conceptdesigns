import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { projects, SECTORS, type Sector } from '@/data/projects'
import { serviceByCode } from '@/data/services'
import { work } from '@/data/home'
import { cn } from '@/lib/utils'

/**
 * The full register as a schedule: one row per contract with the measured
 * quantity, the environment, the systems and the duration, filterable by
 * sector. A photograph follows the pointer over the rows. It is the page a
 * prequalification reviewer actually wants.
 */
export function ProjectsRegister() {
  const [sector, setSector] = useState<Sector | 'All'>('All')
  const [hover, setHover] = useState<string | null>(null)
  const list = sector === 'All' ? projects : projects.filter((p) => p.sector === sector)
  const ref = useReveal<HTMLElement>([sector])

  return (
    <Block ref={ref} section="The register" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <SectionLabel index={2} className="md:flex-1">
          <span className="u-num">
            {list.length} of {projects.length} contracts
          </span>
        </SectionLabel>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by sector">
          {SECTORS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSector(s)}
              aria-pressed={sector === s}
              className={cn(
                'chip cursor-pointer transition-colors duration-300',
                sector === s ? 'bg-ink text-white' : 'chip--line hover:bg-ink/5',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-10 md:mt-14">
        {/* header row */}
        <div className="mono hidden grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_7rem_3rem] gap-6 border-b border-ink/15 pb-3 text-grey md:grid" aria-hidden="true">
          <span>No.</span>
          <span>Contract</span>
          <span>Quantities</span>
          <span>Environment</span>
          <span>Systems</span>
          <span>Duration</span>
          <span />
        </div>

        <ol className="border-t border-ink/15 md:border-t-0">
          {list.map((p, i) => (
            <li key={p.slug} data-reveal onPointerEnter={() => setHover(p.slug)} onPointerLeave={() => setHover(null)}>
              <Link
                to={`/projects/${p.slug}`}
                className="group grid gap-2 border-b border-ink/12 py-5 rounded-[var(--r-card)] transition-colors duration-500 hover:bg-cream md:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_7rem_3rem] md:items-baseline md:gap-6 md:px-2 md:py-5"
              >
                <span className="text-13 text-grey">{String(projects.indexOf(p) + 1).padStart(2, '0')}</span>
                <span className="d-3 transition-colors duration-500 group-hover:text-primary">
                  {p.name}
                  {p.prime && <span className="chip chip--tint ml-3 align-middle">via {p.prime}</span>}
                </span>
                <span className="text-14 font-medium text-ink">{p.quantities}</span>
                <span className="text-14 text-grey">{p.environment}</span>
                <span className="text-13 text-grey">{p.systems.map((c) => serviceByCode(c)?.title.split(' & ')[0].split(',')[0]).join(' / ')}</span>
                <span className="text-14 text-grey">{p.duration}</span>
                <Arrow className="hidden size-5 justify-self-end transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1 md:block" />
                <img
                  src={work.media[p.environmentSlug]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'pointer-events-none absolute right-[8%] top-1/2 z-10 hidden aspect-[4/3] w-64 -translate-y-1/2 rounded-[var(--r-card)] object-cover shadow-2xl transition-[opacity,transform] duration-500 ease-[var(--ease-expo)] md:block',
                    hover === p.slug ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                  )}
                  style={{ top: `${((i + 0.5) / list.length) * 100}%` }}
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-6 max-w-xl text-13 text-grey">
        Contract values are held in the company profile and shared on request. For the eight contracts delivered under a
        main contractor, the value is the prime&rsquo;s commercial information rather than ours to publish.
      </p>
    </Block>
  )
}
