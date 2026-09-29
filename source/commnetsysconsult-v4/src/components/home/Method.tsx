import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReveal } from '@/hooks/useReveal'
import { method } from '@/data/home'

/**
 * The six stages on a ruler. A scale runs the width of the page with a
 * station at each stage; a blue trace draws along it as the section
 * scrolls and each station comes to full ink as the trace reaches it.
 */
export function Method({ index = 6 }: { index?: number }) {
  const ref = useReveal<HTMLElement>()
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    const trace = el.querySelector<HTMLElement>('[data-trace]')
    const stations = el.querySelectorAll<HTMLElement>('[data-station]')
    if (!trace) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: 0.6 } })
      tl.fromTo(trace, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)
      stations.forEach((s, i) => {
        tl.fromTo(s, { opacity: 0.3 }, { opacity: 1, duration: 0.1 }, (i / (stations.length - 1)) * 0.95)
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <Block ref={ref} section={method.label} className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <SectionLabel index={index} aside="Survey → Support">
        {method.label}
      </SectionLabel>

      <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-6">
        <h2 className="d-1 md:col-span-7">
          {method.lines.map((l, i) => (
            <span key={i} className="block">
              <span dangerouslySetInnerHTML={{ __html: l }} />
            </span>
          ))}
        </h2>
        <p data-reveal className="max-w-md text-16 text-grey md:col-span-4 md:col-start-9 md:self-end">
          {method.body}
        </p>
      </div>

      {/* ruler */}
      <div ref={track} className="relative mt-16 md:mt-24">
        <div className="relative hidden h-px bg-ink/15 md:block" aria-hidden="true">
          <div data-trace className="absolute inset-0 origin-left bg-primary" />
        </div>

        <ol className="grid gap-8 md:grid-cols-6 md:gap-6 md:pt-6">
          {method.steps.map((s, i) => (
            <li key={s.title} data-station className="relative flex gap-4 md:block">
              <span className="mono bullet shrink-0 text-grey md:block">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="d-3 md:mt-4">{s.title}</h3>
                <p className="mt-3 text-14 text-grey">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Block>
  )
}
