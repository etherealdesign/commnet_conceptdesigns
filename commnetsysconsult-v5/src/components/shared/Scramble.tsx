import { useCallback, useEffect, useRef, type ElementType } from 'react'
import { gsap, SCRAMBLE_CHARS, prefersReducedMotion } from '@/animations/gsap'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  as?: ElementType
  className?: string
  /** replay on pointer enter */
  onHover?: boolean
  /** play once when scrolled into view (default) or only on demand */
  trigger?: 'view' | 'manual' | 'hover-only'
  delay?: number
  duration?: number
  /** colour of the noise pass */
  noiseClass?: string
}

/**
 * Text that resolves out of noise, in two passes as on the reference:
 * first the slot fills with random glyphs in the accent colour, then the
 * real characters are revealed left to right in the text colour. The real
 * text is always in the DOM for assistive tech; the animated copy is
 * aria-hidden and sized by an invisible twin so nothing reflows.
 */
export function Scramble({ text, as: Tag = 'span', className, onHover = false, trigger = 'view', delay = 0, duration = 0.5, noiseClass = 'text-accent' }: Props) {
  const layer = useRef<HTMLSpanElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const busy = useRef(false)

  const play = useCallback(() => {
    const el = layer.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = text
      return
    }
    if (busy.current) return
    busy.current = true
    tl.current?.kill()
    const noise = text.replace(/[^\s]/g, () => SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0])
    el.classList.add(noiseClass)
    tl.current = gsap
      .timeline({ delay, onComplete: () => { busy.current = false; el.classList.remove(noiseClass); el.textContent = text } })
      .set(el, { opacity: 1 })
      .to(el, { duration, scrambleText: { text: noise, chars: SCRAMBLE_CHARS, speed: 1, revealDelay: 0.1 }, ease: 'none' }, 0)
      .add(() => el.classList.remove(noiseClass), duration * 0.6)
      .to(el, { duration, scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 1, revealDelay: 0.1, newClass: 'text-current' }, ease: 'none' }, duration * 0.5)
  }, [text, delay, duration, noiseClass])

  useEffect(() => {
    const el = layer.current
    if (!el) return
    el.textContent = trigger === 'view' && !prefersReducedMotion() ? '' : text
    if (trigger !== 'view') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          play()
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      tl.current?.kill()
    }
  }, [play, text, trigger])

  return (
    <Tag className={cn('relative inline-block whitespace-nowrap', className)} onMouseEnter={onHover ? play : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible whitespace-nowrap">{text}</span>
      <span ref={layer} aria-hidden="true" className="absolute left-0 top-0 whitespace-nowrap" />
    </Tag>
  )
}

/** Imperative handle for buttons: scramble the label on demand. */
export function useScrambleLabel(duration = 0.5) {
  const ref = useRef<HTMLSpanElement>(null)
  const busy = useRef(false)
  const play = useCallback(() => {
    const el = ref.current
    if (!el || busy.current || prefersReducedMotion()) return
    const text = el.dataset.text ?? el.textContent ?? ''
    el.dataset.text = text
    busy.current = true
    const noise = text.replace(/[^\s]/g, () => SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0])
    gsap
      .timeline({ onComplete: () => { busy.current = false; el.textContent = text } })
      .to(el, { duration, scrambleText: { text: noise, chars: SCRAMBLE_CHARS, speed: 1, revealDelay: 0.1 }, ease: 'none' }, 0)
      .to(el, { duration, scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 1, revealDelay: 0.1 }, ease: 'none' }, duration * 0.5)
  }, [duration])
  return { ref, play }
}
