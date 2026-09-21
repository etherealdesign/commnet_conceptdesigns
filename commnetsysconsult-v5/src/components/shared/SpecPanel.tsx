import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SpecRow {
  title: string
  body?: string
  /** Optional trailing detail, e.g. a chip. */
  aside?: ReactNode
}

/**
 * A specification sheet: one tinted plate, one row per line item, a hairline
 * between rows. Reads like the "what we deliver" column of a BoQ rather than
 * a card grid. Numbering is tabular so the rows line up as a schedule.
 */
export function SpecPanel({
  rows,
  numbered = true,
  className,
}: {
  rows: SpecRow[]
  numbered?: boolean
  className?: string
}) {
  return (
    <div className={cn('rounded-lg bg-tint px-5 py-2 md:px-10 md:py-4', className)}>
      <ul>
        {rows.map((r, i) => (
          <li
            key={r.title}
            data-reveal
            className={cn(
              'grid gap-2 py-6 md:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)] md:gap-6 md:py-7',
              i < rows.length - 1 && 'border-b border-ink/10',
            )}
          >
            <span className="u-num text-11 text-primary" aria-hidden={!numbered}>
              {numbered ? String(i + 1).padStart(2, '0') : ''}
            </span>
            <h3 className={cn('text-16 md:text-21', !r.body && !r.aside && 'md:col-span-2')}>{r.title}</h3>
            {(r.body || r.aside) && (
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
                {r.body && <p className="max-w-xl text-13 text-grey">{r.body}</p>}
                {r.aside}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
