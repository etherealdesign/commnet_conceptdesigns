import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

function ArrowIcon({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={cn('size-4', dir === 'prev' && 'rotate-180')} aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * The reference's carousel: a native horizontal scroll-snap list that
 * bleeds to the right edge, with two round buttons underneath. Items take
 * `--item-width`; the list's own padding is the page margin so the first
 * item lines up with the grid and the last one runs off the card.
 */
export function Rail({
  children,
  className,
  ariaLabel,
  itemsPerView = 3,
  controls = 'below',
}: {
  children: ReactNode
  className?: string
  ariaLabel: string
  itemsPerView?: 2 | 3 | 4
  controls?: 'below' | 'none'
}) {
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const t = track.current
    if (!t) return
    setAtStart(t.scrollLeft <= 2)
    setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 2)
  }, [])

  useEffect(() => {
    const t = track.current
    if (!t) return
    update()
    t.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(t)
    return () => {
      t.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [update])

  const step = (dir: 1 | -1) => {
    const t = track.current
    if (!t) return
    const first = t.children[0] as HTMLElement | undefined
    const w = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(t).columnGap || '0') : t.clientWidth / itemsPerView
    t.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  const widths = { 2: 'lg:[--item-width:calc(50%-var(--gutter)/2)]', 3: 'lg:[--item-width:calc(33.333%-var(--gutter)*2/3)]', 4: 'lg:[--item-width:calc(25%-var(--gutter)*3/4)]' }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <ul
        ref={track}
        role="list"
        aria-label={ariaLabel}
        className={cn(
          'no-bar margin-px-1 flex snap-x snap-mandatory gap-[var(--gutter)] overflow-x-auto overscroll-x-contain scroll-smooth [scroll-padding-inline:var(--margin)]',
          '[--item-width:calc(75%-var(--gutter))] md:[--item-width:calc(50%-var(--gutter)/2)]',
          widths[itemsPerView],
          '[&>li]:w-[var(--item-width)] [&>li]:shrink-0 [&>li]:snap-start',
        )}
      >
        {children}
      </ul>
      {controls === 'below' && (
        <nav className="margin-px-1 flex items-center gap-2" aria-label={`${ariaLabel} navigation`}>
          <button type="button" className="icon-btn" onClick={() => step(-1)} disabled={atStart} aria-label="Previous">
            <ArrowIcon dir="prev" />
          </button>
          <button type="button" className="icon-btn" onClick={() => step(1)} disabled={atEnd} aria-label="Next">
            <ArrowIcon dir="next" />
          </button>
        </nav>
      )}
    </div>
  )
}
