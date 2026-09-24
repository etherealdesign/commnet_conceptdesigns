import { useRef } from 'react'
import { Link } from 'react-router'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useIntroDone } from '../Intro'
import { HeroGrid3D } from '../HeroGrid3D'
import { Arrow } from '../Arrow'
import { IMG } from '../../lib/images'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const ready = useIntroDone()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const split = SplitText.create('h1', { type: 'words', mask: 'words' })
      tl.current = gsap
        .timeline({ paused: true, delay: 0.3 })
        .from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.08, ease: 'expo.out' })
        .from('.eyebrow, p, .cta', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out' }, '-=.8')
        .from('#three', { opacity: 0, scale: 0.94, duration: 1.4, ease: 'expo.out' }, '-=1')
      gsap.to('.bg', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    },
    { scope: ref },
  )

  useGSAP(() => {
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <section id="hero" data-theme="dark" ref={ref} style={{ ['--hero-img' as string]: `url(${IMG.infrastructureFiber})` }}>
      <div className="bg" />
      <div className="veil" />
      <div className="beam" />
      <div className="beam" />
      <div className="beam" />
      <div className="beam" />
      <div className="wrap">
        <div>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            Turnkey ELV &amp; ICT Systems Integrator · Dubai HQ · Chennai Engineering
          </span>
          <h1>Mission-critical infrastructure, delivered as one package.</h1>
          <p className="lead">
            Structured cabling, networks, security systems, AV and critical power — designed, installed, certified and supported by one engineering team. 18
            documented contracts across data centres, hotels, government and command centres in the UAE.
          </p>
          <div className="cta">
            <Link className="btn btn-primary magnetic" to="/projects">
              See the project register <Arrow />
            </Link>
            <Link className="btn btn-ghost magnetic" to="/contact">
              Send us your BoQ
            </Link>
          </div>
        </div>
        <HeroGrid3D />
      </div>
      <div className="scroll-ind" aria-hidden="true" />
    </section>
  )
}
