import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { Scramble } from '@/components/shared/Scramble'
import { AsciiImage } from '@/components/ui/ascii-image'
import { site } from '@/data/site'
import { footer } from '@/data/home'
import { cycleAccent } from '@/components/shared/AccentSwitch'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Systems', to: '/services' },
  { label: 'Environments', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'Contact', to: '/contact' },
]

/**
 * Three columns of small type, a keyboard hint, and the company name at a
 * size that runs off the page. A photograph rendered as glyphs sits behind
 * the wordmark so the last screen has the same texture as the first.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const [subscribed, setSubscribed] = useState(false)
  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <Block as="footer" isDark className="theme-dark relative overflow-clip pt-12">
      <div className="grid-container relative z-1">
        <div className="grid-layout gap-y-12">
          <div className="grid-span-12 md:grid-span-4">
            <p className="t-body">Updates when the register changes.</p>
            {subscribed ? (
              <p className="mono mt-4 text-accent">Subscribed. Thank you.</p>
            ) : (
              <form onSubmit={onSubscribe} className="mt-4 flex max-w-sm flex-col gap-1">
                <input name="name" placeholder="Name" aria-label="Name" className="h-11 bg-surface-dark px-3 text-fg-light outline-none placeholder:text-muted-light focus:ring-1 focus:ring-accent" />
                <input name="email" type="email" required placeholder="Email" aria-label="Email" className="h-11 bg-surface-dark px-3 text-fg-light outline-none placeholder:text-muted-light focus:ring-1 focus:ring-accent" />
                <Button type="submit" variant="light" className="mt-1 [&>span]:w-full [&>span>span:first-child]:flex-1">
                  Subscribe
                </Button>
                <p className="t-small mt-1 text-fg-muted">Unsubscribe anytime.</p>
              </form>
            )}
            <ul className="mono mt-8 flex flex-col gap-2">
              {footer.status.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="sq sq--pulse" />
                  <Scramble text={s} delay={i * 150} />
                </li>
              ))}
            </ul>
          </div>

          <nav className="grid-span-12 md:grid-span-4 flex flex-col items-start gap-2 md:items-center" aria-label="Footer">
            {NAV.map((l) => (
              <Link key={l.to} to={l.to} className="mono transition-colors hover:text-accent">
                <Scramble text={l.label} onHover />
              </Link>
            ))}
          </nav>

          <div className="grid-span-12 md:grid-span-4 flex flex-col items-start gap-2 md:items-end">
            <a href={`mailto:${site.email}`} className="ul-link">{site.email}</a>
            {site.offices.map((o) => (
              <a key={o.id} href={`tel:${o.phone.replace(/\s/g, '')}`} className="ul-link u-num">
                {o.city} {o.phone}
              </a>
            ))}
            <Link to="/compliance" className="ul-link mt-4">Compliance</Link>
            <Link to="/about" className="ul-link">About</Link>
            <div className="mono-sm mono mt-6 flex flex-col gap-1 text-fg-muted md:items-end">
              <button type="button" onClick={cycleAccent} className="flex cursor-pointer items-center gap-2 normal-case hover:text-fg-light">
                <kbd className="bg-surface-dark px-1.5 py-0.5">C</kbd> change colour
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-16 flex flex-col items-center gap-1 text-center text-fg-muted md:mt-24">
          <p>© {year}</p>
          <p>{site.legalName}</p>
          <p>{footer.tagline}</p>
        </div>
      </div>

      <div className="pointer-events-none relative mt-8 h-[28vw] max-h-[420px] min-h-[160px] w-full overflow-clip" aria-hidden="true">
        <AsciiImage src="/media/dubai-skyline.jpg" cell={8} accentShare={0.3} floor={0.3} interactive={false} className="absolute inset-x-0 -top-1/2 h-[200%] opacity-60" />
        <p className="absolute inset-x-0 bottom-[-0.18em] text-center font-medium leading-none tracking-[-0.06em] text-fg-light/8" style={{ fontSize: '25vw' }}>
          {footer.wordmark}
        </p>
      </div>
    </Block>
  )
}
