import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * A block that rises a hand's width into place over 1.8 s on the slow-out
 * curve when it scrolls into view. Give it `index` to stagger siblings
 * 80 ms apart, or wrap siblings in `SlideGroup` and it is done for you.
 */
export function SlideIn({
  children,
  as: Tag = 'div',
  className,
  index = 0,
  delay = 0,
  threshold = 0.1,
  style,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  index?: number
  delay?: number
  threshold?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add('is-inview')
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return (
    <Tag ref={ref} data-anim-slide className={cn('will-change-transform', className)} style={{ ...style, '--slide-index': index, '--extra-delay': `${delay}s` } as React.CSSProperties}>
      {children}
    </Tag>
  )
}

/** Marks a parent; its `[data-anim-slide]` children all rise together, staggered by their `--slide-index`. */
export function SlideGroup({ children, as: Tag = 'div', className, threshold = 0.1 }: { children: ReactNode; as?: ElementType; className?: string; threshold?: number }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add('is-inview')
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return (
    <Tag ref={ref} data-anim-parent className={className}>
      {children}
    </Tag>
  )
}

/** A child of SlideGroup: no observer of its own, just the index. */
export function SlideItem({ children, as: Tag = 'div', className, index = 0, style }: { children: ReactNode; as?: ElementType; className?: string; index?: number; style?: React.CSSProperties }) {
  return (
    <Tag data-anim-slide className={cn('will-change-transform', className)} style={{ ...style, '--slide-index': index } as React.CSSProperties}>
      {children}
    </Tag>
  )
}
