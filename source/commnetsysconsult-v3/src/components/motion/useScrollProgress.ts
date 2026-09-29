import { useEffect, type RefObject } from 'react'
import { ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'

/**
 * Writes a 0-1 CSS variable onto an element as it crosses the viewport,
 * the way the reference's `data-scroll-position` / `data-scroll-offset`
 * attributes do. `start` and `end` are ScrollTrigger positions.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  name: string,
  { start = 'top bottom', end = 'bottom top', trigger }: { start?: string; end?: string; trigger?: RefObject<HTMLElement | null> } = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.setProperty(name, '1')
      return
    }
    const st = ScrollTrigger.create({
      trigger: trigger?.current ?? el,
      start,
      end,
      onUpdate: (self) => el.style.setProperty(name, self.progress.toFixed(4)),
    })
    return () => st.kill()
  }, [ref, name, start, end, trigger])
}
