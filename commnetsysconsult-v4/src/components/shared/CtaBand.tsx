import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { site } from '@/data/site'
import { claims } from '@/data/claims'

/** Page anatomy step 7 (§5): send the BoQ, a phone number, and a person. */
export function CtaBand({
  heading = 'Send us the drawings. An engineer replies.',
  sub = 'Scope, a BoQ or a site address is enough to start.',
}: {
  heading?: string
  sub?: string
}) {
  const { setModalOpen } = useHeaderStore()
  return (
    <section className="margin-px-1 py-6">
      <div className="flex flex-col items-start justify-between gap-8 rounded-sm bg-ink px-6 py-12 text-cream md:flex-row md:items-end md:px-12 md:py-16">
        <div className="md:span-w-7">
          <h2 className="text-25 md:text-36">{heading}</h2>
          <p className="mt-4 max-w-md text-13 text-cream/70">
            {sub}
            {claims.namedEngineer && ` ${claims.namedEngineer.name}, ${claims.namedEngineer.role}, reads every enquiry.`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" theme="dark" onClick={() => setModalOpen(true)}>
            Get in contact
          </Button>
          <Button variant="outline" theme="dark" href={`tel:${site.phoneHref}`} className="u-num">
            {site.phone}
          </Button>
        </div>
      </div>
    </section>
  )
}
