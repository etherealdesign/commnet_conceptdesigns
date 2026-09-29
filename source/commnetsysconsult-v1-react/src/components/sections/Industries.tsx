import { useEffect, useRef, useState } from 'react'
import { Banknote, Building2, Factory, Hotel, Landmark, Trophy, type LucideIcon } from 'lucide-react'
import { SECTORS } from '../../data/company'
import { prefersReducedMotion } from '../../lib/gsap'
import { IMG } from '../../lib/images'
import { Link } from 'react-router'
import { Arrow } from '../Arrow'

const ICON: Record<string, LucideIcon> = {
  Government: Landmark,
  Hospitality: Hotel,
  Corporate: Building2,
  'Sports & Events': Trophy,
  Industrial: Factory,
  Banking: Banknote,
}

/** v1's orbit, refined: sector chips circling the company core on spokes,
 *  steered by the pointer. Hovering a sector in the list lights its chip. */
export function Industries() {
  const orbit = useRef<HTMLDivElement>(null)
  const [hot, setHot] = useState(-1)
  const hotRef = useRef(-1)
  hotRef.current = hot

  useEffect(() => {
    const o = orbit.current
    if (!o) return
    const sats = [...o.querySelectorAll<HTMLElement>('.sat')]
    const spokes = [...o.querySelectorAll<SVGLineElement>('.spoke')]
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
        spokes[i]?.setAttribute('x2', String(Math.cos(a) * 43))
        spokes[i]?.setAttribute('y2', String(Math.sin(a) * 43))
      })
    }
    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      if (!reduce && visible) {
        ang += dt * (hotRef.current >= 0 ? 0.02 : 0.12)
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
          <span className="eyebrow">Sectors</span>
          <h2>Built for sectors where downtime is not an option</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Each sector has its own regulator and uptime target. Every one listed has a project behind it.
          </p>
          <ul className="sec-list" onMouseLeave={() => setHot(-1)}>
            {SECTORS.map((s, i) => {
              const Icon = ICON[s.name] ?? Building2
              return (
                <li key={s.name} className={hot === i ? 'on' : undefined} onMouseEnter={() => setHot(i)}>
                  <span className="ico" aria-hidden="true">
                    <Icon strokeWidth={1.6} />
                  </span>
                  <b>{s.name}</b>
                  <small>{s.proof}</small>
                </li>
              )
            })}
          </ul>
          <Link className="more-link" to="/solutions">
            See the six delivery packages <Arrow />
          </Link>
        </div>
        <div className="orbit" ref={orbit} aria-hidden="true">
          <svg className="orbit-lines" viewBox="-50 -50 100 100">
            <circle r="49.5" className="o1" />
            <circle r="32" className="o2" />
            {SECTORS.map((s, i) => (
              <line key={s.name} className={`spoke${hot === i ? ' on' : ''}`} x1="0" y1="0" x2="0" y2="0" />
            ))}
          </svg>
          <div className="core">
            <img src={IMG.logoLight} alt="" width={125} height={48} />
            <small>Systems Consultancy</small>
          </div>
          {SECTORS.map((s, i) => {
            const Icon = ICON[s.name] ?? Building2
            return (
              <div className={`sat${hot === i ? ' on' : ''}`} key={s.name} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(-1)}>
                <span>
                  <Icon strokeWidth={1.8} />
                  {s.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
