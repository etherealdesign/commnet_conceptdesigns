import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { useReveal } from '@/hooks/useReveal'
import { complianceNote } from '@/data/home'
import { heldCredentials } from '@/data/claims'

/**
 * Chip, three short paragraphs, one photograph. If a credential number has
 * been confirmed in claims.ts it is listed under the text; if none has, the
 * paragraphs already say so and nothing else is printed.
 */
export function ComplianceNote() {
  const ref = useReveal<HTMLElement>()
  return (
    <Block ref={ref} anchor="compliance" className="margin-px-1 pb-6 pt-16 md:pb-6 md:pt-24">
      <div className="flex flex-col items-start justify-between gap-y-12 md:flex-row md:gap-x-6">
        <div data-reveal className="md:span-w-2 flex">
          <Link to="/compliance" className="chip chip--line text-13 transition-colors duration-300 hover:bg-ink hover:text-cream">
            {complianceNote.chip}
          </Link>
        </div>
        <div className="md:span-w-5 mr-auto flex flex-col gap-6">
          {complianceNote.paragraphs.map((p) => (
            <p key={p} data-reveal className="text-16 leading-[1.4]">
              {p}
            </p>
          ))}
          {heldCredentials.length > 0 && (
            <ul className="mt-2 flex flex-col gap-2 text-13 text-grey">
              {heldCredentials.map((c) => (
                <li key={c.authority}>
                  <span className="text-ink">{c.authority}</span> · {c.category} · {c.number}
                </li>
              ))}
            </ul>
          )}
        </div>
        <figure data-reveal className="md:span-w-4 w-full shrink-0 overflow-clip rounded-sm">
          <img src={complianceNote.media} alt={complianceNote.mediaAlt} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
        </figure>
      </div>
    </Block>
  )
}
