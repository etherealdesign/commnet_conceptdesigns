import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { Seo } from '@/components/shared/Seo'

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="That page does not exist." path="/404" noindex />
      <section className="flex min-h-[70svh] items-center pt-32">
        <Container>
          <span className="chip chip--line text-13">404</span>
          <h1 className="mt-6 max-w-2xl text-36 md:text-60">That page is not on the register.</h1>
          <p className="mt-6 max-w-lg text-16 text-grey">
            The link may be old. The eighteen documented contracts and the five systems behind them are all still here.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/">Back to the home page</Button>
            <Button to="/projects" variant="light">
              The project register
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
