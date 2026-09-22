import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { useReveal } from '@/hooks/useReveal'
import { projectBySlug } from '@/data/projects'
import { work } from '@/data/home'

/**
 * Three entries from the register on the page grid, then the link to the
 * rest. No carousel: a buyer wants to see the evidence, not drag it.
 */
export function Work() {
  const ref = useReveal<HTMLElement>()
  const items = work.slugs.slice(0, 3).map(projectBySlug).filter(Boolean) as NonNullable<ReturnType<typeof projectBySlug>>[]

  return (
    <Block ref={ref} anchor="projects" className="margin-px-1 border-t border-ink/12 py-20 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 data-reveal className="text-25 md:text-36">{work.title}</h2>
        <p data-reveal className="text-13 text-grey">Quantities as delivered. Contract values stay in the company profile.</p>
      </div>
      <ul className="mt-12 grid gap-x-6 gap-y-12 md:mt-16 md:grid-cols-3">
        {items.map((p) => (
          <li key={p.slug} data-reveal>
            <ProjectCard project={p} compact />
          </li>
        ))}
      </ul>
      <div className="mt-12 flex items-center justify-between border-t border-ink/12 pt-6 text-13 text-grey md:mt-16">
        <p>18 documented contracts across data centres, hotels, government and command centres in the UAE.</p>
        <Button to="/projects" variant="underlined" className="text-ink">
          Full register
        </Button>
      </div>
    </Block>
  )
}
