import type { ReactNode } from 'react'

/** Page margins from the grid, full width. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`margin-px-1 w-full ${className}`}>{children}</div>
}
