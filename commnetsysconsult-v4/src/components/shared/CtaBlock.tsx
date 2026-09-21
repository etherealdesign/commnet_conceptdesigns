import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { useReveal } from '@/hooks/useReveal'
import { cta } from '@/data/home'
import { site } from '@/data/site'
import { claims } from '@/data/claims'

/**
 * Page anatomy step 7 (§5): the ask. A navy band with the statement on the
 * left and the two ways to reach an engineer on the right.
 */
export function CtaBlock({
  lines = cta.lines,
  body = cta.body,
}: {
  lines?: string[]
  body?: string
  index?: number
}) {
  const { setModalOpen } = useHeaderStore()
  const ref = useReveal<HTMLElement>()

  return (
    <Block ref={ref} isDark section="Contact" className="margin-px-1 bg-ink py-20 text-white md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <p data-reveal className="mono bullet text-white/70">
            Contact
          </p>
          <h2 data-reveal className="d-1 mt-6">
            {lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-4 md:col-start-9">
          <p data-reveal className="max-w-md text-16 text-white/75">
            {body}
            {claims.namedEngineer && ` ${claims.namedEngineer.name}, ${claims.namedEngineer.role}, reads every enquiry.`}
          </p>
          <div data-reveal className="flex flex-wrap gap-3">
            <Button variant="primary" theme="dark" onClick={() => setModalOpen(true)} glyph="→">
              Get in contact
            </Button>
            <Button variant="outline" theme="dark" href={`tel:${site.phoneHref}`} className="u-num">
              {site.phone}
            </Button>
          </div>
        </div>
      </div>
    </Block>
  )
}
