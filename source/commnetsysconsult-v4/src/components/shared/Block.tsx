import { useEffect, useId, useRef, type CSSProperties, type ReactNode, type Ref } from 'react'
import { ScrollTrigger } from '@/animations/gsap'
import { useHeaderStore } from './HeaderStore'
import { cn } from '@/lib/utils'

interface BlockProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: 'section' | 'div' | 'footer' | 'header'
  /** Anchor id; also drives the header's active-link state. */
  anchor?: string
  /** Registers the block with the header so it turns cream over it. */
  isDark?: boolean
  ariaLabel?: string
  ref?: Ref<HTMLElement>
  /** Name shown by the HUD's section counter while this block is in view. */
  section?: string
}

/**
 * Every section is a Block. It knows two things about itself: whether it is
 * dark (so the header can change colour when it passes underneath), and
 * which anchor it answers to (so the nav can mark it active while it fills
 * the viewport).
 */
export function Block({ children, className, style, as = 'section', anchor, isDark = false, ariaLabel, ref, section }: BlockProps) {
  const local = useRef<HTMLElement | null>(null)
  const { setDarkActive, setActiveAnchor, headerCenter } = useHeaderStore()
  const darkId = `dark-${useId()}`

  useEffect(() => {
    const el = local.current
    if (!el || !isDark) return
    // The header's vertical centre is the sample line: the block is "under"
    // the header while its top is above that line and its bottom below it.
    const st = ScrollTrigger.create({
      id: darkId,
      trigger: el,
      start: `top ${headerCenter}px`,
      end: `bottom ${headerCenter}px`,
      onToggle: (self) => setDarkActive(darkId, self.isActive),
    })
    setDarkActive(darkId, st.isActive)
    return () => {
      st.kill()
      setDarkActive(darkId, false)
    }
  }, [isDark, headerCenter, setDarkActive, darkId])

  useEffect(() => {
    const el = local.current
    if (!el || !anchor) return
    const enter = () => setActiveAnchor(anchor)
    const leave = () => setActiveAnchor(null)
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: enter,
      onLeave: leave,
      onEnterBack: enter,
      onLeaveBack: leave,
    })
    return () => {
      st.kill()
      leave()
    }
  }, [anchor, setActiveAnchor])

  const Tag = as
  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        local.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as { current: HTMLElement | null }).current = node
      }}
      id={anchor}
      aria-label={ariaLabel}
      data-section={section}
      className={cn('relative', isDark && 'is-dark', className)}
      style={style}
    >
      {children}
    </Tag>
  )
}
