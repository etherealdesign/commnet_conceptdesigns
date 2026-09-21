import { Hero } from '@/components/hero/Hero'
import { Statement } from '@/components/home/Statement'
import { SystemsStack } from '@/components/home/SystemsStack'
import { Environments } from '@/components/home/Environments'
import { Showcase } from '@/components/home/Showcase'
import { Method } from '@/components/home/Method'
import { Repeat } from '@/components/home/Repeat'
import { CtaBlock } from '@/components/shared/CtaBlock'
import { Faq } from '@/components/faq/Faq'
import { Seo } from '@/components/shared/Seo'
import { site } from '@/data/site'
import { organizationSchema, webPageSchema, faqSchema } from '@/utils/schema'

/**
 * The home page reads top to bottom as an argument: the claim (hero), who
 * we are (statement), what we install (systems), where we deliver it
 * (environments), the evidence (showcase), how the work is done (method),
 * who came back (repeat), the ask (cta) and the evaluator's questions (faq).
 */
export function Home() {
  return (
    <>
      <Seo
        title={site.name}
        description={site.description}
        path="/"
        graph={[organizationSchema(), webPageSchema(site.name, site.description, '/'), faqSchema()]}
      />
      <Hero />
      <Statement />
      <SystemsStack />
      <Environments />
      <Showcase />
      <Method />
      <Repeat />
      <CtaBlock index={8} />
      <Faq index={9} />
    </>
  )
}
