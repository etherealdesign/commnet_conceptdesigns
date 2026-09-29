import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP, reducedMotion } from '@/lib/gsap'
import { introDone } from '@/lib/intro'

type Props = {
  as?: ElementType
  children: ReactNode
  className?: string
  /** 'load' plays once the intro has finished; 'scroll' plays when it enters the viewport. */
  trigger?: 'load' | 'scroll'
  by?: 'lines' | 'words' | 'chars'
  delay?: number
  stagger?: number
}

/** Masked line/word/char reveal using GSAP SplitText. Text stays real, selectable and indexable. */
export function Split({ as: Tag = 'div', children, className, trigger = 'scroll', by = 'lines', delay = 0, stagger }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reducedMotion()) return
      let cancelled = false
      gsap.set(el, { autoAlpha: 0 })

      const run = () =>
        SplitText.create(el, {
          type: by === 'lines' ? 'lines' : by === 'words' ? 'lines,words' : 'lines,words,chars',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 })
            const targets = by === 'lines' ? self.lines : by === 'words' ? self.words : self.chars
            return gsap.from(targets, {
              yPercent: 115,
              rotate: by === 'chars' ? 6 : 2,
              duration: 1.35,
              stagger: stagger ?? (by === 'chars' ? 0.025 : by === 'words' ? 0.05 : 0.11),
              delay,
              ease: 'expo.out',
              scrollTrigger: trigger === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined,
            })
          },
        })

      if (trigger === 'load') introDone.then(() => !cancelled && run())
      else run()
      return () => { cancelled = true }
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
