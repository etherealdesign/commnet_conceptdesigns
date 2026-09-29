import { Hero } from '@/components/hero/Hero'
import { Collage } from '@/components/home/Collage'
import { Stack } from '@/components/home/Stack'
import { SystemsRail } from '@/components/home/SystemsRail'
import { Journey } from '@/components/home/Journey'
import { BigText } from '@/components/home/BigText'
import { Editorial } from '@/components/home/Editorial'
import { Industries } from '@/components/home/Industries'
import { Discover } from '@/components/home/Discover'
import { Push } from '@/components/home/Push'
import { Seo } from '@/components/shared/Seo'
import { site } from '@/data/site'
import { organizationSchema, webPageSchema } from '@/utils/schema'

/**
 * The page in the reference's order: hero (unchanged), the collage and the
 * intro, the stacking cards, the systems rail, the full-bleed statement,
 * the manifesto at heading size, the editorial block, the sectors rail,
 * the register rail, the push. The footer is the directory.
 */
export function Home() {
  return (
    <>
      <Seo title={site.name} description={site.description} path="/" graph={[organizationSchema(), webPageSchema(site.name, site.description, '/')]} />
      <Hero />
      <Collage />
      <Stack />
      <SystemsRail />
      <Journey />
      <BigText />
      <Editorial />
      <Industries />
      <Discover />
      <Push />
    </>
  )
}
