import { Navigate, useParams, Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/Container'
import { SpecPanel } from '@/components/shared/SpecPanel'
import { RelatedProjects } from '@/components/shared/RelatedProjects'
import { CtaBand } from '@/components/shared/CtaBand'
import { Faq } from '@/components/faq/Faq'
import { Seo } from '@/components/shared/Seo'
import { Process } from '@/components/process/Process'
import { useReveal } from '@/hooks/useReveal'
import { serviceBySlug, services } from '@/data/services'
import { projectsBySystem } from '@/data/projects'
import { solutions } from '@/data/solutions'
import { faqItems } from '@/data/faq'
import { breadcrumbSchema, serviceSchema, webPageSchema, faqSchema } from '@/utils/schema'
import { splitTitle } from '@/utils/title'

export function ServiceDetail() {
  const { slug = '' } = useParams()
  const service = serviceBySlug(slug)
  const ref = useReveal<HTMLDivElement>([slug])

  if (!service) return <Navigate to="/services" replace />

  const path = `/services/${service.slug}`
  const related = projectsBySystem(service.code)
  const environments = solutions.filter((s) => s.uses.includes(service.code))
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path },
  ]
  const pageFaq = faqItems.slice(0, 5)
  const [title, muted] = splitTitle(service.pageH1)

  return (
    <>
      <Seo
        title={service.pageH1}
        description={service.summary}
        path={path}
        graph={[
          webPageSchema(service.pageH1, service.summary, path),
          breadcrumbSchema(crumbs),
          serviceSchema(service.title, service.definition, path),
          faqSchema(pageFaq),
        ]}
      />

      <PageHero
        eyebrow={`System ${service.code} · What we install`}
        title={title}
        muted={muted}
        definition={service.definition}
        crumbs={crumbs}
        media={service.media}
        mediaAlt={service.mediaAlt}
        meta={[
          { label: 'Register evidence', value: `${service.count} of 18` },
          { label: 'Discipline', value: service.title.split(' & ')[0] },
          { label: 'Emirates', value: '3' },
          { label: 'Engineering', value: 'Chennai' },
        ]}
      />

      <section className="py-16 md:py-24" ref={ref}>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4">
              <p className="u-eyebrow" data-reveal>
                What we deliver
              </p>
              <h2 className="mt-6 text-25 md:text-36" data-reveal>
                Scope, written the way a BoQ is written.
              </h2>
              <p className="mt-4 max-w-xs text-13 text-grey" data-reveal>
                {service.evidence}
              </p>
            </div>
            <div className="md:col-span-8">
              <SpecPanel rows={service.deliver} />
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12">
            <figure data-reveal className="md:col-span-7 overflow-clip rounded-sm bg-ink">
              <img
                src={service.media}
                alt={service.mediaAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] h-full w-full object-cover"
              />
            </figure>

            <div className="grid gap-6 md:col-span-5 md:grid-rows-2">
              <div data-reveal className="rounded-sm bg-tint p-7 md:p-8">
                <p className="u-eyebrow">Delivered inside</p>
                <ul className="mt-6 space-y-3">
                  {environments.map((e) => (
                    <li key={e.slug}>
                      <Link to={`/solutions/${e.slug}`} className="ul-link text-16">
                        {e.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal className="rounded-sm border border-ink/12 p-7 md:p-8">
                <p className="u-eyebrow">Other systems</p>
                <ul className="mt-6 space-y-3">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`} className="ul-link text-13 text-grey transition-colors hover:text-ink">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <RelatedProjects
        projects={related}
        heading={`${related.length} contract${related.length === 1 ? '' : 's'} evidencing this system`}
        intro="Every card links to the scope, quantities and duration as delivered."
      />

      <Process />
      <Faq items={pageFaq} heading="Questions we get on this scope." />
      <CtaBand />
    </>
  )
}
