import { Navigate, useParams, Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { CtaBlock } from '@/components/shared/CtaBlock'
import { Seo } from '@/components/shared/Seo'
import { RelatedProjects } from '@/components/shared/RelatedProjects'
import { PageHero } from '@/components/shared/PageHero'
import { useReveal } from '@/hooks/useReveal'
import { projectBySlug, projects } from '@/data/projects'
import { serviceByCode } from '@/data/services'
import { solutionBySlug } from '@/data/solutions'
import { work } from '@/data/home'
import { breadcrumbSchema, projectSchema, webPageSchema } from '@/utils/schema'

export function ProjectDetail() {
  const { slug = '' } = useParams()
  const p = projectBySlug(slug)
  const ref = useReveal<HTMLElement>([slug])

  if (!p) return <Navigate to="/projects" replace />

  const path = `/projects/${p.slug}`
  const environment = solutionBySlug(p.environmentSlug)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: p.name, path },
  ]
  const siblings = projects.filter((x) => x.environmentSlug === p.environmentSlug && x.slug !== p.slug)
  const no = String(projects.indexOf(p) + 1).padStart(2, '0')

  return (
    <>
      <Seo
        title={p.name}
        description={p.scope}
        path={path}
        graph={[webPageSchema(p.name, p.scope, path), breadcrumbSchema(crumbs), projectSchema(p)]}
      />

      <article>
        <PageHero
          index={1}
          eyebrow={`Register entry ${no} · ${p.sector}`}
          title={p.name}
          definition={p.scope}
          crumbs={crumbs}
          meta={[
            { label: 'Location', value: p.location },
            { label: 'Duration', value: p.duration },
            { label: p.prime ? 'Delivered under' : 'Client of record', value: p.prime ?? p.clientOfRecord },
            { label: 'Environment', value: p.environment },
          ]}
        />

        <Block ref={ref} section="Delivered" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
          <SectionLabel index={2} aside={`${p.facts.length} measured facts`}>
            What was delivered
          </SectionLabel>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-7">
              <div data-reveal className="relative aspect-[16/10] overflow-clip rounded-[var(--r-card)] bg-ink">
                <img src={work.media[p.environmentSlug] ?? '/media/infrastructure-fiber.jpg'} alt="" className="h-full w-full object-cover opacity-85" decoding="async" />
                <span className="chip chip--tint absolute left-4 top-4">Register entry {no}</span>
              </div>
              <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                {p.facts.map((f, i) => (
                  <li key={f} data-reveal className="rounded-[var(--r-card)] bg-cream p-6">
                    <p className="mono text-grey">{String(i + 1).padStart(2, '0')}</p>
                    <p className="d-3 mt-3">{f}</p>
                  </li>
                ))}
              </ol>
              <p data-reveal className="mt-8 max-w-2xl text-14 text-grey">
                Quantities are stated as delivered and traceable to the contract record. Contract values are held in the
                company profile and shared on request; for the eight contracts delivered under a main contractor, the
                value is the prime&rsquo;s commercial information rather than ours to publish.
              </p>
            </div>

            <aside className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
              <div data-reveal className="rounded-[var(--r-card)] border border-ink/12 p-6">
                <p className="mono text-grey">Environment</p>
                {environment && (
                  <Link to={`/solutions/${environment.slug}`} className="ul-link d-3 mt-4 inline-block">
                    {environment.title}
                  </Link>
                )}
              </div>
              <div data-reveal className="rounded-[var(--r-card)] border border-ink/12 p-6">
                <p className="mono text-grey">Systems engaged</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {p.systems.map((code) => {
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
              <Link to="/projects" className="ul-link inline-block text-14 font-medium text-grey transition-colors hover:text-ink">
                ← Back to the register
              </Link>
            </aside>
          </div>
        </Block>
      </article>

      <RelatedProjects projects={siblings} index={3} heading="Other contracts in this environment" />
      <CtaBlock index={4} />
    </>
  )
}
