import { Link } from 'react-router-dom'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { solutions } from '@/data/solutions'
import { regulatorPhrase } from '@/data/claims'

/**
 * The footer is two things: a contact plate that closes every page with
 * the same ask (send the BoQ), and the site map underneath it in one line
 * of small type. Nothing decorative.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const { setModalOpen } = useHeaderStore()

  return (
    <footer className="margin-px-1 relative flex flex-col gap-6 py-8 md:py-5">
      <div className="flex flex-col items-center justify-center gap-12 rounded-lg bg-tint px-6 py-20 text-center md:py-24">
        <Logo variant="dark" height={40} />
        <div className="flex max-w-2xl flex-col items-center gap-6">
          <h2 className="text-25 md:text-36">Send the drawings. An engineer replies, not a sales desk.</h2>
          <p className="max-w-md text-13 text-grey">
            A scope, a bill of quantities or a site address is enough to start. Dubai head office for
            commercial and commissioning, Chennai engineering centre for the detailed design.
          </p>
          <Button variant="primary" theme="light" onClick={() => setModalOpen(true)}>
            Get in contact
          </Button>
        </div>
      </div>

      <div className="grid gap-8 border-t border-ink/10 pt-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3 text-13">
          <p className="text-ink">{site.legalName}</p>
          <p className="text-grey">{site.descriptor}</p>
          <p className="text-grey">{regulatorPhrase}</p>
          <ul className="mt-2 flex flex-col gap-1 text-grey">
            {site.offices.map((o) => (
              <li key={o.id}>
                <span className="text-ink">{o.city}</span> ·{' '}
                <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="u-num transition-colors hover:text-ink">
                  {o.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Systems" className="flex flex-col gap-2 text-13">
          <p className="text-grey">Systems</p>
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="transition-colors hover:text-grey">
              {s.title}
            </Link>
          ))}
        </nav>

        <nav aria-label="Environments" className="flex flex-col gap-2 text-13">
          <p className="text-grey">Environments</p>
          {solutions.map((s) => (
            <Link key={s.slug} to={`/solutions/${s.slug}`} className="transition-colors hover:text-grey">
              {s.title}
            </Link>
          ))}
        </nav>

        <nav aria-label="Company" className="flex flex-col gap-2 text-13">
          <p className="text-grey">Company</p>
          {[
            { label: 'Project register', to: '/projects' },
            { label: 'Compliance', to: '/compliance' },
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="transition-colors hover:text-grey">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 border-t border-ink/10 pt-5 text-11 text-grey sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {site.legalName}. All rights reserved.</p>
        <p>{site.offices.map((o) => o.city).join(' · ')} · {site.emirates.join(', ')}</p>
      </div>
    </footer>
  )
}
