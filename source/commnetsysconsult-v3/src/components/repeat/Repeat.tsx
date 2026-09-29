import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { Carousel } from '@/components/shared/Carousel'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { repeat } from '@/data/home'

/**
 * Where the reference site carries testimonials, this carries the thing a
 * tender evaluator actually weighs: the same prime coming back. Three
 * cards, one per contract, auto-advancing every fifteen seconds until
 * touched.
 */
export function Repeat() {
  const ref = useReveal<HTMLElement>()
  return (
    <Block ref={ref} className="py-16 md:py-24" ariaLabel="Repeat business">
      <div className="margin-px-1 mb-10 md:mb-16">
        <h2 data-reveal className="md:span-w-9 text-25 md:text-36">
          {repeat.heading}
        </h2>
        <p data-reveal className="mt-4 max-w-xl text-13 text-grey">
          Eight of the eighteen contracts on the register ran under a prime. GBM engaged Commnet on three of them, in
          sequence. That is printed here rather than smoothed over because it is the strongest reference on the page.
        </p>
      </div>
      <Carousel ariaLabel="Contracts delivered for GBM" autoPlay={15000} loop controlsClassName="margin-px-1 pt-8" trackClassName="margin-px-1 gutter-gap-1">
        {repeat.cards.map((c, i) => (
          <Link
            key={c.slug}
            to={`/projects/${c.slug}`}
            className="group flex w-[86%] flex-col justify-between gap-16 rounded-sm border border-ink/12 bg-cream p-6 transition-colors duration-500 hover:border-ink md:w-[calc(6*var(--column)+5*var(--gutter))] md:p-8"
            draggable={false}
          >
            <div className="flex items-center justify-between text-13 text-grey">
              <span className="u-num">0{i + 1}</span>
              <span>via {c.prime}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-25 md:text-36">{c.client}</h3>
              <p className="u-num text-13 text-grey">{c.fact}</p>
            </div>
            <span className="flex items-center gap-2 text-13">
              Read the record
              <Arrow className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </Carousel>
    </Block>
  )
}
