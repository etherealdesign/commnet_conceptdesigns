import { Block } from '@/components/shared/Block'
import { useReveal } from '@/hooks/useReveal'
import { leadership } from '@/data/leadership'

/**
 * Leadership, as a roster rather than a card grid.
 *
 * Four identical cards is the default and it reads as a template. There are no
 * photographs cleared for use, and a generated avatar or an initials-in-a-circle
 * is worse than nothing. So: a typographic list. The initials sit as a quiet
 * monospace index, the name carries the row, and a single hairline separates
 * people. It scans the way a tender evaluator reads a prequalification pack.
 */
export function Leadership() {
  const ref = useReveal<HTMLElement>()
  return (
    <Block ref={ref} anchor="leadership" className="margin-px-1 py-16 md:py-24">
      <div className="flex flex-col items-start justify-between gap-y-12 md:flex-row md:gap-x-6">
        <div data-reveal className="md:span-w-2 flex flex-col gap-4">
          <span className="chip chip--line text-13">Leadership</span>
          <p className="max-w-[16rem] text-13 text-grey">
            A small executive team that still walks the site.
          </p>
        </div>

        <ol className="md:span-w-9 mr-auto w-full border-t border-ink/12">
          {leadership.map((p) => (
            <li
              key={p.name}
              data-reveal
              className="grid gap-x-6 gap-y-2 border-b border-ink/12 py-6 md:grid-cols-[3rem_minmax(0,18rem)_minmax(0,1fr)] md:py-7"
            >
              <span className="mono text-grey" aria-hidden="true">
                {p.initials}
              </span>
              <div>
                <p className="text-21 leading-[1.15]">{p.name}</p>
                <p className="mt-1 text-13 text-grey">{p.role}</p>
              </div>
              <p className="text-13 leading-[1.6] text-grey md:pt-1">{p.bio}</p>
            </li>
          ))}
        </ol>
      </div>
    </Block>
  )
}
