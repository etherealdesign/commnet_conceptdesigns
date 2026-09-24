import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useIntroDone } from '../Intro'
import { IMG, type ImgKey } from '../../lib/images'
import type { Crumb } from '../Seo'

interface Props {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  lead: string
  img: ImgKey
  actions?: ReactNode
  facts?: { value: string; label: string }[]
}

/** The v1 hero — same veil, beams and word reveal — at inner-page height. */
export function PageHero({ crumbs, eyebrow, title, lead, img, actions, facts }: Props) {
  const ref = useRef<HTMLElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const ready = useIntroDone()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const split = SplitText.create('h1', { type: 'words', mask: 'words' })
      const t = gsap
        .timeline({ paused: true, delay: 0.35 })
        .from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'expo.out' })
        .from(ref.current!.querySelectorAll('.crumbs, .eyebrow, .lead, .cta'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, '-=.9')
      const facts = ref.current!.querySelectorAll('.fact')
      if (facts.length) t.from(facts, { y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out' }, '-=.9')
      tl.current = t
      gsap.to('.bg', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    },
    { scope: ref },
  )

  useGSAP(() => {
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <section className="page-hero" data-theme="dark" ref={ref} style={{ ['--hero-img' as string]: `url(${IMG[img]})` }}>
      <div className="bg" />
      <div className="veil" />
      <div className="beam" />
      <div className="beam" />
      <div className="beam" />
      <div className="beam" />
      <div className="wrap">
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              {crumbs.map((c, i) => (
                <li key={c.path}>
                  {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link to={c.path}>{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>
            {eyebrow}
          </span>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          {actions && <div className="cta">{actions}</div>}
        </div>
        {facts && (
          <div className="facts">
            {facts.map((f) => (
              <div className="fact glass" key={f.label}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
