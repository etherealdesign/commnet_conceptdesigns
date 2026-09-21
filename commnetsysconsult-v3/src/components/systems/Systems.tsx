import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { DragMarquee } from '@/components/shared/DragMarquee'
import { Arrow } from '@/components/shared/Button'
import { useReveal } from '@/hooks/useReveal'
import { services } from '@/data/services'
import { solutions } from '@/data/solutions'
import { statement, systemsStrip } from '@/data/home'

/**
 * The statement, a strip of photographs that moves with the scroll, then
 * the specification sheet: five systems and six environments laid out like
 * a datasheet rather than a card grid. The chips are the taxonomy; the
 * grey line under each is the evidence.
 */
export function Systems() {
  const ref = useReveal<HTMLElement>()

  return (
    <Block ref={ref} anchor="systems" className="overflow-clip py-16 md:pb-24 md:pt-12">
      <div className="margin-px-1 flex justify-center pb-16 md:pb-24">
        <h2 data-reveal className="md:span-w-10 w-full text-center text-25 md:text-36">
          {statement}
        </h2>
      </div>

      <DragMarquee ariaLabel="Photographs from Commnet sites" itemClassName="gutter-gap-1 pr-[var(--gutter)]">
        {systemsStrip.map((m) => (
          <figure key={m.src} className="span-w-4 md:span-w-3 aspect-[3/4] shrink-0 overflow-clip rounded-sm bg-ink/5">
            <img
              src={m.src}
              alt={m.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.03]"
            />
          </figure>
        ))}
      </DragMarquee>

      <div className="margin-px-1 mt-16 md:mt-24">
        <div className="grid gap-y-10 border-t border-ink/12 pt-6 md:grid-cols-12 md:gap-x-6">
          <div data-reveal className="flex items-start gap-3 md:col-span-3">
            <span className="mt-0.5 grid size-6 place-items-center rounded-full border border-ink/15" aria-hidden="true">
              <span className="size-1.5 rounded-full bg-ink" />
            </span>
            <h3 className="text-16 leading-none md:text-21">Systems we install</h3>
          </div>
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
          <div data-reveal className="flex items-start gap-3 md:col-span-3">
            <span className="mt-0.5 grid size-6 place-items-center rounded-full border border-ink/15" aria-hidden="true">
              <span className="size-1.5 rounded-sm bg-ink" />
            </span>
            <h3 className="text-16 leading-none md:text-21">Environments we deliver in</h3>
          </div>
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
            {solutions.map((s) => (
              <li key={s.slug} data-reveal>
                <Link to={`/solutions/${s.slug}`} className="group flex flex-col gap-3">
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-16 md:text-21">{s.title}</span>
                    <Arrow className="size-4 shrink-0 -translate-x-1 opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="text-13 text-grey">{s.summary}</span>
                  <span className="text-11 text-grey/80">{s.evidence}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Block>
  )
}
