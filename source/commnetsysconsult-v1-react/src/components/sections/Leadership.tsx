import { useRef } from 'react'
import { LEADERSHIP } from '../../data/company'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { SectionHead } from './SectionHead'

export function Leadership({ title = 'Leadership', lead = 'A small executive team that still walks the site.' }: { title?: string; lead?: string }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.person', { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.lead-grid', start: 'top 85%', once: true } })
    },
    { scope: ref },
  )
  return (
    <section id="leadership" ref={ref}>
      <div className="wrap">
        <SectionHead title={title} lead={lead} />
        <div className="lead-grid">
          {LEADERSHIP.map((p) => (
            <div className="person tilt" tabIndex={0} key={p.name}>
              <div className="mono" aria-hidden="true">
                {p.initials}
              </div>
              <h4>{p.name}</h4>
              <div className="role">{p.role}</div>
              <div className="bio">{p.bio}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
