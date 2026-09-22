import { Link } from 'react-router-dom'
import { work } from '@/data/home'
import type { Project } from '@/data/projects'

/**
 * A register entry in the same idiom as the menu: a photograph that names
 * itself, the measured quantity and the terms underneath.
 */
export function ProjectCard({ project: p, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <Link to={`/projects/${p.slug}`} className="group flex flex-col gap-4">
      <span className="tile aspect-[4/3] w-full">
        <img
          src={work.media[p.environmentSlug] ?? '/media/infrastructure-fiber.jpg'}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <span className="tile-label">
          <span className="block text-16 md:text-21">{p.name}</span>
          <span className="u-num block text-13 text-cream/80">{p.quantities}</span>
        </span>
      </span>
      <p className="text-13 text-grey">
        {p.sector} · {p.location} · {p.duration}
        {p.prime && ` · via ${p.prime}`}
      </p>
      {!compact && <p className="text-13 text-grey">{p.scope}</p>}
    </Link>
  )
}
