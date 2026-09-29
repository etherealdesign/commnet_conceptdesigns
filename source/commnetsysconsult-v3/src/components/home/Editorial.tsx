import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { Parallax } from '@/components/shared/Parallax'
import { SlideGroup, SlideItem } from '@/components/motion/SlideIn'
import { editorial } from '@/data/home'

/** The reference's editorial block: a narrow column of copy and a button, a wide drifting photograph beside it. */
export function Editorial() {
  return (
    <Block className="margin-px-1 my-[var(--spacing-fluid-2xl)]" ariaLabel="About Commnet">
      <SlideGroup className="flex flex-col gap-10 md:flex-row md:items-start md:gap-[var(--gutter)]">
        <SlideItem className="flex flex-col items-start gap-10 md:w-1/4 md:pl-[8%]" index={0}>
          <p className="text-md max-w-[28rem]">{editorial.body}</p>
          <Button to={editorial.button.to} variant="grey">
            {editorial.button.label}
          </Button>
        </SlideItem>
        <SlideItem className="md:ml-auto md:w-1/2" index={1}>
          <div className="plate aspect-[16/9] w-full">
            <Parallax distance={45} className="h-full w-full">
              <img src={editorial.media} alt={editorial.mediaAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </Parallax>
          </div>
        </SlideItem>
      </SlideGroup>
    </Block>
  )
}
