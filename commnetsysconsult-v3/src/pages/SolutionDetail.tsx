import { Navigate, useParams, Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/Container'
import { SpecPanel } from '@/components/shared/SpecPanel'
import { RelatedProjects } from '@/components/shared/RelatedProjects'
import { Seo } from '@/components/shared/Seo'
import { Process } from '@/components/process/Process'
import { Faq } from '@/components/faq/Faq'
import { useReveal } from '@/hooks/useReveal'
import { solutionBySlug, solutions } from '@/data/solutions'
import { serviceByCode } from '@/data/services'
import { projectsByEnvironment } from '@/data/projects'
import { faqItems } from '@/data/faq'
import { breadcrumbSchema, serviceSchema, webPageSchema, faqSchema } from '@/utils/schema'
import { splitTitle } from '@/utils/title'

export function SolutionDetail() {
  const { slug = '' } = useParams()
  const solution = solutionBySlug(slug)
  const ref = useReveal<HTMLDivElement>([slug])

  if (!solution) return <Navigate to="/solutions" replace />

  const path = `/solutions/${solution.slug}`
  const related = projectsByEnvironment(solution.slug)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: solution.title, path },
  ]
  const pageFaq = faqItems.slice(2, 7)
  const [title, muted] = splitTitle(solution.pageH1)

  return (
    <>
      <Seo
        title={solution.pageH1}
        description={solution.summary}
        path={path}
        graph={[
          webPageSchema(solution.pageH1, solution.summary, path),
          breadcrumbSchema(crumbs),
          serviceSchema(solution.title, solution.definition, path),
          faqSchema(pageFaq),
        ]}
      />

      <PageHero
        eyebrow={`Environment ${solution.code} · Where we deliver it`}
        title={title}
        muted={muted}
        definition={solution.definition}
        crumbs={crumbs}
        media={solution.media}
        mediaAlt={solution.mediaAlt}
        meta={[
          { label: 'Register evidence', value: `${related.length} of 18` },
          { label: 'Systems engaged', value: String(solution.uses.length) },
          { label: 'Contract model', value: 'One package' },
          { label: 'Emirates', value: '3' },
        ]}
      />

      <section className="py-16 md:py-24" ref={ref}>
        <Container>
          <div className="grid gap-10 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4">
              <p className="u-eyebrow" data-reveal>
                The package
              </p>
              <h2 className="mt-6 text-25 md:text-36" data-reveal>
                What arrives in the package.
              </h2>
              <p className="mt-4 max-w-xs text-13 text-grey" data-reveal>
                {solution.evidence}
              </p>
            </div>
            <div className="md:col-span-8">
              <SpecPanel rows={solution.deliver.map((d) => ({ title: d }))} />
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12">
            <figure data-reveal className="md:col-span-7 overflow-clip rounded-sm bg-ink">
              <img
                src={solution.media}
                alt={solution.mediaAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] h-full w-full object-cover"
              />
            </figure>

            <div className="grid gap-6 md:col-span-5 md:grid-rows-2">
              <div data-reveal className="rounded-sm bg-tint p-7 md:p-8">
                <p className="u-eyebrow">Systems engaged</p>
                <ul className="mt-6 space-y-3">
                  {solution.uses.map((code) => {
                    const s = serviceByCode(code)
                    if (!s) return null
                    return (
                      <li key={code} className="flex items-baseline gap-3">
                        <span className="u-num text-11 text-primary">{code}</span>
                        <Link to={`/services/${s.slug}`} className="ul-link text-16">
                          {s.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div data-reveal className="rounded-sm border border-ink/12 p-7 md:p-8">
                <p className="u-eyebrow">Other environments</p>
                <ul className="mt-6 space-y-3">
                  {solutions
                    .filter((s) => s.slug !== solution.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link to={`/solutions/${s.slug}`} className="ul-link text-13 text-grey transition-colors hover:text-ink">
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
        heading={`${related.length} contract${related.length === 1 ? '' : 's'} in this environment`}
      />
      <Process />
      <Faq items={pageFaq} heading="Questions on this package." />
    </>
  )
}
