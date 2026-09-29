import { cn } from '@/lib/cn'

/**
 * A photo on disk as `<src>-<width>.jpg`, each with `.avif` and `.webp`
 * siblings written by `npm run images`.
 */
export type Pic = { src: string; widths: number[]; w: number; h: number; alt: string }

const set = (p: Pic, ext: string) => p.widths.map((w) => `${p.src}-${w}.${ext} ${w}w`).join(', ')

type Props = {
  pic: Pic
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
  alt?: string
}

export function Img({ pic, sizes = '100vw', priority, className, imgClassName, alt }: Props) {
  const largest = pic.widths[pic.widths.length - 1]
  return (
    <picture className={cn('block h-full w-full', className)}>
      <source type="image/avif" srcSet={set(pic, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set(pic, 'webp')} sizes={sizes} />
      <img
        src={`${pic.src}-${largest}.jpg`}
        srcSet={set(pic, 'jpg')}
        sizes={sizes}
        width={pic.w}
        height={pic.h}
        alt={alt ?? pic.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </picture>
  )
}

/** Single-size image by base path (no extension), with next-gen sources. */
export function SimpleImg({ src, alt = '', className }: { src: string; alt?: string; className?: string }) {
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={`${src}.avif`} />
      <source type="image/webp" srcSet={`${src}.webp`} />
      <img src={`${src}.jpg`} alt={alt} loading="lazy" decoding="async" className={className} />
    </picture>
  )
}
