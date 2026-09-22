import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { services } from '@/data/services'
import { solutions } from '@/data/solutions'

/**
 * The specification sheet: five systems and six environments laid out like
 * a datasheet rather than a card grid. The chips are the taxonomy; the
 * grey line under each is the evidence.
 */
export function Systems() {
  const ref = useReveal<HTMLElement>()

  return (
    <Block ref={ref} anchor="systems" className="margin-px-1 py-20 md:py-32">
      <h2 data-reveal className="md:span-w-8 text-25 md:text-36">
        Five systems, six environments. <span className="text-grey">The same engineering team on every one.</span>
      </h2>

      <div className="mt-14 grid gap-y-10 border-t border-ink/12 pt-6 md:mt-20 md:grid-cols-12 md:gap-x-6">
        <h3 data-reveal className="text-16 md:col-span-3 md:text-21">Systems we install</h3>
        <dl className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.slug} data-reveal className="flex flex-col items-start gap-4">
              <dt>
                <Link to={`/services/${s.slug}`} className="chip chip--blue transition-colors duration-300 hover:bg-ink hover:text-cream">
                  {s.code} · {s.title}
                </Link>
              </dt>
              <dd className="text-13 text-grey">
                <p>{s.summary}</p>
                <p className="mt-4 text-ink">{s.evidence}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-16 grid gap-y-10 border-t border-ink/12 pt-6 md:mt-20 md:grid-cols-12 md:gap-x-6">
        <h3 data-reveal className="text-16 md:col-span-3 md:text-21">Environments we deliver in</h3>
        <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
          {solutions.map((s) => (
            <li key={s.slug} data-reveal>
              <Link to={`/solutions/${s.slug}`} className="group flex flex-col gap-3">
                <span className="flex items-center justify-between gap-4">
                  <span className="text-16 md:text-21">{s.title}</span>
                  <Arrow className="size-4 shrink-0 -translate-x-1 opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span className="text-13 text-grey">{s.summary}</span>
                <span className="text-11 text-grey">{s.evidence}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Block>
  )
}
