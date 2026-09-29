import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, X } from 'lucide-react'
import { SERVICES } from '../../data/services'
import { DELIVERED } from '../../data/company'
import { IMG } from '../../lib/images'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useLenis } from '../SmoothScroll'
import { SectionHead } from './SectionHead'
import { Arrow } from '../Arrow'

/** The five systems as an index: typographic rows beside a photo stage that
 *  follows the pointer or keyboard focus. A row opens its detail in a bottom
 *  sheet (a modal <dialog>). Five systems (review §3.2). */
export function ServicesGrid({
  id = 'services',
  title = 'Five systems. One accountable package.',
  lead = 'Commnet designs, installs, certifies and supports the low-current systems a building runs on — and delivers them together, so nothing falls between trades.',
  stats = false,
}: {
  id?: string
  title?: string
  lead?: string
  stats?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const dlg = useRef<HTMLDialogElement>(null)
  const sheet = useRef<HTMLDivElement>(null)
  const scrim = useRef<HTMLDivElement>(null)
  const drag = useRef<{ y0: number; dy: number } | null>(null)
  const [open, setOpen] = useState(-1)
  const [shown, setShown] = useState(0)
  const [active, setActive] = useState(0)
  const lenis = useLenis()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.sx-row', { y: 24, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.sx', start: 'top 80%', once: true } })
      gsap.from('.sx-stage', { clipPath: 'inset(0 0 100% 0 round 24px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: '.sx', start: 'top 80%', once: true } })
    },
    { scope: ref },
  )

  const { contextSafe } = useGSAP({ scope: ref })
  const t = (d: number) => (prefersReducedMotion() ? 0 : d)

  const show = contextSafe((i: number) => {
    const d = dlg.current
    if (!d) return
    setShown(i)
    setOpen(i)
    gsap.killTweensOf([sheet.current, scrim.current])
    if (!d.open) d.showModal()
    lenis?.stop()
    gsap.fromTo(scrim.current, { opacity: 0 }, { opacity: 1, duration: t(0.4), ease: 'power2.out' })
    gsap.fromTo(sheet.current, { yPercent: 100, y: 0 }, { yPercent: 0, duration: t(0.7), ease: 'expo.out' })
  })

  const hide = contextSafe(() => {
    const d = dlg.current
    if (!d?.open) return
    let done = false
    // Closing must not hang on animation frames (a background tab pauses them).
    const finish = () => {
      if (done) return
      done = true
      gsap.killTweensOf([sheet.current, scrim.current])
      d.close()
      setOpen(-1)
      lenis?.start()
    }
    gsap.to(scrim.current, { opacity: 0, duration: t(0.35), ease: 'power2.in' })
    gsap.to(sheet.current, { yPercent: 100, duration: t(0.45), ease: 'expo.in', onComplete: finish })
    setTimeout(finish, t(0.45) * 1000 + 150)
  })

  const s = SERVICES[shown]!

  return (
    <section id={id} ref={ref}>
      <div className="wrap">
        <SectionHead eyebrow="Services" title={title} lead={lead} />
        {stats && (
          <dl className="sx-stats rv">
            {DELIVERED.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="sx">
          <ul className="sx-list">
            {SERVICES.map((sv, i) => {
              const Icon = sv.icon
              return (
                <li key={sv.slug}>
                  <button
                    className={`sx-row${active === i ? ' on' : ''}${open === i ? ' open' : ''}`}
                    aria-haspopup="dialog"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => show(i)}
                  >
                    <span className="ico" aria-hidden="true">
                      <Icon strokeWidth={1.5} />
                    </span>
                    <span className="t">
                      <b>{sv.title}</b>
                      <small>{sv.short}</small>
                    </span>
                    <span className="go" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="sx-stage" aria-hidden="true">
            {SERVICES.map((sv, i) => (
              <div key={sv.slug} className={`sx-shot${active === i ? ' on' : ''}`} style={{ backgroundImage: `url(${IMG[sv.img]})` }} />
            ))}
            <div className="sx-cap" key={active}>
              <span className="kick">{SERVICES[active]!.title}</span>
            </div>
          </div>
        </div>
      </div>
      <dialog
        className="svc-sheet"
        ref={dlg}
        aria-labelledby="svc-sheet-title"
        onCancel={(e) => {
          e.preventDefault()
          hide()
        }}
      >
        <div className="scrim" ref={scrim} onClick={hide} />
        <div className="sheet" ref={sheet}>
          <div
            className="grab"
            onPointerDown={(e) => {
              drag.current = { y0: e.clientY, dy: 0 }
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              if (!drag.current) return
              drag.current.dy = Math.max(0, e.clientY - drag.current.y0)
              gsap.set(sheet.current, { y: drag.current.dy })
            }}
            onPointerUp={() => {
              const dy = drag.current?.dy ?? 0
              drag.current = null
              if (dy > 100) hide()
              else gsap.to(sheet.current, { y: 0, duration: t(0.4), ease: 'expo.out' })
            }}
          >
            <i aria-hidden="true" />
          </div>
          <button className="close" aria-label="Close" onClick={hide}>
            <X size={18} aria-hidden="true" />
          </button>
          <div className="svc-panel" data-lenis-prevent>
            <div className="img" style={{ backgroundImage: `url(${IMG[s.img]})` }} aria-hidden="true" />
            <div className="txt">
              <h3 id="svc-sheet-title">{s.title}</h3>
              <p>{s.long}</p>
              <ul>
                {s.deliver.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link className="btn btn-primary" to={`/services/${s.slug}`} onClick={() => lenis?.start()}>
                Service details <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  )
}
