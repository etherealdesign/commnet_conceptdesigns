import { useRef } from 'react'
import { Link } from 'react-router'
import { SOLUTIONS } from '../../data/solutions'
import { projectsFor } from '../../data/projects'
import { IMG } from '../../lib/images'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { SectionHead } from './SectionHead'
import { Arrow } from '../Arrow'

/** Axis B — the six environments, in the same blueprint card as the services. */
export function SolutionsGrid({ exclude, title = 'Where we deliver it', lead, tone = 'white' }: { exclude?: string; title?: string; lead?: string; tone?: 'white' | 'canvas' }) {
  const ref = useRef<HTMLElement>(null)
  const list = SOLUTIONS.filter((s) => s.slug !== exclude)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.svc').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: (i % 3) * 0.08, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} style={{ background: tone === 'white' ? 'var(--white)' : 'var(--bg)' }}>
      <div className="wrap">
        <SectionHead
          title={title}
          lead={lead ?? 'A facilities director buys an outcome, not a trade. These are the six packages Commnet delivers end to end — each one backed by projects in the register.'}
        />
        <div className="svc-grid">
          {list.map((s) => {
            const Icon = s.icon
            const n = projectsFor({ solution: s.slug }).length
            return (
              <Link key={s.slug} to={`/solutions/${s.slug}`} className="svc card" style={{ ['--span' as string]: 4 }}>
                <div className="bp" />
                <div className="ph" style={{ backgroundImage: `url(${IMG[s.img]})` }} />
                <div className="ico">
                  <Icon strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="tagline">
                  {n} {n === 1 ? 'project' : 'projects'} in the register
                </span>
                <span className="more">
                  View solution <Arrow />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
