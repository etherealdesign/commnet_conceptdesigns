import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/shared/Logo'
import { Arrow } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { regulatorPhrase } from '@/data/claims'

const DESTINATIONS = [
  { label: 'Systems', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
]

const COMPANY = [
  { label: 'About', to: '/about' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

/**
 * The closing card. A statement and the site as four hairline rows at the
 * top, the enquiry and the small print underneath. The email typed here
 * travels into the contact panel, so the ask is never asked twice.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const { setModalOpen, setContactEmail } = useHeaderStore()
  const [email, setEmail] = useState('')

  const start = (e: FormEvent) => {
    e.preventDefault()
    setContactEmail(email)
    setModalOpen(true)
  }

  return (
    <footer className="margin-px-1 border-t border-ink/12 pb-8 pt-16 md:pb-10 md:pt-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h2 className="text-21 md:text-25">Send us the drawings.</h2>
          <p className="mt-2 max-w-md text-21 text-grey md:text-25">
            Commnet designs, installs, certifies and supports the systems a building runs on. One contract, one
            engineering team, from survey to handover.
          </p>
        </div>
        <nav aria-label="Destinations" className="md:col-span-6 md:col-start-7">
          <ul>
            {DESTINATIONS.map((d) => (
              <li key={d.to}>
                <Link to={d.to} className="hair-row group text-21 first:border-t md:text-25">
                  {d.label}
                  <Arrow className="size-4 shrink-0 -translate-x-1 self-center opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-6">
        <form onSubmit={start} className="md:col-span-4">
          <p className="text-13 text-grey">Enquiries</p>
          <div className="mt-4 flex max-w-md items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              aria-label="Your email"
              className="pill-field w-full flex-1"
            />
            <button
              type="submit"
              className="group flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-ink pl-5 pr-4 text-13 text-cream transition-colors duration-500 ease-[var(--ease-expo)] hover:bg-primary hover:text-white"
            >
              Start
              <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
            </button>
          </div>
          <p className="mt-3 max-w-md text-13 text-grey">
            A scope, a bill of quantities or a site address is enough to start. An engineer reads every enquiry.
          </p>
        </form>

        <nav aria-label="Company" className="flex flex-col gap-2 text-13 md:col-span-2 md:col-start-6">
          <p className="text-grey">Company</p>
          {COMPANY.map((l) => (
            <Link key={l.to} to={l.to} className="transition-colors hover:text-grey">
              {l.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Systems" className="flex flex-col gap-2 text-13 md:col-span-3">
          <p className="text-grey">Systems</p>
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="transition-colors hover:text-grey">
              {s.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 text-13 md:col-span-2 md:col-start-11">
          {site.offices.map((o) => (
            <div key={o.id} className="flex flex-col gap-1">
              <p className="text-grey">{o.city}</p>
              <a href={`tel:${o.phoneHref}`} className="u-num transition-colors hover:text-grey">
                {o.phone}
              </a>
            </div>
          ))}
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-grey">
            {site.email}
          </a>
        </div>
      </div>

      <p className="mt-16 max-w-5xl text-11 text-grey md:mt-20">
        {regulatorPhrase}. Test reports, commissioning records and as-built documentation are issued for every contract,
        whether we are the prime or a subcontractor. Quantities on this site are as delivered and traced to the project
        register; contract values stay in the company profile and travel with the prequalification pack.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-6 text-13 text-grey">
        <div className="flex items-center gap-4">
          <Logo variant="dark" height={20} />
          <p>
            © {year} {site.legalName}
          </p>
        </div>
        <p>{site.emirates.join(' · ')}</p>
      </div>
    </footer>
  )
}
