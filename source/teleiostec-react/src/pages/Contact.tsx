import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { Split } from '@/components/Split'
import { Reveal } from '@/components/Reveal'
import { Magnetic } from '@/components/Magnetic'
import { ParticleField } from '@/components/ParticleField'
import { contact, social } from '@/data/site'
import { cn } from '@/lib/cn'

const types = ['Residential', 'Hospitality', 'Commercial', 'Joinery only', 'MEP only']
const budgets = ['< AED 500k', 'AED 500k – 2M', 'AED 2M – 5M', 'AED 5M +']

function Chips({ name, options, value, onChange }: { name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="kick mb-4">{name}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className={cn('cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1', value === o ? 'border-ink bg-ink text-ivory' : 'border-[var(--line)] hover:border-ink')}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline?: boolean }) {
  const { multiline, ...rest } = props
  const cls = 'peer w-full border-b border-[var(--line)] bg-transparent pb-3 pt-7 text-fluid-lg outline-none transition-colors placeholder:text-transparent focus:border-ink'
  return (
    <label className="relative block">
      {multiline ? <textarea rows={4} placeholder={label} className={cls + ' resize-none'} {...rest} /> : <input placeholder={label} className={cls} {...rest} />}
      <span className="pointer-events-none absolute left-0 top-7 text-fluid-lg text-muted transition-all duration-500 ease-out-expo peer-focus:top-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em]">
        {label}
      </span>
    </label>
  )
}

export default function Contact() {
  const [type, setType] = useState('')
  const [budget, setBudget] = useState('')
  const [sent, setSent] = useState(false)

  // No backend: compose the enquiry in the visitor's mail client.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = [
      `Name: ${f.get('name')}`, `Email: ${f.get('email')}`, `Phone: ${f.get('phone') || '—'}`,
      `Project type: ${type || '—'}`, `Budget: ${budget || '—'}`, '', String(f.get('message') || ''),
    ].join('\n')
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`New project enquiry — ${f.get('name')}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <Page label="Contact">
      <Seo
        title="Contact — Start a Project"
        description={`Start a project with Teleiostec. Studio at ${contact.address.join(', ')}. Email ${contact.email} or call ${contact.phone}.`}
        path="/contact"
        jsonLd={{ '@type': 'ContactPage', name: 'Contact Teleiostec', mainEntity: { '@id': 'https://www.teleiostec.com/#org' } }}
      />

      <section className="grain relative overflow-hidden bg-dark text-ivory">
        <ParticleField tone="dark" />
        <div className="wrap relative pt-[calc(var(--header-h)+clamp(60px,14vh,160px))] pb-[clamp(56px,10vh,120px)]">
          <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-dark">
            <span>Contact</span><span>(06)</span>
          </div>
          <Split as="h1" trigger="load" by="words" className="display text-fluid-4xl">Let’s create <em>better spaces.</em></Split>
          <div className="mt-16 grid gap-10 border-t border-[var(--line-dark)] pt-10 text-[14px] md:grid-cols-4">
            <Reveal><p className="kick mb-3 !text-muted-dark">Email</p><a href={`mailto:${contact.email}`} className="link-line">{contact.email}</a></Reveal>
            <Reveal delay={0.08}><p className="kick mb-3 !text-muted-dark">Phone</p><a href={contact.phoneHref} className="link-line">{contact.phone}</a></Reveal>
            <Reveal delay={0.16}><p className="kick mb-3 !text-muted-dark">Studio</p><a href={contact.mapHref} target="_blank" rel="noopener" className="link-line">{contact.address.join(', ')} ↗</a></Reveal>
            <Reveal delay={0.24}><p className="kick mb-3 !text-muted-dark">Follow</p><span className="flex gap-4">{social.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener" className="link-line">{s.label}</a>)}</span></Reveal>
          </div>
        </div>
      </section>

      <section className="wrap section grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Split as="h2" className="display text-fluid-2xl">Tell us about <em>your space.</em></Split>
          <Reveal delay={0.2}><p className="mt-6 max-w-[34ch] text-muted">A few details help us come back with the right people. We reply within two working days.</p></Reveal>
        </div>
        <form onSubmit={submit} className="space-y-12 md:col-span-7 md:col-start-6">
          <div className="grid gap-10 md:grid-cols-2">
            <Field label="Your name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
            <Field label="Location of the space" name="location" />
          </div>
          <Chips name="Project type" options={types} value={type} onChange={setType} />
          <Chips name="Budget" options={budgets} value={budget} onChange={setBudget} />
          <Field label="Tell us about the project" name="message" multiline />
          <div className="flex flex-wrap items-center gap-8">
            <Magnetic>
              <button type="submit" className="group relative overflow-hidden rounded-full bg-ink px-10 py-5 text-[12px] uppercase tracking-[0.18em] text-ivory">
                <span className="absolute inset-0 translate-y-full rounded-full bg-brand transition-transform duration-700 ease-out-expo group-hover:translate-y-0" />
                <span className="relative">Send enquiry →</span>
              </button>
            </Magnetic>
            {sent && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} role="status" className="text-[14px] text-muted">
                Your mail app should open with the enquiry ready to send. If not, write to <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>.
              </motion.p>
            )}
          </div>
        </form>
      </section>
    </Page>
  )
}
