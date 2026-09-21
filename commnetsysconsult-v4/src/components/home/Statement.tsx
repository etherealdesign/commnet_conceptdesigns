import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReveal } from '@/hooks/useReveal'
import { statement } from '@/data/home'
import { proofStrip } from '@/data/metrics'

/**
 * Who we are: the statement on the left, the paragraph on the right, and
 * the six headline numbers from the register beneath, counting up once
 * as they come into view.
 */
export function Statement() {
  const ref = useReveal<HTMLElement>()
  const nums = useRef<HTMLDListElement>(null)

  useEffect(() => {
    const el = nums.current
    if (!el || prefersReducedMotion()) return
    const targets = el.querySelectorAll<HTMLElement>('[data-count]')
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        targets.forEach((t) => {
          const raw = t.dataset.count ?? ''
          const n = parseFloat(raw.replace(/[^0-9.]/g, ''))
          if (!Number.isFinite(n)) return
          const suffix = raw.replace(/^[0-9.,]+/, '')
          const o = { v: 0 }
          gsap.to(o, {
            v: n,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: () => {
              t.textContent = Math.round(o.v).toLocaleString('en-GB') + suffix
            },
          })
        })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <Block ref={ref} section={statement.label} className="margin-px-1 py-20 md:py-28">
      <SectionLabel index={2} aside="Dubai · Abu Dhabi · Sharjah" data-reveal>
        {statement.label}
      </SectionLabel>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-6">
        <h2 className="d-1 md:col-span-7" data-reveal>
          {statement.lines.map((l, i) => (
            <span key={i} className="block">
              <span dangerouslySetInnerHTML={{ __html: l }} />
            </span>
          ))}
        </h2>
        <p data-reveal className="max-w-md text-16 text-grey md:col-span-4 md:col-start-9 md:self-end">
          {statement.body}
        </p>
      </div>

      <dl ref={nums} data-reveal className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8 md:mt-20 md:grid-cols-6">
        {proofStrip.map((m) => (
          <div key={m.label} className="flex flex-col gap-2">
            <dd className="d-2" data-count={m.value}>
              {m.value}
            </dd>
            <dt className="text-14 text-grey">{m.label}</dt>
          </div>
        ))}
      </dl>
    </Block>
  )
}
