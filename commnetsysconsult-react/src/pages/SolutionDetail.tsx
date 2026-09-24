import { Link, useParams } from 'react-router'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { SectionHead } from '../components/sections/SectionHead'
import { ProjectsReel } from '../components/sections/ProjectsReel'
import { SolutionsGrid } from '../components/sections/SolutionsGrid'
import { Faq } from '../components/sections/Faq'
import { Cta } from '../components/sections/Cta'
import { ProjectCard } from '../components/ProjectCard'
import { Arrow } from '../components/Arrow'
import { solutionBySlug } from '../data/solutions'
import { SERVICES } from '../data/services'
import { projectsFor } from '../data/projects'
import { SITE, absUrl } from '../lib/site'
import { IMG } from '../lib/images'
import NotFound from './NotFound'

export default function SolutionDetail() {
  const { slug = '' } = useParams()
  const s = solutionBySlug(slug)
  if (!s) return <NotFound />

  const projects = projectsFor({ solution: s.slug })
  const systems = SERVICES.filter((sv) => s.systems.includes(sv.slug))
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: s.title, path: `/solutions/${s.slug}` },
  ]
  const reel = projects.length >= 2

  return (
    <PageTransition label={s.title}>
      <Seo
        path={`/solutions/${s.slug}`}
        title={s.h1}
        description={s.definition.slice(0, 158).replace(/\s\S*$/, '') + '…'}
        image={IMG[s.img]}
        crumbs={crumbs}
        faq={s.faq}
        graph={[
          {
            '@type': 'Service',
            '@id': `${absUrl(`/solutions/${s.slug}`)}#service`,
            name: s.title,
            description: s.definition,
            provider: { '@id': `${SITE.url}/#organization` },
            areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`Solution · ${s.title}`}
        title={s.h1}
        lead={s.definition}
        img={s.img}
        actions={
          <Link className="btn btn-primary magnetic" to="/contact">
            Send us the drawings <Arrow />
          </Link>
        }
        facts={[
          { value: String(projects.length), label: projects.length === 1 ? 'project in the register' : 'projects in the register' },
          { value: String(systems.length), label: 'systems in one package' },
        ]}
      />

      <section className="band">
        <div className="wrap split">
          <div className="sticky rv">
            <span className="eyebrow">What the package includes</span>
            <h2 style={{ marginBottom: 28 }}>One contract, every interface owned.</h2>
            <ul className="ticks">
              {s.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow rv">Systems involved</span>
            <div className="svc-grid">
              {systems.map((sv) => {
                const Icon = sv.icon
                return (
                  <Link key={sv.slug} to={`/services/${sv.slug}`} className="svc card" style={{ ['--span' as string]: 6, minHeight: 240 }}>
                    <div className="bp" />
                    <div className="ph" style={{ backgroundImage: `url(${IMG[sv.img]})` }} />
                    <div className="ico">
                      <Icon strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontSize: '1.3rem' }}>{sv.title}</h3>
                    <p>{sv.short}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {reel ? (
        <ProjectsReel items={projects} title="The evidence" lead={`${projects.length} projects from the register delivered as this package.`} />
      ) : (
        <section>
          <div className="wrap">
            <SectionHead title="The evidence" />
            <div className="pgrid rv">
              {projects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq items={s.faq} title={`${s.title}: common questions`} band />
      <SolutionsGrid exclude={s.slug} title="Other environments" tone="canvas" />
      <Cta defaultService={`${s.title} package`} />
    </PageTransition>
  )
}
