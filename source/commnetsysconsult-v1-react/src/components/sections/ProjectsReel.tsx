import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { FEATURED, type Project } from '../../data/projects'
import { SOLUTIONS } from '../../data/solutions'
import type { SolutionSlug } from '../../data/solutions'
import { IMG } from '../../lib/images'
import { SHOW_CONTRACT_VALUES } from '../../lib/site'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { Arrow } from '../Arrow'

export function ProjectMeta({ p }: { p: Project }) {
  return (
    <div className="meta">
      <div>
        <span>Client of record</span>
        <b>{p.clientOfRecord}</b>
      </div>
      <div>
        {SHOW_CONTRACT_VALUES ? <span>Value</span> : <span>Scale</span>}
        <b>{SHOW_CONTRACT_VALUES ? p.value : `${p.scale.value} ${p.scale.label}`}</b>
      </div>
      <div>
        <span>Duration</span>
        <b>{p.duration}</b>
      </div>
      <div>
        <span>Location</span>
        <b>{p.location}</b>
      </div>
      <div className="full">
        <span>Scope</span>
        <div className="scope">
          {p.scope.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Each environment gets its own signal colour — the dot beside the card's kicker. */
const TINT: Record<SolutionSlug, string> = {
  'data-centres-it-rooms': '#3FA7C4',
  'command-security-centres': '#5B6BD6',
  'hotels-resorts': '#C27BA0',
  'corporate-fit-out': '#8AA89A',
  'events-rapid-deployment': '#D39A5A',
  'amc-sla': '#7C8CA8',
}

/** Featured work as a rail of photo cards in the site's blueprint style. */
export function ProjectsReel({
  items = FEATURED,
  eyebrow = 'Featured projects',
  title = 'Selected work from the project register',
  lead,
}: {
  items?: Project[]
  eyebrow?: string
  title?: string
  lead?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const sync = () => {
    const r = rail.current
    if (!r) return
    setEdge({ start: r.scrollLeft < 8, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 8 })
  }
  useEffect(sync, [items])

  const step = (dir: 1 | -1) => {
    const r = rail.current
    const card = r?.querySelector<HTMLElement>('.pf')
    if (!r || !card) return
    r.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.pf', { y: 50, opacity: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.pf-rail', start: 'top 80%', once: true } })
    },
    { scope: ref },
  )

  return (
    <section id="projects" ref={ref}>
      <div className="wrap">
        <div className="pf-head rv">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {lead && <p className="lead">{lead}</p>}
          <Link className="more-link" to="/projects">
            View all projects <Arrow />
          </Link>
        </div>
        <div className="pf-stage">
          <div className="pf-rail" ref={rail} onScroll={sync} tabIndex={0} role="region" aria-label={eyebrow}>
            {items.map((p) => {
              const env = SOLUTIONS.find((s) => s.slug === p.environment)
              return (
                <Link className="pf" key={p.slug} to={`/projects/${p.slug}`} style={{ ['--tint' as string]: TINT[p.environment] }}>
                  <span className="pf-pic">
                    <img src={IMG[p.img]} alt="" loading="lazy" decoding="async" width={1400} height={782} />
                  </span>
                  <span className="pf-body">
                    <span className="kick">{env?.title}</span>
                    <h3>{p.name}</h3>
                    <span className="sub">{p.sub}</span>
                  </span>
                  <span className="pf-meta">
                    <span>{p.location}</span>
                    <span className="go" aria-hidden="true">
                      <Arrow />
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
          <button className="pf-nav pf-prev" aria-label="Previous projects" onClick={() => step(-1)} hidden={edge.start}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button className="pf-nav pf-next" aria-label="More projects" onClick={() => step(1)} hidden={edge.end}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
