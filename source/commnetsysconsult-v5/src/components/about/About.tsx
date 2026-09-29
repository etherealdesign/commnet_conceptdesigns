import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { useReveal } from '@/hooks/useReveal'
import { recognition } from '@/data/compliance'
import { claims } from '@/data/claims'

const STORY = [
  {
    title: 'Origin',
    body: claims.tradeLicenceYear
      ? `Founded in Dubai in ${claims.tradeLicenceYear} as a two-person cabling consultancy.`
      : 'Founded in Dubai in the early 2000s as a two-person cabling consultancy. The founding year is printed once the trade-licence issue year is confirmed.',
  },
  { title: 'Dubai head office', body: 'Commercial, field and commissioning teams, covering Dubai, Abu Dhabi and Sharjah.' },
  { title: 'Chennai engineering centre', body: 'Design and detailed engineering: racks, containment, power, network. Behind every UAE delivery.' },
  { title: 'Recognition', body: recognition.map((r) => `${r.name}, ${r.detail}`).join('. ') + '.' },
]

/** Chip, one sentence at reading size, then the story in four short rows. */
export function About() {
  const ref = useReveal<HTMLElement>()
  return (
    <Block ref={ref} anchor="about" className="margin-px-1 py-16 md:py-24">
      <div className="flex flex-col items-start justify-between gap-y-12 md:flex-row md:gap-x-6">
        <div data-reveal className="md:span-w-2 flex">
          <Link to="/about" className="chip chip--line text-13 transition-colors duration-300 hover:bg-ink hover:text-cream">
            About
          </Link>
        </div>
        <div className="md:span-w-9 mr-auto flex flex-col gap-12">
          <p data-reveal className="md:span-w-6 text-21 leading-[1.3] md:text-25">
            One engineering team across two hubs. Dubai runs the commercial, the field and the commissioning;
            Chennai does the detailed engineering behind it.
          </p>
          <dl className="grid gap-x-6 gap-y-8 border-t border-ink/12 pt-8 sm:grid-cols-2">
            {STORY.map((s) => (
              <div key={s.title} data-reveal className="flex flex-col gap-2">
                <dt className="text-16">{s.title}</dt>
                <dd className="text-13 text-grey">{s.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Block>
  )
}
