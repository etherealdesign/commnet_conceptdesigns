import { useState } from 'react'
import { Container } from '@/components/shared/Container'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { useReveal } from '@/hooks/useReveal'
import { projects, SECTORS, type Sector } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * The full register, filterable by sector. Filters are chips; the count
 * next to the heading updates so the page always says how much evidence
 * is on screen.
 */
export function ProjectsRegister({ showHeading = true, limit }: { showHeading?: boolean; limit?: number }) {
  const [sector, setSector] = useState<Sector | 'All'>('All')
  const list = (sector === 'All' ? projects : projects.filter((p) => p.sector === sector)).slice(0, limit ?? projects.length)
  const ref = useReveal<HTMLDivElement>([sector])

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <Container>
        <div className="flex flex-col gap-6 border-b border-ink/12 pb-6 md:flex-row md:items-end md:justify-between">
          {showHeading ? (
            <h2 className="text-25 md:text-36">The register</h2>
          ) : (
            <p className="u-num text-13 text-grey">
              {list.length} of {projects.length} contracts
            </p>
          )}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by sector">
            {SECTORS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSector(s)}
                aria-pressed={sector === s}
                className={cn(
                  'chip cursor-pointer text-13 transition-colors duration-300',
                  sector === s ? 'bg-ink text-cream' : 'chip--line hover:bg-ink/5',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <div key={p.slug} data-reveal>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
