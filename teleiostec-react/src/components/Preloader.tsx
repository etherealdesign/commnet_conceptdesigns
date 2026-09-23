import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '@/lib/gsap'
import { finishIntro } from '@/lib/intro'

/** Counter + wordmark curtain on the first desktop load of a session. Kept under ~1.8s; skipped under reduced motion. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('tl-intro') === '1'; sessionStorage.setItem('tl-intro', '1') } catch { /* storage blocked */ }
    // Phones skip straight to the hero reveal: the preloader would sit directly on their LCP.
    const desktop = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches
    if (seen || !desktop || reducedMotion()) { finishIntro(); setGone(true); return }
    const count = { v: 0 }
    const tl = gsap.timeline({ onComplete: () => setGone(true) })
    tl.from('.pl-letter', { yPercent: 110, stagger: 0.04, duration: 1, ease: 'expo.out' }, 0)
      .to(count, { v: 100, duration: 1.3, ease: 'power3.inOut', onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(count.v)).padStart(3, '0') } }, 0)
      .to('.pl-bar', { scaleX: 1, duration: 1.3, ease: 'power3.inOut' }, 0)
      .to('.pl-letter', { yPercent: -110, stagger: 0.02, duration: 0.7, ease: 'expo.in' }, 1.35)
      .add(() => finishIntro(), 1.75)
      .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' }, 1.7)
    return () => { tl.kill() }
  }, [])

  if (gone) return null
  return (
    <div ref={root} aria-hidden className="grain fixed inset-0 z-[200] flex flex-col justify-between bg-dark p-[var(--pad)] text-ivory" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <span className="kick !text-muted-dark">Interior · Fit-Out · Joinery · MEP</span>
      <div className="flex items-end justify-between gap-6">
        <span className="display flex overflow-hidden text-[clamp(44px,10vw,160px)]">
          {'Teleiostec'.split('').map((c, i) => <span key={i} className="pl-letter inline-block">{c}</span>)}
        </span>
        <span ref={num} className="font-display text-[clamp(20px,2.4vw,36px)] tabular-nums text-muted-dark">000</span>
      </div>
      <span className="pl-bar block h-px w-full origin-left scale-x-0 bg-ivory/40" />
    </div>
  )
}
