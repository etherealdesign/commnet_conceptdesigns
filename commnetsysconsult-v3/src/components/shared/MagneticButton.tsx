import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { ArrowUpRight } from 'lucide-react'

interface Props {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  withIcon?: boolean
}

/** Button with a subtle 3px magnetic pull toward the cursor and a 1.03 scale on hover. */
export function MagneticButton({ children, href, variant = 'primary', onClick, withIcon = true }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null)

  const handleMove = (e: MouseEvent) => {
    if (prefersReducedMotion() || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15
    gsap.to(ref.current, { x, y, scale: 1.03, duration: 0.35, ease: 'power3.out' })
  }

  const handleLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' })
  }

  const classes =
    variant === 'primary'
      ? 'bg-[--color-primary] text-white hover:brightness-110'
      : 'bg-transparent text-[--color-text] border border-[--color-secondary]/30 hover:border-[--color-primary]'

  const content = (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      {children}
      {withIcon && <ArrowUpRight size={16} strokeWidth={2.25} />}
    </span>
  )

  const sharedProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-300 will-change-transform ${classes}`,
  }

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} {...sharedProps}>
      {content}
    </button>
  )
}
