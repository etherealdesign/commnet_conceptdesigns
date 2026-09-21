import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { prefersReducedMotion } from '@/animations/gsap'

type Phase = 'waiting' | 'entering' | 'complete'
type Trigger = (delay: number) => void

interface Ctx {
  phase: Phase
  /** A component registers the function that plays its entrance. */
  register: (id: string, trigger: Trigger, priority: number) => void
  unregister: (id: string) => void
  /** Called by the loader / page transition once the page may enter. */
  run: () => void
  arm: () => void
}

const PageEnterContext = createContext<Ctx | null>(null)

/**
 * Sequences the entrance of a page. Sections register a `reveal` with a
 * priority; when the curtain lifts, they are fired in priority order, each
 * group 80 ms after the last, exactly the way the reference paces its hero,
 * then its logos, then the rest. Re-armed on every route change.
 */
export function PageEnterProvider({ children }: { children: ReactNode }) {
  const items = useRef(new Map<string, { trigger: Trigger; priority: number }>())
  const [phase, setPhase] = useState<Phase>('waiting')
  const ran = useRef(false)
  const { pathname } = useLocation()

  const register = useCallback((id: string, trigger: Trigger, priority: number) => {
    items.current.set(id, { trigger, priority })
    // A section mounting after the page has already entered plays at once.
    if (ran.current) trigger(0)
  }, [])
  const unregister = useCallback((id: string) => {
    items.current.delete(id)
  }, [])

  const run = useCallback(() => {
    if (ran.current) return
    ran.current = true
    setPhase('entering')
    const list = [...items.current.values()].sort((a, b) => a.priority - b.priority)
    let prev = -Infinity
    let delay = 0
    for (const it of list) {
      if (it.priority > prev) {
        prev = it.priority
        if (delay > 0) delay += 0.08
      }
      it.trigger(prefersReducedMotion() ? 0 : delay)
    }
    window.setTimeout(() => setPhase('complete'), (delay + 1) * 1000)
  }, [])

  const arm = useCallback(() => {
    ran.current = false
    setPhase('waiting')
  }, [])

  // route changes re-arm; the transition overlay calls run() when its curtain lifts
  useEffect(() => {
    if (pathname) arm()
  }, [pathname, arm])

  const value = useMemo<Ctx>(() => ({ phase, register, unregister, run, arm }), [phase, register, unregister, run, arm])
  return <PageEnterContext.Provider value={value}>{children}</PageEnterContext.Provider>
}

export function usePageEnterContext() {
  const v = useContext(PageEnterContext)
  if (!v) throw new Error('usePageEnter outside PageEnterProvider')
  return v
}

/** Register an entrance. `trigger(delay)` receives the seconds to wait. */
export function usePageEnter(trigger: Trigger, { priority = 0, skip = false } = {}) {
  const { register, unregister } = usePageEnterContext()
  const id = useRef(`pe-${Math.random().toString(36).slice(2)}`)
  const ref = useRef(trigger)
  ref.current = trigger
  useEffect(() => {
    if (skip) return
    const key = id.current
    register(key, (d) => ref.current(d), priority)
    return () => unregister(key)
  }, [register, unregister, priority, skip])
}
