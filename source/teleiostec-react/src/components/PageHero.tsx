import type { ReactNode } from 'react'
import { Split } from './Split'
import { Reveal } from './Reveal'

/** Standard inner-page opener: index, kicker, oversized split title, lede. */
export function PageHero({ index, kicker, title, lede, dark }: { index: string; kicker: string; title: ReactNode; lede?: ReactNode; dark?: boolean }) {
  return (
    <section className={dark ? 'bg-dark text-ivory' : ''}>
      <div className="wrap pt-[calc(var(--header-h)+clamp(60px,14vh,160px))] pb-[clamp(56px,9vh,120px)]">
        <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted">
          <span>{kicker}</span>
          <span>({index})</span>
        </div>
        <Split as="h1" trigger="load" className="display max-w-[14ch] text-fluid-4xl">{title}</Split>
        {lede && (
          <Reveal delay={0.3} className="mt-12 ml-auto max-w-[42ch] text-fluid-lg leading-[1.5] md:mr-[8%]">
            <p className={dark ? 'text-ivory/75' : 'text-ink/75'}>{lede}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
