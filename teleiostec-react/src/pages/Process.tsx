import { useRef } from 'react'
import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/PageHero'
import { Split } from '@/components/Split'
import { Reveal } from '@/components/Reveal'
import { Img } from '@/components/Img'
import { CtaBlock } from '@/components/CtaBlock'
import { steps, principles } from '@/data/process'
import { gsap, useGSAP } from '@/lib/gsap'

/** Pinned stack: each step's image wipes over the last while the copy crossfades. */
function Stack() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${window.innerHeight * (steps.length - 1) * 1.1}`, pin: true, scrub: 1 },
      })
      steps.slice(1).forEach((_, i) => {
        const n = i + 1
        tl.fromTo(`.ps-img-${n}`, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 }, i)
          .fromTo(`.ps-img-${n} img`, { scale: 1.3 }, { scale: 1, ease: 'none', duration: 1 }, i)
          .to(`.ps-copy-${n - 1}`, { autoAlpha: 0, y: -40, duration: 0.4 }, i + 0.1)
          .fromTo(`.ps-copy-${n}`, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4 }, i + 0.5)
          .to('.ps-num', { yPercent: -(100 / steps.length) * n, duration: 0.6, ease: 'power2.inOut' }, i + 0.2)
      })
      tl.fromTo('.ps-bar', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: steps.length - 1 }, 0)
    })
    return () => mm.revert()
  }, { scope: ref })

  return (
    <section ref={ref} className="relative bg-dark text-ivory md:h-svh" aria-label="Four stages">
      {/* desktop: pinned stack */}
      <div className="wrap hidden h-full grid-cols-12 items-center gap-8 md:grid">
        <div className="relative col-span-5 h-[62vh]">
          <div className="flex items-start gap-6">
            <span className="block h-[1.1em] overflow-hidden font-display text-[clamp(80px,10vw,170px)] leading-[1.1] text-ivory/90">
              <span className="ps-num block">{steps.map((s) => <span key={s.no} className="block">{s.no}</span>)}</span>
            </span>
            <span className="mt-6 block h-40 w-px bg-white/15"><span className="ps-bar block h-full w-full origin-top bg-ivory" /></span>
          </div>
          {steps.map((s, i) => (
            <div key={s.no} className={`ps-copy-${i} absolute bottom-0 left-0 max-w-[40ch]`} style={i ? { opacity: 0, visibility: 'hidden' } : undefined}>
              <h3 className="display mb-4 text-fluid-2xl">{s.title}</h3>
              <p className="text-ivory/70">{s.long}</p>
            </div>
          ))}
        </div>
        <div className="relative col-span-6 col-start-7 h-[72vh] overflow-hidden">
          {steps.map((s, i) => (
            <div key={s.no} className={`ps-img-${i} absolute inset-0`} style={i ? { clipPath: 'inset(100% 0% 0% 0%)' } : undefined}>
              <Img pic={s.pic} sizes="50vw" />
            </div>
          ))}
        </div>
      </div>

      {/* mobile: simple sequence */}
      <ol className="wrap space-y-16 py-20 md:hidden">
        {steps.map((s) => (
          <li key={s.no}>
            <div className="aspect-[4/3] overflow-hidden"><Img pic={s.pic} sizes="100vw" /></div>
            <p className="mt-6 font-display text-5xl">{s.no}</p>
            <h3 className="display mt-2 text-fluid-2xl">{s.title}</h3>
            <p className="mt-3 text-ivory/70">{s.long}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function Process() {
  return (
    <Page label="Process">
      <Seo
        title="Process — From Concept to Completion"
        description="Discover, design, build, deliver. How Teleiostec resolves interiors, joinery and MEP in one coordinated BIM model before anything is built."
        path="/process"
        jsonLd={{
          '@type': 'HowTo', name: 'How Teleiostec delivers a space',
          step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.long })),
        }}
      />
      <PageHero index="04" kicker="Process" title={<>From concept <em>to completion.</em></>} lede="Four stages, one team. Nothing is discovered late on site because everything is resolved before it is built." />

      <section className="wrap grid gap-px border-y border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.08} className="bg-ivory p-8">
            <p className="text-[12px] tracking-[0.18em] text-muted">{s.no}</p>
            <p className="display mt-8 text-fluid-xl">{s.title}</p>
            <p className="mt-2 text-[14px] text-muted">{s.short}</p>
          </Reveal>
        ))}
      </section>

      <div className="h-[var(--sec)]" />
      <Stack />

      <section className="section">
        <div className="wrap">
          <Split as="h2" className="display mb-16 max-w-[18ch] text-fluid-3xl">Three promises <em>we build on.</em></Split>
          <div className="grid gap-10 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.no} delay={i * 0.1} className="border-t border-ink pt-6">
                <p className="text-[12px] tracking-[0.18em] text-muted">{p.no}</p>
                <h3 className="display mt-6 text-fluid-xl">{p.title}</h3>
                <p className="mt-4 text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBlock />
    </Page>
  )
}
