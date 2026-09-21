import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ContactForm } from './ContactForm'
import { site } from '@/data/site'

export function Contact() {
  return (
    <Block anchor="contact" section="Enquiry" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <SectionLabel index={2} aside="An engineer reads every enquiry">
        Enquiry
      </SectionLabel>
      <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <h2 className="d-2">
            Send us the drawings. <em>An engineer replies.</em>
          </h2>
          <p className="mt-5 max-w-sm text-16 text-grey">Scope, BoQ or a site address. That is enough to start.</p>
          <ul className="mt-10 flex flex-col gap-6">
            {site.offices.map((o) => (
              <li key={o.id} className="brackets p-5">
                <span className="bk" aria-hidden="true" />
                <p className="mono text-grey">{o.city} · {o.id === 'dubai' ? 'HQ' : 'Engineering centre'}</p>
                <p className="mt-2 text-14 text-grey">{o.role}</p>
                <p className="mt-3 flex flex-col gap-1 text-14">
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="ul-link inline-block self-start u-num">
                    {o.phone}
                  </a>
                  <a href={`mailto:${o.email}`} className="ul-link inline-block self-start">
                    {o.email}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[var(--r-frame)] border border-ink/10 bg-cream p-6 md:col-span-8 md:p-10">
          <ContactForm />
        </div>
      </div>
    </Block>
  )
}
