import { Link } from 'react-router-dom'
import { Arrow } from '@/components/shared/Button'
import { work } from '@/data/home'
import type { Project } from '@/data/projects'

/**
 * A register entry as a card: photograph, name, the measured quantity, and
 * who it was delivered for. The photo swells slowly on hover and its shade
 * lifts.
 */
export function ProjectCard({ project: p, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <Link to={`/projects/${p.slug}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-clip rounded-sm bg-ink">
        <img
          src={work.media[p.environmentSlug] ?? '/media/infrastructure-fiber.jpg'}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/25 transition-opacity duration-700 ease-[var(--ease-expo)] group-hover:opacity-0" aria-hidden="true" />
        <span className="chip chip--line-dark absolute left-4 top-4 bg-ink/40 backdrop-blur-sm">{p.sector}</span>
        <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-sm bg-cream text-ink transition-colors duration-400 group-hover:bg-chip">
          <Arrow className="size-4 -rotate-45" />
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-16 md:text-21">{p.name}</h3>
        <p className="u-num text-13 text-ink">{p.quantities}</p>
        <p className="text-13 text-grey">
          {p.location} · {p.duration}
          {p.prime && ` · via ${p.prime}`}
        </p>
        {!compact && <p className="text-13 text-grey">{p.scope}</p>}
      </div>
    </Link>
  )
}
