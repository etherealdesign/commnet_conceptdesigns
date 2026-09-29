import { Link } from 'react-router'
import { ClipboardCheck, ExternalLink, FileCheck2, MapPin, PenTool, ShieldCheck } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { SectionHead } from '../components/sections/SectionHead'
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

/** Every line restates REGULATORS[].body — nothing here is new fact. */
const COMPARE = [
  { k: 'Emirate', sira: 'Dubai', admcc: 'Abu Dhabi' },
  { k: 'Licenses', sira: 'Companies that install and maintain security systems', admcc: 'Companies working in monitoring and control' },
  { k: 'Sets', sira: 'Technical guidelines CCTV must meet', admcc: 'Technical requirements for CCTV' },
  { k: 'Commnet checks', sira: 'At survey, and again at design stage', admcc: 'At survey, and again at design stage' },
]

/** The compliance-relevant stages of PROCESS, in the regulator's terms. */
const ROUTE = [
  { t: 'Applicability check', d: 'At the site survey: which regulator applies to the premises, and what it requires.', icon: ClipboardCheck },
  { t: 'Design to current rules', d: 'The security design follows the regulator’s requirements as they stand at design stage.', icon: PenTool },
  { t: 'Authority submission', d: 'Commissioning, link certification and submission to the regulator for approval.', icon: FileCheck2 },
  { t: 'Handover under the rules', d: 'The system is handed over approved, with the documentation the regulator asks for.', icon: ShieldCheck },
]

const EVIDENCE = ['jotun', 'abu-dhabi-airport-cctv', 'fifa-beach-soccer-world-cup-2024'].map((s) => projectBySlug(s)!)

export default function Compliance() {
  // Regulator questions only — the full security FAQ lives on its service page.
  const faq = serviceBySlug('security-systems')!.faq.filter((f) => /SIRA|ADMCC|regulat|approv/i.test(f.q + f.a))
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

      <section className="regs">
        <div className="wrap">
          <SectionHead eyebrow="The regulators" title="Two emirates, two rulebooks" lead="Specifications are set by each regulator and change. Commnet confirms them at design stage rather than quoting fixed numbers." />
          <div className="reg-grid">
            {REGULATORS.map((r) => (
              <article className="reg rv" key={r.abbr}>
                <span className="where">
                  <MapPin aria-hidden="true" /> {r.where}
                </span>
                <h3>{r.abbr}</h3>
                <b className="full">{r.name}</b>
                <p>{r.body}</p>
                <a className="src" href={r.href} target="_blank" rel="noopener noreferrer">
                  Official source · {r.href.replace('https://www.', '')} <ExternalLink aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <div className="reg-compare rv" role="table" aria-label="SIRA and ADMCC compared">
            <div className="rc head" role="row">
              <span role="columnheader" />
              <span role="columnheader">SIRA</span>
              <span role="columnheader">ADMCC</span>
            </div>
            {COMPARE.map((c) => (
              <div className="rc" role="row" key={c.k}>
                <span role="rowheader">{c.k}</span>
                <span role="cell" data-l="SIRA">{c.sira}</span>
                <span role="cell" data-l="ADMCC">{c.admcc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band route-sec">
        <div className="wrap">
          <SectionHead eyebrow="Approval route" title="How a compliant system gets approved" lead="Regulatory mapping happens at the survey, not at handover." />
          <ol className="route">
            {ROUTE.map((r) => (
              <li className="rv" key={r.t}>
                <span className="ico" aria-hidden="true">
                  <r.icon strokeWidth={1.6} />
                </span>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="evidence">
        <div className="wrap">
          <SectionHead eyebrow="Evidence" title="Delivered to specification" lead="Projects where the security scope was designed to a named regulator’s requirements." />
          <div className="pgrid rv">
            {EVIDENCE.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <Faq items={faq} title="Regulator questions" lead="What changes between Dubai and Abu Dhabi, and what the approval route looks like." />
      <Cta defaultService="Security Systems" title="Designing to SIRA or ADMCC?" lead="Send the premises type and emirate. We confirm which regulator applies before the design starts." />
    </PageTransition>
  )
}
