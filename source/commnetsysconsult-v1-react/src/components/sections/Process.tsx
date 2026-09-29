import { useRef } from 'react'
import { PROCESS } from '../../data/company'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { SectionHead } from './SectionHead'

/** Six stages on one rail, set on a dark band. The rail fills as the section
 *  scrolls through; each stage names what it hands to the next. */
export function Process({ title = 'How a project moves through Commnet', lead = 'One engineering team owns the job from the first site survey to the long-term SLA.' }: { title?: string; lead?: string }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return gsap.set('.rail-fill', { scaleX: 1 })
      gsap.fromTo('.rail-fill', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 80%', end: 'bottom 60%', scrub: true } })
      gsap.from('.step', { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.steps', start: 'top 85%', once: true } })
    },
    { scope: ref },
  )
  return (
    <section id="process" className="dark" data-theme="dark" ref={ref}>
      <div className="wrap">
        <SectionHead eyebrow="Delivery" title={title} lead={lead} />
        <ol className="steps">
          <span className="rail" aria-hidden="true">
            <i className="rail-fill" />
          </span>
          {PROCESS.map((s, i) => (
            <li className="step" key={s.t}>
              <span className="node" aria-hidden="true" />
              <span className="kick">Stage {String(i + 1).padStart(2, '0')}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
