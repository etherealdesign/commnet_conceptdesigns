import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'

const LenisContext = createContext<Lenis | null>(null)

/**
 * Lenis on the window, driven by GSAP's ticker so ScrollTrigger and the
 * smooth scroll share one clock. Also owns the two things a router breaks:
 * scrolling to the top on a route change, and honouring a `#hash` on load.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const instance = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    })

    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // scrollbar width, so fixed elements can sit flush with the page edge
    const sbw = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--sbw', `${sbw}px`)

    setLenis(instance)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) {
      // let the route render first
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(target, { immediate: true })
        else target.scrollIntoView()
      })
      return
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    // refresh trigger positions once the new page has laid out
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [pathname, hash, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}
