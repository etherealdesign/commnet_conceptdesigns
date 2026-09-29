import { Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/PageHero'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { CtaBlock } from '@/components/shared/CtaBlock'
import { Seo } from '@/components/shared/Seo'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { services } from '@/data/services'
import { solutions } from '@/data/solutions'
import { breadcrumbSchema, webPageSchema } from '@/utils/schema'

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

const DESC =
  'The five systems Commnet installs: structured cabling and containment, networks and compute, security systems, AV and guest technology, and critical power and cooling.'

export function ServicesHub() {
  const ref = useReveal<HTMLElement>()

  return (
    <>
      <Seo
        title="Services, the five systems we install"
        description={DESC}
        path="/services"
        graph={[webPageSchema('Services', DESC, '/services'), breadcrumbSchema(CRUMBS)]}
      />
      <PageHero
        index={1}
        eyebrow="Axis A · What we install"
        title="Five systems."
        muted="No overlapping disciplines."
        definition="ELV is the trade, not a service card. These are the five leaf disciplines underneath it, each with its own evidence in the register. Structured cabling is the spine of fourteen of our eighteen documented contracts; the others sit on top of it."
        crumbs={CRUMBS}
        meta={[
          { label: 'Systems', value: 'Five' },
          { label: 'Cabling contracts', value: '14 of 18' },
          { label: 'Emirates', value: 'Dubai · AUH · SHJ' },
          { label: 'Engineering', value: 'Chennai centre' },
        ]}
      />

      <Block ref={ref} section="Systems" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
        <SectionLabel index={2} aside="Axis A">
          The systems
        </SectionLabel>

        <ol className="mt-10 border-t border-ink/15 md:mt-14">
          {services.map((s) => {
            const envs = solutions.filter((e) => e.uses.includes(s.code))
            return (
              <li key={s.slug} data-reveal>
                <Link
                  to={`/services/${s.slug}`}
                  className="group grid gap-6 border-b border-ink/12 py-8 rounded-[var(--r-card)] transition-colors duration-500 hover:bg-cream md:grid-cols-12 md:px-4 md:py-10"
                >
                  <div className="flex items-start justify-between md:col-span-2 md:block">
                    <span className="mono text-grey">{s.code}</span>
                    <span className="text-13 text-grey md:mt-2 md:block">{s.count} of 18 contracts</span>
                  </div>
                  <div className="md:col-span-5">
                    <h2 className="d-2 transition-colors duration-500 group-hover:text-primary">{s.title}</h2>
                    <p className="mt-4 max-w-md text-16 text-grey">{s.summary}</p>
                    <p className="mt-4 max-w-md text-14 font-medium text-ink">{s.evidence}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="mono text-grey">Delivered inside</p>
                    <ul className="mt-3 flex flex-col gap-1.5 text-14">
                      {envs.map((e) => (
                        <li key={e.slug}>{e.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative md:col-span-2">
                    <img src={s.media} alt={s.mediaAlt} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-[var(--r-card)] object-cover opacity-90 md:aspect-[3/4]" />
                    <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-[var(--r-ctl)] bg-white text-ink transition-colors duration-400 group-hover:bg-primary group-hover:text-white">
                      <Arrow className="size-4 -rotate-45" />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>

        <div data-reveal className="brackets mt-16 max-w-3xl px-6 py-8 md:mt-24 md:px-10 md:py-10">
          <span className="bk" aria-hidden="true" />
          <p className="mono text-grey">A note on taxonomy</p>
          <p className="d-3 mt-4">You will not find a &ldquo;Data Centres&rdquo; or &ldquo;ICT Infrastructure&rdquo; card here.</p>
          <p className="mt-4 max-w-xl text-16 text-grey">
            A data centre is an environment built from these systems, not a system itself, and ICT infrastructure is
            cabling plus networks under another name. Environments live under{' '}
            <Link to="/solutions" className="ul-link text-ink">
              Solutions
            </Link>
            .
          </p>
        </div>
      </Block>

      <CtaBlock index={3} />
    </>
  )
}
