import { Navigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Building2 } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Block } from '@/components/shared/Block'
import { Parallax } from '@/components/shared/Parallax'
import { work } from '@/data/home'
import { CtaBand } from '@/components/shared/CtaBand'
import { Seo } from '@/components/shared/Seo'
import { RelatedProjects } from '@/components/shared/RelatedProjects'
import { useReveal } from '@/hooks/useReveal'
import { projectBySlug, projects } from '@/data/projects'
import { serviceByCode } from '@/data/services'
import { solutionBySlug } from '@/data/solutions'
import { breadcrumbSchema, projectSchema, webPageSchema } from '@/utils/schema'

export function ProjectDetail() {
  const { slug = '' } = useParams()
  const p = projectBySlug(slug)
  const ref = useReveal<HTMLDivElement>([slug])

  if (!p) return <Navigate to="/projects" replace />

  const path = `/projects/${p.slug}`
  const environment = solutionBySlug(p.environmentSlug)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: p.name, path },
  ]
  const siblings = projects.filter((x) => x.environmentSlug === p.environmentSlug && x.slug !== p.slug)

  return (
    <>
      <Seo
        title={p.name}
        description={p.scope}
        path={path}
        graph={[webPageSchema(p.name, p.scope, path), breadcrumbSchema(crumbs), projectSchema(p)]}
      />

      <article>
        <Block isDark className="overflow-clip bg-ink pt-32 pb-0 text-cream lg:pt-40">
          <Container className="relative">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-13 text-cream/60 transition-colors hover:text-cream"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              The register
            </Link>

            <div className="mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div>
                <p className="u-eyebrow text-chip">{p.sector}</p>
                <h1 className="u-h1 mt-5 max-w-4xl">{p.name}</h1>
                <p className="mt-7 max-w-2xl text-white/75" style={{ fontSize: 'var(--fs-lead)', lineHeight: 1.6 }}>
                  {p.scope}
                </p>
              </div>

              <dl className="space-y-5 border-t border-white/15 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-chip" aria-hidden="true" />
                  <div>
                    <dt className="text-[0.6875rem] text-white/65">Location</dt>
                    <dd className="mt-1 text-sm">{p.location}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 shrink-0 text-chip" aria-hidden="true" />
                  <div>
                    <dt className="text-[0.6875rem] text-white/65">Duration</dt>
                    <dd className="mt-1 text-sm">{p.duration}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 size={15} className="mt-0.5 shrink-0 text-chip" aria-hidden="true" />
                  <div>
                    <dt className="text-[0.6875rem] text-white/65">
                      {p.prime ? 'Delivered under' : 'Client of record'}
                    </dt>
                    <dd className="mt-1 text-sm">{p.prime ?? p.clientOfRecord}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <Parallax distance={60} className="mt-14 aspect-[21/9] w-full overflow-clip rounded-t-sm">
              <img src={work.media[p.environmentSlug] ?? '/media/infrastructure-fiber.jpg'} alt="" className="h-full w-full object-cover" decoding="async" />
            </Parallax>
          </Container>
        </Block>

        <section className="bg-bg py-20 lg:py-28" ref={ref}>
          <Container>
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
              <div>
                <h2 className="u-h2 mt-4 text-navy" data-reveal>
                  What was actually delivered.
                </h2>

                <ul className="mt-11 grid gap-px overflow-hidden rounded-sm border border-navy/10 bg-navy/10 sm:grid-cols-2">
                  {p.facts.map((f) => (
                    <li key={f} data-reveal className="bg-cream p-7">
                      <p className="u-num text-[0.975rem] font-medium leading-snug tracking-tight text-navy">{f}</p>
                    </li>
                  ))}
                </ul>

                <p data-reveal className="mt-10 max-w-2xl text-sm leading-relaxed text-secondary">
                  Quantities are stated as delivered and traceable to the contract record.
                  Contract values are held in the company profile and shared on request, for
                  the eight contracts delivered under a main contractor, the value is the
                  prime&rsquo;s commercial information rather than ours to publish.
                </p>
              </div>

              <aside className="space-y-8">
                <div data-reveal className="rounded-sm border border-navy/10 bg-cream p-7">
                  <p className="text-xs text-secondary">Environment</p>
                  {environment && (
                    <Link
                      to={`/solutions/${environment.slug}`}
                      className="ul-link mt-4 block text-base font-medium tracking-tight text-navy transition-colors hover:text-primary"
                    >
                      {environment.title}
                    </Link>
                  )}
                </div>

                <div data-reveal className="rounded-sm border border-navy/10 bg-cream p-7">
                  <p className="text-xs text-secondary">Systems engaged</p>
                  <ul className="mt-5 space-y-3">
                    {p.systems.map((code) => {
                      const s = serviceByCode(code)
                      if (!s) return null
                      return (
                        <li key={code} className="flex items-baseline gap-3">
                          <span className="u-num text-xs font-medium text-primary">{code}</span>
                          <Link
                            to={`/services/${s.slug}`}
                            className="ul-link text-sm text-navy transition-colors hover:text-primary"
                          >
                            {s.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </article>

      <RelatedProjects projects={siblings} heading="Other contracts in this environment" />
      <CtaBand />
    </>
  )
}
