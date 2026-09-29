import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { contact, nav, social } from '@/data/site'
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap'
import { useLenis } from '@/lib/smooth'

function DubaiTime() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 30_000); return () => clearInterval(id) }, [])
  return <span className="tabular-nums">Dubai {t} GST</span>
}

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const lenis = useLenis()

  useGSAP(() => {
    if (reducedMotion()) return
    gsap.from('.ft-letter', {
      yPercent: 100, stagger: 0.035, duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: '.ft-word', start: 'top 95%', once: true },
    })
  }, { scope: ref })

  const top = () => (lenis ? lenis.scrollTo(0, { duration: 1.8 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))

  return (
    <footer ref={ref} className="relative overflow-hidden bg-dark text-ivory">
      <div className="wrap border-t border-[var(--line-dark)] pt-20 pb-8">
        <div className="grid gap-12 text-[14px] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="kick mb-5 !text-muted-dark">Pages</p>
            <ul className="grid grid-cols-2 gap-2">
              <li><Link to="/" className="link-line">Home</Link></li>
              {nav.map((n) => <li key={n.to}><Link to={n.to} className="link-line">{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="kick mb-5 !text-muted-dark">Studio</p>
            <address className="not-italic leading-relaxed text-ivory/80">{contact.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
          </div>
          <div>
            <p className="kick mb-5 !text-muted-dark">Contact</p>
            <a href={`mailto:${contact.email}`} className="link-line block w-fit">{contact.email}</a>
            <a href={contact.phoneHref} className="link-line mt-2 block w-fit">{contact.phone}</a>
          </div>
          <div>
            <p className="kick mb-5 !text-muted-dark">Follow</p>
            <ul className="space-y-2">
              {social.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener" className="link-line">{s.label}</a></li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="ft-word wrap overflow-hidden">
        <p className="display flex justify-between text-[clamp(56px,16.4vw,300px)] leading-[0.85] tracking-[-0.04em]">
          <span className="sr-only">Teleiostec</span>
          {'Teleiostec'.split('').map((c, i) => <span key={i} aria-hidden className="ft-letter inline-block">{c}</span>)}
        </p>
      </div>

      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6 text-[12px] text-muted-dark">
        <span>© {new Date().getFullYear()} Teleiostec — Interior Fit-Out &amp; MEP</span>
        <DubaiTime />
        <span>{contact.coords}</span>
        <button type="button" onClick={top} className="link-line uppercase tracking-[0.16em]">Back to top ↑</button>
      </div>
    </footer>
  )
}
