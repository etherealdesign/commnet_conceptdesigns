import { useRef } from 'react'
import { Link, useParams } from 'react-router'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { SectionHead } from '../components/sections/SectionHead'
import { ProjectMeta } from '../components/sections/ProjectsReel'
import { Cta } from '../components/sections/Cta'
import { ProjectCard } from '../components/ProjectCard'
import { Arrow } from '../components/Arrow'
import { PROJECTS, projectBySlug } from '../data/projects'
import { SERVICES } from '../data/services'
import { SOLUTIONS } from '../data/solutions'
import { IMG } from '../lib/images'
import { SITE, absUrl } from '../lib/site'
import { gsap, useGSAP } from '../lib/gsap'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const p = projectBySlug(slug)
  const pic = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!pic.current) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to(pic.current, { clipPath: 'inset(0 0% 0 0 round 20px)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: pic.current, start: 'top 80%', once: true } })
        gsap.to(pic.current!.querySelector('img'), { scale: 1, ease: 'none', scrollTrigger: { trigger: pic.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    },
    { dependencies: [slug], revertOnUpdate: true },
  )

  if (!p) return <NotFound />

  const i = PROJECTS.indexOf(p)
  const next = PROJECTS[(i + 1) % PROJECTS.length]!
  const env = SOLUTIONS.find((s) => s.slug === p.environment)!
  const systems = SERVICES.filter((s) => p.systems.includes(s.slug))
  const related = PROJECTS.filter((x) => x.slug !== p.slug && x.environment === p.environment).slice(0, 3)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: p.name, path: `/projects/${p.slug}` },
  ]

  return (
    <PageTransition label={p.name}>
      <Seo
        path={`/projects/${p.slug}`}
        title={`${p.name} — ${env.title}`}
        description={`${p.sub} ${p.duration}, ${p.location}. Delivered by Commnet Systems Consultancy.`}
        image={IMG[p.img]}
        crumbs={crumbs}
        graph={[
          {
            '@type': 'CreativeWork',
            '@id': `${absUrl(`/projects/${p.slug}`)}#project`,
            name: p.name,
            description: p.overview,
            image: absUrl(IMG[p.img]),
            creator: { '@id': `${SITE.url}/#organization` },
            locationCreated: { '@type': 'Place', name: p.location },
            keywords: p.scope.join(', '),
            about: systems.map((s) => ({ '@type': 'Thing', name: s.title })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${env.title} · ${p.status}`}
        title={p.name}
        lead={p.sub}
        img={p.img}
        facts={[
          { value: p.scale.value, label: p.scale.label },
          { value: p.duration, label: 'on the programme' },
        ]}
      />

      <section className="band">
        <div className="wrap">
          <div className="detail-pic" ref={pic}>
            <img src={IMG[p.img]} alt={`${p.name}, ${p.location}`} width={1400} height={782} decoding="async" />
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }} className="band">
        <div className="wrap split">
          <div className="sticky rv">
            <span className="eyebrow">Overview</span>
            <div className="prose">
              <p className="lead">{p.overview}</p>
            </div>
            <div style={{ marginTop: 32 }} className="chips">
              {systems.map((s) => (
                <Link className="chip" key={s.slug} to={`/services/${s.slug}`}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="rv">
            <span className="eyebrow">Project record</span>
            <ProjectMeta p={p} />
            <div className="meta" style={{ marginTop: 22 }}>
              <div>
                <span>End client</span>
                <b>{p.endClient}</b>
              </div>
              <div>
                <span>Status</span>
                <b>{p.status}</b>
              </div>
              <div className="full">
                <span>Delivered as</span>
                <b>
                  <Link to={`/solutions/${env.slug}`} style={{ color: 'var(--blue)' }}>
                    {env.title}
                  </Link>
                  {p.viaPrime ? ` — subcontracted to ${p.clientOfRecord}` : ' — direct contract'}
                </b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <div className="wrap">
            <SectionHead title={`More ${env.title.toLowerCase()}`} />
            <div className="pgrid rv">
              {related.map((r) => (
                <ProjectCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="wrap">
        <Link className="next" to={`/projects/${next.slug}`}>
          <div>
            <small>Next project</small>
            <h3>{next.name}</h3>
          </div>
          <span className="btn btn-ghost">
            Continue <Arrow />
          </span>
        </Link>
      </div>
      <Cta />
    </PageTransition>
  )
}
