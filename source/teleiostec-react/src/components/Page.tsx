import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'

let firstRender = true

const ease = [0.76, 0, 0.24, 1] as const

/**
 * Route shell. Two fixed curtains: one rises to cover the outgoing page on
 * exit, the other lifts off the incoming page on enter, with the page name
 * riding across the gap.
 */
export function Page({ children, label }: { children: ReactNode; label: string }) {
  // The preloader already covers the first page; only route changes get the lift.
  const [skipEnter] = useState(() => { const v = firstRender; firstRender = false; return v })
  return (
    <>
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-dark"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.75, ease }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] flex origin-top items-center justify-center bg-dark text-ivory"
        initial={{ scaleY: skipEnter ? 0 : 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.9, ease, delay: 0.35 } }}
        exit={{ scaleY: 0 }}
      >
        <motion.span
          className="display text-[clamp(40px,7vw,120px)] italic"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -30, transition: { duration: 0.5, delay: 0.15 } }}
        >
          {label}
        </motion.span>
      </motion.div>
    </>
  )
}
