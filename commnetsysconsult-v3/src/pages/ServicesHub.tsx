import { Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/Container'
import { Seo } from '@/components/shared/Seo'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { services } from '@/data/services'
import { breadcrumbSchema, webPageSchema } from '@/utils/schema'

const CRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

const DESC =
  'The six disciplines Commnet delivers: structured cabling and containment, networks and compute, security systems, AV and guest technology, critical power and cooling, and cyber security and CSOC integration.'

export function ServicesHub() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <>
      <Seo
        title="Services, the six disciplines we deliver"
        description={DESC}
        path="/services"
        graph={[webPageSchema('Services', DESC, '/services'), breadcrumbSchema(CRUMBS)]}
      />
      <PageHero
        eyebrow="Axis A · What we install"
        title="Six disciplines."
        muted="No overlapping disciplines."
        definition="ELV is the trade, not a service card. These are the six disciplines underneath it, each with its own evidence in the register. Structured cabling is the spine of fourteen of our eighteen documented contracts; the others sit on top of it."
        crumbs={CRUMBS}
        media="/media/professional-it.jpg"
        mediaAlt="Engineering team on a data-centre walkway"
        meta={[
          { label: 'Disciplines', value: 'Six' },
          { label: 'Cabling contracts', value: '14 of 18' },
          { label: 'Emirates', value: 'Dubai · AUH · SHJ' },
          { label: 'Engineering', value: 'Chennai centre' },
        ]}
      />

      <section className="py-16 md:py-24" ref={ref}>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                data-reveal
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-clip rounded-sm bg-ink text-cream md:aspect-[16/10]"
              >
                <img
                  src={s.media}
                  alt={s.mediaAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/35 to-ink/10" aria-hidden="true" />

                <div className="relative flex items-center justify-between p-6 pb-0 md:p-8 md:pb-0">
                  <span className="u-num text-11 text-cream/70">{s.code}</span>
                  <span className="chip chip--line-dark text-11">{s.count} of 18 contracts</span>
                </div>
                <div className="relative mt-auto p-6 md:p-8">
                  <h2 className="text-25 md:text-36">{s.title}</h2>
                  <p className="mt-3 max-w-md text-13 text-cream/75">{s.summary}</p>
                  <p className="mt-6 flex items-center gap-2 text-13">
                    What we deliver
                    <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}

            <div data-reveal className="flex flex-col justify-center rounded-sm bg-tint p-8 md:p-10">
              <p className="u-eyebrow">A note on taxonomy</p>
              <p className="mt-6 max-w-md text-16 leading-[1.4]">
                You will not find a &ldquo;Data Centres&rdquo; or &ldquo;ICT Infrastructure&rdquo; card here.
              </p>
              <p className="mt-4 max-w-md text-13 text-grey">
                A data centre is an environment built from these systems, not a system itself, and ICT
                infrastructure is cabling plus networks under another name. Environments live under{' '}
                <Link to="/solutions" className="ul-link text-ink">
                  Solutions
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
