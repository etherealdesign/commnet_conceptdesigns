import { useRef } from 'react'
import { RECOGNITION } from '../../data/company'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { SectionHead } from './SectionHead'

/** v1 "Awards and certifications", split honestly into recognition and
 *  specification — no licence is claimed that has not been confirmed (review §6.7). */
export function Recognition() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.aw', { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.aw-grid', start: 'top 85%', once: true } })
    },
    { scope: ref },
  )
  return (
    <section id="awards" ref={ref}>
      <div className="wrap">
        <SectionHead center title="Recognition and track record" />
        <div className="aw-grid">
          {RECOGNITION.map((r) => {
            const Icon = r.icon
            return (
              <div className="aw tilt" key={r.title}>
                <div className="medal">
                  <Icon strokeWidth={1.6} aria-hidden="true" />
                </div>
                <small>{r.kicker}</small>
                <h4>{r.title}</h4>
                <p>{r.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
