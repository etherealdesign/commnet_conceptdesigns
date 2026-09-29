import { type ReactNode, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLenis } from './SmoothScroll'

type Variant = 'primary' | 'underlined' | 'outline' | 'none'
type Theme = 'light' | 'dark'

interface Props {
  children: ReactNode
  to?: string
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  variant?: Variant
  /** For `primary` / `outline`: which ground the button sits on. */
  theme?: Theme
  active?: boolean
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
  disabled?: boolean
  target?: string
  /** Trailing glyph, e.g. ↗ for a link that leaves the page. */
  glyph?: string
}

/**
 * One button: a rounded rectangle with a medium-weight label and an
 * optional trailing glyph. The label rolls upward on hover and its twin
 * rolls in from below. `underlined` is the nav link, a hairline that draws
 * in and stays while active. Anchors on the same page go through Lenis so
 * the smooth scroll is not bypassed.
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
  glyph,
}: Props) {
  const lenis = useLenis()

  const solid = variant === 'primary' || variant === 'outline'
  const base =
    'group inline-flex cursor-pointer appearance-none items-center justify-center gap-3 whitespace-nowrap disabled:pointer-events-none disabled:opacity-40'
  const variants: Record<Variant, string> = {
    primary: '',
    outline: '',
    underlined: 'ul-link py-2 text-14 font-medium',
    none: '',
  }
  const pill = cn(
    'flex h-11 items-center gap-2.5 rounded-[var(--r-ctl)] px-5 text-14 font-medium transition-colors duration-500 ease-[var(--ease-expo)]',
    variant === 'primary' &&
      (theme === 'light' ? 'bg-ink text-white group-hover:bg-primary' : 'bg-white text-ink group-hover:bg-primary group-hover:text-white'),
    variant === 'outline' &&
      (theme === 'light'
        ? 'border border-ink/25 text-ink group-hover:border-ink group-hover:bg-ink group-hover:text-white'
        : 'border border-white/30 text-white group-hover:border-white group-hover:bg-white group-hover:text-ink'),
  )
  const chip = 'inline-block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0.5'
  const classes = cn(base, variants[variant], className)

  const label =
    solid ? (
      <>
        <span className={pill}>
          <span className="roll">
            <span>{children}</span>
            <span aria-hidden="true">{children}</span>
          </span>
          {glyph && (
            <span className={chip} aria-hidden="true">
              {glyph}
            </span>
          )}
        </span>
      </>
    ) : (
      <>
        {children}
        {glyph && <span aria-hidden="true"> {glyph}</span>}
      </>
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

/** The 44px square arrow button used on cards and carousels. */
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
        'grid size-11 shrink-0 cursor-pointer place-items-center rounded-[var(--r-ctl)] border transition-colors duration-500 ease-[var(--ease-expo)] disabled:cursor-default disabled:opacity-30',
        theme === 'light'
          ? 'border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white'
          : 'border-white/25 text-white hover:border-white hover:bg-white hover:text-ink',
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
