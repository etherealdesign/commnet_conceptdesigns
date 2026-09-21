import { Navigate, useParams, Link } from 'react-router-dom'
import { PageHero } from '@/components/shared/PageHero'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { SpecPanel } from '@/components/shared/SpecPanel'
import { RelatedProjects } from '@/components/shared/RelatedProjects'
import { CtaBlock } from '@/components/shared/CtaBlock'
import { Seo } from '@/components/shared/Seo'
import { Method } from '@/components/home/Method'
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
  const ref = useReveal<HTMLElement>([slug])

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
        index={1}
        eyebrow={`Environment ${solution.code} · Where we deliver it`}
        title={title}
        muted={muted}
        definition={solution.definition}
        crumbs={crumbs}
        meta={[
          { label: 'Register evidence', value: `${related.length} of 18` },
          { label: 'Systems engaged', value: String(solution.uses.length) },
          { label: 'Contract model', value: 'One package' },
          { label: 'Emirates', value: '3' },
        ]}
      />

      <Block ref={ref} section="The package" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
        <SectionLabel index={2} aside={`${solution.deliver.length} line items`}>
          The package
        </SectionLabel>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <h2 className="d-2" data-reveal>
              What arrives in the package.
            </h2>
            <p className="mt-6 max-w-xs text-14 text-grey" data-reveal>
              {solution.evidence}
            </p>
            <img
              data-reveal
              src={solution.media}
              alt={solution.mediaAlt}
              loading="lazy"
              decoding="async"
              className="mt-8 aspect-[4/3] w-full rounded-[var(--r-card)] object-cover"
            />
          </div>
          <div className="md:col-span-8">
            <SpecPanel rows={solution.deliver.map((d) => ({ title: d }))} />

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div data-reveal className="rounded-[var(--r-card)] border border-ink/12 p-6">
                <p className="mono text-grey">Systems engaged</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {solution.uses.map((code) => {
                    const s = serviceByCode(code)
                    if (!s) return null
                    return (
                      <li key={code} className="flex items-baseline gap-3">
                        <span className="mono text-grey">{code}</span>
                        <Link to={`/services/${s.slug}`} className="ul-link d-3">
                          {s.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div data-reveal className="rounded-[var(--r-card)] border border-ink/12 p-6">
                <p className="mono text-grey">Other environments</p>
                <ul className="mt-4 flex flex-col gap-2 text-14">
                  {solutions
                    .filter((s) => s.slug !== solution.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link to={`/solutions/${s.slug}`} className="ul-link text-grey transition-colors hover:text-ink">
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
        heading={`${related.length} contract${related.length === 1 ? '' : 's'} in this environment`}
      />
      <Method index={4} />
      <Faq items={pageFaq} index={5} heading="Questions on this package." />
      <CtaBlock index={6} />
    </>
  )
}
