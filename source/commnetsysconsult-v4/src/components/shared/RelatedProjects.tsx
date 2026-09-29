import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { Button } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import type { Project } from '@/data/projects'

/** Page anatomy step 4 (§5): evidence, filtered to this page, with quantities. */
export function RelatedProjects({
  projects,
  heading = 'Evidence from the register',
  intro,
  index = 3,
}: {
  projects: Project[]
  heading?: string
  intro?: string
  index?: number
}) {
  const ref = useReveal<HTMLElement>([projects.length])
  if (!projects.length) return null

  return (
    <Block ref={ref} section="Evidence" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <SectionLabel index={index} aside={`${projects.length} of 18 contracts`}>
        Evidence
      </SectionLabel>
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 md:mt-14" data-reveal>
        <div>
          <h2 className="d-2 max-w-3xl">{heading}</h2>
          {intro && <p className="mt-4 max-w-xl text-16 text-grey">{intro}</p>}
        </div>
        <Button to="/projects" variant="underlined" glyph="→">
          All 18 contracts
        </Button>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 6).map((p, i) => (
          <div key={p.slug} data-reveal>
            <ProjectCard project={p} compact index={i + 1} />
          </div>
        ))}
      </div>
    </Block>
  )
}
