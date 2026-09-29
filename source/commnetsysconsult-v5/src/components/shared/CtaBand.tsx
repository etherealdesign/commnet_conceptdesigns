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
    <section className="theme-light py-6">
      <div className="grid-container">
        <div className="theme-dark grid-layout gap-y-8 px-6 py-12 md:px-12 md:py-16">
          <div className="grid-span-12 lg:grid-span-7">
            <h2 className="t-h2">{heading}</h2>
            <p className="t-body mt-4 max-w-md text-fg-muted">
              {sub}
              {claims.namedEngineer && ` ${claims.namedEngineer.name}, ${claims.namedEngineer.role}, reads every enquiry.`}
            </p>
          </div>
          <div className="grid-span-12 lg:grid-span-4 lg:grid-start-9 flex flex-col items-start justify-end gap-3">
            <Button variant="accent" onClick={() => setModalOpen(true)}>Get in contact</Button>
            <Button variant="underline" href={`tel:${site.phoneHref}`} className="u-num">{site.phone}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
