import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { Split } from '@/components/Split'
import { Reveal } from '@/components/Reveal'
import { Img } from '@/components/Img'
import { CtaBlock } from '@/components/CtaBlock'
import { projectBySlug, projects } from '@/data/projects'
import { SITE_URL } from '@/data/site'
import { gsap, useGSAP, reducedMotion } from '@/lib/gsap'
import { introDone } from '@/lib/intro'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = projectBySlug(slug)
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!p || reducedMotion()) return
    gsap.set('.pd-media', { clipPath: 'inset(30% 10% 0% 10%)' })
    gsap.set('.pd-inner', { scale: 1.3 })
    introDone.then(() => {
      gsap.to('.pd-media', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut', delay: 0.5 })
      gsap.to('.pd-inner', { scale: 1, duration: 2.4, ease: 'expo.out', delay: 0.5 })
    })
    gsap.to('.pd-inner', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.pd-media', start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: ref, dependencies: [slug] })

  if (!p) return <NotFound />
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]!

  return (
    <Page label={p.title}>
      <Seo
        title={`${p.title} — ${p.location}`}
        description={p.summary}
        path={`/projects/${p.slug}`}
        image={`${p.pic.src}-${p.pic.widths.at(-1)}.jpg`}
        jsonLd={{
          '@type': 'CreativeWork', name: p.title, about: p.discipline, dateCreated: String(p.year),
          locationCreated: { '@type': 'Place', name: p.location }, image: `${SITE_URL}${p.pic.src}-${p.pic.widths.at(-1)}.jpg`,
          creator: { '@id': `${SITE_URL}/#org` }, description: p.summary,
        }}
      />
      <div ref={ref}>
        <section className="wrap pt-[calc(var(--header-h)+clamp(48px,10vh,120px))] pb-12">
          <Link to="/projects" className="link-line mb-10 inline-block text-[12px] uppercase tracking-[0.18em] text-muted">← All projects</Link>
          <Split as="h1" trigger="load" by="chars" className="display text-fluid-4xl">{p.title}</Split>
        </section>

        <div className="pd-media relative h-[80svh] overflow-hidden bg-ivory-2">
          <div className="pd-inner absolute inset-0">
            <Img pic={p.pic} priority sizes="100vw" />
          </div>
        </div>

        <section className="wrap section grid gap-16 md:grid-cols-12">
          <dl className="grid grid-cols-2 gap-8 self-start text-[14px] md:col-span-4 md:grid-cols-1">
            {[['Location', p.location], ['Discipline', p.discipline], ['Sector', p.category], ['Year', String(p.year)]].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06} className="border-t border-[var(--line)] pt-3">
                <dt className="kick mb-1">{k}</dt>
                <dd>{v}</dd>
              </Reveal>
            ))}
          </dl>
          <div className="md:col-span-7 md:col-start-6">
            <Split as="p" className="display mb-12 text-fluid-xl leading-[1.2]">{p.summary}</Split>
            {p.body.map((b, i) => (
              <Reveal key={i} delay={0.1 * i}><p className="mb-6 max-w-[58ch] text-ink/75">{b}</p></Reveal>
            ))}
          </div>
        </section>

        <Link to={`/projects/${next.slug}`} data-cursor="Next" className="group relative block h-[70svh] overflow-hidden bg-dark text-ivory">
          <div className="absolute inset-0 opacity-50 transition-[opacity,transform] duration-[1.4s] ease-out-expo group-hover:scale-105 group-hover:opacity-70">
            <Img pic={next.pic} sizes="100vw" alt="" />
          </div>
          <div className="wrap relative flex h-full flex-col justify-end pb-12">
            <p className="kick mb-4 !text-ivory/70">Next project</p>
            <p className="display text-fluid-3xl">{next.title} <span className="inline-block transition-transform duration-700 ease-out-expo group-hover:translate-x-4">→</span></p>
          </div>
        </Link>
      </div>
      <CtaBlock />
    </Page>
  )
}
