import { Link } from 'react-router-dom'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { solutions } from '@/data/solutions'
import { regulatorPhrase } from '@/data/claims'
import { Block } from '@/components/shared/Block'
import { Logo } from '@/components/shared/Logo'

const COMPANY = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/** Navy, four columns: the company and its two offices, then the site map. */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <Block as="footer" isDark className="margin-px-1 border-t border-white/10 bg-ink pb-8 pt-16 text-white md:pt-20">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="flex flex-col gap-6 md:col-span-4">
          <div className="self-start">
            <Logo variant="light" height={30} />
          </div>
          <p className="max-w-sm text-14 text-white/70">
            {site.descriptor}. Design and detailed engineering in Chennai; commercial, field and commissioning teams in Dubai.
          </p>
          <p className="text-13 text-white/60">{regulatorPhrase}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-4">
          {site.offices.map((o) => (
            <div key={o.id} className="flex flex-col gap-1 text-14">
              <p className="mono mb-2 text-white/60">{o.city}</p>
              <p className="text-white/80">{o.role}</p>
              <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="ul-link mt-2 inline-block self-start u-num">
                {o.phone}
              </a>
              <a href={`mailto:${o.email}`} className="ul-link inline-block self-start">
                {o.email}
              </a>
            </div>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-3 md:col-span-4">
          <nav aria-label="Company" className="flex flex-col gap-2 text-14">
            <p className="mono mb-2 text-white/60">Company</p>
            {COMPANY.map((l) => (
              <Link key={l.to} to={l.to} className="transition-opacity duration-300 hover:opacity-60">
                {l.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Systems" className="flex flex-col gap-2 text-14">
            <p className="mono mb-2 text-white/60">Systems</p>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="transition-opacity duration-300 hover:opacity-60">
                {s.title}
              </Link>
            ))}
          </nav>
          <nav aria-label="Environments" className="flex flex-col gap-2 text-14">
            <p className="mono mb-2 text-white/60">Environments</p>
            {solutions.map((s) => (
              <Link key={s.slug} to={`/solutions/${s.slug}`} className="transition-opacity duration-300 hover:opacity-60">
                {s.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-white/12 pt-6 text-13 text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p>{site.emirates.join(' · ')}</p>
      </div>
    </Block>
  )
}
