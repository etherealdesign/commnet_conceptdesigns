import { Block } from '@/components/shared/Block'
import { useReveal } from '@/hooks/useReveal'
import { method } from '@/data/home'

/**
 * The delivery model as a numbered list on the page grid. One heading,
 * one paragraph, six stages. Nothing pinned, nothing behind it.
 */
export function Method() {
  const ref = useReveal<HTMLElement>()

  return (
    <Block ref={ref} anchor="method" className="margin-px-1 border-t border-ink/12 py-20 md:py-32">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h2 data-reveal className="text-25 md:text-36">{method.title}</h2>
          <p data-reveal className="mt-6 max-w-md text-13 text-grey">{method.part1.text}</p>
        </div>
        <ol className="border-t border-ink/12 md:col-span-7">
          {method.part2.steps.map((s, i) => (
            <li key={s.title} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 border-b border-ink/12 py-5 md:grid-cols-[4rem_minmax(0,14rem)_1fr] md:gap-6 md:py-6">
              <span className="u-num text-13 text-grey">0{i + 1}</span>
              <h3 className="text-16 md:text-21">{s.title}</h3>
              <p className="col-start-2 text-13 text-grey md:col-start-3">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Block>
  )
}
