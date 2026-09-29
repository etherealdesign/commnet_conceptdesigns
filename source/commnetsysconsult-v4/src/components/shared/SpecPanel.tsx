import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SpecRow {
  title: string
  body?: string
  /** Optional trailing detail, e.g. a chip. */
  aside?: ReactNode
}

/**
 * A specification schedule: one line item per row, a bracket index, a
 * hairline between rows. Reads like the "what we deliver" column of a
 * BoQ rather than a card grid.
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
    <ol className={cn('border-t border-ink/15', className)}>
      {rows.map((r, i) => (
        <li
          key={r.title}
          data-reveal
          className="grid gap-2 border-b border-ink/12 py-5 md:grid-cols-[4rem_minmax(0,16rem)_minmax(0,1fr)] md:gap-6 md:py-6"
        >
          <span className="mono text-grey" aria-hidden={!numbered}>
            {numbered ? String(i + 1).padStart(2, '0') : ''}
          </span>
          <h3 className={cn('d-3', !r.body && !r.aside && 'md:col-span-2')}>{r.title}</h3>
          {(r.body || r.aside) && (
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
              {r.body && <p className="max-w-xl text-14 text-grey">{r.body}</p>}
              {r.aside}
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}
