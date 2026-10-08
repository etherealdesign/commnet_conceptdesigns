import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/PageHero'
import { Split } from '@/components/Split'
import { Reveal } from '@/components/Reveal'
import { RevealImage } from '@/components/RevealImage'
import { Img, type Pic } from '@/components/Img'
import { Video } from '@/components/Video'
import { Counter } from '@/components/Counter'
import { Marquee } from '@/components/Marquee'
import { CtaBlock } from '@/components/CtaBlock'
import { principles } from '@/data/process'
import { APPROACH, FOUNDED, stats } from '@/data/site'

const photo = (name: string, alt: string): Pic => ({ src: `/Asset/photos/${name}`, widths: [800, 1400], w: 1400, h: 1045, alt })

export default function Studio() {
  return (
    <Page label="Studio">
      <Seo
        title="About the Studio — Interior Fit-Out & MEP, UAE"
        description={`Teleiostec has designed, engineered and delivered interiors across the UAE since ${FOUNDED}. One integrated studio for interior design, project management, MEP and fit-out.`}
        path="/studio"
        jsonLd={{ '@type': 'AboutPage', name: 'About Teleiostec', about: { '@id': 'https://www.teleiostec.com/#org' } }}
      />
      <PageHero index="02" kicker={`Est. ${FOUNDED} — Dubai`} title={<>We build the quiet <em>details</em> people remember.</>} />

      <section className="wrap grid gap-10 pb-[var(--sec)] md:grid-cols-12">
        <RevealImage className="aspect-[4/3] md:col-span-7" from="left">
          <Img pic={photo('curved-walnut-and-limestone-inte', 'Curved walnut and limestone interior detail')} sizes="(max-width:768px) 100vw, 58vw" />
        </RevealImage>
        <div className="flex flex-col justify-end gap-6 md:col-span-4 md:col-start-9">
          <Reveal><p className="text-fluid-lg leading-[1.5]">Teleiostec is an integrated interior fit-out and MEP studio providing design, engineering, and turnkey execution across the UAE.</p></Reveal>
          <Reveal delay={0.1}><p className="text-muted">We deliver residential, hospitality, and commercial environments through a coordinated approach that brings together technical expertise, considered design, and meticulous execution under one roof.</p></Reveal>
        </div>
      </section>

      <div className="relative h-[85svh] overflow-hidden bg-dark">
        <Video name="moment" mobile label="Timelapse of an interior coming together" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" aria-hidden />
        <div className="wrap absolute inset-x-0 bottom-0 pb-10 text-ivory">
          <p className="kick mb-3 !text-ivory/70">Between the work</p>
          <p className="max-w-[40ch] text-fluid-lg">A space coming to life, frame by frame — the parts of a room you feel before you notice.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <p className="kick mb-6">Why Teleiostec</p>
          <ol className="border-t border-[var(--line)]">
            {principles.map((p, i) => (
              <li key={p.no} className="grid gap-4 border-b border-[var(--line)] py-12 md:grid-cols-[180px_1fr_1fr] md:gap-10">
                <Reveal delay={i * 0.05}><span className="text-[12px] tracking-[0.18em] text-muted">{p.no}</span></Reveal>
                <Split as="h2" className="display text-fluid-2xl">{p.title}</Split>
                <Reveal delay={0.15}><p className="max-w-[44ch] text-muted md:pt-3">{p.body}</p></Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="overflow-hidden bg-ink py-10 text-ivory text-fluid-3xl">
        <Marquee items={['Craft', 'Engineering', 'Restraint', 'Accountability']} duration={30} />
      </div>

      <section className="wrap section grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Split as="h2" className="display text-fluid-3xl">Every detail <em>begins with intent.</em></Split>
          <Reveal delay={0.15} className="mt-6"><p className="display text-fluid-lg italic">Space, material, light — in conversation.</p></Reveal>
          <Reveal delay={0.2} className="mt-8 max-w-[40ch] text-muted"><p>{APPROACH}</p></Reveal>
        </div>
        <figure className="md:col-span-6 md:col-start-7">
          <RevealImage className="aspect-[4/3]"><Img pic={{ src: '/Asset/media/great-room', widths: [400, 800, 1200, 1535], w: 1535, h: 1024, alt: 'Double-height great room with a circular oculus and valley view' }} sizes="(max-width:768px) 100vw, 46vw" /></RevealImage>
          <figcaption className="mt-3 text-[12px] text-muted">Light — an oculus over the great room</figcaption>
        </figure>
        <figure className="md:col-span-4 md:col-start-8 md:mt-6">
          <RevealImage className="aspect-[3/4]" from="right"><Img pic={photo('modern-interior-corridor-leading', 'Modern interior corridor with layered natural light')} sizes="(max-width:768px) 100vw, 34vw" /></RevealImage>
          <figcaption className="mt-3 text-[12px] text-muted">Light — corridor study</figcaption>
        </figure>
      </section>

      <section className="pb-[var(--sec)]">
        <dl className="wrap grid grid-cols-2 gap-y-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-l border-[var(--line)] pl-6">
              <dt className="display text-fluid-3xl">{s.text ?? <Counter to={s.value} suffix={s.suffix} />}</dt>
              <dd className="mt-3 text-[12px] uppercase tracking-[0.18em] text-muted">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>
      <CtaBlock />
    </Page>
  )
}
