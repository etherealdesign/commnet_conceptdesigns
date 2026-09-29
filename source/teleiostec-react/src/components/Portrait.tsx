import { initials, type Person } from '@/data/team'
import { cn } from '@/lib/cn'

/**
 * Portrait with a monogram fallback. When `person.photo` is set it expects
 * `<photo>.jpg` plus `.avif` / `.webp` siblings (`npm run images`).
 */
export function Portrait({ person, className, sizes = '33vw', tone = 0 }: { person: Person; className?: string; sizes?: string; tone?: number }) {
  const bgs = ['#d9d2c4', '#cfc6b5', '#e2dccf', '#c8bfae']
  return (
    <div className={cn('relative overflow-hidden', className)} style={{ background: bgs[tone % bgs.length] }}>
      {person.photo ? (
        <picture>
          <source type="image/avif" srcSet={`${person.photo}.avif`} sizes={sizes} />
          <source type="image/webp" srcSet={`${person.photo}.webp`} sizes={sizes} />
          <img src={`${person.photo}.jpg`} alt={`${person.name}, ${person.role}`} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale-[0.35] transition-[filter,transform] duration-1000 ease-out-expo group-hover:scale-105 group-hover:grayscale-0" />
        </picture>
      ) : (
        <div role="img" aria-label={`${person.name}, ${person.role} — photo to follow`} className="flex h-full w-full items-center justify-center">
          <span aria-hidden className="display text-[clamp(40px,7vw,120px)] text-ink/45 transition-transform duration-1000 ease-out-expo group-hover:scale-110">{initials(person.name)}</span>
          <span aria-hidden className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-ink/65">Photo to follow</span>
        </div>
      )}
    </div>
  )
}
