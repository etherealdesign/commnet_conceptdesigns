import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'

/** Reset scroll on route change and re-measure every ScrollTrigger for the new page. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'auto' })
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [pathname, hash])

  return null
}
