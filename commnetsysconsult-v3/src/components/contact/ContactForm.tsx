import { useRef, useState, type FormEvent } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Button } from '@/components/shared/Button'
import { cn } from '@/lib/utils'

const PROJECT_TYPES = ['Data Centre / IT Room', 'Command / Security Centre', 'Hotel / Resort', 'Corporate Fit-out', 'Event / Rapid Deployment', 'AMC / SLA']

// CX_FORM_ENDPOINT, see SITES.md. Wire this to a real endpoint before launch.
const CX_FORM_ENDPOINT = import.meta.env.VITE_CX_FORM_ENDPOINT ?? ''

function Field({
  label,
  name,
  type = 'text',
  required,
  as = 'input',
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  as?: 'input' | 'textarea'
}) {
  const cls =
    'w-full rounded border border-ink/15 bg-transparent px-3 py-3 text-13 text-ink outline-none transition-colors duration-300 placeholder:text-grey/70 focus:border-ink'
  return (
    <label className="flex flex-col gap-2">
      <span className="text-11 text-grey">
        {label}
        {required && ' *'}
      </span>
      {as === 'textarea' ? (
        <textarea name={name} required={required} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  )
}

/**
 * The enquiry form. Fires the endpoint when one is configured, otherwise
 * settles into the success state so the flow can be walked through.
 */
export function ContactForm({ className, onSubmitted }: { className?: string; onSubmitted?: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  const checkRef = useRef<SVGPathElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    if (CX_FORM_ENDPOINT) {
      try {
        await fetch(CX_FORM_ENDPOINT, { method: 'POST', body: new FormData(e.currentTarget) })
      } catch {
        // fail silently to the success state per current spec
      }
    }
    setBusy(false)
    setSubmitted(true)
    onSubmitted?.()
    requestAnimationFrame(() => {
      const path = checkRef.current
      const box = boxRef.current
      if (!path || !box || prefersReducedMotion()) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.fromTo(box, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' })
      gsap.to(path, { strokeDashoffset: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' })
    })
  }

  if (submitted) {
    return (
      <div ref={boxRef} className={cn('flex min-h-80 flex-col items-center justify-center text-center', className)}>
        <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <path ref={checkRef} d="M18 33L27 42L46 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="mt-6 text-21">Enquiry received.</h3>
        <p className="mt-3 max-w-xs text-13 text-grey">An engineer reads every enquiry. We will be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-6', className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-11 text-grey">Project type</legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <label
              key={t}
              className="chip chip--line cursor-pointer transition-colors duration-300 has-checked:bg-ink has-checked:text-cream has-focus-visible:outline-2 has-focus-visible:outline-primary"
            >
              <input type="radio" name="projectType" value={t} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex flex-col gap-2">
        <span className="text-11 text-grey">Upload BoQ (optional)</span>
        <input
          name="boq"
          type="file"
          className="block w-full text-13 text-grey file:mr-4 file:cursor-pointer file:rounded-full file:border file:border-ink/15 file:bg-transparent file:px-4 file:py-2 file:text-13 file:text-ink"
        />
      </label>
      <Field label="Message" name="message" as="textarea" required />
      <div className="flex items-center justify-between gap-6">
        <p className="text-11 text-grey">Scope, a BoQ or a site address is enough to start.</p>
        <Button type="submit" disabled={busy}>
          Send enquiry
        </Button>
      </div>
    </form>
  )
}
