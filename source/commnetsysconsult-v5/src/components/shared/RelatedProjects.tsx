import { Container } from '@/components/shared/Container'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { Button } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import type { Project } from '@/data/projects'

/** Page anatomy step 4 (§5): evidence, filtered to this page, with quantities. */
export function RelatedProjects({
  projects,
  heading = 'Evidence from the register',
  intro,
}: {
  projects: Project[]
  heading?: string
  intro?: string
}) {
  const ref = useReveal<HTMLDivElement>([projects.length])
  if (!projects.length) return null

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/12 pb-6" data-reveal>
          <div>
            <h2 className="max-w-2xl text-25 md:text-36">{heading}</h2>
            {intro && <p className="mt-4 max-w-xl text-13 text-grey">{intro}</p>}
          </div>
          <Button to="/projects" variant="underline">
            All 18 contracts
          </Button>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p) => (
            <div key={p.slug} data-reveal>
              <ProjectCard project={p} compact />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
