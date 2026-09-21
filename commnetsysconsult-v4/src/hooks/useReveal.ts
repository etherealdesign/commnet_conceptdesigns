import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'

/**
 * Scroll-reveal for every element marked `[data-reveal]` inside the returned
 * ref. A short rise and a fade, expo-out, staggered by document order. Each
 * group plays once. Reduced motion renders the final state immediately.
 */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!targets.length) return

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 32 })
      ScrollTriggerBatch(targets)
    }, root)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

function ScrollTriggerBatch(targets: NodeListOf<HTMLElement>) {
  targets.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'expo.out',
      delay: (i % 6) * 0.06,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  })
}
