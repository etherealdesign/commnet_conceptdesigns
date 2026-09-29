import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'

/**
 * Animates a number from 0 up to the numeric part of `value` once, when the
 * element scrolls into view. Non-numeric characters (+, commas, "yr" etc.)
 * are preserved as a static suffix/prefix so labels like "15,500+" or
 * "8-Year" still read correctly mid-count.
 */
export function useCountUp<T extends HTMLElement>(value: string) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const match = value.match(/[\d,]+/)
    if (!match) return // nothing numeric to animate (e.g. "8-Year")

    const target = Number(match[0].replace(/,/g, ''))
    const prefix = value.slice(0, match.index)
    const suffix = value.slice((match.index ?? 0) + match[0].length)

    if (prefersReducedMotion()) {
      el.textContent = value
      return
    }

    const counter = { n: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          n: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.n).toLocaleString()}${suffix}`
          },
        })
      },
    })

    return () => st.kill()
  }, [value])

  return ref
}
