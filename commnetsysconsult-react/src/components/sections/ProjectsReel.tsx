import { useRef } from 'react'
import { Link } from 'react-router'
import { FEATURED, PROJECTS, type Project } from '../../data/projects'
import { IMG } from '../../lib/images'
import { SHOW_CONTRACT_VALUES } from '../../lib/site'
import { gsap, useGSAP } from '../../lib/gsap'
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

/** v1's pinned horizontal reel: clip-path reveals, inner parallax, progress bar. */
export function ProjectsReel({ items = FEATURED, title = 'Featured projects', lead }: { items?: Project[]; title?: string; lead?: string }) {
  const ref = useRef<HTMLElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const t = track.current!
        const dist = () => t.scrollWidth - innerWidth
        const tween = gsap.to(t, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: () => '+=' + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (s) => {
              if (bar.current) bar.current.style.width = s.progress * 100 + '%'
            },
          },
        })
        gsap.utils.toArray<HTMLElement>('.proj:not(.all)').forEach((p) => {
          const pic = p.querySelector('.pic')
          gsap.to(pic, { clipPath: 'inset(0 0% 0 0 round 20px)', duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 75%', once: true } })
          gsap.to(p.querySelector('.pic img'), { scale: 1, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } })
          gsap.from(p.querySelector('.meta'), { y: 30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 60%', once: true } })
        })
      })
      mm.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.proj').forEach((p) => gsap.from(p, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 85%', once: true } }))
      })
    },
    { scope: ref },
  )

  return (
    <section id="projects" ref={ref}>
      <div className="wrap intro">
        <div className="sec-head rv" style={{ marginBottom: 0 }}>
          <h2>{title}</h2>
          <p className="lead">
            {lead ?? 'Six engagements from the register of eighteen: luxury hospitality, a utility security centre, a world tournament and government data centres.'}
          </p>
        </div>
      </div>
      <div className="h-wrap" ref={wrap}>
        <div className="h-track" ref={track}>
          {items.map((p, i) => (
            <article className="proj" key={p.slug}>
              <div className="pic">
                <img src={IMG[p.img]} alt={p.name} loading="lazy" decoding="async" width={1400} height={782} />
                <span className="tag">{p.location}</span>
              </div>
              <div>
                <div className="idx">{String(i + 1).padStart(2, '0')}</div>
                <h3>
                  <Link to={`/projects/${p.slug}`}>{p.name}</Link>
                </h3>
                <p className="sub">{p.sub}</p>
                <ProjectMeta p={p} />
                <Link className="link" to={`/projects/${p.slug}`}>
                  Read the project <Arrow />
                </Link>
              </div>
            </article>
          ))}
          <article className="proj all">
            <div>
              <span className="eyebrow">The register</span>
              <h3>All {PROJECTS.length} documented contracts, filterable by system, environment and emirate.</h3>
              <Link className="btn btn-primary magnetic" to="/projects">
                Open the project register <Arrow />
              </Link>
            </div>
          </article>
        </div>
        <div className="h-progress">
          <i ref={bar} />
        </div>
      </div>
    </section>
  )
}
