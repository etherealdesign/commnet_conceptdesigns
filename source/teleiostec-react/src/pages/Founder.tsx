import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { Split } from '@/components/Split'
import { Reveal } from '@/components/Reveal'
import { RevealImage } from '@/components/RevealImage'
import { Portrait } from '@/components/Portrait'
import { ParticleField } from '@/components/ParticleField'
import { CtaBlock } from '@/components/CtaBlock'
import { credentials, founder, handles, specialists } from '@/data/founder'
import { SITE_URL } from '@/data/site'

export default function Founder() {
  return (
    <Page label="Founder">
      <Seo
        title="Founder"
        description={`Teleiostec is founder-led. ${founder.name} takes every brief personally, resolves the design and services, and stays on site until handover — with specialist trades chosen for each project.`}
        path="/founder"
        jsonLd={{ '@type': 'Person', name: founder.name, jobTitle: founder.role, worksFor: { '@id': `${SITE_URL}/#org` } }}
      />

      {/* Hero */}
      <section className="grain relative overflow-hidden bg-dark text-ivory">
        <ParticleField tone="dark" />
        <div className="wrap relative flex min-h-[80svh] flex-col justify-end pt-[calc(var(--header-h)+80px)] pb-[clamp(48px,8vh,96px)]">
          <div className="mb-10 flex items-center justify-between text-[12px] uppercase tracking-[0.2em] text-muted-dark">
            <span>Founder</span><span>(05)</span>
          </div>
          <Split as="h1" trigger="load" by="words" className="display max-w-[13ch] text-fluid-4xl">One name <em>on every project.</em></Split>
          <Reveal delay={0.4} className="mt-12 ml-auto max-w-[40ch] md:mr-[8%]">
            <p className="text-fluid-lg leading-[1.5] text-ivory/75">Teleiostec is founder-led. The person who takes your brief designs the space, chooses the specialists and stays on it until handover.</p>
          </Reveal>
        </div>
      </section>

      {/* Portrait + story */}
      <section className="section">
        <div className="wrap grid items-start gap-12 md:grid-cols-12 lg:items-end">
          <RevealImage className="aspect-[4/5] md:col-span-5" from="left" parallax={10}>
            <Portrait person={founder} className="h-full w-full" sizes="(max-width:768px) 100vw, 40vw" />
          </RevealImage>
          <div className="md:col-span-6 md:col-start-7">
            <p className="kick">{founder.role}</p>
            <Split as="h2" by="chars" className="display mt-4 text-fluid-3xl">{founder.name}</Split>
            {founder.story.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}><p className="mt-8 max-w-[48ch] text-fluid-lg leading-[1.55] text-ink/80">{p}</p></Reveal>
            ))}
            {founder.focus && (
              <Reveal delay={0.35}>
                <ul className="mt-10 flex flex-wrap gap-2">
                  {founder.focus.map((f) => <li key={f} className="rounded-full border border-[var(--line)] px-4 py-1.5 text-[13px]">{f}</li>)}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-y border-[var(--line)] bg-ivory-2 py-[clamp(72px,12vh,140px)]">
        <div className="wrap">
          <Split as="p" by="words" className="display mx-auto max-w-[22ch] text-center text-fluid-2xl italic">{`“${founder.quote}”`}</Split>
        </div>
      </section>

      {/* What the founder handles */}
      <section className="section">
        <div className="wrap">
          <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
            <Split as="h2" className="display text-fluid-3xl">On every project, <em>personally.</em></Split>
            <Reveal delay={0.1}><p className="max-w-[44ch] text-muted md:ml-auto">No hand-offs between sales, design and site. These four things are never delegated.</p></Reveal>
          </div>
          <ol className="grid gap-px border-y border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {handles.map((h, i) => (
              <li key={h.no} className="bg-ivory">
                <Reveal delay={i * 0.08} className="h-full p-8">
                  <p className="text-[12px] tracking-[0.18em] text-muted">{h.no}</p>
                  <p className="display mt-8 text-fluid-xl">{h.title}</p>
                  <p className="mt-4 text-[15px] leading-[1.6] text-ink/75">{h.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Specialists */}
      <section className="grain relative overflow-hidden bg-dark py-[var(--sec)] text-ivory">
        <div className="wrap relative">
          <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
            <Split as="h2" className="display text-fluid-3xl">Hand-picked <em>specialists.</em></Split>
            <Reveal delay={0.1}><p className="max-w-[44ch] text-ivory/70 md:ml-auto">Each trade is chosen for the project in hand, briefed directly and supervised on site by the founder — one standard, one point of contact.</p></Reveal>
          </div>
          <ul className="border-t border-[var(--line-dark)]">
            {specialists.map((s, i) => (
              <li key={s.title} className="border-b border-[var(--line-dark)]">
                <Reveal delay={i * 0.05} className="grid gap-2 py-7 md:grid-cols-[1fr_1.4fr] md:gap-10">
                  <p className="display text-fluid-xl">{s.title}</p>
                  <p className="max-w-[52ch] text-ivory/70 md:pt-2">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Credentials */}
      <section className="section">
        <div className="wrap grid gap-10 md:grid-cols-[180px_1fr]">
          <p className="kick pt-2">Credentials</p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {credentials.map((c) => <li key={c} className="border-t border-[var(--line)] pt-4 text-[15px]">{c}</li>)}
          </ul>
        </div>
      </section>

      <CtaBlock kicker="Start a project" title={<>Talk to the person <br /><em>who will do the work.</em></>} />
    </Page>
  )
}
