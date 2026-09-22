import { Container } from '@/components/shared/Container'
import { useReveal } from '@/hooks/useReveal'
import { recognition, regulatorExplainers } from '@/data/compliance'
import { heldCredentials } from '@/data/claims'
import { complianceNote } from '@/data/home'
import { awards } from '@/data/company'

/**
 * Regulators explained, then what we hold. Credentials render only when a
 * number exists in claims.ts (§6.7): print the number or do not list it.
 */
export function Compliance() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="py-16 md:py-24" ref={ref}>
      <Container>
        <div className="grid gap-y-10 border-b border-ink/12 pb-16 md:grid-cols-12 md:gap-x-6">
          <h2 data-reveal className="text-16 md:col-span-3 md:text-21">
            The regulators
          </h2>
          <dl className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:col-span-9">
            {regulatorExplainers.map((r) => (
              <div key={r.name} data-reveal className="flex flex-col gap-4">
                <dt>
                  <span className="chip chip--blue">{r.name}</span>
                </dt>
                <dd className="text-13 text-grey">
                  <p>{r.body}</p>
                  <a href={r.href} target="_blank" rel="noreferrer" className="ul-link mt-4 inline-block text-ink">
                    {r.href.replace('https://', '').replace(/\/$/, '')}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-y-10 border-b border-ink/12 py-16 md:grid-cols-12 md:gap-x-6">
          <h2 data-reveal className="text-16 md:col-span-3 md:text-21">
            What we hold
          </h2>
          <div className="flex flex-col gap-6 md:col-span-6">
            {heldCredentials.length > 0 ? (
              <ul className="flex flex-col divide-y divide-ink/12 border-y border-ink/12">
                {heldCredentials.map((c) => (
                  <li key={c.authority} data-reveal className="grid grid-cols-[1fr_1fr_auto] gap-6 py-4 text-13">
                    <span>{c.authority}</span>
                    <span className="text-grey">{c.category}</span>
                    <span className="u-num">{c.number}</span>
                  </li>
                ))}
              </ul>
            ) : (
              complianceNote.paragraphs.map((p) => (
                <p key={p} data-reveal className="text-16 leading-[1.4]">
                  {p}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="grid gap-y-10 pt-16 md:grid-cols-12 md:gap-x-6">
          <h2 data-reveal className="text-16 md:col-span-3 md:text-21">
            Recognition
          </h2>
          <ul className="flex flex-col divide-y divide-ink/12 border-y border-ink/12 md:col-span-9">
            {recognition.map((r) => (
              <li key={r.name} data-reveal className="grid gap-2 py-5 sm:grid-cols-2 sm:gap-6">
                <span className="text-16">{r.name}</span>
                <span className="text-13 text-grey">{r.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-y-10 pt-16 md:grid-cols-12 md:gap-x-6">
          <h2 data-reveal className="text-16 md:col-span-3 md:text-21">
            Awards and standards
          </h2>
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 md:col-span-9">
            {awards.map((a) => (
              <li key={a.title} data-reveal className="flex flex-col gap-3 rounded-[12px] bg-grey-lighter p-6">
                <span className="text-[0.75rem] text-grey">{a.issuer}</span>
                <span className="heading-xs">{a.title}</span>
                <span className="text-md text-grey">{a.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
