import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { Split } from '@/components/Split'
import { Reveal } from '@/components/Reveal'
import { RevealImage } from '@/components/RevealImage'
import { Img, type Pic } from '@/components/Img'
import { Video } from '@/components/Video'
import { Marquee } from '@/components/Marquee'
import { Counter } from '@/components/Counter'
import { CtaBlock } from '@/components/CtaBlock'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { leaders, initials } from '@/data/team'
import { stats } from '@/data/site'
import { gsap, useGSAP, reducedMotion, finePointer } from '@/lib/gsap'
import { introDone } from '@/lib/intro'
import { idleAfter } from '@/lib/interaction'

const heroPoster: Pic = { src: '/Asset/media/hero-poster', widths: [640, 1080, 1280], w: 1280, h: 720, alt: '' }
const heroVideoGate = idleAfter(introDone)

/* ── Hero ─────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (reducedMotion()) return
    gsap.set('.hero-fade', { autoAlpha: 0, y: 20 })
    gsap.set('.hero-media', { scale: 1.2 })
    introDone.then(() => {
      gsap.to('.hero-media', { scale: 1, duration: 2.4, ease: 'expo.out' })
      gsap.to('.hero-fade', { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.2, delay: 0.6 })
    })
    // scroll-out: media drifts and dims, title lifts
    gsap.to('.hero-media', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to('.hero-scrim', { opacity: 0.85, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to('.hero-title', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: ref })

  return (
    <section ref={ref} className="relative h-svh min-h-[600px] overflow-hidden bg-dark text-ivory" aria-label="Introduction">
      <div className="hero-media absolute inset-0 will-change-transform">
        <Img pic={heroPoster} priority sizes="100vw" className="absolute inset-0" />
        <Video name="hero" label="A furnished interior coming together, frame by frame" after={heroVideoGate} noPoster className="absolute inset-0" />
      </div>
      <span className="hero-scrim absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60 opacity-60" aria-hidden />

      <div className="wrap relative flex h-full flex-col justify-end pb-[clamp(28px,6vh,64px)]">
        <p className="hero-fade mb-6 flex gap-3 text-[11px] uppercase tracking-[0.24em] text-ivory/75">
          <span>Interior</span>·<span>Fit-Out</span>·<span>Joinery</span>·<span>MEP</span>
        </p>
        <Split as="h1" trigger="load" by="words" className="hero-title display text-[clamp(56px,11.5vw,220px)] leading-[0.9]">
          Creating spaces <em>with intention.</em>
        </Split>
        <div className="hero-fade mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-white/20 pt-5 text-[12px] uppercase tracking-[0.16em] text-ivory/80">
          <span>Boutique fit-out &amp; MEP studio — Dubai</span>
          <span className="hidden sm:inline">Valley House — Ras Al Khaimah</span>
          <span className="flex items-center gap-3">
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-white" />
            </span>
          </span>
        </div>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  )
}

/* ── Statement: words brighten as you scroll ──────────── */
function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const text = 'Teleiostec is a boutique interior fit-out and MEP studio. We design, engineer and build considered residential, hospitality and commercial environments across the Emirates — resolved as one coordinated set, and built by our own hands.'
  useGSAP(() => {
    if (reducedMotion()) return
    gsap.fromTo('.st-word', { color: '#8f8a80' }, {
      color: '#171715', stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 45%', scrub: true },
    })
  }, { scope: ref })
  return (
    <section className="section">
      <div ref={ref} className="wrap grid gap-10 md:grid-cols-[180px_1fr]">
        <p className="kick pt-3">(01) Studio</p>
        <div>
          <p className="display text-fluid-2xl leading-[1.08]">
            {text.split(' ').map((w, i) => <span key={i} className="st-word">{w} </span>)}
          </p>
          <Reveal className="mt-12">
            <Link to="/studio" className="group inline-flex items-center gap-4 text-[12px] uppercase tracking-[0.18em]" data-cursor-hover>
              <span className="link-line">About the studio</span>
              <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Featured work: horizontal pinned gallery ─────────── */
function Work() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current!
      const dist = () => el.scrollWidth - window.innerWidth
      const tween = gsap.to(el, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
      })
      gsap.utils.toArray<HTMLElement>('.wk-img').forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, {
          xPercent: 8, ease: 'none',
          scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        })
      })
      gsap.to('.wk-bar', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: () => '+=' + dist(), scrub: true } })
    })
    return () => mm.revert()
  }, { scope: ref })

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory md:h-svh" aria-label="Selected work">
      <div className="wrap flex items-end justify-between pt-[calc(var(--header-h)+24px)] pb-8">
        <div>
          <p className="kick mb-4">(02) Selected work</p>
          <Split as="h2" className="display text-fluid-2xl">Spaces we’ve <em>built.</em></Split>
        </div>
        <Link to="/projects" className="link-line hidden text-[12px] uppercase tracking-[0.18em] md:inline">All projects →</Link>
      </div>
      <div ref={track} className="flex flex-col gap-10 px-[var(--pad)] pb-16 md:w-max md:flex-row md:items-center md:gap-[4vw] md:pb-0">
        {projects.map((p, i) => (
          <Link key={p.slug} to={`/projects/${p.slug}`} data-cursor="View" className="group block md:w-[clamp(320px,34vw,620px)]" style={{ marginTop: i % 2 ? '6vh' : 0 }}>
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2 md:h-[58vh] md:aspect-auto">
              <div className="wk-img absolute inset-[-10%]">
                <Img pic={p.pic} sizes="(max-width:768px) 92vw, 34vw" imgClassName="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="display text-fluid-xl">{p.title}</h3>
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted">0{i + 1}</span>
            </div>
            <p className="text-[13px] text-muted">{p.location} · {p.discipline} · {p.year}</p>
          </Link>
        ))}
        <Link to="/projects" data-cursor="Open" className="display flex shrink-0 items-center gap-4 text-fluid-2xl italic md:w-[28vw] md:justify-center">
          All projects <span className="not-italic">→</span>
        </Link>
      </div>
      <div className="absolute inset-x-[var(--pad)] bottom-6 hidden h-px bg-[var(--line)] md:block">
        <span className="wk-bar block h-full origin-left scale-x-0 bg-ink" />
      </div>
    </section>
  )
}

/* ── Services list with cursor-following preview ───────── */
function ServicesList() {
  const box = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState<Pic | null>(null)
  const { contextSafe } = useGSAP({ scope: ref })

  const move = contextSafe((e: React.PointerEvent) => {
    if (!finePointer() || !box.current) return
    gsap.to(box.current, { x: e.clientX, y: e.clientY, duration: 0.8, ease: 'expo.out' })
  })

  return (
    <section ref={ref} className="section" onPointerMove={move}>
      <div className="wrap">
        <div className="mb-14 grid gap-6 md:grid-cols-[180px_1fr]">
          <p className="kick pt-3">(03) Services</p>
          <Split as="h2" className="display text-fluid-2xl">Four disciplines,<br /><em>one accountable team.</em></Split>
        </div>
        <ul className="border-t border-[var(--line)]" onPointerLeave={() => setActive(null)}>
          {services.map((s) => (
            <li key={s.slug} className="border-b border-[var(--line)]">
              <Link
                to={`/services#${s.slug}`}
                onPointerEnter={() => setActive(s.pic)}
                className="group relative grid grid-cols-[48px_1fr_auto] items-center gap-6 py-[clamp(22px,3.4vh,40px)] md:grid-cols-[180px_1fr_1fr_auto]"
              >
                <span className="text-[12px] tracking-[0.18em] text-muted">{s.no}</span>
                <span className="display text-fluid-2xl transition-[transform] duration-700 ease-out-expo group-hover:translate-x-4 group-hover:italic">{s.title}</span>
                <span className="hidden max-w-[40ch] text-[14px] text-muted md:block">{s.desc}</span>
                <span className="flex size-12 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-500 group-hover:bg-ink group-hover:text-ivory">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div ref={box} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.src}
              className="absolute -left-[140px] -top-[180px] h-[360px] w-[280px] overflow-hidden"
              initial={{ clipPath: 'inset(50% 50% 50% 50%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ clipPath: 'inset(50% 50% 50% 50%)', transition: { duration: 0.4 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Img pic={active} sizes="280px" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ── Film plate that opens up as you scroll ────────────── */
function Film() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (reducedMotion()) return
    gsap.fromTo('.film-frame', { clipPath: 'inset(12% 18% 12% 18% round 8px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'center center', scrub: true },
    })
  }, { scope: ref })
  return (
    <div ref={ref} className="relative">
      <div className="film-frame relative h-[90svh] overflow-hidden bg-dark">
        <Video name="timelapse" label="Timelapse of a space coming together" />
        <span className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="wrap absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 pb-10 text-ivory">
          <p className="display text-fluid-2xl italic">Built in time.</p>
          <p className="max-w-[36ch] text-[14px] text-ivory/80">Months of coordination and craft, condensed — concept resolving into a finished space.</p>
        </div>
      </div>
    </div>
  )
}

/* ── Numbers ───────────────────────────────────────────── */
function Numbers() {
  return (
    <section className="section">
      <dl className="wrap grid grid-cols-2 gap-y-16 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="border-l border-[var(--line)] pl-6">
            <dt className="display text-fluid-3xl">{s.text ?? <Counter to={s.value} suffix={s.suffix} />}</dt>
            <dd className="mt-3 text-[12px] uppercase tracking-[0.18em] text-muted">{s.label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}

/* ── Team teaser ───────────────────────────────────────── */
function TeamTeaser() {
  return (
    <section className="section bg-ivory-2">
      <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <div>
          <p className="kick mb-6">(04) People</p>
          <Split as="h2" className="display text-fluid-2xl">The hands and minds <em>behind the work.</em></Split>
          <Reveal delay={0.2} className="mt-10">
            <Link to="/team" className="group inline-flex items-center gap-4 text-[12px] uppercase tracking-[0.18em]" data-cursor-hover>
              <span className="link-line">Meet the team</span>
              <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-5">
          {leaders.map((p, i) => (
            <Reveal key={i} delay={i * 0.1} y={80}>
              <Link to="/team" data-cursor="Meet" className="group block">
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#d9d2c4]">
                  <span className="display text-[clamp(32px,5vw,80px)] text-ink/40 transition-transform duration-1000 ease-out-expo group-hover:scale-110">{initials(p.name)}</span>
                </div>
                <p className="mt-3 text-[13px]">{p.name}</p>
                <p className="text-[12px] text-muted">{p.role}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Page label="Teleiostec">
      <Seo
        title="Teleiostec — Interior Fit-Out & MEP Studio, Dubai"
        description="Teleiostec is a boutique interior fit-out and MEP studio in Dubai. We design and build considered environments where craftsmanship, engineering and restraint meet."
        path="/"
        jsonLd={{ '@type': 'WebSite', name: 'Teleiostec', url: 'https://www.teleiostec.com/', publisher: { '@id': 'https://www.teleiostec.com/#org' } }}
      />
      <Hero />
      <Statement />
      <Work />
      <div className="border-y border-[var(--line)] py-8 text-fluid-3xl">
        <Marquee items={['Interior', 'Fit-Out', 'Joinery', 'MEP Solutions']} />
      </div>
      <ServicesList />
      <Film />
      <Numbers />
      <section className="wrap grid gap-6 pb-[var(--sec)] md:grid-cols-12">
        <RevealImage className="aspect-[4/5] md:col-span-5">
          <Img pic={{ src: '/Asset/photos/craftsman-working-on-walnut-cabinet', widths: [800, 1400], w: 1400, h: 1045, alt: 'Craftsman working on a walnut cabinet' }} sizes="(max-width:768px) 100vw, 40vw" />
        </RevealImage>
        <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
          <Split as="h2" className="display text-fluid-3xl">Every detail <em>has a reason.</em></Split>
          <Reveal delay={0.2} className="mt-8 max-w-[44ch] text-muted">
            <p>Veneer matching, solid timber detailing and hand-finished millwork — made in our own workshop, by the people who drew it.</p>
          </Reveal>
        </div>
      </section>
      <TeamTeaser />
      <CtaBlock />
    </Page>
  )
}
