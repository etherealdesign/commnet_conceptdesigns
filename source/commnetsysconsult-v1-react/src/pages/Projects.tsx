import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { LayoutGroup, AnimatePresence, motion } from 'motion/react'
import { LayoutGrid, List } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageTransition } from '../components/PageTransition'
import { PageHero } from '../components/sections/PageHero'
import { SectionHead } from '../components/sections/SectionHead'
import { Cta } from '../components/sections/Cta'
import { ProjectCard } from '../components/ProjectCard'
import { Arrow } from '../components/Arrow'
import { FEATURED, PROJECTS, type Emirate, type Project } from '../data/projects'
import { SERVICES } from '../data/services'
import { SOLUTIONS } from '../data/solutions'
import { IMG } from '../lib/images'
import { SITE } from '../lib/site'
import { ScrollTrigger } from '../lib/gsap'
import { useLenis, scrollToTarget } from '../components/SmoothScroll'

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

/** Duration text → days, for sorting only. "2017 to 2024" counts the years inclusive. */
function days(d: string) {
  const range = d.match(/(\d{4})\s*to\s*(\d{4})/)
  if (range) return (Number(range[2]) - Number(range[1]) + 1) * 365
  const m = d.match(/(\d+)\s*(day|week|month|year)/i)
  if (!m) return Infinity
  const n = Number(m[1])
  return n * ({ day: 1, week: 7, month: 30, year: 365 } as Record<string, number>)[m[2]!.toLowerCase()]!
}

type Filters = { system: string; env: string; emirate: string }
const match = (p: Project, f: Filters) =>
  (!f.system || p.systems.includes(f.system as never)) && (!f.env || p.environment === f.env) && (!f.emirate || p.emirates.includes(f.emirate as Emirate))

function Chips({
  group,
  label,
  options,
  value,
  onChange,
  count,
}: {
  group: string
  label: string
  options: { v: string; l: string }[]
  value: string
  onChange: (v: string) => void
  count: (v: string) => number
}) {
  return (
    <div className="grp" role="group" aria-label={label}>
      <span>{label}</span>
      <div className="chips">
        {[{ v: '', l: 'All' }, ...options].map((o) => {
          const on = value === o.v
          const n = count(o.v)
          return (
            <button key={o.v || 'all'} className="chip" aria-pressed={on} disabled={!on && n === 0} onClick={() => onChange(o.v)}>
              {on && <motion.span layoutId={`pill-${group}`} className="pill" transition={{ duration: 0.5, ease: EASE }} />}
              {o.l}
              <i>{n}</i>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** A labelled bar list — the register summed along one axis. */
function Bars({ title, rows, onPick }: { title: string; rows: { l: string; n: number; v: string }[]; onPick: (v: string) => void }) {
  const max = Math.max(...rows.map((r) => r.n))
  return (
    <div className="bars">
      <h3>{title}</h3>
      <ul>
        {rows.map((r) => (
          <li key={r.l}>
            <button className="l" onClick={() => onPick(r.v)}>
              {r.l}
            </button>
            <span className="track" aria-hidden="true">
              <i style={{ width: `${(r.n / max) * 100}%` }} />
            </span>
            <b>{r.n}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The register — the page a prequalification reviewer actually reads (review §8.1). */
export default function Projects() {
  const [params, setParams] = useSearchParams()
  const f: Filters = { system: params.get('system') ?? '', env: params.get('environment') ?? '', emirate: params.get('emirate') ?? '' }
  const view = params.get('view') === 'list' ? 'list' : 'grid'
  const lenis = useLenis()

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params)
    if (v) next.set(k, v)
    else next.delete(k)
    setParams(next, { replace: true, preventScrollReset: true })
    window.setTimeout(() => ScrollTrigger.refresh(), 650)
  }

  /** From the summary: filter on one axis alone, then take the reader to the register. */
  const pick = (k: string, v: string) => {
    const next = new URLSearchParams(view === 'list' ? { view: 'list' } : {})
    next.set(k, v)
    setParams(next, { replace: true, preventScrollReset: true })
    requestAnimationFrame(() => {
      const el = document.getElementById('register')
      if (el) scrollToTarget(lenis, el, -40)
    })
    window.setTimeout(() => ScrollTrigger.refresh(), 650)
  }

  const list = useMemo(() => PROJECTS.filter((p) => match(p, f)), [f.system, f.env, f.emirate])
  /** How many projects an option would show, given the other two filters. */
  const countFor = (key: keyof Filters) => (v: string) => PROJECTS.filter((p) => match(p, { ...f, [key]: v })).length

  const feature = FEATURED[0]!
  const featureEnv = SOLUTIONS.find((s) => s.slug === feature.environment)
  const primes = PROJECTS.filter((p) => p.viaPrime).length
  const fastest = [...PROJECTS].sort((a, b) => days(a.duration) - days(b.duration)).slice(0, 5)
  const byPrime = Object.entries(
    PROJECTS.filter((p) => p.viaPrime).reduce<Record<string, Project[]>>((acc, p) => {
      const k = p.clientOfRecord.replace(/\s*\(.*\)/, '')
      ;(acc[k] ??= []).push(p)
      return acc
    }, {}),
  ).sort((a, b) => b[1].length - a[1].length)

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
        lead="Scope, quantities, duration and the client of record for each job. Read one in depth, see the register summed up, or filter it down to the work that matches yours."
        img="avCommandCenter"
        facts={[
          { value: String(PROJECTS.length), label: 'documented contracts' },
          { value: String(primes), label: 'delivered for main contractors' },
        ]}
      />

      {/* Case study */}
      <section className="pr-case">
        <div className="wrap">
          <div className="case rv">
            <div className="case-pic">
              <img src={IMG[feature.img]} alt="" loading="lazy" decoding="async" width={1400} height={782} />
              <span className="case-scale">
                <b>{feature.scale.value}</b>
                {feature.scale.label}
              </span>
            </div>
            <div className="case-txt">
              <span className="eyebrow">Case study · {featureEnv?.title}</span>
              <h2>{feature.name}</h2>
              <p>{feature.overview}</p>
              <dl>
                <div>
                  <dt>Client of record</dt>
                  <dd>{feature.clientOfRecord}</dd>
                </div>
                <div>
                  <dt>End client</dt>
                  <dd>{feature.endClient}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{feature.duration}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{feature.location}</dd>
                </div>
              </dl>
              <Link className="btn btn-primary" to={`/projects/${feature.slug}`}>
                Read the full record <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The register, summed */}
      <section className="pr-glance">
        <div className="wrap">
          <SectionHead eyebrow="At a glance" title="The register, summed up" lead="Counted straight from the eighteen contracts below. Select a row to filter the register." />
          <div className="glance">
            <Bars
              title="By system installed"
              onPick={(v) => pick('system', v)}
              rows={SERVICES.map((s) => ({ l: SYSTEM_LABEL[s.slug]!, v: s.slug, n: PROJECTS.filter((p) => p.systems.includes(s.slug)).length })).sort((a, b) => b.n - a.n)}
            />
            <Bars
              title="By environment"
              onPick={(v) => pick('environment', v)}
              rows={SOLUTIONS.map((s) => ({ l: ENV_LABEL[s.slug]!, v: s.slug, n: PROJECTS.filter((p) => p.environment === s.slug).length }))
                .filter((r) => r.n)
                .sort((a, b) => b.n - a.n)}
            />
            <div className="fast">
              <h3>Fastest deliveries</h3>
              <ol>
                {fastest.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/projects/${p.slug}`}>
                      <b>{p.duration}</b>
                      <span>{p.name}</span>
                      <Arrow />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* The register */}
      <section className="band" id="register">
        <div className="wrap">
          <div className="reg-head">
            <SectionHead eyebrow="The register" title="Every contract" style={{ marginBottom: 0 }} />
            <div className="views" role="group" aria-label="View">
              <button aria-pressed={view === 'grid'} onClick={() => set('view', '')}>
                <LayoutGrid aria-hidden="true" /> Cards
              </button>
              <button aria-pressed={view === 'list'} onClick={() => set('view', 'list')}>
                <List aria-hidden="true" /> List
              </button>
            </div>
          </div>
          <LayoutGroup>
            <div className="filters rv">
              <Chips group="sys" label="System" value={f.system} count={countFor('system')} onChange={(v) => set('system', v)} options={SERVICES.map((s) => ({ v: s.slug, l: SYSTEM_LABEL[s.slug]! }))} />
              <Chips group="env" label="Environment" value={f.env} count={countFor('env')} onChange={(v) => set('environment', v)} options={SOLUTIONS.map((s) => ({ v: s.slug, l: ENV_LABEL[s.slug]! }))} />
              <Chips group="emi" label="Emirate" value={f.emirate} count={countFor('emirate')} onChange={(v) => set('emirate', v)} options={EMIRATES.map((e) => ({ v: e, l: e }))} />
            </div>
            <div className="reg-bar">
              <p aria-live="polite">
                Showing <b>{list.length}</b> of {PROJECTS.length} contracts
              </p>
              {(f.system || f.env || f.emirate) && (
                <button className="clear" onClick={() => setParams(view === 'list' ? { view: 'list' } : {}, { replace: true, preventScrollReset: true })}>
                  Clear filters
                </button>
              )}
            </div>
            {view === 'grid' ? (
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
            ) : (
              <div className="ledger" role="table" aria-label="Project register">
                <div className="lr head" role="row">
                  <span role="columnheader">Project</span>
                  <span role="columnheader">Client of record</span>
                  <span role="columnheader">Systems</span>
                  <span role="columnheader">Emirate</span>
                  <span role="columnheader">Duration</span>
                </div>
                {list.map((p) => (
                  <Link className="lr" role="row" key={p.slug} to={`/projects/${p.slug}`}>
                    <span role="cell" className="nm">
                      <b>{p.name}</b>
                      <small>{ENV_LABEL[p.environment]}</small>
                    </span>
                    <span role="cell">{p.clientOfRecord}</span>
                    <span role="cell" className="sys">
                      {p.systems.map((s) => (
                        <i key={s}>{SYSTEM_LABEL[s]}</i>
                      ))}
                    </span>
                    <span role="cell">{p.emirates.join(', ') || '—'}</span>
                    <span role="cell" className="dur">
                      {p.duration} <Arrow />
                    </span>
                  </Link>
                ))}
              </div>
            )}
            {list.length === 0 && (
              <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                <p>No contract matches all three filters.</p>
              </div>
            )}
          </LayoutGroup>
        </div>
      </section>

      {/* Primes */}
      <section className="pr-primes">
        <div className="wrap">
          <SectionHead
            eyebrow="Main contractors"
            title="The primes we deliver for"
            lead={`${primes} of the ${PROJECTS.length} contracts were delivered as the ELV subcontractor to a main contractor or systems integrator.`}
          />
          <ul className="primes">
            {byPrime.map(([name, ps]) => (
              <li key={name}>
                <div className="pn">
                  <b>{name}</b>
                  <small>{ps.length === 1 ? '1 contract' : `${ps.length} contracts`}</small>
                </div>
                <div className="pp">
                  {ps.map((p) => (
                    <Link key={p.slug} to={`/projects/${p.slug}`}>
                      {p.name}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title="Prequalifying Commnet?" lead="Ask for the documentation behind any contract in the register — scope, test records and the client of record." />
    </PageTransition>
  )
}
