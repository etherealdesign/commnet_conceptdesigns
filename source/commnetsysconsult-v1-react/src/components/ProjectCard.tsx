import { Link } from 'react-router'
import type { Project } from '../data/projects'
import { SOLUTIONS } from '../data/solutions'
import { IMG } from '../lib/images'
import { SHOW_CONTRACT_VALUES } from '../lib/site'

export function ProjectCard({ p }: { p: Project }) {
  const env = SOLUTIONS.find((s) => s.slug === p.environment)
  return (
    <Link to={`/projects/${p.slug}`} className="pcard card">
      <div className="pic">
        <img src={IMG[p.img]} alt="" loading="lazy" decoding="async" width={1400} height={782} />
        <span className="tag">{p.location}</span>
      </div>
      <div className="body">
        <span className="kick">{env?.title}</span>
        <h3>{p.name}</h3>
        <p>{p.sub}</p>
        <div className="scale">
          <span>
            <b>{p.scale.value}</b> {p.scale.label}
          </span>
          <span>{SHOW_CONTRACT_VALUES ? p.value : p.duration}</span>
        </div>
      </div>
    </Link>
  )
}
