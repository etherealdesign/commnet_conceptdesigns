import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { prefersReducedMotion } from '@/animations/gsap'
import { usePageEnterContext } from './PageEnter'
import { useLenis } from './SmoothScroll'

type Phase = 'idle' | 'entering' | 'holding' | 'exiting'

interface Ctx {
  phase: Phase
  startTransition: (to: string) => void
}
const PageTransitionContext = createContext<Ctx | null>(null)

/**
 * Route changes go behind a curtain: a square in the accent colour, two
 * viewports on a side, pivoting at the bottom-centre of the screen. It
 * swings in from the left (rotate -90° → 0, 1 s quart in-out), holds while
 * the new route mounts and scrolls to the top, then its pivot moves one
 * viewport right and it swings out to 90°. The page behind dims and blurs
 * while it is covered, and the new page's entrance starts as the curtain
 * begins to leave.
 *
 * Every in-app anchor click is intercepted here, so the inner pages need
 * no special link component.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const navigate = useNavigate()
  const location = useLocation()
  const { run } = usePageEnterContext()
  const lenis = useLenis()
  const pending = useRef<string | null>(null)
  const first = useRef(true)

  const startTransition = useCallback(
    (to: string) => {
      if (phase !== 'idle') return
      if (prefersReducedMotion()) {
        navigate(to)
        return
      }
      pending.current = to
      setPhase('entering')
      lenis?.stop()
      window.setTimeout(() => {
        setPhase('holding')
        navigate(to)
      }, 1000)
    },
    [phase, navigate, lenis],
  )

  // The new route has mounted: scroll to top, let it lay out, then exit.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (phase === 'holding') {
      const t = window.setTimeout(() => {
        setPhase('exiting')
        lenis?.start()
        window.setTimeout(run, 250)
        window.setTimeout(() => setPhase('idle'), 1100)
      }, 120)
      return () => window.clearTimeout(t)
    }
    // navigation that did not go through the curtain (back button, hash)
    if (phase === 'idle') run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    document.body.dataset.transitionPhase = phase
    return () => {
      delete document.body.dataset.transitionPhase
    }
  }, [phase])

  // Intercept in-app links.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('/') || a.target === '_blank' || a.hasAttribute('download')) return
      if (a.dataset.noTransition !== undefined) return
      const url = new URL(href, window.location.origin)
      if (url.pathname === window.location.pathname) return
      e.preventDefault()
      startTransition(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [startTransition])

  const value = useMemo<Ctx>(() => ({ phase, startTransition }), [phase, startTransition])
  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <div className="page-curtain" data-phase={phase} aria-hidden="true" />
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const v = useContext(PageTransitionContext)
  if (!v) throw new Error('usePageTransition outside provider')
  return v
}
