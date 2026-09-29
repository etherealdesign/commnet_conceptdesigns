import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { Split } from '@/components/Split'
import { Reveal } from '@/components/Reveal'
import { RevealImage } from '@/components/RevealImage'
import { Portrait } from '@/components/Portrait'
import { ParticleField } from '@/components/ParticleField'
import { CtaBlock } from '@/components/CtaBlock'
import { leaders, team, type Person } from '@/data/team'
import { SITE_URL } from '@/data/site'
import { useLenis } from '@/lib/smooth'

const ease = [0.76, 0, 0.24, 1] as const

function Drawer({ person, onClose }: { person: Person | null; onClose: () => void }) {
  const lenis = useLenis()
  useEffect(() => {
    if (!person) return
    lenis?.stop()
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => { lenis?.start(); window.removeEventListener('keydown', k) }
  }, [person, lenis, onClose])

  return (
    <AnimatePresence>
      {person && (
        <motion.div className="fixed inset-0 z-[95]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 0.3 } }}>
          <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-dark/60 backdrop-blur-[2px]" />
          <motion.aside
            role="dialog" aria-modal="true" aria-label={person.name}
            className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col overflow-y-auto bg-ivory p-[clamp(24px,4vw,56px)]"
            initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }} transition={{ duration: 0.9, ease }}
            data-lenis-prevent
          >
            <button type="button" onClick={onClose} className="link-line mb-8 self-end text-[12px] uppercase tracking-[0.18em]" autoFocus>Close ✕</button>
            <Portrait person={person} className="aspect-[4/5] w-full" sizes="560px" />
            <p className="kick mt-8">{person.role}</p>
            <h2 className="display mt-2 text-fluid-2xl">{person.name}</h2>
            <p className="mt-6 text-ink/75">{person.bio}</p>
            {person.focus && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {person.focus.map((f) => <li key={f} className="rounded-full border border-[var(--line)] px-4 py-1.5 text-[12px]">{f}</li>)}
              </ul>
            )}
            {person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener" className="link-line mt-8 w-fit text-[12px] uppercase tracking-[0.18em]">LinkedIn ↗</a>}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Team() {
  const [open, setOpen] = useState<Person | null>(null)
  const close = () => setOpen(null)

  return (
    <Page label="Team">
      <Seo
        title="Leadership & Team"
        description="Meet the designers, engineers and craftspeople behind Teleiostec — the leadership and team who design, engineer and build every space."
        path="/team"
        jsonLd={[...leaders, ...team].map((p) => ({ '@type': 'Person', name: p.name, jobTitle: p.role, worksFor: { '@id': `${SITE_URL}/#org` } }))}
      />

      {/* Hero */}
      <section className="grain relative overflow-hidden bg-dark text-ivory">
        <ParticleField tone="dark" />
        <div className="wrap relative flex min-h-[92svh] flex-col justify-end pt-[calc(var(--header-h)+80px)] pb-[clamp(48px,8vh,96px)]">
          <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-dark">
            <span>Leadership &amp; Team</span><span>(05)</span>
          </div>
          <Split as="h1" trigger="load" by="words" className="display max-w-[12ch] text-fluid-4xl">The people <em>behind the work.</em></Split>
          <Reveal delay={0.4} className="mt-12 ml-auto max-w-[40ch] md:mr-[8%]">
            <p className="text-fluid-lg leading-[1.5] text-ivory/70">Designers, engineers and craftspeople under one roof — the same people who draw a space are the ones who build it.</p>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="wrap">
          <div className="mb-20 flex items-end justify-between border-b border-[var(--line)] pb-6">
            <Split as="h2" className="display text-fluid-3xl">Leadership</Split>
            <span className="text-[12px] tracking-[0.18em] text-muted">0{leaders.length}</span>
          </div>
          <div className="space-y-[clamp(80px,16vh,200px)]">
            {leaders.map((p, i) => (
              <article key={i} className="grid items-end gap-10 md:grid-cols-12">
                <button type="button" onClick={() => setOpen(p)} data-cursor="Read" className={`group block text-left md:col-span-5 ${i % 2 ? 'md:order-2 md:col-start-8' : ''}`}>
                  <span className="sr-only">Read more about {p.name}</span>
                  <RevealImage className="aspect-[4/5]" from={i % 2 ? 'right' : 'left'} parallax={10}>
                    <Portrait person={p} className="h-full w-full" sizes="(max-width:768px) 100vw, 40vw" tone={i} />
                  </RevealImage>
                </button>
                <div className={`md:col-span-6 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
                  <p className="text-[12px] tracking-[0.18em] text-muted">0{i + 1}</p>
                  <Split as="h3" by="chars" className="display mt-6 text-fluid-3xl">{p.name}</Split>
                  <Reveal delay={0.15}><p className="kick mt-4 !text-ink">{p.role}</p></Reveal>
                  <Reveal delay={0.25}><p className="mt-8 max-w-[46ch] text-fluid-lg leading-[1.5] text-ink/75">{p.bio}</p></Reveal>
                  {p.focus && (
                    <Reveal delay={0.35}>
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {p.focus.map((f) => <li key={f} className="rounded-full border border-[var(--line)] px-4 py-1.5 text-[12px]">{f}</li>)}
                      </ul>
                    </Reveal>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-ivory-2 py-[var(--sec)]">
        <div className="wrap">
          <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
            <Split as="h2" className="display text-fluid-3xl">The <em>team.</em></Split>
            <Reveal delay={0.1}><p className="max-w-[44ch] text-muted md:ml-auto">Design, engineering, workshop and site — every discipline a project needs, under one accountable roof.</p></Reveal>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {team.map((p, i) => (
              <li key={i}>
                <Reveal delay={(i % 4) * 0.08} y={60}>
                  <button type="button" onClick={() => setOpen(p)} data-cursor="Read" className="group block w-full text-left">
                    <div className="relative overflow-hidden">
                      <Portrait person={p} className="aspect-[4/5] w-full" sizes="(max-width:768px) 50vw, 25vw" tone={i + 1} />
                      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink p-4 text-[13px] leading-snug text-ivory transition-transform duration-700 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
                        {p.bio}
                      </div>
                    </div>
                    <p className="mt-4 text-[15px]">{p.name}</p>
                    <p className="text-[12px] uppercase tracking-[0.14em] text-muted">{p.role}</p>
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBlock kicker="Careers" title={<>Want to build <br /><em>with us?</em></>} />
      <Drawer person={open} onClose={close} />
    </Page>
  )
}
