import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, finePointer } from '../lib/gsap'

/** The page-wide behaviours v1 wired with querySelectorAll: reveals, counters,
 *  magnetic buttons and 3D tilt. Scoped to one page so route changes clean up. */
export function usePageFx(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    (_, contextSafe) => {
      const root = scope.current
      if (!root) return
      const reduce = prefersReducedMotion()
      const safe = contextSafe ?? (<T,>(fn: T) => fn)

      if (reduce) {
        gsap.set(root.querySelectorAll('.rv'), { opacity: 1, y: 0 })
      } else {
        root.querySelectorAll<HTMLElement>('.rv').forEach((el) => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        })
      }

      // Counters keep their final value in the markup (crawlers, no-JS) and only
      // reset to zero at the moment they scroll into view.
      if (!reduce) {
        root.querySelectorAll<HTMLElement>('.cnt[data-to]').forEach((el) => {
          const to = Number(el.dataset.to)
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              const o = { v: 0 }
              el.textContent = '0'
              gsap.to(o, { v: to, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString('en-US')) })
            },
          })
        })
      }

      if (reduce || !finePointer()) return
      const off: (() => void)[] = []
      const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
        const h = safe(fn) as EventListener
        el.addEventListener(type, h)
        off.push(() => el.removeEventListener(type, h))
      }

      root.querySelectorAll<HTMLElement>('.magnetic').forEach((b) => {
        on(b, 'mousemove', (e) => {
          const r = b.getBoundingClientRect()
          gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5, ease: 'power3.out' })
        })
        on(b, 'mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,.4)' }))
      })

      root.querySelectorAll<HTMLElement>('.tilt').forEach((c) => {
        on(c, 'mousemove', (e) => {
          const r = c.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          gsap.to(c, { rotateY: x * 10, rotateX: -y * 10, transformPerspective: 900, duration: 0.5, ease: 'power2.out' })
        })
        on(c, 'mouseleave', () => gsap.to(c, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1,.5)' }))
      })

      return () => off.forEach((f) => f())
    },
    { scope },
  )
}
