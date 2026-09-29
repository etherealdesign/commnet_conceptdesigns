import { Link } from 'react-router-dom'
import { work } from '@/data/home'
import type { Project } from '@/data/projects'

/** A register entry: photograph, mono name and meta line, the quantity. */
export function ProjectCard({ project: p, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <Link to={`/projects/${p.slug}`} className="group flex flex-col gap-4">
      <div className="aspect-[4/3] overflow-clip bg-card">
        <img
          src={work.photos[p.slug] ?? work.media[p.environmentSlug] ?? '/media/infrastructure-fiber.jpg'}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-[1.125rem] font-medium tracking-tight">{p.name}</h3>
          <p className="t-small text-fg-muted">{p.sector}{p.prime && ` · via ${p.prime}`}</p>
        </div>
        <p className="u-num t-body">{p.quantities}</p>
        <p className="t-small text-fg-muted">{p.location} · {p.duration}</p>
        {!compact && <p className="t-small text-fg-muted">{p.scope}</p>}
      </div>
    </Link>
  )
}
