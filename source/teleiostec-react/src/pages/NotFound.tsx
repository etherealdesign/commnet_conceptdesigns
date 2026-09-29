import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Seo } from '@/components/Seo'
import { Split } from '@/components/Split'

export default function NotFound() {
  return (
    <Page label="404">
      <Seo title="Page not found" description="This page does not exist." path="/404" />
      <section className="wrap flex min-h-svh flex-col justify-center pt-[var(--header-h)]">
        <p className="kick mb-8">Error 404</p>
        <Split as="h1" trigger="load" className="display text-fluid-4xl">This room <em>isn’t built yet.</em></Split>
        <Link to="/" className="link-line mt-12 w-fit text-[12px] uppercase tracking-[0.18em]">← Back home</Link>
      </section>
    </Page>
  )
}
