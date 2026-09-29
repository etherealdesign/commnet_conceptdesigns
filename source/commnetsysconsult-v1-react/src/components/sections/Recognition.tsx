import { useRef } from 'react'
import { RECOGNITION } from '../../data/company'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { SectionHead } from './SectionHead'

/** v1 "Awards and certifications", split honestly into recognition and
 *  specification — no licence is claimed that has not been confirmed (review §6.7).
 *  Set as a ledger: a sticky heading beside a register of entries. */
export function Recognition({
  title = 'Recognition and track record',
  lead = 'Certificates, regulator standards and repeat engagements — the evidence that a delivery went well, from the people who received it.',
}: {
  title?: string
  lead?: string
}) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.aw', { y: 32, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.aw-list', start: 'top 85%', once: true } })
    },
    { scope: ref },
  )
  return (
    <section id="awards" ref={ref}>
      <div className="wrap">
        <div className="aw-head">
          <SectionHead
            eyebrow="Recognition"
            title={title}
            lead={lead}
            style={{ marginBottom: 0 }}
          />
        </div>
        <ol className="aw-list">
          {RECOGNITION.map((r) => {
            const Icon = r.icon
            return (
              <li className="aw" key={r.title}>
                <span className="medal" aria-hidden="true">
                  <Icon strokeWidth={1.6} />
                </span>
                <div>
                  <small>{r.kicker}</small>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
