import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { impact, repeat, flagship } from '@/data/home'

/**
 * The numbers and the reference on one light ground: three measured facts
 * from the register, then the prime that came back three times. Where the
 * reference site carries testimonials, this carries the thing a tender
 * evaluator actually weighs.
 */
export function Proof() {
  const ref = useReveal<HTMLElement>()

  return (
    <Block ref={ref} anchor="proof" className="margin-px-1 border-t border-ink/12 py-20 md:py-32" ariaLabel="Scale and repeat business">
      <p data-reveal className="md:span-w-8 text-25 md:text-36">
        {flagship.title}. <span className="text-grey">{flagship.subtitle}.</span>
      </p>

      <dl className="mt-14 grid gap-x-6 gap-y-10 border-t border-ink/12 pt-8 md:mt-20 md:grid-cols-3">
        {impact.slides.map((s) => (
          <div key={s.unit} data-reveal className="flex flex-col gap-4">
            <dt className="u-num text-48 leading-none md:text-60">
              {s.value} <span className="text-21 text-grey md:text-25">{s.unit}</span>
            </dt>
            <dd className="max-w-xs text-13 text-grey">{s.body}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-20 grid gap-10 border-t border-ink/12 pt-8 md:mt-28 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h2 data-reveal className="text-21 md:text-25">{repeat.heading}</h2>
          <p data-reveal className="mt-4 max-w-sm text-13 text-grey">
            Eight of the eighteen contracts ran under a prime. GBM engaged Commnet on three of them, in sequence.
          </p>
        </div>
        <ul className="md:col-span-7">
          {repeat.cards.map((c, i) => (
            <li key={c.slug} data-reveal className="border-b border-ink/12 first:border-t">
              <Link to={`/projects/${c.slug}`} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5 md:gap-6">
                <span className="u-num text-13 text-grey">0{i + 1}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-16 md:text-21">{c.client}</span>
                  <span className="u-num text-13 text-grey">{c.fact} · via {c.prime}</span>
                </span>
                <Arrow className="size-4 self-center transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  )
}
