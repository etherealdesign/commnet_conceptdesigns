import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/PageHero'
import { Img } from '@/components/Img'
import { CtaBlock } from '@/components/CtaBlock'
import { projects } from '@/data/projects'
import { SITE_URL } from '@/data/site'
import { cn } from '@/lib/cn'

const filters = ['All', 'Residential', 'Hospitality', 'Commercial'] as const

export default function Projects() {
  const [f, setF] = useState<(typeof filters)[number]>('All')
  const list = useMemo(() => (f === 'All' ? projects : projects.filter((p) => p.category === f)), [f])
  const counts = useMemo(() => Object.fromEntries(filters.map((k) => [k, k === 'All' ? projects.length : projects.filter((p) => p.category === k).length])), [])

  return (
    <Page label="Projects">
      <Seo
        title="Projects"
        description="Selected residential, hospitality and commercial interiors by Teleiostec — designed, engineered and built by one accountable team across the Emirates."
        path="/projects"
        jsonLd={{
          '@type': 'CollectionPage', name: 'Teleiostec Projects', url: `${SITE_URL}/projects`,
          hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: `${SITE_URL}/projects/${p.slug}` })),
        }}
      />
      <PageHero index="01" kicker="Selected work" title={<>Projects, <em>built whole.</em></>} lede="Residential, hospitality and commercial environments across the Emirates — designed, engineered and built by one accountable team." />

      <section className="wrap pb-[var(--sec)]">
        <div role="toolbar" aria-label="Filter projects" className="mb-12 flex flex-wrap gap-2 border-b border-[var(--line)] pb-6">
          <LayoutGroup>
            {filters.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setF(k)}
                aria-pressed={f === k}
                disabled={!counts[k]}
                className={cn('relative rounded-full px-5 py-2 text-[12px] uppercase tracking-[0.16em] transition-colors disabled:opacity-30', f === k ? 'text-ivory' : 'text-ink hover:text-muted')}
              >
                {f === k && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                <span className="relative">{k} <sup>{counts[k]}</sup></span>
              </button>
            ))}
          </LayoutGroup>
        </div>

        <motion.ul layout className="grid gap-x-[4vw] gap-y-20 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                layout
                key={p.slug}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className={i % 2 ? 'md:mt-[18vh]' : ''}
              >
                <Link to={`/projects/${p.slug}`} data-cursor="View" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2">
                    <Img pic={p.pic} sizes="(max-width:768px) 100vw, 46vw" imgClassName="transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.06]" />
                    <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] uppercase tracking-[0.16em] opacity-0 transition-opacity duration-500 group-hover:opacity-100">{p.category}</span>
                  </div>
                  <div className="mt-5 grid grid-cols-[1fr_auto] items-baseline gap-2">
                    <h2 className="display text-fluid-xl">{p.title}</h2>
                    <span className="text-[12px] text-muted">{p.year}</span>
                    <p className="text-[13px] text-muted">{p.location} — {p.discipline}</p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
      <CtaBlock title={<>Have a space<br /><em>in mind?</em></>} />
    </Page>
  )
}
