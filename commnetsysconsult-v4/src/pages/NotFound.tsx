import { Button } from '@/components/shared/Button'
import { Seo } from '@/components/shared/Seo'

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="That page does not exist." path="/404" noindex />
      <section className="margin-px-1 dotgrid flex min-h-[80svh] flex-col justify-end pb-16 pt-32">
        <p className="mono bullet text-grey">Error 404</p>
        <h1 className="d-1 mt-6 max-w-4xl">
          Not on <em>the register.</em>
        </h1>
        <p className="mt-6 max-w-lg text-13 text-grey md:text-14">
          The link may be old. The eighteen documented contracts and the five systems behind them are all still here.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" glyph="→">Back to the home page</Button>
          <Button to="/projects" variant="outline">
            The project register
          </Button>
        </div>
      </section>
    </>
  )
}
