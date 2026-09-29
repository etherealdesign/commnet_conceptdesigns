import { Navigate, useParams, Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/PageHero'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { SpecPanel } from '@/components/shared/SpecPanel'
import { RelatedProjects } from '@/components/shared/RelatedProjects'
import { CtaBlock } from '@/components/shared/CtaBlock'
import { Faq } from '@/components/faq/Faq'
import { Seo } from '@/components/shared/Seo'
import { Method } from '@/components/home/Method'
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
  const ref = useReveal<HTMLElement>([slug])

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
        index={1}
        eyebrow={`System ${service.code} · What we install`}
        title={title}
        muted={muted}
        definition={service.definition}
        crumbs={crumbs}
        meta={[
          { label: 'Register evidence', value: `${service.count} of 18` },
          { label: 'Discipline', value: service.title.split(' & ')[0] },
          { label: 'Emirates', value: '3' },
          { label: 'Engineering', value: 'Chennai' },
        ]}
      />

      <Block ref={ref} section="Scope" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
        <SectionLabel index={2} aside={`${service.deliver.length} line items`}>
          What we deliver
        </SectionLabel>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <h2 className="d-2" data-reveal>
              Scope, written the way a BoQ is written.
            </h2>
            <p className="mt-6 max-w-xs text-14 text-grey" data-reveal>
              {service.evidence}
            </p>
            <img
              data-reveal
              src={service.media}
              alt={service.mediaAlt}
              loading="lazy"
              decoding="async"
              className="mt-8 aspect-[4/3] w-full rounded-[var(--r-card)] object-cover"
            />
          </div>
          <div className="md:col-span-8">
            <SpecPanel rows={service.deliver} />

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div data-reveal className="rounded-[var(--r-card)] border border-ink/12 p-6">
                <p className="mono text-grey">Delivered inside</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {environments.map((e) => (
                    <li key={e.slug}>
                      <Link to={`/solutions/${e.slug}`} className="ul-link d-3">
                        {e.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-reveal className="rounded-[var(--r-card)] border border-ink/12 p-6">
                <p className="mono text-grey">Other systems</p>
                <ul className="mt-4 flex flex-col gap-2 text-14">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`} className="ul-link text-grey transition-colors hover:text-ink">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Block>

      <RelatedProjects
        projects={related}
        index={3}
        heading={`${related.length} contract${related.length === 1 ? '' : 's'} evidencing this system`}
        intro="Every card links to the scope, quantities and duration as delivered."
      />
      <Method index={4} />
      <Faq items={pageFaq} index={5} heading="Questions we get on this scope." />
      <CtaBlock index={6} />
    </>
  )
}
