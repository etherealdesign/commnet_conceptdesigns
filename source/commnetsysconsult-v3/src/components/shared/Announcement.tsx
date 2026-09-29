import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * The strip above the page card. One sentence of standing news and one
 * link; dismissible, and the card grows to fill the space when it goes.
 */
export function Announcement() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div
      className="fixed inset-x-0 top-0 z-[110] flex h-[var(--ann-h)] items-center justify-between gap-4 bg-ink px-3 text-cream md:px-6"
      role="region"
      aria-label="Announcement"
    >
      <p className="text-11 text-cream/55 max-md:sr-only">Announcement</p>
      <div className="flex items-center gap-3 md:gap-5">
        <p className="text-13">Built in Dubai. Engineered in Chennai.</p>
        <Link
          to="/projects"
          className="rounded-full bg-cream px-4 py-1.5 text-13 text-ink transition-colors duration-500 ease-[var(--ease-expo)] hover:bg-primary hover:text-white max-sm:hidden"
        >
          See the register
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="cursor-pointer p-1 text-cream/70 transition-colors hover:text-cream"
      >
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
