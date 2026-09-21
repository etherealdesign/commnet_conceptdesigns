import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SonarGrid } from '@/components/ui/sonar-grid'
import { useReveal } from '@/hooks/useReveal'
import { method } from '@/data/home'

/**
 * The dark chapter. A title screen, the delivery model with its legend,
 * then a two-line statement the size of the viewport and the six stages
 * underneath it. A hairline at the top of the chapter fills as it is read,
 * and the dot field behind everything drifts at half scroll speed.
 */
export function Method() {
  const ref = useReveal<HTMLElement>()
  const bg = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    const field = bg.current
    const line = bar.current
    if (!root || !field || !line || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        field,
        { yPercent: -25 },
        { yPercent: 25, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      gsap.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: true } },
      )
    }, root)
    return () => ctx.revert()
  }, [ref])

  return (
    <Block ref={ref} anchor="method" isDark className="flex flex-col overflow-clip bg-ink text-cream">
      <div ref={bg} className="pointer-events-none absolute inset-x-0 -top-1/4 h-[150%] opacity-70" aria-hidden="true">
        <SonarGrid
          className="h-full w-full"
          color="rgba(251,250,247,0.9)"
          spacing={34}
          dotRadius={0.9}
          baseOpacity={0.14}
          pingEvery={6}
          speed={180}
          ringWidth={140}
          amplitude={1.4}
          interactive={false}
          pingArea={[0.1, 0.3, 0.9, 0.7]}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-ink)_80%)]" />
      </div>

      <div className="sticky top-0 z-10 h-px w-full bg-cream/10">
        <div ref={bar} className="h-full w-full origin-left bg-cream/70" />
      </div>

      <div className="margin-px-1 relative flex h-screen w-full items-center justify-center">
        <h2 data-reveal className="md:span-w-10 text-center text-36 md:text-84">
          {method.title}
        </h2>
      </div>

      <div className="h-[calc(var(--vh)*30)] w-full" aria-hidden="true" />

      <div className="md:margin-px-1 relative flex min-h-screen w-full items-end md:items-start">
        <div className="md:span-ml-2 flex flex-col gap-8 px-4 py-10 md:mt-40 md:gap-12 md:px-0 md:pb-12">
          <h3 data-reveal className="md:span-w-6 text-25 md:text-36">
            <span className="text-chip">{method.part1.title.split(' ')[0]}</span>{' '}
            {method.part1.title.split(' ').slice(1).join(' ')}
          </h3>
          <p data-reveal className="md:span-w-5 text-13 text-cream/80">
            {method.part1.text}
          </p>
          <ul data-reveal className="flex flex-col gap-4">
            <li className="flex items-center gap-6">
              <span aria-hidden="true" className="span-wider-1 h-0 border-t border-chip" />
              <span className="text-11 text-chip">{method.part1.legend.first}</span>
            </li>
            <li className="flex items-center gap-6">
              <span aria-hidden="true" className="span-wider-1 h-2 rounded-xs border border-cream/40" />
              <span className="text-11 text-cream/80">{method.part1.legend.second}</span>
            </li>
            <li className="flex items-center gap-6">
              <span aria-hidden="true" className="span-wider-1 h-0 border-t border-dashed border-cream/50" />
              <span className="text-11 text-cream/80">{method.part1.legend.third}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative flex w-full flex-col">
        <h3 className="margin-px-1 flex h-[calc(var(--vh)*100)] w-full flex-col items-center justify-between py-9 text-48 max-sm:text-center md:justify-center md:text-100">
          <span data-reveal className="self-start">
            {method.part2.line1}
          </span>
          <span data-reveal className="self-end text-cream/70">
            {method.part2.line2}
          </span>
        </h3>

        <div className="md:margin-px-1 pt-[calc(var(--vh)*20)]">
          <ol className="md:span-w-7 md:span-ml-2 flex flex-col border-t border-cream/15 px-4 pb-32 md:px-0">
            {method.part2.steps.map((s, i) => (
              <li key={s.title} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 border-b border-cream/15 py-6 md:grid-cols-[4rem_1fr_1fr] md:gap-6 md:py-8">
                <span className="u-num text-13 text-cream/50">0{i + 1}</span>
                <h4 className="text-21 md:text-25">{s.title}</h4>
                <p className="col-start-2 text-13 text-cream/70 md:col-start-3">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Block>
  )
}
