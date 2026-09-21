import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLenis } from './SmoothScroll'
import { useScrambleLabel } from './Scramble'

type Variant = 'accent' | 'dark' | 'light' | 'underline'
type Size = 'sm' | 'default'

interface Props {
  children: string
  to?: string
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  variant?: Variant
  size?: Size
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
  disabled?: boolean
  target?: string
  /** Legacy props from the v3 lineage, ignored. */
  theme?: string
  active?: boolean
  plain?: boolean
}

/**
 * The reference's AnimatedButton, mechanic for mechanic. Three boxes in a
 * row: a "+" on the left that starts scaled to nothing and rotated -45°,
 * the label, and a "+" on the right sitting over the label's end. At rest
 * the label is pulled left by one box so the right plus is what you see
 * beside it. On hover the left plus rotates in and grows, the label slides
 * right into place, and the right plus rotates away and shrinks - 700 ms,
 * power4 in-out - while the label's letters scramble and resolve.
 */
export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'accent',
  size = 'default',
  className,
  type = 'button',
  ariaLabel,
  disabled,
  target,
}: Props) {
  const lenis = useLenis()
  const { ref: label, play } = useScrambleLabel()

  if (variant === 'underline') {
    const cls = cn('ul-link t-body cursor-pointer', className)
    const handleAnchor = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)
      if (!href?.startsWith('#') || !lenis) return
      const el = document.getElementById(href.slice(1))
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { duration: 1.4 })
    }
    if (to) return <Link to={to} className={cls} onClick={onClick}>{children}</Link>
    if (href) return <a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined} className={cls} onClick={handleAnchor}>{children}</a>
    return <button type={type} className={cls} onClick={onClick} disabled={disabled}>{children}</button>
  }

  const fill: Record<Exclude<Variant, 'underline'>, string> = {
    accent: 'bg-accent text-[#141314] [.theme-dark_&]:text-[#EEEEEE]',
    dark: 'bg-[#141314] text-[#EEEEEE]',
    light: 'bg-[#EEEEEE] text-[#141314]',
  }
  const box = size === 'sm' ? 'size-8 lg:size-10' : 'size-10 lg:size-12'
  const labelBox = size === 'sm' ? 'h-8 -translate-x-[calc(2rem+6px)] px-2 lg:h-10 lg:-translate-x-[calc(2.5rem+6px)] lg:px-3' : 'h-10 -translate-x-[calc(2.5rem+6px)] px-3 lg:h-12 lg:-translate-x-[calc(3rem+6px)] lg:px-4'
  const transition = 'transition-transform duration-700 ease-[var(--ease-power4-in-out)]'

  const cls = cn(
    'group inline-flex min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap mono outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50',
    className,
  )

  const inner = (
    <span className="relative flex w-full items-center gap-1.5">
      <span className={cn('flex items-center justify-center origin-left -rotate-45 scale-0 group-hover:rotate-0 group-hover:scale-100', box, transition, fill[variant])}>
        <Plus />
      </span>
      <span className={cn('flex w-full flex-1 items-center justify-center group-hover:translate-x-0', labelBox, transition, fill[variant])}>
        <span ref={label} className="whitespace-nowrap">{children}</span>
      </span>
      <span className={cn('absolute right-0 z-10 flex items-center justify-center origin-right rotate-0 scale-100 group-hover:-rotate-45 group-hover:scale-0', box, transition, fill[variant])}>
        <Plus />
      </span>
    </span>
  )

  const shared = { className: cls, 'aria-label': ariaLabel, onMouseEnter: play }
  if (to) return <Link to={to} {...shared} onClick={onClick}>{inner}</Link>
  if (href) return <a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined} {...shared} onClick={onClick}>{inner}</a>
  return <button type={type} {...shared} onClick={onClick} disabled={disabled}>{inner}</button>
}

export function Plus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('size-4', className)} aria-hidden="true">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
