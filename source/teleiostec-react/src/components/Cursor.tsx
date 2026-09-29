import { useEffect, useRef, useState } from 'react'
import { gsap, finePointer, reducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/cn'

/**
 * Dot + ring cursor for fine pointers. Any element with `data-cursor="Label"`
 * swaps the ring for a labelled disc; `data-cursor-hover` just enlarges it.
 *
 * The blend sits on the fixed layer itself: `mix-blend-difference` on a child
 * of a z-indexed layer only blends inside that layer, which leaves a plain
 * white cursor that vanishes on ivory. The label disc is a separate,
 * unblended layer so its text stays legible.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const disc = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [hover, setHover] = useState(false)
  const [on, setOn] = useState(false)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return
    setOn(true)
  }, [])

  useEffect(() => {
    if (!on) return
    document.body.classList.add('has-cursor')
    const q = (el: HTMLElement | null, prop: 'x' | 'y', d: number) => gsap.quickTo(el, prop, { duration: d, ease: 'power3' })
    const dx = q(dot.current, 'x', 0.12), dy = q(dot.current, 'y', 0.12)
    const rx = q(ring.current, 'x', 0.5), ry = q(ring.current, 'y', 0.5)
    const lx = q(disc.current, 'x', 0.5), ly = q(disc.current, 'y', 0.5)
    let first = true
    const move = (e: PointerEvent) => {
      if (first) {
        // jump straight to the pointer instead of flying in from the corner
        gsap.set([dot.current, ring.current, disc.current], { x: e.clientX, y: e.clientY })
        first = false
        setSeen(true)
      }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); lx(e.clientX); ly(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement
      setLabel(t.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '')
      setHover(!!t.closest('a, button, [data-cursor-hover], input, textarea, select, label'))
    }
    const leave = () => setSeen(false)
    const enter = () => setSeen(true)
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
  }, [on])

  if (!on) return null
  return (
    <>
      <div aria-hidden className={cn('pointer-events-none fixed inset-0 z-[120] mix-blend-difference transition-opacity duration-300', seen ? 'opacity-100' : 'opacity-0')}>
        <div ref={dot} className="absolute left-0 top-0">
          <div className={cn('size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-opacity duration-300', (label || hover) && 'opacity-0')} />
        </div>
        <div ref={ring} className="absolute left-0 top-0">
          <div
            className={cn(
              '-translate-x-1/2 -translate-y-1/2 rounded-full border border-white transition-[width,height,opacity,background-color] duration-500 ease-out-expo',
              label ? 'size-9 opacity-0' : hover ? 'size-14 bg-white' : 'size-9',
            )}
          />
        </div>
      </div>
      <div aria-hidden className={cn('pointer-events-none fixed inset-0 z-[121] transition-opacity duration-300', seen ? 'opacity-100' : 'opacity-0')}>
        <div ref={disc} className="absolute left-0 top-0">
          <div
            className={cn(
              'flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-ivory transition-[transform,opacity] duration-500 ease-out-expo',
              label ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
            )}
          >
            <span className="text-[11px] uppercase tracking-[0.18em]">{label}</span>
          </div>
        </div>
      </div>
    </>
  )
}
