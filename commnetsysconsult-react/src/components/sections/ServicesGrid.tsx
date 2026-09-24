import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { Plus, X } from 'lucide-react'
import { SERVICES } from '../../data/services'
import { IMG } from '../../lib/images'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useLenis, scrollToTarget } from '../SmoothScroll'
import { SectionHead } from './SectionHead'
import { Arrow } from '../Arrow'

/** v1's service bento: blueprint cards that reveal a photo on hover and open a
 *  dark detail panel below the grid. Now five systems (review §3.2). */
export function ServicesGrid({ id = 'services' }: { id?: string }) {
  const ref = useRef<HTMLElement>(null)
  const detail = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(-1)
  const [shown, setShown] = useState(0)
  const lenis = useLenis()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return gsap.set('.svc', { opacity: 1, y: 0 })
      gsap.utils.toArray<HTMLElement>('.svc').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: (i % 3) * 0.08, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
    },
    { scope: ref },
  )

  const { contextSafe } = useGSAP({ scope: ref })

  const toggle = contextSafe((i: number) => {
    const det = detail.current
    if (!det) return
    if (open === i) {
      gsap.to(det, { height: 0, opacity: 0, duration: 0.6, ease: 'expo.inOut', onComplete: () => ScrollTrigger.refresh() })
      setOpen(-1)
      return
    }
    setShown(i)
    setOpen(i)
    gsap.to(det, { height: 'auto', opacity: 1, duration: 0.8, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() })
    if (det.getBoundingClientRect().top > innerHeight * 0.6) scrollToTarget(lenis, det, -110)
  })

  const s = SERVICES[shown]!

  return (
    <section id={id} ref={ref}>
      <div className="wrap">
        <SectionHead
          center
          title="Five systems. One accountable package."
          lead="Commnet designs, installs, certifies and supports the low-current systems a building runs on — and delivers them together, so nothing falls between trades."
        />
        <div className="svc-grid">
          {SERVICES.map((sv, i) => {
            const Icon = sv.icon
            return (
              <article
                key={sv.slug}
                className={`svc card${open === i ? ' open' : ''}`}
                style={{ ['--span' as string]: sv.span }}
                tabIndex={0}
                role="button"
                aria-expanded={open === i}
                aria-controls="svc-detail"
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggle(i)
                  }
                }}
              >
                <div className="bp" />
                <div className="ph" style={{ backgroundImage: `url(${IMG[sv.img]})` }} />
                <span className="num">0{i + 1}</span>
                <div className="ico">
                  <Icon strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{sv.title}</h3>
                <p>{sv.short}</p>
                <span className="more">
                  Explore <Plus strokeWidth={2.2} aria-hidden="true" />
                </span>
              </article>
            )
          })}
        </div>
        <div id="svc-detail" ref={detail} role="region" aria-label={s.title} inert={open < 0}>
          <div className="svc-panel">
            <div className="img" style={{ backgroundImage: `url(${IMG[s.img]})` }} aria-hidden="true" />
            <div className="txt">
              <h3>{s.title}</h3>
              <p>{s.long}</p>
              <ul>
                {s.deliver.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link className="btn btn-primary" to={`/services/${s.slug}`}>
                Service details <Arrow />
              </Link>
            </div>
            <button className="close" aria-label="Close" onClick={() => toggle(open)}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
