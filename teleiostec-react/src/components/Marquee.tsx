import { cn } from '@/lib/cn'

/** Infinite CSS marquee — two copies of the row translate by -50%. */
export function Marquee({ items, className, duration = 38 }: { items: string[]; className?: string; duration?: number }) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="display px-[0.35em]">{t}</span>
          <span className="mx-[0.35em] inline-block size-[0.18em] rounded-full bg-current opacity-60" />
        </span>
      ))}
    </div>
  )
  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div className="marquee-track flex w-max" style={{ ['--marquee-dur' as string]: `${duration}s` }}>
        {row()}
        {row(true)}
      </div>
    </div>
  )
}
