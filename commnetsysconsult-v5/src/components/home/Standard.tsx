import { Block } from '@/components/shared/Block'
import { SectionHead } from '@/components/shared/SectionHead'
import { Scramble } from '@/components/shared/Scramble'
import { useReveal } from '@/hooks/useReveal'
import { standard } from '@/data/home'

/**
 * Light ground. A strap line with a square in front of it, then six
 * points in a three-column grid: mono title, hairline, one sentence.
 * Titles resolve out of noise as they arrive and again on hover.
 */
export function Standard() {
  const ref = useReveal<HTMLElement>()
  return (
    <Block ref={ref} anchor="compliance" className="theme-light py-24 md:py-32" ariaLabel="What is in a contract">
      <div className="grid-container">
        <SectionHead title={standard.title} label={standard.label} />
        <p data-reveal className="mono mt-10 flex items-center gap-3">
          <span className="sq" />
          {standard.strap}
        </p>
        <ul className="grid-layout mt-16 gap-y-16 md:mt-24">
          {standard.items.map((it, i) => (
            <li key={it.title} data-reveal className="grid-span-12 md:grid-span-6 lg:grid-span-4 flex flex-col gap-6">
              <h3 className="mono">
                <Scramble text={it.title} onHover delay={i * 60} />
              </h3>
              <span className="block h-px w-full bg-line" aria-hidden="true" />
              <p className="t-body max-w-xs text-fg-muted">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  )
}
