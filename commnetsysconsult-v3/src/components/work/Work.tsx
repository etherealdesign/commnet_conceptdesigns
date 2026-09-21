import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { Carousel } from '@/components/shared/Carousel'
import { Arrow, Button } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { projectBySlug } from '@/data/projects'
import { work } from '@/data/home'

/**
 * The register as a strip of tall cards under a title that fills the
 * width. Each card is a photograph with the measured quantity on it; the
 * photo swells slowly on hover and its shade lifts, the way the reference
 * does it, because a slow swell reads as weight and a fast one as a toy.
 */
export function Work() {
  const ref = useReveal<HTMLElement>()
  const items = work.slugs.map(projectBySlug).filter(Boolean) as NonNullable<ReturnType<typeof projectBySlug>>[]
  const words = work.title.split(' ')

  return (
    <Block ref={ref} anchor="projects" className="py-16 md:pb-6 md:pt-24">
      <div className="flex flex-col gap-10 md:gap-16">
        <h2 className="margin-px-1 flex justify-between gap-6 text-65 md:text-240">
          {words.map((w, i) => (
            <span key={i} data-reveal>
              {w}
            </span>
          ))}
        </h2>

        <Carousel
          ariaLabel="Selected projects"
          withButtons
          withDots
          controlsClassName="margin-px-1 pt-8"
          trackClassName="margin-px-1 gutter-gap-1"
        >
          {items.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              draggable={false}
              className="group relative flex h-[340px] w-[86%] flex-col overflow-clip rounded-sm bg-ink text-cream md:h-[682px] md:w-[calc(5*var(--column)+4*var(--gutter))]"
            >
              <img
                src={work.media[p.environmentSlug] ?? '/media/infrastructure-fiber.jpg'}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="relative z-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-[var(--ease-expo)] group-hover:scale-105"
              />
              <div className="absolute inset-0 z-1 bg-ink/35 transition-opacity duration-700 ease-[var(--ease-expo)] group-hover:opacity-10" aria-hidden="true" />
              <div className="absolute inset-0 z-2 flex flex-col items-start justify-start p-6 md:justify-end md:p-12">
                <div className="gutter-gap-1 flex w-full items-end justify-between">
                  <div className="z-1 flex flex-col gap-4 md:gap-6">
                    <h3 className="text-25 leading-none md:text-36">{p.name}</h3>
                    <p className="u-num text-14 leading-none text-cream/75">
                      {p.quantities}
                      {p.prime && ` · via ${p.prime}`}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-cream text-ink transition-colors duration-400 ease-[var(--ease-expo)] group-hover:bg-chip max-sm:absolute max-sm:bottom-6 max-sm:right-6">
                    <Arrow className="size-5 -rotate-45" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>

        <div className="margin-px-1 flex items-center justify-between border-t border-ink/12 pt-6 text-13 text-grey">
          <p>18 documented contracts. Contract values stay in the company profile.</p>
          <Button to="/projects" variant="underlined" className="text-ink">
            Full register
          </Button>
        </div>
      </div>
    </Block>
  )
}
