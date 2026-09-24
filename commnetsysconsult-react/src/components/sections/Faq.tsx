import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import type { Faq as FaqItem } from '../../data/company'
import { SectionHead } from './SectionHead'

/** Accordion — Motion handles the height so answers never jump. */
export function Faq({ items, title = 'Questions buyers ask first', band }: { items: FaqItem[]; title?: string; band?: boolean }) {
  const [open, setOpen] = useState(0)
  const uid = useId()
  return (
    <section className={band ? 'band' : undefined}>
      <div className="wrap">
        <SectionHead title={title} />
        <div className="faq rv">
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <div className="faq-item card" data-open={isOpen} key={f.q}>
                <h3 style={{ fontSize: 'inherit', letterSpacing: 'inherit' }}>
                  <button aria-expanded={isOpen} aria-controls={`${uid}-a${i}`} id={`${uid}-q${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    {f.q}
                    <Plus aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${uid}-a${i}`}
                      role="region"
                      aria-labelledby={`${uid}-q${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="ans">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
