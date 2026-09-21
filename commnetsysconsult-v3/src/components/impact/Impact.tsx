import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { impact } from '@/data/home'

function Arrows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 542 540" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.768 261c.77-1.333 2.694-1.333 3.464 0l3.897 6.75c.77 1.333-.192 3-1.732 3H4.603c-1.54 0-2.502-1.667-1.732-3zM265.5 533.232c-1.333-.77-1.333-2.694 0-3.464l6.75-3.897c1.333-.77 3 .192 3 1.732v7.794c0 1.54-1.667 2.502-3 1.732zM535.232 272c-.77 1.333-2.694 1.333-3.464 0l-3.897-6.75c-.77-1.333.192-3 1.732-3h7.794c1.54 0 2.502 1.667 1.732 3zM276.5 6.768c1.333.77 1.333 2.694 0 3.464l-6.75 3.897c-1.333.77-3-.192-3-1.732V4.603c0-1.54 1.667-2.502 3-1.732z"
      />
    </svg>
  )
}

function Circle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 542 540" fill="none" className={className} aria-hidden="true">
      <circle cx="270.5" cy="270.5" r="261.5" stroke="currentColor" strokeDasharray="0.1 3" strokeLinecap="round" />
    </svg>
  )
}

function Ellipse({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1418 525" fill="none" preserveAspectRatio="none" className={className} aria-hidden="true">
      <ellipse cx="709" cy="262.5" rx="708" ry="261.5" stroke="currentColor" strokeDasharray="0.1 3" strokeLinecap="round" />
    </svg>
  )
}

/**
 * The pinned chapter. The block is (n + 1) screens tall and its content is
 * stuck to the top, so scrolling through it turns the pages: each fact
 * fades out as the next rises in, and the compass arrows turn a quarter
 * turn per page. Scrubbed against scroll, so it can be read at any pace
 * and run backwards.
 */
export function Impact() {
  const root = useRef<HTMLElement>(null)
  const n = impact.slides.length

  useEffect(() => {
    const el = root.current
    if (!el) return
    const slides = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.impact-content'))
    if (prefersReducedMotion()) {
      gsap.set(slides, { autoAlpha: 1, position: 'relative', y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 100%', end: 'bottom 0%', scrub: 0.5 } })
        .fromTo('.impact-arrows', { rotate: 0 }, { rotate: -90 + 90 * (n + 2), duration: 1, ease: 'none' }, 0)

      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top -50%', end: 'bottom 150%', scrub: 0.5 } })
      slides.forEach((s, i) => {
        const l = 1 / slides.length
        if (i < slides.length - 1) tl.fromTo(s, { autoAlpha: 1 }, { autoAlpha: 0, duration: l / 4, ease: 'power3.out' }, l * i)
        if (i > 0) {
          tl.fromTo(s, { y: '6rem' }, { y: 0, duration: l / 2, ease: 'power4.out' }, l * i - l)
          tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: l / 4, ease: 'power1.in' }, l * i - l)
        }
      })
    }, el)
    return () => ctx.revert()
  }, [n])

  return (
    <Block
      ref={root}
      anchor="impact"
      className="-mb-[calc(var(--vh)*35-12rem)] min-h-screen"
      style={{ height: `calc(var(--vh) * ${100 * n + 100})` }}
      ariaLabel="Scale, from the project register"
    >
      <div className="sticky top-0">
        <div className="relative h-screen w-full overflow-clip text-ink">
          <div className="absolute left-1/2 top-1/2">
            <Ellipse className="absolute w-[857px] -translate-x-1/2 -translate-y-1/2 max-sm:h-[408px] md:w-[1416px]" />
            <Circle className="absolute w-[421px] -translate-x-1/2 -translate-y-1/2 md:w-[542px]" />
            <div className="impact-arrows absolute left-1/2 top-1/2">
              <Arrows className="absolute w-[421px] -translate-x-1/2 -translate-y-1/2 md:w-[542px]" />
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 h-screen w-full">
          {impact.slides.map((s) => (
            <div key={s.value + s.unit} className="absolute left-0 top-0 grid h-screen w-full place-content-center">
              <div className="impact-content invisible -mt-6 flex flex-col items-center justify-center gap-6 text-center">
                <p className="u-num text-60 md:text-100">
                  {s.value}
                  <span className="ml-3 text-25 text-grey md:text-36">{s.unit}</span>
                </p>
                <p className="span-w-5 md:span-wider-4 text-13 text-grey">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Block>
  )
}
