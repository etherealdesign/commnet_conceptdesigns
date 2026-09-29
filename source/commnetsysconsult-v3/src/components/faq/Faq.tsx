import { useId, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { faqItems, type FaqItem } from '@/data/faq'

function Row({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
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
          className="group flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left md:py-6"
        >
          <span className="text-16 md:text-21">{item.question}</span>
          <span
            className={`relative mt-1 size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-expo)] ${open ? 'rotate-45' : ''}`}
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
          </span>
        </button>
      </h3>
      <div id={id} ref={panel} role="region" className="overflow-hidden" style={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}>
        <p className="max-w-2xl pb-6 text-13 text-grey">{item.answer}</p>
      </div>
    </li>
  )
}

export function Faq({ items = faqItems, heading = 'FAQ' }: { items?: FaqItem[]; heading?: string }) {
  const [openIndex, setOpenIndex] = useState<number>(0)
  return (
    <Block anchor="faq" className="margin-px-1 border-y border-ink/12 py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <h2 className="text-25 md:text-36">{heading}</h2>
          <p className="mt-4 max-w-xs text-13 text-grey">
            The questions a tender evaluator asks, answered from the register rather than from a brochure.
          </p>
        </div>
        <ul className="border-t border-ink/12 md:col-span-8">
          {items.map((item, i) => (
            <Row key={item.question} item={item} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </Block>
  )
}
