import { useRef } from 'react'
import { Link } from 'react-router'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useIntroDone } from '../Intro'
import { Arrow } from '../Arrow'
import { HeroGrid3D } from '../HeroGrid3D'
import { IMG } from '../../lib/images'

const HERO_VIDEO = `${import.meta.env.BASE_URL}video/hero.mp4`

/** Figures from the 18-contract register — the same source as NUMBERS. */
const PROOF = [
  { value: '18', label: 'Documented enterprise contracts' },
  { value: '15,500+', label: 'Cabling points certified' },
  { value: '2,800+', label: 'CCTV cameras commissioned' },
  { value: '8-year', label: 'Longest SLA delivered' },
]

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
        .from('.bg', { scale: 1.18, opacity: 0, duration: 2, ease: 'expo.out' })
        .from('#three', { opacity: 0, duration: 2, ease: 'power2.out' }, '-=1.4')
        .from('.tag', { y: 16, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=1.6')
        .from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.07, ease: 'expo.out' }, '-=1.4')
        .from('.lead, .cta', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out' }, '-=.8')
        .from('.proof > div', { y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, '-=.6')
      gsap.to('.bg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    },
    { scope: ref },
  )

  useGSAP(() => {
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <section id="hero" data-theme="dark" ref={ref}>
      <div className="bg">
        <video src={HERO_VIDEO} poster={IMG.infrastructureFiber} autoPlay={!prefersReducedMotion()} muted loop playsInline preload="auto" aria-hidden="true" />
      </div>
      <div className="veil" />
      <HeroGrid3D />
      <div className="wrap">
        <div className="copy">
          <span className="tag">
            <i aria-hidden="true" />
            ELV &amp; ICT systems integrator · Dubai · Chennai
          </span>
          <h1>
            Mission-critical infrastructure, delivered as <em>one package.</em>
          </h1>
          <p className="lead">
            Structured cabling, networks, security, AV and critical power — designed, installed, certified and supported by one engineering team.
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
        <dl className="proof">
          {PROOF.map((p) => (
            <div key={p.label}>
              <dt>{p.label}</dt>
              <dd>{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
