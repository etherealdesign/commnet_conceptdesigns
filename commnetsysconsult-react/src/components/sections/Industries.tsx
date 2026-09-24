import { useEffect, useRef } from 'react'
import { SECTORS } from '../../data/company'
import { prefersReducedMotion } from '../../lib/gsap'

/** v1's orbit: sector chips circling the company core, steered by the pointer. */
export function Industries() {
  const orbit = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const o = orbit.current
    if (!o) return
    const sats = [...o.querySelectorAll<HTMLElement>('.sat')]
    const reduce = prefersReducedMotion()
    let ang = 0
    let target = 0
    let hover = false
    let last = 0
    let raf = 0
    let visible = true
    const place = () => {
      const r = o.clientWidth / 2
      sats.forEach((s, i) => {
        const a = ang + i * ((Math.PI * 2) / sats.length)
        s.style.transform = `translate(${Math.cos(a) * r * 0.86}px,${Math.sin(a) * r * 0.86}px)`
      })
    }
    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      if (!reduce && visible) {
        ang += dt * 0.12
        ang += (hover ? target : 0) * dt * 0.9
        place()
      }
      raf = requestAnimationFrame(tick)
    }
    const move = (e: MouseEvent) => {
      const b = o.getBoundingClientRect()
      target = ((e.clientX - b.left) / b.width - 0.5) * 1.2
      hover = true
    }
    const leave = () => (hover = false)
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting))
    io.observe(o)
    o.addEventListener('mousemove', move)
    o.addEventListener('mouseleave', leave)
    addEventListener('resize', place)
    place()
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      o.removeEventListener('mousemove', move)
      o.removeEventListener('mouseleave', leave)
      removeEventListener('resize', place)
    }
  }, [])

  return (
    <section id="industries">
      <div className="wrap orbit-wrap">
        <div className="rv">
          <h2>Built for sectors where downtime is not an option</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Every sector brings its own regulator, uptime target and threat model. These are the ones Commnet has delivered in — each with a project behind it.
          </p>
          <div className="ind-list">
            {SECTORS.map((s) => (
              <div key={s.name}>
                {s.name} <small>{s.proof}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="orbit" ref={orbit} aria-hidden="true">
          <div className="ring" />
          <div className="ring r2" />
          <div className="core">
            Commnet<small>Systems Consultancy</small>
          </div>
          {SECTORS.map((s) => (
            <div className="sat" key={s.name}>
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
