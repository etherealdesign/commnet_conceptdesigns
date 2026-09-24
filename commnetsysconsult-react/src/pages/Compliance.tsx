import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { SectionHead } from '../components/sections/SectionHead'
import { Process } from '../components/sections/Process'
import { Recognition } from '../components/sections/Recognition'
import { Faq } from '../components/sections/Faq'
import { Cta } from '../components/sections/Cta'
import { ProjectCard } from '../components/ProjectCard'
import { Arrow } from '../components/Arrow'
import { REGULATORS } from '../data/company'
import { serviceBySlug } from '../data/services'
import { projectBySlug } from '../data/projects'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Compliance', path: '/compliance' },
]

const EVIDENCE = ['jotun', 'abu-dhabi-airport-cctv', 'fifa-beach-soccer-world-cup-2024'].map((s) => projectBySlug(s)!)

export default function Compliance() {
  const faq = serviceBySlug('security-systems')!.faq
  return (
    <PageTransition label="Compliance">
      <Seo
        path="/compliance"
        title="SIRA & ADMCC — Security Systems Designed to Specification"
        description="How Commnet designs CCTV and access control to SIRA (Dubai) and ADMCC (Abu Dhabi) technical requirements, with the regulators explained correctly and linked to source."
        crumbs={crumbs}
        faq={faq}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Regulators and standards"
        title="Designed to the regulator, not to a brochure."
        lead="Security systems in the UAE are regulated emirate by emirate. Here is who the regulators are, what they control, and how Commnet designs to their current requirements — with links to the source, not to a blog."
        img="securitySystems"
        actions={
          <Link className="btn btn-primary magnetic" to="/services/security-systems">
            Security systems service <Arrow />
          </Link>
        }
        facts={[
          { value: '2', label: 'regulators designed to' },
          { value: '9', label: 'contracts with security scope' },
        ]}
      />

      <section className="dark" data-theme="dark">
        <div className="wrap">
          <SectionHead title="The two regulators" lead="Specifications are set by each regulator and change. Commnet confirms them at design stage rather than quoting fixed numbers." />
          <div className="reg-grid">
            {REGULATORS.map((r) => (
              <article className="reg glass rv" key={r.abbr}>
                <small>{r.where}</small>
                <h3>
                  {r.abbr} <span style={{ fontWeight: 500, color: '#94A3B8', fontSize: '1rem', letterSpacing: 0 }}>{r.name}</span>
                </h3>
                <p>{r.body}</p>
                <a className="src" href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.href.replace('https://www.', '')} <ExternalLink aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Process title="How a compliant system gets approved" lead="Regulatory mapping happens at the survey, not at handover." />

      <section className="band">
        <div className="wrap">
          <SectionHead title="Delivered to specification" lead="Projects where the security scope was designed to a named regulator’s requirements." />
          <div className="pgrid rv">
            {EVIDENCE.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <Recognition />
      <Faq items={faq} title="Compliance questions" />
      <Cta defaultService="Security Systems" />
    </PageTransition>
  )
}
