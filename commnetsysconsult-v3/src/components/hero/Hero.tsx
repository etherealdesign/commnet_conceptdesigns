import { useEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '@/animations/gsap'
import { Container } from '@/components/shared/Container'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { BlueprintNetwork } from './BlueprintNetwork'

export function Hero({ ready }: { ready: boolean }) {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const artRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready) return
    const h1 = h1Ref.current
    if (!h1) return

    if (prefersReducedMotion()) {
      gsap.set([h1, subRef.current, ctaRef.current, artRef.current], { opacity: 1, y: 0 })
      return
    }

    const split = new SplitText(h1, { type: 'words', wordsClass: 'word' })
    gsap.set(split.words, { y: '110%', opacity: 0 })
    gsap.set([subRef.current, ctaRef.current], { y: 16, opacity: 0 })
    gsap.set(artRef.current, { opacity: 0, scale: 0.96 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(split.words, { y: '0%', opacity: 1, duration: 0.9, stagger: 0.05 })
      .to(subRef.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.55')
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.55')
      .to(artRef.current, { opacity: 1, scale: 1, duration: 1.1 }, '-=0.7')

    return () => {
      tl.kill()
      split.revert()
    }
  }, [ready])

  return (
    <section id="top" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium tracking-wide text-[--color-primary] mb-5 uppercase">
              Turnkey ELV &amp; ICT Systems Integrator · Dubai HQ · Chennai Engineering
            </p>
            <h1
              ref={h1Ref}
              className="font-semibold tracking-tight text-[--color-navy] leading-[1.05]"
              style={{ fontSize: 'var(--fs-h1)' }}
            >
              Mission-critical infrastructure, delivered as one package.
            </h1>
            <p
              ref={subRef}
              className="mt-6 max-w-xl text-[--color-secondary] leading-relaxed"
              style={{ fontSize: 'var(--fs-lead)' }}
            >
              Structured cabling, networks, security systems, AV and critical power —
              designed, installed, certified and supported by one engineering team.
              18 documented contracts across data centres, hotels, government and
              command centres in the UAE.
            </p>
            <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton href="#projects">See the project register</MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                Send us your BoQ
              </MagneticButton>
            </div>
          </div>

          <div ref={artRef} className="flex justify-center md:justify-end">
            <BlueprintNetwork />
          </div>
        </div>
      </Container>
    </section>
  )
}
