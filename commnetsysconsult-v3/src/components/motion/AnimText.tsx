import { useEffect, useRef, type ElementType } from 'react'
import { cn } from '@/lib/utils'

/**
 * The reference's text entrance. The string is split into words (each
 * clipped so nothing bleeds below the baseline) and characters; every
 * character starts one line below itself and rises over 0.8 s with the
 * smooth curve, 10 ms after the character before it. The transition is
 * CSS; this component only splits the text and marks it `is-inview`
 * when it enters the viewport.
 */
export function AnimText({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  threshold = 0.2,
  balance = false,
  ariaHidden = false,
}: {
  text: string
  as?: ElementType
  className?: string
  /** seconds */
  delay?: number
  threshold?: number
  balance?: boolean
  /** When a visually-hidden twin already carries the text for assistive tech. */
  ariaHidden?: boolean
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
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, text])

  let index = 0
  const words = text.split(/(\s+)/)
  return (
    <Tag ref={ref} data-anim-text className={cn(balance && 'text-balance', className)} style={{ '--extra-delay': `${delay}s` } as React.CSSProperties} aria-label={ariaHidden ? undefined : text} aria-hidden={ariaHidden || undefined}>
      {words.map((w, wi) =>
        /^\s+$/.test(w) ? (
          <span key={wi} aria-hidden="true"> </span>
        ) : (
          <span key={wi} data-word aria-hidden="true">
            {[...w].map((ch, ci) => (
              <span key={ci} data-char style={{ '--char-index': index++ } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
        ),
      )}
    </Tag>
  )
}
