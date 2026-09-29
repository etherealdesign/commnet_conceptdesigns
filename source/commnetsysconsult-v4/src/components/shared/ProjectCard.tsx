import { Link } from 'react-router-dom'
import { Arrow } from '@/components/shared/Button'
import { work } from '@/data/home'
import type { Project } from '@/data/projects'

/**
 * A register entry as a card: photograph, name, the measured quantity, and
 * who it was delivered for. The photo swells slowly on hover and its shade
 * lifts.
 */
export function ProjectCard({ project: p, compact = false, index }: { project: Project; compact?: boolean; index?: number }) {
  return (
    <Link to={`/projects/${p.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-clip rounded-[var(--r-card)] bg-ink">
        <img
          src={work.media[p.environmentSlug] ?? '/media/infrastructure-fiber.jpg'}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-85 transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/20 transition-opacity duration-700 ease-[var(--ease-expo)] group-hover:opacity-0" aria-hidden="true" />
        {index !== undefined && (
          <span className="chip chip--tint absolute left-4 top-4">
            {String(index).padStart(2, '0')}
          </span>
        )}
        <span className="chip chip--line-dark absolute right-4 top-4 bg-ink/40 backdrop-blur-sm">{p.sector}</span>
        <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-[var(--r-ctl)] bg-white text-ink transition-colors duration-400 group-hover:bg-primary group-hover:text-white">
          <Arrow className="size-4 -rotate-45" />
        </span>
      </div>
      <div className="flex flex-col gap-2 border-b border-ink/12 py-4">
        <h3 className="d-3 transition-colors duration-500 group-hover:text-primary">{p.name}</h3>
        <p className="text-14 font-medium text-ink">{p.quantities}</p>
        <p className="text-13 text-grey">
          {p.location} · {p.duration}
          {p.prime && ` · via ${p.prime}`}
        </p>
        {!compact && <p className="mt-1 text-13 text-grey">{p.scope}</p>}
      </div>
    </Link>
  )
}
