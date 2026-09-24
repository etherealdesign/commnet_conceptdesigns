import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

/** Lenis driven by the GSAP ticker so ScrollTrigger and smooth scroll share one clock (as v1). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const raf = useRef<((t: number) => void) | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const l = new Lenis({ lerp: 0.09, smoothWheel: true })
    l.on('scroll', ScrollTrigger.update)
    raf.current = (t: number) => l.raf(t * 1000)
    gsap.ticker.add(raf.current)
    gsap.ticker.lagSmoothing(0)
    setLenis(l)
    return () => {
      if (raf.current) gsap.ticker.remove(raf.current)
      l.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/** Scroll to an element or offset, smooth when Lenis is running. */
export function scrollToTarget(lenis: Lenis | null, target: HTMLElement | number, offset = -20) {
  if (lenis) lenis.scrollTo(target, { offset })
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
