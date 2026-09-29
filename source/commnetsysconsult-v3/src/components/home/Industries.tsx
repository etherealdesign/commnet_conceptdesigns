import { Block } from '@/components/shared/Block'
import { AnimText } from '@/components/motion/AnimText'
import { SlideGroup, SlideItem } from '@/components/motion/SlideIn'
import { Rail } from '@/components/motion/Rail'
import { industries } from '@/data/company'
import { industriesRail } from '@/data/home'

/** v1's sectors, as a rail of photograph tiles with the clients of record named on each. */
export function Industries() {
  return (
    <Block anchor="industries" className="my-[var(--spacing-fluid-2xl)] flex flex-col gap-[var(--spacing-fluid-xl)] overflow-hidden" ariaLabel="Sectors">
      <div className="margin-px-1 flex flex-col items-center gap-5 text-center">
        <h2 className="sr-only">{industriesRail.title}</h2>
        <AnimText text={industriesRail.title} className="heading-xl mx-auto max-w-[18ch]" balance ariaHidden />
        <SlideGroup>
          <SlideItem as="p" className="text-md max-w-md text-grey">{industriesRail.lead}</SlideItem>
        </SlideGroup>
      </div>
      <SlideGroup>
        <Rail ariaLabel="Sectors" itemsPerView={4}>
          {industries.map((it, i) => (
            <SlideItem as="li" key={it.name} index={i}>
              <article className="plate relative aspect-[4/5] w-full text-white">
                <img src={it.media} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
                <div className="relative flex h-full flex-col justify-end gap-2 p-6">
                  <h3 className="heading-xs">{it.name}</h3>
                  <p className="text-[0.875rem] text-white/80">{it.clients}</p>
                </div>
              </article>
            </SlideItem>
          ))}
        </Rail>
      </SlideGroup>
    </Block>
  )
}
