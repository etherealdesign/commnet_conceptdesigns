import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { TIMELINE } from '../../data/company'

export function About() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.to('.timeline .line', { height: '100%', ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.tl').forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top 72%', onEnter: () => el.classList.add('on'), onLeaveBack: () => el.classList.remove('on') })
        gsap.from(el, { x: 30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
      })
    },
    { scope: ref },
  )

  return (
    <section id="about" ref={ref}>
      <div className="wrap">
        <div className="sticky rv">
          <div className="huge">
            <span className="cnt" data-to="25">
              25
            </span>
            +<small>Years of engineering mission-critical systems</small>
          </div>
          <p className="lead" style={{ marginTop: 36 }}>
            Commnet Systems Consultancy started in the early 2000s as a two-person consulting team. Today it is a turnkey ELV and ICT systems integrator —
            cabling, networks, security, AV and critical power — with commercial and field teams in Dubai and a{' '}
            <b style={{ color: 'var(--t1)' }}>Chennai engineering center</b> behind them.
          </p>
        </div>
        <div>
          <div className="timeline">
            <div className="line" />
            {TIMELINE.map((t) => (
              <div className="tl" key={t.yr}>
                <div className="yr">{t.yr}</div>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
