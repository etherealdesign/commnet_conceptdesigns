import { useEffect, useRef, useState } from 'react'
import { gsap, finePointer, reducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/cn'

/**
 * Dot + ring cursor for fine pointers. Any element with `data-cursor="Label"`
 * grows the ring into a labelled disc; `data-cursor-hover` just enlarges it.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [hover, setHover] = useState(false)
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return
    setOn(true)
    document.body.classList.add('has-cursor')
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' })
    const move = (e: PointerEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY) }
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement
      const labelled = t.closest<HTMLElement>('[data-cursor]')
      setLabel(labelled?.dataset.cursor ?? '')
      setHover(!!t.closest('a, button, [data-cursor-hover], input, textarea, select, label'))
    }
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 })
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 })
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    document.documentElement.addEventListener('pointerenter', enter)
    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.removeEventListener('pointerenter', enter)
    }
  }, [])

  if (!on) return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      <div ref={dot} className={cn('absolute left-0 top-0 -ml-[3px] -mt-[3px] size-[6px] rounded-full bg-white mix-blend-difference transition-opacity', (label || hover) && 'opacity-0')} />
      <div ref={ring} className="absolute left-0 top-0">
        <div
          className={cn(
            'flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-500 ease-out-expo',
            label ? 'size-24 bg-ink text-ivory' : hover ? 'size-14 border border-white bg-white/10 mix-blend-difference' : 'size-9 border border-white/70 mix-blend-difference',
          )}
        >
          <span className={cn('text-[11px] uppercase tracking-[0.18em] transition-opacity duration-300', label ? 'opacity-100' : 'opacity-0')}>{label}</span>
        </div>
      </div>
    </div>
  )
}
