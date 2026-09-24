import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SERVICES } from '../../data/services'
import { SOLUTIONS } from '../../data/solutions'
import { SITE, FORM_ENDPOINT } from '../../lib/site'
import { prefersReducedMotion } from '../../lib/gsap'

/** v1's CTA canvas: drifting nodes joined by cyan lines, pushed by the pointer. */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx || prefersReducedMotion()) return
    type P = { x: number; y: number; vx: number; vy: number }
    let w = 0
    let h = 0
    let pts: P[] = []
    let mx = -1e4
    let my = -1e4
    let raf = 0
    let on = false
    const dpr = Math.min(devicePixelRatio, 2)
    const resize = () => {
      w = c.width = c.offsetWidth * dpr
      h = c.height = c.offsetHeight * dpr
      pts = Array.from({ length: Math.min(90, Math.floor((w * h) / 22000)) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 }))
    }
    const move = (e: MouseEvent) => {
      const r = c.getBoundingClientRect()
      mx = (e.clientX - r.left) * dpr
      my = (e.clientY - r.top) * dpr
    }
    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!on) return
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx * dpr
        p.y += p.vy * dpr
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        const d = Math.hypot(p.x - mx, p.y - my)
        if (d < 160 * dpr && d > 0) {
          p.x += ((p.x - mx) / d) * 0.6 * dpr
          p.y += ((p.y - my) / d) * 0.6 * dpr
        }
      }
      ctx.lineWidth = dpr
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]!
          const b = pts[j]!
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 140 * dpr) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / (140 * dpr)) * 0.22})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      ctx.fillStyle = 'rgba(147,197,253,.8)'
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6 * dpr, 0, 7)
        ctx.fill()
      }
    }
    resize()
    const io = new IntersectionObserver(([e]) => (on = !!e?.isIntersecting))
    io.observe(c)
    const parent = c.parentElement!
    parent.addEventListener('mousemove', move)
    addEventListener('resize', resize)
    draw()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      parent.removeEventListener('mousemove', move)
      removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={ref} aria-hidden="true" />
}

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const OPTIONS = [...SERVICES.map((s) => s.title), ...SOLUTIONS.map((s) => `${s.title} package`), 'Not sure yet']

export function Cta({ defaultService, id = 'cta' }: { defaultService?: string; id?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const data = Object.fromEntries(new FormData(f)) as Record<string, string>
    const errs: Record<string, string> = {}
    if (!data.name?.trim()) errs.name = 'Please add your name.'
    if (!data.company?.trim()) errs.company = 'Please add your organisation.'
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? '')) errs.email = 'Please use a valid work email.'
    setErrors(errs)
    if (Object.keys(errs).length) {
      f.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus()
      return
    }

    if (!FORM_ENDPOINT) {
      // No backend configured: hand the brief to the visitor's mail client rather than pretend it was sent.
      const body = `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone || '-'}\nService: ${data.service}\n\n${data.message || ''}`
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project brief — ${data.company}`)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const done = status === 'sent' || status === 'mailto'

  return (
    <section id={id} className="dark" data-theme="dark">
      <Particles />
      <div className="wrap">
        <div className="rv">
          <h2>Send us the drawings. An engineer replies.</h2>
          <p className="lead" style={{ marginTop: 20 }}>
            Scope, BoQ or a site address — every enquiry is read by the engineering team, not routed to a sales queue.
          </p>
          <p style={{ marginTop: 28, fontSize: 15 }}>
            Or call the Dubai office on{' '}
            <a href={SITE.phoneHref} style={{ color: '#fff', fontWeight: 600 }}>
              {SITE.phone}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${SITE.email}`} style={{ color: '#fff', fontWeight: 600 }}>
              {SITE.email}
            </a>
          </p>
        </div>
        <div className="form glass rv">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div key="ok" className="ok" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <b>{status === 'sent' ? 'Brief received.' : 'Your email is ready to send.'}</b>
                <p>
                  {status === 'sent'
                    ? 'An engineer will reply to the address you gave.'
                    : `Your mail app has opened with the brief filled in. If it didn’t, write to ${SITE.email}.`}
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} aria-describedby={status === 'error' ? 'form-error' : undefined}>
                <div className="row">
                  <Field id="fn" name="name" label="Full name" placeholder="Your name" autoComplete="name" error={errors.name} />
                  <Field id="co" name="company" label="Company" placeholder="Organisation" autoComplete="organization" error={errors.company} />
                </div>
                <div className="row">
                  <Field id="em" name="email" type="email" label="Work email" placeholder="name@company.com" autoComplete="email" error={errors.email} />
                  <Field id="ph" name="phone" type="tel" label="Phone" placeholder="+971" autoComplete="tel" required={false} />
                </div>
                <div className="f">
                  <label htmlFor="sv">Service</label>
                  <select id="sv" name="service" defaultValue={defaultService ?? OPTIONS[0]}>
                    {OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="f">
                  <label htmlFor="ms">Project brief</label>
                  <textarea id="ms" name="message" rows={4} placeholder="Site, scope, timeline and SIRA or ADMCC status" />
                </div>
                <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send Project Brief'}
                </button>
                {status === 'error' && (
                  <p className="err" id="form-error" role="alert" style={{ textAlign: 'center' }}>
                    The brief didn’t send. Please email {SITE.email} or call {SITE.phone}.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Field({ id, name, label, error, required = true, ...rest }: { id: string; name: string; label: string; error?: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="f">
      <label htmlFor={id}>
        {label}
        {!required && <span style={{ fontWeight: 400, color: '#7C8AA5' }}> (optional)</span>}
      </label>
      <input id={id} name={name} required={required} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      {error && (
        <p className="err" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  )
}
