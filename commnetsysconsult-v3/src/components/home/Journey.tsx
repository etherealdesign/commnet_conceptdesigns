import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { Parallax } from '@/components/shared/Parallax'
import { AnimText } from '@/components/motion/AnimText'
import { SlideGroup, SlideItem } from '@/components/motion/SlideIn'
import { journey } from '@/data/home'

/** Full-bleed rounded photograph that drifts at a tenth of scroll speed, one line and a button centred on it. */
export function Journey() {
  return (
    <Block isDark className="margin-px-1 my-[var(--spacing-fluid-2xl)]" ariaLabel={journey.title}>
      <div className="plate relative aspect-[4/5] w-full text-white md:aspect-[16/9]">
        <Parallax distance={90} className="absolute inset-0">
          <img src={journey.media} alt={journey.mediaAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
        <div className="relative flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
          <h2 className="sr-only">{journey.title}</h2>
          <AnimText text={journey.title} className="heading-lg max-w-[14ch]" balance ariaHidden />
          <SlideGroup>
            <SlideItem>
              <Button to={journey.button.to} variant="grey">
                {journey.button.label}
              </Button>
            </SlideItem>
          </SlideGroup>
        </div>
      </div>
    </Block>
  )
}
