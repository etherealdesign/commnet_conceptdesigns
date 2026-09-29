import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { SERVICES } from '../../data/services'
import { OFFICES } from '../../data/company'
import { SITE, FORM_ENDPOINT } from '../../lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const OPTIONS = [...SERVICES.map((s) => s.title), 'Not sure yet']

/** What happens after the brief — the first three stages of PROCESS, in the reader's terms. */
const NEXT = [
  { t: 'An engineer reads it', d: 'The brief goes to the design team, not a sales queue.' },
  { t: 'Survey and applicability', d: 'A site visit, and a SIRA or ADMCC check where security is in scope.' },
  { t: 'Drawings and a priced BoQ', d: 'Reviewed with your consultant before anything is ordered.' },
]

export function Cta({
  defaultService,
  id = 'cta',
  title = 'Send us the drawings. An engineer replies.',
  lead = 'Scope, BoQ or a site address — whatever you have is enough to start.',
}: {
  defaultService?: string
  id?: string
  title?: string
  lead?: string
}) {
  const options = defaultService && !OPTIONS.includes(defaultService) ? [defaultService, ...OPTIONS] : OPTIONS
  const [service, setService] = useState(defaultService ?? OPTIONS[0]!)
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
    <section id={id} className="cta">
      <div className="wrap cta-card">
        <div className="cta-copy rv">
          <span className="eyebrow">Start a project</span>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
          <ol className="cta-next">
            {NEXT.map((n) => (
              <li key={n.t}>
                <b>{n.t}</b>
                <span>{n.d}</span>
              </li>
            ))}
          </ol>
          <p className="cta-call">
            Or call{' '}
            {OFFICES.map((o, i) => (
              <span key={o.city}>
                {i > 0 && ' · '}
                {o.locality} <a href={o.phoneHref}>{o.phone}</a>
              </span>
            ))}
          </p>
        </div>
        <div className="form rv">
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
                <fieldset className="f pills">
                  <legend>What is in scope?</legend>
                  <input type="hidden" name="service" value={service} />
                  <div>
                    {options.map((o) => (
                      <button type="button" key={o} className={service === o ? 'on' : undefined} aria-pressed={service === o} onClick={() => setService(o)}>
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="f">
                  <label htmlFor="ms">Project brief</label>
                  <textarea id="ms" name="message" rows={4} placeholder="Site, scope, timeline and SIRA or ADMCC status" />
                </div>
                <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send the brief'} <ArrowRight aria-hidden="true" />
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
