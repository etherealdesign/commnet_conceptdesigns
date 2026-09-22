import { Container } from '@/components/shared/Container'
import { AnimText } from '@/components/motion/AnimText'
import { SlideGroup, SlideItem } from '@/components/motion/SlideIn'
import { timeline } from '@/data/company'

/** v1's four milestones, as a ruled row of year, title and one sentence. */
export function Timeline() {
  return (
    <section className="py-[var(--spacing-fluid-xl)]" aria-label="Milestones">
      <Container>
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className="md:col-span-4">
            <AnimText as="h2" text="Twenty years, four turns." className="heading-md max-w-[10ch]" />
            <p className="text-md mt-4 max-w-xs text-grey">From a two-person cabling consultancy to a turnkey integrator with a cyber security practice and a World Cup on the register.</p>
          </div>
          <SlideGroup as="ol" className="flex flex-col border-t border-line-grey md:col-span-8">
            {timeline.map((m, i) => (
              <SlideItem as="li" key={m.year} index={i} className="grid gap-2 border-b border-line-grey py-6 md:grid-cols-[6rem_14rem_1fr] md:gap-6">
                <span className="u-num heading-xs">{m.year}</span>
                <span className="text-[0.875rem] font-bold">{m.title}</span>
                <span className="text-md text-grey">{m.body}</span>
              </SlideItem>
            ))}
          </SlideGroup>
        </div>
      </Container>
    </section>
  )
}
