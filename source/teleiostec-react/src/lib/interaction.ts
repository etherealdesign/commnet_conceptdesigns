/**
 * Resolves on the visitor's first real interaction (pointer, touch, scroll,
 * key) followed by an idle frame. Purely decorative work waits on this so it
 * never competes with first paint or input readiness.
 */
export const firstInteraction: Promise<void> =
  typeof window === 'undefined'
    ? Promise.resolve()
    : new Promise((resolve) => {
        const evs = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown', 'scroll'] as const
        const go = () => {
          evs.forEach((e) => window.removeEventListener(e, go))
          const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))
          idle(() => resolve())
        }
        evs.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }))
      })

export const idleAfter = (p: Promise<unknown>) =>
  p.then(() => new Promise<void>((r) => (window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300)))(() => r())))
