import { type ReactNode, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLenis } from './SmoothScroll'

type Variant = 'primary' | 'grey' | 'blur' | 'underlined' | 'outline' | 'none'
type Theme = 'light' | 'dark'

interface Props {
  children: ReactNode
  to?: string
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  variant?: Variant
  /** For `primary`: which ground the button sits on. */
  theme?: Theme
  active?: boolean
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
  disabled?: boolean
  target?: string
}

/**
 * One button. The pill fills with ink (on paper) or cream (on ink); the
 * label rolls upward on hover and its twin rolls in from below. `underlined`
 * is the nav link, a hairline that draws in and stays while active. Anchors
 * on the same page go through Lenis so the smooth scroll is not bypassed.
 */
export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  theme = 'light',
  active = false,
  className,
  type = 'button',
  ariaLabel,
  disabled,
  target,
}: Props) {
  const lenis = useLenis()

  const base = 'group inline-flex cursor-pointer appearance-none items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-40'
  // The reference's pill: 2.5rem tall, 20px radius, text-sm, hover fills with the accent.
  const pill = 'h-10 rounded-[20px] px-5 text-[0.875rem] transition-colors duration-300 ease-[var(--ease-power4-out)]'
  const variants: Record<Variant, string> = {
    primary: cn(
      pill,
      theme === 'light'
        ? 'bg-ink text-white hover:bg-primary hover:text-white'
        : 'bg-white text-ink hover:bg-primary hover:text-white',
    ),
    grey: cn(pill, 'bg-grey-lighter text-ink hover:bg-primary hover:text-white'),
    blur: cn(pill, 'bg-black/40 text-white backdrop-blur-[22px] hover:bg-primary'),
    outline: cn(
      'h-10 rounded-[20px] border px-5 text-[0.875rem] transition-colors duration-300 ease-[var(--ease-power4-out)]',
      theme === 'light'
        ? 'border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream'
        : 'border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-ink',
    ),
    underlined: 'ul-link text-[0.875rem] py-2',
    none: '',
  }
  const classes = cn(base, variants[variant], className)

  const label =
    variant === 'primary' || variant === 'outline' || variant === 'grey' || variant === 'blur' ? (
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    ) : (
      children
    )

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (!href?.startsWith('#') || !lenis) return
    const el = document.getElementById(href.slice(1))
    if (!el) return
    e.preventDefault()
    lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  }

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} data-active={active || undefined} onClick={onClick}>
        {label}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined} className={classes} aria-label={ariaLabel} data-active={active || undefined} onClick={handleAnchor}>
        {label}
      </a>
    )
  }
  return (
    <button type={type} className={classes} aria-label={ariaLabel} onClick={onClick} disabled={disabled} data-active={active || undefined}>
      {label}
    </button>
  )
}

/** The 45px square arrow button used on cards and carousels. */
export function ArrowButton({
  className,
  direction = 'right',
  onClick,
  ariaLabel,
  disabled,
  theme = 'light',
}: {
  className?: string
  direction?: 'left' | 'right' | 'up-right'
  onClick?: () => void
  ariaLabel: string
  disabled?: boolean
  theme?: Theme
}) {
  const rotate = direction === 'left' ? 'rotate-180' : direction === 'up-right' ? '-rotate-45' : ''
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(
        'grid size-11 shrink-0 cursor-pointer place-items-center rounded border transition-colors duration-500 ease-[var(--ease-expo)] disabled:cursor-default disabled:opacity-30',
        theme === 'light'
          ? 'border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-cream'
          : 'border-cream/25 text-cream hover:border-cream hover:bg-cream hover:text-ink',
        className,
      )}
    >
      <Arrow className={cn('size-5', rotate)} />
    </button>
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
