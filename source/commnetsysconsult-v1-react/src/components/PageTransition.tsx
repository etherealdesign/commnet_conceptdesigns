import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { ScrollTrigger } from '../lib/gsap'
import { usePageFx } from '../hooks/usePageFx'

const EASE = [0.76, 0, 0.24, 1] as const

/** Route change = a dark blueprint curtain wipes up over the old page, then
 *  lifts off the new one. Content itself is never transformed, so GSAP pins
 *  inside the page keep a clean containing block. */
export function PageTransition({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  usePageFx(ref)

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 900)
    return () => {
      cancelAnimationFrame(id)
      window.clearTimeout(t)
    }
  }, [])

  return (
    <motion.div ref={ref} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1, transition: { duration: 0.6 } }}>
      {children}
      <motion.div
        className="curtain"
        aria-hidden="true"
        style={{ originY: 0 }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.8, ease: EASE, delay: 0.15 } }}
        exit={{ scaleY: 0 }}
      >
        <motion.span initial={{ opacity: 1 }} animate={{ opacity: 0, transition: { duration: 0.2 } }}>
          {label}
        </motion.span>
      </motion.div>
      <motion.div
        className="curtain"
        aria-hidden="true"
        style={{ originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.6, ease: EASE } }}
      />
    </motion.div>
  )
}
