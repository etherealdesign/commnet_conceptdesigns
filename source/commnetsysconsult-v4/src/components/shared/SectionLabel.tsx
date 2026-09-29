import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * The small-caps line that opens a section: a blue square, the section's
 * name, and `aside`, the optional note on the right. `index` is accepted
 * for compatibility and no longer rendered.
 */
export function SectionLabel({
  index,
  children,
  aside,
  className,
  dark = false,
  ...rest
}: {
  index?: string | number
  children: ReactNode
  aside?: ReactNode
  className?: string
  dark?: boolean
} & Record<string, unknown>) {
  return (
    <div className={cn('mono flex items-center justify-between gap-6', dark ? 'text-white/70' : 'text-grey', className)} {...rest}>
      <p className="flex items-center gap-2">
        <span className={cn('bullet', dark ? 'text-white' : 'text-ink')}>{children}</span>
      </p>
      {aside && <p className="text-right">{aside}</p>}
    </div>
  )
}
