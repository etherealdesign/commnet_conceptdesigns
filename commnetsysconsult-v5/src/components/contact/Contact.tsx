import { Block } from '@/components/shared/Block'
import { ContactForm } from './ContactForm'
import { site } from '@/data/site'

export function Contact() {
  return (
    <Block anchor="contact" className="theme-light grid-container py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-6">
        <div className="md:span-w-5">
          <h2 className="t-h2">Send us the drawings. An engineer replies.</h2>
          <p className="t-body mt-5 max-w-sm text-fg-muted">Scope, BoQ or a site address, an engineer reads every enquiry.</p>
          <ul className="mt-10 flex flex-col gap-6 t-small text-fg-muted">
            {site.offices.map((o) => (
              <li key={o.id}>
                <p className="mono text-fg">
                  {o.city} · {o.id === 'dubai' ? 'HQ' : 'Engineering centre'}
                </p>
                <p className="mt-1">{o.role}</p>
                <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="u-num mt-2 block transition-colors hover:text-fg">
                  {o.phone}
                </a>
                <a href={`mailto:${o.email}`} className="block transition-colors hover:text-fg">
                  {o.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-line bg-lighter p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </Block>
  )
}
