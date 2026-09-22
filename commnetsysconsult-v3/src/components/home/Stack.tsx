import { useEffect, useRef } from 'react'
import { ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { AnimText } from '@/components/motion/AnimText'
import { stack } from '@/data/home'

/**
 * The reference's stacking cards. A heading the width of the page is
 * sticky at the top; the cards are sticky too, a little lower, so each new
 * one slides up over the last while the one underneath shrinks (15 %) and
 * lifts (5 %) by its own progress. The two text blocks beside the cards
 * fade out as their card is covered. The last card carries the closing
 * line and the button.
 */
export function Stack() {
  const root = useRef<HTMLElement>(null)
  const cards = useRef<(HTMLLIElement | null)[]>([])
  const blocks = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const triggers: ScrollTrigger[] = []
    cards.current.forEach((card, i) => {
      if (!card) return
      const next = cards.current[i + 1]
      if (!next) return
      // this card's progress runs while the next card travels up over it
      triggers.push(
        ScrollTrigger.create({
          trigger: next,
          start: 'top bottom',
          end: `top ${getComputedStyle(document.documentElement).getPropertyValue('--card-sticky-top') || '120px'}`,
          onUpdate: (self) => card.style.setProperty('--sticky-progress', self.progress.toFixed(4)),
        }),
      )
    })
    blocks.current.forEach((block, i) => {
      const card = cards.current[i + 1]
      if (!block || !card) return
      triggers.push(
        ScrollTrigger.create({
          trigger: card,
          start: 'top 50%',
          end: 'top 40%',
          onUpdate: (self) => block.style.setProperty('--progress', self.progress.toFixed(4)),
        }),
      )
    })
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <Block ref={root} className="my-[var(--spacing-fluid-xl)] md:my-[var(--spacing-fluid-3xl)]" ariaLabel={stack.heading}>
      <div className="relative flex flex-col" style={{ '--card-sticky-top': 'calc(var(--ann-h) + 7rem)', '--heading-sticky-top': 'calc(var(--ann-h) + 4.5rem)' } as React.CSSProperties}>
        <div className="stack-heading margin-px-1 mb-[calc(var(--spacing-fluid-lg)*-1)] pb-[var(--spacing-fluid-lg)]">
          <h2 className="sr-only">{stack.heading}</h2>
          <AnimText text={stack.heading} className="heading-3xl block w-full text-center" ariaHidden />
        </div>

        <div className="margin-px-1 relative z-10 grid gap-x-[var(--gutter)] md:grid-cols-12">
          <ul className="flex flex-col gap-[var(--margin)] md:col-span-6 md:col-start-4" role="list">
            {stack.cards.map((c, i) => {
              const isLast = i === stack.cards.length - 1
              return (
                <li
                  key={c.src}
                  ref={(el) => {
                    cards.current[i] = el
                  }}
                  className="stack-card will-change-transform"
                >
                  <div className="absolute inset-0">
                    <img src={c.src} alt={c.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                  {isLast && (
                    <div className="relative z-2 flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center before:absolute before:inset-0 before:-z-1 before:bg-black/30">
                      <AnimText text={stack.last.title} className="heading-sm text-white" />
                      <Button to={stack.last.button.to} variant="grey">
                        {stack.last.button.label}
                      </Button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="pointer-events-none absolute inset-0 hidden md:grid md:grid-cols-12 md:gap-x-[var(--gutter)]">
            {stack.blocks.map((b, i) => (
              <div
                key={b.title}
                ref={(el) => {
                  blocks.current[i] = el
                }}
                className={i === 0 ? 'stack-block sticky top-[calc(var(--ann-h)+12rem)] col-span-2 col-start-1 self-start' : 'stack-block sticky top-[calc(var(--ann-h)+22rem)] col-span-2 col-start-11 self-start'}
                style={{ marginTop: i === 0 ? '0' : '90vh' }}
              >
                <p className="text-[0.875rem] font-bold">{b.title}</p>
                <p className="text-md mt-3 text-grey">{b.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="margin-px-1 mt-10 flex flex-col gap-8 md:hidden">
          {stack.blocks.map((b) => (
            <div key={b.title}>
              <p className="text-[0.875rem] font-bold">{b.title}</p>
              <p className="text-md mt-2 text-grey">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Block>
  )
}
