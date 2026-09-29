import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { AnimText } from '@/components/motion/AnimText'
import { SlideGroup, SlideItem } from '@/components/motion/SlideIn'
import { Rail } from '@/components/motion/Rail'
import { FeatureModal } from '@/components/motion/FeatureModal'
import { services, type ServiceItem } from '@/data/services'
import { systemsRail } from '@/data/home'

function Plus() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * The reference's feature tiles: a centred heading with a pill tag, then
 * a rail of rounded photographs, each with its title in the corner and a
 * blurred round "+" that opens the story in a modal. Round arrows below.
 */
export function SystemsRail() {
  const [openItem, setOpenItem] = useState<ServiceItem | null>(null)

  return (
    <Block anchor="systems" className="my-[var(--spacing-fluid-2xl)] flex flex-col gap-[var(--spacing-fluid-xl)] overflow-hidden" ariaLabel="Systems">
      <div className="margin-px-1 flex flex-col items-center gap-5 text-center">
        <h2 className="sr-only">{systemsRail.title}</h2>
        <AnimText text={systemsRail.title} className="heading-xl mx-auto max-w-[16ch]" balance ariaHidden />
        <SlideGroup>
          <SlideItem as="span" className="tag">{systemsRail.tag}</SlideItem>
        </SlideGroup>
      </div>

      <SlideGroup>
        <Rail ariaLabel="Systems we install" itemsPerView={3}>
          {services.map((s, i) => (
            <SlideItem as="li" key={s.slug} index={i}>
              <article className="plate relative aspect-[7/10] w-full text-white md:aspect-[8/5]">
                <img src={s.media} alt={s.mediaAlt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
                <div className="relative flex h-full flex-col justify-between p-6">
                  <span className="text-[0.75rem] uppercase tracking-wide text-white/80">{s.code}</span>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="heading-xs max-w-[12ch]">{s.title}</h3>
                    <button type="button" className="icon-btn icon-btn--blur shrink-0" aria-label={`More about ${s.title}`} onClick={() => setOpenItem(s)}>
                      <Plus />
                    </button>
                  </div>
                </div>
              </article>
            </SlideItem>
          ))}
        </Rail>
      </SlideGroup>

      <FeatureModal open={!!openItem} onClose={() => setOpenItem(null)} image={openItem?.media} imageAlt={openItem?.mediaAlt}>
        {openItem && (
          <>
            <span className="tag w-fit">{openItem.code}</span>
            <h2 className="heading-md">{openItem.title}</h2>
            <p className="text-md text-grey">{openItem.definition}</p>
            <ul className="flex flex-col divide-y divide-line-grey border-y border-line-grey">
              {openItem.deliver.map((d) => (
                <li key={d.title} className="grid gap-1 py-3 md:grid-cols-[14rem_1fr] md:gap-6">
                  <span className="text-[0.875rem] font-bold">{d.title}</span>
                  <span className="text-md text-grey">{d.body}</span>
                </li>
              ))}
            </ul>
            <p className="text-md text-grey">{openItem.evidence}</p>
            <div>
              <Button to={`/services/${openItem.slug}`}>See the page</Button>
            </div>
          </>
        )}
      </FeatureModal>
      <p className="sr-only">
        {services.map((s) => (
          <Link key={s.slug} to={`/services/${s.slug}`}>
            {s.title}
          </Link>
        ))}
      </p>
    </Block>
  )
}
