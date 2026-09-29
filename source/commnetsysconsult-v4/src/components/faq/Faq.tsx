import { useId, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { faqItems, type FaqItem } from '@/data/faq'

function Row({ item, i, open, onToggle }: { item: FaqItem; i: number; open: boolean; onToggle: () => void }) {
  const id = useId()
  const panel = useRef<HTMLDivElement>(null)

  const toggle = () => {
    const p = panel.current
    onToggle()
    if (!p || prefersReducedMotion()) return
    if (!open) {
      gsap.fromTo(p, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.7, ease: 'expo.out' })
    } else {
      gsap.to(p, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut' })
    }
  }

  return (
    <li className="border-b border-ink/12">
      <h3>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={id}
          className="group grid w-full cursor-pointer grid-cols-[3rem_1fr_2rem] items-start gap-4 py-5 text-left md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_3rem] md:gap-6 md:py-6"
        >
          <span className="mono pt-1.5 text-grey">{String(i + 1).padStart(2, '0')}</span>
          <span className="d-3 transition-colors duration-500 group-hover:text-primary">{item.question}</span>
          <span
            className={`relative mt-1.5 size-3.5 shrink-0 justify-self-end transition-transform duration-500 ease-[var(--ease-expo)] ${open ? 'rotate-45' : ''}`}
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
          </span>
        </button>
      </h3>
      <div id={id} ref={panel} role="region" className="overflow-hidden" style={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}>
        <p className="max-w-2xl pb-6 pl-16 text-16 text-grey md:ml-[33.333%] md:pl-0">{item.answer}</p>
      </div>
    </li>
  )
}

/**
 * The questions a tender evaluator asks, as a numbered accordion. Answers
 * come from the register, not a brochure.
 */
export function Faq({
  items = faqItems,
  heading = 'Questions',
  index = 8,
}: {
  items?: FaqItem[]
  heading?: string
  index?: number
}) {
  const [openIndex, setOpenIndex] = useState<number>(0)
  return (
    <Block section="Questions" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <SectionLabel index={index} aside={`${items.length} questions`}>
        Frequently asked
      </SectionLabel>
      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12">
        <h2 className="d-1 md:col-span-7">{heading}</h2>
        <p className="max-w-md text-16 text-grey md:col-span-4 md:col-start-9 md:self-end">
          The questions a tender evaluator asks, answered from the register rather than from a brochure.
        </p>
      </div>
      <ul className="mt-12 border-t border-ink/12 md:mt-16">
        {items.map((item, i) => (
          <Row key={item.question} item={item} i={i} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
        ))}
      </ul>
    </Block>
  )
}
