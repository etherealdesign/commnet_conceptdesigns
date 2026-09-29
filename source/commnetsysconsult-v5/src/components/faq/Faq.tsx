import { useEffect, useId, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { Block } from '@/components/shared/Block'
import { Plus } from '@/components/shared/Button'
import { AnimatedHeadline } from '@/components/shared/AnimatedHeadline'
import { faqItems, type FaqItem } from '@/data/faq'
import { cn } from '@/lib/utils'

function Row({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const id = useId()
  const panel = useRef<HTMLDivElement>(null)
  const toggle = () => {
    const p = panel.current
    onToggle()
    if (!p || prefersReducedMotion()) return
    if (!open) gsap.fromTo(p, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.6, ease: 'expo.out' })
    else gsap.to(p, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut' })
  }
  return (
    <li className="border-b border-line" data-row>
      <h3>
        <button type="button" onClick={toggle} aria-expanded={open} aria-controls={id} className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left">
          <span className={cn('t-body transition-colors duration-300', open ? '' : 'text-fg-muted group-hover:text-current')}>{item.question}</span>
          <Plus className={cn('size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)]', open && 'rotate-45')} />
        </button>
      </h3>
      <div id={id} ref={panel} role="region" className="overflow-hidden" style={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}>
        <p className="t-body max-w-xl pb-6 text-fg-muted">{item.answer}</p>
      </div>
    </li>
  )
}

/** Rows arrive 12 px up and fading, 0.6 s power2-out, 0.08 s apart, at 85 %. */
export function Faq({ items = faqItems, heading = 'Common questions' }: { items?: FaqItem[]; heading?: string }) {
  const [openIndex, setOpenIndex] = useState(-1)
  const list = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const el = list.current
    if (!el || prefersReducedMotion()) return
    const rows = el.querySelectorAll('[data-row]')
    gsap.set(rows, { opacity: 0, y: 12 })
    const st = ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => gsap.to(rows, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }) })
    return () => st.kill()
  }, [items.length])
  return (
    <Block anchor="faq" className="theme-light border-t border-line py-24 md:py-32">
      <div className="grid-container">
        <div className="grid-layout gap-y-12">
          <div className="grid-span-12 lg:grid-span-4">
            <AnimatedHeadline as="h2" trigger="scroll" className="t-h2 max-w-[8ch]">
              {heading}
            </AnimatedHeadline>
          </div>
          <ul ref={list} className="grid-span-12 lg:grid-span-6 lg:grid-start-6 border-t border-line">
            {items.map((item, i) => (
              <Row key={item.question} item={item} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
            ))}
          </ul>
        </div>
      </div>
    </Block>
  )
}
