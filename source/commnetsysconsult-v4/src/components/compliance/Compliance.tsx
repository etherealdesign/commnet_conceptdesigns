import { Block } from '@/components/shared/Block'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { useReveal } from '@/hooks/useReveal'
import { recognition, regulatorExplainers } from '@/data/compliance'
import { heldCredentials } from '@/data/claims'
import { complianceNote } from '@/data/home'

/**
 * Regulators explained, then what we hold. Credentials render only when a
 * number exists in claims.ts (§6.7): print the number or do not list it.
 */
export function Compliance({ index = 3 }: { index?: number }) {
  const ref = useReveal<HTMLElement>()
  return (
    <Block ref={ref} anchor="compliance" section="Compliance" className="margin-px-1 border-t border-ink/12 py-16 md:py-24">
      <SectionLabel index={index} aside="SIRA · ADMCC">
        Compliance
      </SectionLabel>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-6">
        <h2 className="d-2 md:col-span-5" data-reveal>
          What each regulator covers, <em>and what we hold.</em>
        </h2>
        <p data-reveal className="max-w-md text-16 text-grey md:col-span-6 md:col-start-7 md:self-end">
          Dubai&rsquo;s SIRA and Abu Dhabi&rsquo;s ADMCC both license companies and set the technical requirements
          security systems must meet. Those requirements are set by the authority and revised, so we confirm the current
          specification at design stage rather than publishing a fixed number, and we print a credential only once there
          is a licence number behind it.
        </p>
      </div>

      <dl className="mt-16 grid gap-3 md:mt-24 md:grid-cols-2">
        {regulatorExplainers.map((r) => (
          <div key={r.name} data-reveal className="flex flex-col gap-4 rounded-[var(--r-card)] bg-cream p-6">
            <dt>
              <span className="chip chip--blue">{r.name}</span>
            </dt>
            <dd className="text-14 text-grey">
              <p className="max-w-lg">{r.body}</p>
              <a href={r.href} target="_blank" rel="noreferrer" className="ul-link mt-4 inline-block text-14 font-medium text-ink">
                {r.href.replace('https://', '').replace(/\/$/, '')} ↗
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid gap-10 border-t border-ink/15 pt-8 md:mt-24 md:grid-cols-12 md:gap-6">
        <p className="mono text-grey md:col-span-3">What we hold</p>
        <div className="flex flex-col gap-5 md:col-span-7">
          {heldCredentials.length > 0 ? (
            <ul className="flex flex-col divide-y divide-ink/12 border-y border-ink/12">
              {heldCredentials.map((c) => (
                <li key={c.authority} data-reveal className="grid grid-cols-[1fr_1fr_auto] gap-6 py-4 text-14">
                  <span>{c.authority}</span>
                  <span className="text-grey">{c.category}</span>
                  <span className="u-num">{c.number}</span>
                </li>
              ))}
            </ul>
          ) : (
            complianceNote.paragraphs.map((p) => (
              <p key={p} data-reveal className="text-16 leading-[1.45]">
                {p}
              </p>
            ))
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-10 border-t border-ink/15 pt-8 md:grid-cols-12 md:gap-6">
        <p className="mono text-grey md:col-span-3">Recognition</p>
        <ol className="border-t border-ink/12 md:col-span-9">
          {recognition.map((r, i) => (
            <li key={r.name} data-reveal className="grid gap-2 border-b border-ink/12 py-5 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-6">
              <span className="mono text-grey">{String(i + 1).padStart(2, '0')}</span>
              <span className="d-3">{r.name}</span>
              <span className="text-14 text-grey">{r.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </Block>
  )
}
