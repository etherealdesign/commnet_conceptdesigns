import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ArrowButton } from './Button'

interface Props {
  children: ReactNode
  className?: string
  /** Class for the scrolling track. */
  trackClassName?: string
  /** Where the prev/next buttons and dots render. */
  controlsClassName?: string
  withButtons?: boolean
  withDots?: boolean
  loop?: boolean
  /** Milliseconds between automatic advances; off when undefined. */
  autoPlay?: number
  theme?: 'light' | 'dark'
  ariaLabel: string
}

/**
 * A native scroll-snap carousel. The browser owns the scrolling (so it
 * works with a trackpad, a finger, the keyboard and a screen reader without
 * any of it being faked); the buttons and dots are a courtesy layered on
 * top. Dragging with a mouse is added because a horizontal strip invites
 * it. Auto-play stops for good the moment the person touches it.
 */
export function Carousel({
  children,
  className,
  trackClassName,
  controlsClassName,
  withButtons = true,
  withDots = false,
  loop = false,
  autoPlay,
  theme = 'light',
  ariaLabel,
}: Props) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const interacted = useRef(false)
  const count = Children.count(children)

  const slideAt = useCallback((i: number) => track.current?.children[i] as HTMLElement | undefined, [])

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const t = track.current
      const el = slideAt(i)
      if (!t || !el) return
      t.scrollTo({ left: el.offsetLeft - t.offsetLeft, behavior: smooth ? 'smooth' : 'auto' })
    },
    [slideAt],
  )

  const next = useCallback(
    (auto = false) => {
      if (!auto) interacted.current = true
      const n = index + 1
      if (n < count) goTo(n)
      else if (loop || auto) goTo(0)
    },
    [index, count, loop, goTo],
  )
  const prev = useCallback(() => {
    interacted.current = true
    const n = index - 1
    if (n >= 0) goTo(n)
    else if (loop) goTo(count - 1)
  }, [index, count, loop, goTo])

  // Which slide is in view: the one whose left edge is nearest the track's.
  useEffect(() => {
    const t = track.current
    if (!t) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const left = t.scrollLeft
        let best = 0
        let bestDist = Infinity
        Array.from(t.children).forEach((c, i) => {
          const d = Math.abs((c as HTMLElement).offsetLeft - t.offsetLeft - left)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        setIndex(best)
      })
    }
    t.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      t.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!autoPlay || interacted.current) return
    const id = window.setTimeout(() => next(true), autoPlay)
    return () => window.clearTimeout(id)
  }, [autoPlay, index, next])

  // Mouse drag. Touch already scrolls natively.
  useEffect(() => {
    const t = track.current
    if (!t) return
    let down = false
    let startX = 0
    let startLeft = 0
    let moved = false
    const onDown = (e: MouseEvent) => {
      down = true
      moved = false
      startX = e.pageX
      startLeft = t.scrollLeft
      t.style.scrollSnapType = 'none'
      t.style.scrollBehavior = 'auto'
    }
    const onMove = (e: MouseEvent) => {
      if (!down) return
      const dx = e.pageX - startX
      if (Math.abs(dx) > 5) {
        moved = true
        interacted.current = true
        document.body.classList.add('global-grabbing')
        t.dataset.dragging = ''
      }
      t.scrollLeft = startLeft - dx
    }
    const onUp = () => {
      if (!down) return
      down = false
      document.body.classList.remove('global-grabbing')
      delete t.dataset.dragging
      t.style.scrollSnapType = ''
      t.style.scrollBehavior = ''
      if (moved) {
        // settle on the nearest slide
        const left = t.scrollLeft
        let best = 0
        let bestDist = Infinity
        Array.from(t.children).forEach((c, i) => {
          const d = Math.abs((c as HTMLElement).offsetLeft - t.offsetLeft - left)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        goTo(best)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }
    t.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    t.addEventListener('click', onClick, true)
    return () => {
      t.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      t.removeEventListener('click', onClick, true)
    }
  }, [goTo])

  const atStart = index === 0
  const atEnd = index >= count - 1

  return (
    <div className={cn('relative', className)}>
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={cn(
          'no-bar group flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [&>*]:shrink-0 [&>*]:snap-start',
          'cursor-grab select-none',
          trackClassName,
        )}
      >
        {children}
      </div>

      {(withButtons || withDots) && (
        <div className={cn('flex items-center justify-between gap-6', controlsClassName)}>
          {withDots ? (
            <div className="flex w-full max-w-60 items-center gap-1" role="tablist" aria-label="Slides">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => {
                    interacted.current = true
                    goTo(i)
                  }}
                  className={cn(
                    'relative h-0.5 w-full cursor-pointer transition-opacity duration-500 after:absolute after:inset-x-0 after:-top-2 after:h-5',
                    theme === 'light' ? 'bg-ink' : 'bg-cream',
                    i !== index && 'opacity-20',
                  )}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          {withButtons && (
            <div className="flex items-center gap-2">
              <ArrowButton direction="left" onClick={prev} ariaLabel="Previous" disabled={!loop && atStart} theme={theme} />
              <ArrowButton direction="right" onClick={() => next()} ariaLabel="Next" disabled={!loop && atEnd} theme={theme} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
