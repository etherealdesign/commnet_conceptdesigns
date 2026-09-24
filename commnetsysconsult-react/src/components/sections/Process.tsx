import { useRef } from 'react'
import { PROCESS } from '../../data/company'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { SectionHead } from './SectionHead'

export function Process({ title = 'How a project moves through Commnet', lead = 'One engineering team owns the job from the first site survey to the long-term SLA.' }: { title?: string; lead?: string }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return gsap.set('.procpath', { strokeDashoffset: 0 })
      gsap.to('.procpath', { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.proc', start: 'top 75%', end: 'bottom 70%', scrub: true } })
      gsap.from('.st', { y: 30, opacity: 0, stagger: 0.12, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.proc', start: 'top 80%', once: true } })
    },
    { scope: ref },
  )
  return (
    <section id="process" ref={ref}>
      <div className="wrap">
        <SectionHead title={title} lead={lead} />
        <div className="proc">
          <svg className="path" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
            <path className="procpath" d="M11 20 C 200 -10, 200 50, 400 20 S 600 -10, 800 20 S 1000 50, 1189 20" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="1400" strokeDashoffset="1400" />
          </svg>
          {PROCESS.map((s, i) => (
            <div className="st" key={s.t}>
              <div className="dot" />
              <b>{String(i + 1).padStart(2, '0')}</b>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
