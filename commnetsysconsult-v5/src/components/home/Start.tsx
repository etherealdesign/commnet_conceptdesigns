import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { useReveal } from '@/hooks/useReveal'
import { start } from '@/data/home'
import { site } from '@/data/site'

/** Light ground. Title and photo on the left, the ask on the right. */
export function Start() {
  const ref = useReveal<HTMLElement>()
  const { setModalOpen } = useHeaderStore()
  return (
    <Block ref={ref} anchor="contact" className="theme-light py-24 md:py-32" ariaLabel="Start a project">
      <div className="grid-container">
        <div className="grid-layout gap-y-12">
          <div className="grid-span-12 lg:grid-span-6 flex flex-col gap-12">
            <h2 data-reveal className="t-h2">
              {start.title}
            </h2>
            <figure data-reveal className="aspect-[16/9] w-full overflow-clip bg-card">
              <img src={start.photo} alt={start.photoAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </figure>
          </div>
          <div className="grid-span-12 lg:grid-span-5 lg:grid-start-8 flex flex-col gap-12">
            <p data-reveal className="t-h3 max-w-md font-normal">
              {start.lead}
            </p>
            <div data-reveal className="flex flex-col gap-1">
              <a href={`mailto:${site.email}`} className="ul-link w-fit">{site.email}</a>
              <p className="text-fg-muted">{start.note}</p>
            </div>
            <div data-reveal className="flex flex-col items-start gap-4">
              <Button variant="underline" to="/contact">Get in touch</Button>
              <Button variant="dark" onClick={() => setModalOpen(true)}>Send the BoQ</Button>
            </div>
            <p data-reveal className="text-fg-muted">An engineer reads every enquiry.</p>
          </div>
        </div>
      </div>
    </Block>
  )
}
