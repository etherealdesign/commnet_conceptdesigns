import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { reducedMotion } from '@/lib/gsap'
import { firstInteraction } from '@/lib/interaction'

const Particles = lazy(() => import('@/three/Particles'))

/**
 * Loads three.js only once the field is near the viewport and the visitor
 * has interacted — decoration never competes with first paint or input.
 */
export function ParticleField({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (reducedMotion() || !ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return
      io.disconnect()
      firstInteraction.then(() => setLoad(true))
    }, { rootMargin: '200px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {load && <Suspense fallback={null}><Particles tone={tone} /></Suspense>}
    </div>
  )
}
