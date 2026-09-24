import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { LayoutGroup, AnimatePresence, motion } from 'motion/react'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { Numbers } from '../components/sections/Numbers'
import { Cta } from '../components/sections/Cta'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECTS, type Emirate } from '../data/projects'
import { SERVICES } from '../data/services'
import { SOLUTIONS } from '../data/solutions'
import { SITE } from '../lib/site'
import { ScrollTrigger } from '../lib/gsap'

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
]

const EMIRATES: Emirate[] = ['Dubai', 'Abu Dhabi', 'Sharjah']
const SYSTEM_LABEL: Record<string, string> = {
  'structured-cabling': 'Cabling',
  'networks-wifi-compute': 'Networks & Wi-Fi',
  'security-systems': 'Security',
  'av-guest-technology': 'AV & GRMS',
  'critical-power-cooling': 'Power & Cooling',
}
const ENV_LABEL: Record<string, string> = {
  'data-centres-it-rooms': 'Data centres',
  'command-security-centres': 'Command centres',
  'hotels-resorts': 'Hotels',
  'corporate-fit-out': 'Corporate',
  'events-rapid-deployment': 'Events',
  'amc-sla': 'AMC & SLA',
}
const EASE = [0.16, 1, 0.3, 1] as const

function Chips({ group, label, options, value, onChange }: { group: string; label: string; options: { v: string; l: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grp" role="group" aria-label={label}>
      <span>{label}</span>
      <div className="chips">
        {[{ v: '', l: 'All' }, ...options].map((o) => {
          const on = value === o.v
          return (
            <button key={o.v || 'all'} className="chip" aria-pressed={on} onClick={() => onChange(o.v)}>
              {on && <motion.span layoutId={`pill-${group}`} className="pill" transition={{ duration: 0.5, ease: EASE }} />}
              {o.l}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** The register — the page a prequalification reviewer actually reads (review §8.1). */
export default function Projects() {
  const [params, setParams] = useSearchParams()
  const system = params.get('system') ?? ''
  const env = params.get('environment') ?? ''
  const emirate = params.get('emirate') ?? ''

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true, preventScrollReset: true })
    window.setTimeout(() => ScrollTrigger.refresh(), 650)
  }

  const list = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (!system || p.systems.includes(system as never)) &&
          (!env || p.environment === env) &&
          (!emirate || p.emirates.includes(emirate as Emirate)),
      ),
    [system, env, emirate],
  )

  return (
    <PageTransition label="Project register">
      <Seo
        path="/projects"
        title="Project Register — 18 Documented ELV & ICT Contracts"
        description="Every documented Commnet contract with scope, quantities and duration: Hilton, Atlantis The Royal, DEWA CSOC, FIFA Beach Soccer 2024, Sharjah Police and more."
        crumbs={crumbs}
        graph={[
          {
            '@type': 'ItemList',
            name: 'Commnet project register',
            numberOfItems: PROJECTS.length,
            itemListElement: PROJECTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/projects/${p.slug}`, name: p.name })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="The project register"
        title="Eighteen contracts. Every one documented."
        lead="Scope, quantities, duration and the client of record for each job — from a six-day airport CCTV installation to a three-year, 13,000-point hotel. Filter by what was installed, where it was delivered, or which emirate."
        img="avCommandCenter"
        facts={[
          { value: '18', label: 'documented contracts' },
          { value: '3', label: 'emirates' },
        ]}
      />
      <section className="band">
        <div className="wrap">
          <LayoutGroup>
            <div className="filters rv">
              <Chips group="sys" label="System" value={system} onChange={(v) => set('system', v)} options={SERVICES.map((s) => ({ v: s.slug, l: SYSTEM_LABEL[s.slug]! }))} />
              <Chips group="env" label="Environment" value={env} onChange={(v) => set('environment', v)} options={SOLUTIONS.map((s) => ({ v: s.slug, l: ENV_LABEL[s.slug]! }))} />
              <Chips group="emi" label="Emirate" value={emirate} onChange={(v) => set('emirate', v)} options={EMIRATES.map((e) => ({ v: e, l: e }))} />
            </div>
            <p aria-live="polite" style={{ fontSize: 14, marginBottom: 24 }}>
              Showing <b style={{ color: 'var(--t1)' }}>{list.length}</b> of {PROJECTS.length} projects
            </p>
            <motion.div layout className="pgrid">
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <motion.div
                    layout
                    key={p.slug}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ display: 'flex' }}
                  >
                    <ProjectCard p={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            {list.length === 0 && (
              <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                <p>No project matches all three filters.</p>
                <button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => setParams({}, { replace: true, preventScrollReset: true })}>
                  Clear filters
                </button>
              </div>
            )}
          </LayoutGroup>
        </div>
      </section>
      <Numbers />
      <Cta />
    </PageTransition>
  )
}
