import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, finePointer } from '../lib/gsap'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const g = ref.current
    if (!g || prefersReducedMotion() || !finePointer()) return
    const qx = gsap.quickTo(g, 'x', { duration: 0.6, ease: 'power3' })
    const qy = gsap.quickTo(g, 'y', { duration: 0.6, ease: 'power3' })
    const move = (e: MouseEvent) => {
      qx(e.clientX)
      qy(e.clientY)
      g.style.opacity = '1'
    }
    const leave = () => (g.style.opacity = '0')
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])
  return <div id="glow" ref={ref} aria-hidden="true" />
}
