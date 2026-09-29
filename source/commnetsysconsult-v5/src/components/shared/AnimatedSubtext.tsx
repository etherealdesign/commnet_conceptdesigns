import { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, type ElementType, type ReactNode, type Ref } from 'react'
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'
import type { RevealHandle } from './AnimatedHeadline'

interface Props {
  children: ReactNode
  as?: ElementType
  className?: string
  trigger?: 'manual' | 'scroll'
  stagger?: number
  duration?: number
  ref?: Ref<RevealHandle>
}

/**
 * Body copy that rises into view line by line. Each line is masked and
 * travels from 100% below its own height to rest, 0.8 s power3.out,
 * 0.05 s apart - the reference's AnimatedSubtext.
 */
export function AnimatedSubtext({ children, as: Tag = 'p', className, trigger = 'manual', stagger = 0.05, duration = 0.8, ref }: Props) {
  const root = useRef<HTMLElement>(null)
  const split = useRef<SplitText | null>(null)
  const played = useRef(false)
  const still = prefersReducedMotion()

  useLayoutEffect(() => {
    const el = root.current
    if (!el || still) return
    split.current = new SplitText(el, { type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true, aria: 'none' })
    gsap.set(split.current.lines, { y: '100%' })
    el.style.visibility = 'visible'
    return () => {
      split.current?.revert()
      split.current = null
    }
  }, [still, children])

  const reveal = useCallback(
    (delay = 0) => {
      if (played.current || still || !split.current) return
      played.current = true
      gsap.fromTo(split.current.lines, { y: '100%' }, { y: '0%', duration, ease: 'power3.out', stagger, delay })
    },
    [still, duration, stagger],
  )
  const reset = useCallback(() => {
    played.current = false
    if (split.current) gsap.set(split.current.lines, { y: '100%' })
  }, [])
  useImperativeHandle(ref, () => ({ reveal, reset }), [reveal, reset])

  useEffect(() => {
    if (trigger !== 'scroll' || still) return
    const el = root.current
    if (!el) return
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', once: true, onEnter: () => reveal() })
    return () => st.kill()
  }, [trigger, still, reveal])

  return (
    <Tag ref={root} className={cn(!still && 'invisible', className)}>
      {children}
    </Tag>
  )
}
