import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import { Mail, Phone, Plus } from 'lucide-react'
import { SITE } from '../../lib/site'
import { Arrow } from '../Arrow'
import type { Faq as FaqItem } from '../../data/company'
import { SectionHead } from './SectionHead'

/** Accordion — Motion handles the height so answers never jump. The heading
 *  column carries a direct line to the engineering team. */
export function Faq({
  items,
  title = 'Questions buyers ask first',
  lead = 'Scope, compliance and delivery — the questions consultants and facility teams raise before a tender.',
  band,
  help = true,
}: {
  items: FaqItem[]
  title?: string
  lead?: string
  band?: boolean
  help?: boolean
}) {
  const [open, setOpen] = useState(0)
  const uid = useId()
  return (
    <section className={band ? 'band' : undefined}>
      <div className="wrap faq-wrap">
        <div className="faq-side">
          <SectionHead eyebrow="FAQ" title={title} lead={lead} style={{ marginBottom: 0 }} />
          {help && (
            <div className="faq-help rv">
              <b>Question not listed?</b>
              <p>Ask the engineering team directly — the same people who survey and design the job.</p>
              <a href={SITE.phoneHref}>
                <Phone aria-hidden="true" /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`}>
                <Mail aria-hidden="true" /> {SITE.email}
              </a>
              <Link className="btn btn-primary" to="/contact">
                Send a brief <Arrow />
              </Link>
            </div>
          )}
        </div>
        <div className="faq rv">
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <div className="faq-item" data-open={isOpen} key={f.q}>
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
