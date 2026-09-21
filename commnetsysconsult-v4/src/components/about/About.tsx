import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReveal } from '@/hooks/useReveal'
import { site } from '@/data/site'
import { claims } from '@/data/claims'
import { projects } from '@/data/projects'

const STORY = [
  {
    title: 'Origin',
    body: claims.tradeLicenceYear
      ? `Founded in Dubai in ${claims.tradeLicenceYear} as a two-person cabling consultancy.`
      : 'Founded in Dubai in the early 2000s as a two-person cabling consultancy. The founding year is printed once the trade-licence issue year is confirmed.',
  },
  { title: 'Dubai head office', body: 'Commercial, field and commissioning teams, covering Dubai, Abu Dhabi and Sharjah.' },
  { title: 'Chennai engineering centre', body: 'Design and detailed engineering: racks, containment, power, network. Behind every UAE delivery.' },
  { title: 'The register', body: 'Eighteen documented contracts. Eight ran under a prime; the same prime came back three times.' },
]

/** The company in four rows, the two hubs as coordinates, the clients of record as one line. */
export function About() {
  const ref = useReveal<HTMLElement>()
  const names = projects.map((p) => (p.prime ? `${p.clientOfRecord} · via ${p.prime}` : p.clientOfRecord))

  return (
    <Block ref={ref} section="The company" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <SectionLabel index={2} aside="Two hubs · one team">
        The company
      </SectionLabel>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-6">
        <h2 className="d-1 md:col-span-7">
          <span className="block">
            One team,
          </span>
          <span className="block">
            <strong>two hubs.</strong>
          </span>
        </h2>
        <p data-reveal className="max-w-md text-16 text-grey md:col-span-4 md:col-start-9 md:self-end">
          Dubai runs the commercial, the field and the commissioning; Chennai does the detailed engineering behind it.
          One team is accountable from survey to handover, whether we are the prime or the subcontractor.
        </p>
      </div>

      <dl className="mt-16 grid gap-3 md:mt-24 md:grid-cols-4">
        {STORY.map((s, i) => (
          <div key={s.title} data-reveal className="flex flex-col gap-3 rounded-[var(--r-card)] bg-cream p-6">
            <dt className="mono text-grey">{String(i + 1).padStart(2, '0')}</dt>
            <dt className="d-3">{s.title}</dt>
            <dd className="text-14 text-grey">{s.body}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-16 grid gap-3 md:mt-24 md:grid-cols-2">
        {site.offices.map((o) => (
          <li key={o.id} data-reveal className="brackets bg-cream p-6 md:p-8">
            <span className="bk" aria-hidden="true" />
            <p className="mono text-grey">{o.countryCode}</p>
            <p className="d-2 mt-4">{o.city}</p>
            <p className="mt-2 text-14 text-grey">{o.role}</p>
            <p className="mt-6 flex flex-col gap-1 text-14">
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

      <div data-reveal className="mt-16 border-t border-ink/12 pt-6 md:mt-24">
        <p className="mono text-grey">Clients of record</p>
        <p className="mt-3 text-14 text-ink">{names.join('  ·  ')}</p>
      </div>
    </Block>
  )
}
