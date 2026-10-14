import { cn } from '@/lib/cn'

/**
 * A photo on disk as `<src>-<width>.jpg`, each with `.avif` and `.webp`
 * siblings written by `npm run images`.
 */
export type Pic = { src: string; widths: number[]; w: number; h: number; alt: string }

const set = (p: Pic, ext: string) => p.widths.map((w) => `${p.src}-${w}.${ext} ${w}w`).join(', ')

/**
 * `sizes` states the box width, but object-cover into a taller box needs more
 * pixels than that (a 4:3 photo in a 3:4 card is scaled by the *height*). So
 * every width except a plain 100vw is grown by COVER before the browser picks
 * a candidate; otherwise cropped cards were stretched up to 1.9x and went soft.
 */
const COVER = 1.6
const grow = (sizes: string) =>
  sizes.trim() === '100vw'
    ? sizes
    : sizes.split(',').map((part) => part.replace(/(\)\s*|^\s*)(\d+(?:\.\d+)?)(vw|px)\s*$/, (_, lead, n, u) => `${lead}${Math.round(+n * COVER * 10) / 10}${u}`)).join(',')

type Props = {
  pic: Pic
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
  alt?: string
}

export function Img({ pic, sizes: layout = '100vw', priority, className, imgClassName, alt }: Props) {
  const sizes = grow(layout)
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
