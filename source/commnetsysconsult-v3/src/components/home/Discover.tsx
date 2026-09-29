import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { AnimText } from '@/components/motion/AnimText'
import { SlideGroup, SlideItem } from '@/components/motion/SlideIn'
import { Rail } from '@/components/motion/Rail'
import { projectBySlug, type Project } from '@/data/projects'
import { solutionMedia } from '@/data/solutions'
import { discover } from '@/data/home'

/** The reference's "More to Discover": article tiles. Ours are register entries with their terms as the date line. */
export function Discover() {
  const items = discover.slugs.map(projectBySlug).filter(Boolean) as Project[]
  return (
    <Block anchor="projects" className="my-[var(--spacing-fluid-2xl)] flex flex-col gap-[var(--spacing-fluid-xl)] overflow-hidden" ariaLabel="Selected contracts">
      <div className="margin-px-1 text-center">
        <h2 className="sr-only">{discover.title}</h2>
        <AnimText text={discover.title} className="heading-xl" ariaHidden />
      </div>
      <SlideGroup>
        <Rail ariaLabel="Selected contracts" itemsPerView={4}>
          {items.map((p, i) => (
            <SlideItem as="li" key={p.slug} index={i}>
              <Link to={`/projects/${p.slug}`} className="group flex flex-col gap-6">
                <div className="plate aspect-[8/5] w-full">
                  <img src={solutionMedia[p.environmentSlug]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-power4-out)] group-hover:scale-[1.04]" />
                </div>
                <div className="flex max-w-[25rem] flex-col gap-3">
                  <h3 className="text-[0.875rem] font-bold">{p.name}</h3>
                  <p className="u-num text-[0.75rem] text-grey">
                    {p.quantities} · {p.duration}
                  </p>
                </div>
              </Link>
            </SlideItem>
          ))}
        </Rail>
      </SlideGroup>
    </Block>
  )
}
