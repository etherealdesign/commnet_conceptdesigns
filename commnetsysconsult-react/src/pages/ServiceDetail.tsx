import { Link, useParams } from 'react-router'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { SectionHead } from '../components/sections/SectionHead'
import { Process } from '../components/sections/Process'
import { Faq } from '../components/sections/Faq'
import { Cta } from '../components/sections/Cta'
import { ProjectCard } from '../components/ProjectCard'
import { Arrow } from '../components/Arrow'
import { SERVICES, serviceBySlug } from '../data/services'
import { SOLUTIONS } from '../data/solutions'
import { projectsFor } from '../data/projects'
import { SITE, absUrl } from '../lib/site'
import { IMG } from '../lib/images'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug = '' } = useParams()
  const s = serviceBySlug(slug)
  if (!s) return <NotFound />

  const i = SERVICES.indexOf(s)
  const next = SERVICES[(i + 1) % SERVICES.length]!
  const projects = projectsFor({ service: s.slug })
  const envs = SOLUTIONS.filter((e) => e.systems.includes(s.slug))
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: s.title, path: `/services/${s.slug}` },
  ]

  return (
    <PageTransition label={s.title}>
      <Seo
        path={`/services/${s.slug}`}
        title={s.h1}
        description={s.definition.slice(0, 158).replace(/\s\S*$/, '') + '…'}
        image={IMG[s.img]}
        crumbs={crumbs}
        faq={s.faq}
        graph={[
          {
            '@type': 'Service',
            '@id': `${absUrl(`/services/${s.slug}`)}#service`,
            name: s.title,
            serviceType: s.title,
            description: s.long,
            provider: { '@id': `${SITE.url}/#organization` },
            areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah'],
            hasOfferCatalog: { '@type': 'OfferCatalog', name: s.title, itemListElement: s.deliver.map((d) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: d } })) },
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`Service ${String(i + 1).padStart(2, '0')} · ${s.title}`}
        title={s.h1}
        lead={s.long}
        img={s.img}
        actions={
          <>
            <Link className="btn btn-primary magnetic" to="/contact">
              Send us your BoQ <Arrow />
            </Link>
            <a className="btn btn-ghost magnetic" href="#evidence">
              See the evidence
            </a>
          </>
        }
        facts={s.proof}
      />

      <section className="band">
        <div className="wrap split">
          <div className="sticky rv">
            <span className="eyebrow">What it is</span>
            <h2 style={{ marginBottom: 20 }}>{s.title}</h2>
            <p className="lead">{s.definition}</p>
          </div>
          <div>
            <span className="eyebrow rv">What we deliver</span>
            <div className="deliver-grid two rv">
              {s.deliver.map((d, k) => (
                <div className="deliver card tilt" key={d}>
                  <b>{String(k + 1).padStart(2, '0')}</b>
                  <h4>{d}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="evidence">
        <div className="wrap">
          <SectionHead
            title="Evidence from the register"
            lead={`${projects.length} of 18 documented contracts include ${s.title.toLowerCase()}. Each links to its scope, quantities and duration.`}
          />
          <div className="pgrid rv">
            {projects.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <SectionHead title="Delivered inside these packages" lead="Where this system shows up as part of a complete environment." />
          <div className="ind-list three rv">
            {envs.map((e) => (
              <Link to={`/solutions/${e.slug}`} key={e.slug}>
                {e.title} <small>{e.short}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Process title="From survey to handover" />
      <Faq items={s.faq} title={`${s.title}: common questions`} band />

      <div className="wrap">
        <Link className="next" to={`/services/${next.slug}`}>
          <div>
            <small>Next service</small>
            <h3>{next.title}</h3>
          </div>
          <span className="btn btn-ghost">
            Continue <Arrow />
          </span>
        </Link>
      </div>
      <Cta defaultService={s.title} />
    </PageTransition>
  )
}
