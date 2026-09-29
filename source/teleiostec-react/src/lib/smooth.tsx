import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from './gsap'

const Ctx = createContext<Lenis | null>(null)
export const useLenis = () => useContext(Ctx)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const l = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 })
    l.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => l.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(l)
    return () => {
      gsap.ticker.remove(tick)
      l.destroy()
    }
  }, [])

  return <Ctx.Provider value={lenis}>{children}</Ctx.Provider>
}

export function scrollToTop(lenis: Lenis | null) {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}
