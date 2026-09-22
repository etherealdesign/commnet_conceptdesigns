import { useRef } from 'react'
import { Block } from '@/components/shared/Block'
import { AnimText } from '@/components/motion/AnimText'
import { useScrollProgress } from '@/components/motion/useScrollProgress'
import { collage } from '@/data/home'
import { cn } from '@/lib/utils'

/**
 * The reference's collage: three columns of rounded photographs that
 * arrive from outside the frame as the section scrolls in - the left
 * column from the left and below, the right from the right and below, the
 * centre from below - each driven by one scroll-progress variable. The
 * intro paragraph sits centred underneath.
 */
export function Collage() {
  const root = useRef<HTMLElement>(null)
  useScrollProgress(root, '--image-progress', { start: 'top 90%', end: 'top 20%' })

  return (
    <Block ref={root} className="overflow-clip pb-[var(--spacing-fluid-2xl)] pt-[var(--spacing-fluid-lg)]" ariaLabel="From the sites">
      <div className="margin-px-1">
        <div className="grid grid-cols-3 gap-[var(--gutter)] md:mx-[calc(var(--margin)*-0.5)]">
          {collage.columns.map((col, ci) => (
            <div key={ci} className={cn('flex flex-col gap-[var(--gutter)]', ci === 0 && 'justify-start', ci === 1 && 'justify-center', ci === 2 && 'justify-end')}>
              {col.map((img) => (
                <div
                  key={img.src}
                  className={cn('will-change-transform', img.small && ci === 0 && 'pl-[12%]', img.small && ci === 2 && 'pr-[12%]')}
                  style={{
                    transform: `translate3d(calc((1 - var(--image-progress, 0)) * ${ci === 0 ? -1 : ci === 2 ? 1 : 0} * (100% + var(--margin))), calc((1 - var(--image-progress, 0)) * 100%), 0)`,
                  }}
                >
                  <div className={cn('plate w-full', img.small ? 'aspect-[4/3]' : 'aspect-[3/4]')}>
                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-[var(--spacing-fluid-2xl)] max-w-[34rem] text-center">
          <AnimText as="p" text={collage.intro} className="text-md text-grey" balance />
        </div>
      </div>
    </Block>
  )
}
