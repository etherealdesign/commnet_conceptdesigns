import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/PageHero'
import { Split } from '@/components/Split'
import { Reveal } from '@/components/Reveal'
import { RevealImage } from '@/components/RevealImage'
import { Img } from '@/components/Img'
import { CtaBlock } from '@/components/CtaBlock'
import { services } from '@/data/services'
import { useLenis } from '@/lib/smooth'

export default function ServicesPage() {
  const { hash } = useLocation()
  const lenis = useLenis()

  // Deep links from the home page (/services#joinery) land after the curtain lifts.
  useEffect(() => {
    if (!hash) return
    const id = setTimeout(() => {
      const el = document.querySelector<HTMLElement>(hash)
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.6 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }, 1300)
    return () => clearTimeout(id)
  }, [hash, lenis])

  return (
    <Page label="Services">
      <Seo
        title="Services — Interior, Fit-Out, Joinery & MEP"
        description="Interior design, turnkey fit-out, bespoke in-house joinery and BIM-coordinated MEP engineering — four disciplines delivered by one accountable team in Dubai."
        path="/services"
        jsonLd={services.map((s) => ({ '@type': 'Service', name: s.title, description: s.desc, provider: { '@id': 'https://www.teleiostec.com/#org' }, areaServed: 'United Arab Emirates' }))}
      />
      <PageHero index="03" kicker="Services" title={<>Four disciplines, <em>one team.</em></>} lede="From the first sketch to the last commissioning certificate, design and delivery stay in the same hands." />

      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className="border-t border-[var(--line)]">
          <div className="wrap grid gap-10 py-[clamp(64px,12vh,140px)] md:grid-cols-12">
            <div className={`md:col-span-5 md:sticky md:top-[calc(var(--header-h)+32px)] md:self-start ${i % 2 ? 'md:order-2 md:col-start-8' : ''}`}>
              <p className="mb-6 flex justify-between text-[12px] tracking-[0.18em] text-muted"><span>{s.no}</span><span className="uppercase">{s.tag}</span></p>
              <Split as="h2" by="chars" className="display text-fluid-3xl">{s.title}</Split>
              <Reveal delay={0.15} className="mt-8"><p className="max-w-[42ch] text-fluid-lg leading-[1.5]">{s.desc}</p></Reveal>
              <ul className="mt-10 border-t border-[var(--line)]">
                {s.deliverables.map((d, j) => (
                  <li key={d} className="border-b border-[var(--line)]">
                    <Reveal delay={0.2 + j * 0.06} y={16} className="flex items-center justify-between py-3 text-[14px]">
                      {d}<span className="text-muted">0{j + 1}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`md:col-span-6 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
              <RevealImage className="aspect-[4/5]" from={i % 2 ? 'left' : 'right'} parallax={12}>
                <Img pic={s.pic} sizes="(max-width:768px) 100vw, 50vw" />
              </RevealImage>
            </div>
          </div>
        </section>
      ))}
      <CtaBlock title={<>Tell us about <br /><em>your space.</em></>} />
    </Page>
  )
}
