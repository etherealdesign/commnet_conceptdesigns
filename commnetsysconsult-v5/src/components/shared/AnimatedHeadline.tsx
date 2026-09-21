import { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState, type ElementType, type Ref } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'

export interface RevealHandle {
  reveal: (delay?: number) => void
  reset: () => void
}

interface Props {
  children: string
  as?: ElementType
  className?: string
  /** `manual`: play when `reveal()` is called (page enter). `scroll`: once, when the top reaches the viewport bottom. */
  trigger?: 'manual' | 'scroll'
  /** Trailing clause rendered at reduced contrast. */
  muted?: string
  ref?: Ref<RevealHandle>
}

/**
 * The reference's headline reveal, line by line: a bar in the accent
 * colour sweeps across the line from the left (0.45 s), a bar in the
 * foreground colour follows 0.1 s behind, the text appears underneath at
 * 0.5 s, and both bars retract to the right - foreground first, accent
 * last - so what is left is the line with a flash of colour on its edge.
 * Lines are 0.15 s apart.
 *
 * The text is rendered as words first so the browser can wrap it, the
 * words are grouped into lines by their measured top, and then it is
 * re-rendered as one block per line.
 */
export function AnimatedHeadline({ children, as: Tag = 'h2', className, trigger = 'manual', muted, ref }: Props) {
  const root = useRef<HTMLElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[] | null>(null)
  const played = useRef(false)
  const still = prefersReducedMotion()
  const text = muted ? `${children} ${muted}` : children
  const mutedStart = muted ? children.length + 1 : Infinity

  // Pass 1: measure the words' natural wrapping.
  useLayoutEffect(() => {
    const el = root.current
    if (!el || still) return
    setLines(null)
    const measure = () => {
      const words = el.querySelectorAll<HTMLElement>('[data-word]')
      if (!words.length) return
      const out: string[] = []
      let cur: string[] = []
      let top = -Infinity
      words.forEach((w) => {
        const t = w.getBoundingClientRect().top
        if (top > -Infinity && t - top > 2) {
          out.push(cur.join(' '))
          cur = []
        }
        cur.push(w.textContent || '')
        top = t
      })
      if (cur.length) out.push(cur.join(' '))
      setLines(out)
    }
    measure()
  }, [text, still])

  useEffect(() => {
    const el = root.current
    if (!el || !lines) return
    gsap.set(el.querySelectorAll('[data-line-inner]'), { opacity: 0 })
    gsap.set(el.querySelectorAll('[data-brand-rect], [data-fg-rect]'), { scaleX: 0, transformOrigin: 'left' })
  }, [lines])

  const reveal = useCallback(
    (delay = 0) => {
      const el = root.current
      if (played.current || !el || still) return
      played.current = true
      el.querySelectorAll<HTMLElement>('[data-line]').forEach((line, i) => {
        const inner = line.querySelector('[data-line-inner]')
        const brand = line.querySelector('[data-brand-rect]')
        const fg = line.querySelector('[data-fg-rect]')
        if (!inner || !brand || !fg) return
        const tl = gsap.timeline({ delay: delay + 0.15 * i })
        tl.to(brand, { scaleX: 1, duration: 0.45, ease: 'power3.inOut' }, 0)
          .to(fg, { scaleX: 1, duration: 0.45, ease: 'power3.inOut' }, 0.1)
          .set(inner, { opacity: 1 }, 0.5)
          .set([brand, fg], { transformOrigin: 'right' }, 0.5)
          .to(fg, { scaleX: 0, duration: 0.45, ease: 'power3.inOut' }, 0.5)
          .to(brand, { scaleX: 0, duration: 0.45, ease: 'power3.inOut' }, 0.6)
      })
    },
    [still],
  )

  const reset = useCallback(() => {
    played.current = false
    const el = root.current
    if (!el) return
    gsap.set(el.querySelectorAll('[data-line-inner]'), { opacity: 0 })
    gsap.set(el.querySelectorAll('[data-brand-rect], [data-fg-rect]'), { scaleX: 0, transformOrigin: 'left' })
  }, [])

  useImperativeHandle(ref, () => ({ reveal, reset }), [reveal, reset])

  useEffect(() => {
    if (trigger !== 'scroll' || still || !lines) return
    const el = wrap.current || root.current
    if (!el) return
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', once: true, onEnter: () => reveal() })
    return () => st.kill()
  }, [trigger, still, lines, reveal])

  if (still) {
    return (
      <Tag className={className}>
        {children}
        {muted && <span className="text-fg-muted"> {muted}</span>}
      </Tag>
    )
  }

  if (!lines) {
    // measuring pass
    return (
      <div ref={wrap}>
        <Tag ref={root} className={className}>
          {text.split(/\s+/).map((w, i) => (
            <span key={i}>
              {i > 0 && ' '}
              <span data-word>{w}</span>
            </span>
          ))}
        </Tag>
      </div>
    )
  }

  let offset = 0
  return (
    <div ref={wrap}>
      <Tag ref={root} className={className}>
        {lines.map((line, i) => {
          const start = offset
          offset += line.length + 1
          // split the muted clause across the line boundary if needed
          const cut = Math.max(0, Math.min(line.length, mutedStart - start))
          return (
            <span key={i}>
              {i > 0 && <br />}
              <div data-line={i} className="relative inline-block">
                <span data-line-inner className="block whitespace-nowrap">
                  {line.slice(0, cut)}
                  {cut < line.length && <span className="text-fg-muted">{line.slice(cut)}</span>}
                </span>
                <div data-brand-rect className="absolute -inset-x-[0.1em] -inset-y-[0.1em] bg-accent" />
                <div data-fg-rect className={cn('absolute -inset-x-[0.1em] -inset-y-[0.1em]', 'bg-current')} />
              </div>
            </span>
          )
        })}
      </Tag>
    </div>
  )
}
