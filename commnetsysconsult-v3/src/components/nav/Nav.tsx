import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { cn } from '@/lib/utils'

/**
 * The bar is three clusters: the menu button with the first destinations on
 * the left, the wordmark in the centre, the rest and the enquiry on the
 * right. The menu itself is a full card of white: three photographs that
 * name where they go, and the site as a list of hairline rows at display
 * size.
 */
const LEFT = [
  { label: 'Systems', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
]
const RIGHT = [
  { label: 'Compliance', to: '/compliance' },
  { label: 'About', to: '/about' },
]
const ALL = [...LEFT, ...RIGHT, { label: 'Contact', to: '/contact' }]

const TILES = [
  { label: 'Systems', copy: 'Six disciplines, one package', to: '/services', media: '/media/infrastructure-fiber.jpg' },
  { label: 'About', copy: 'Two hubs, one engineering team', to: '/about', media: '/media/professional-it.jpg' },
  { label: 'Projects', copy: '18 documented contracts in the UAE', to: '/projects', media: '/media/dubai-skyline.jpg' },
]

function Tile({ tile, className }: { tile: (typeof TILES)[number]; className?: string }) {
  return (
    <Link to={tile.to} className={cn('tile group', className)}>
      <img src={tile.media} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      <span className="tile-label">
        <span className="block text-16 md:text-21">{tile.label}</span>
        <span className="block text-13 text-cream/80">{tile.copy}</span>
      </span>
    </Link>
  )
}

export function Nav() {
  const { theme, setHeaderCenter, setModalOpen } = useHeaderStore()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const dark = theme === 'dark' && !open

  useLayoutEffect(() => {
    const measure = () => {
      const el = headerRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setHeaderCenter(r.top + r.height / 2)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [setHeaderCenter])

  useEffect(() => setOpen(false), [pathname])

  // The pill is transparent while the hero is under it and turns white
  // (and blurred) once the page has scrolled 50 px, as on the reference.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (open) {
      document.body.classList.add('is-locked')
      gsap.set(overlay, { display: 'block' })
      if (prefersReducedMotion()) {
        gsap.set(overlay, { opacity: 1 })
        return
      }
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(
        overlay.querySelectorAll('[data-menu-item]'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: 'expo.out', delay: 0.08 },
      )
    } else {
      document.body.classList.remove('is-locked')
      if (overlay.style.display === 'block') {
        gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(overlay, { display: 'none' }) })
      }
    }
    return () => document.body.classList.remove('is-locked')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const link = 'ul-link text-13 pointer-events-auto'

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[130] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-13 focus:text-cream"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={cn(
          'pointer-events-none fixed left-0 z-[120] w-full px-2 pt-2 md:px-[var(--shell-x)] md:pt-[var(--shell-x)]',
          open || !dark || scrolled ? 'text-ink' : 'text-cream',
        )}
        style={{ top: 'var(--ann-h)', width: 'calc(100vw - var(--sbw, 0px))' }}
      >
        <div
          className={cn('nav-pill pointer-events-auto mx-auto px-4 py-2 transition-colors duration-300 md:px-6')}
          style={{ '--header-bg': open || scrolled || !dark ? '92%' : '0%', '--header-blur': open || scrolled || !dark ? '12px' : '0px' } as React.CSSProperties}
        >
        <nav className="grid h-10 grid-cols-[1fr_auto_1fr] items-center" aria-label="Primary">
          <div className="flex items-center gap-8">
            <button
              type="button"
              className="pointer-events-auto flex size-6 cursor-pointer items-center justify-center"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 22 22" className="size-[22px]" aria-hidden="true">
                <path
                  d={open ? 'M4 4l14 14M18 4L4 18' : 'M3 8h16M3 14h16'}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="hidden items-center gap-8 md:flex">
              {LEFT.map((l) => (
                <Link key={l.to} to={l.to} className={link} data-active={pathname.startsWith(l.to) || undefined}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/" aria-label="Commnet Systems Consultancy, home" className="pointer-events-auto justify-self-center">
            <Logo variant={open || !dark || scrolled ? 'dark' : 'light'} height={26} />
          </Link>

          <div className="flex items-center justify-end gap-8">
            <div className="hidden items-center gap-8 md:flex">
              {RIGHT.map((l) => (
                <Link key={l.to} to={l.to} className={link} data-active={pathname.startsWith(l.to) || undefined}>
                  {l.label}
                </Link>
              ))}
            </div>
            <Button
              variant="primary"
              theme={open || !dark || scrolled ? 'light' : 'dark'}
              className="pointer-events-auto h-9 px-4"
              onClick={() => setModalOpen(true)}
            >
              Get in contact
            </Button>
          </div>
        </nav>
        </div>
      </header>

      <div
        id="site-menu"
        ref={overlayRef}
        className="fixed z-[115] hidden overflow-auto rounded-[20px] bg-cream text-ink"
        style={{
          display: 'none',
          top: 'var(--ann-h)',
          left: 'var(--shell-x)',
          right: 'calc(var(--shell-x) + var(--sbw, 0px))',
          bottom: 'var(--shell-x)',
        }}
      >
        <div className="grid gap-8 px-4 pb-8 pt-24 md:h-[calc(var(--shell-h)-2.5rem)] md:grid-cols-12 md:gap-6 md:px-11 md:pb-11 md:pt-28">
          <div className="flex flex-col gap-6 max-md:hidden md:col-span-3">
            <Tile tile={TILES[0]} className="aspect-[4/3] flex-1 md:aspect-auto" />
            <Tile tile={TILES[1]} className="aspect-[4/3] flex-1 md:aspect-auto" />
          </div>
          <Tile tile={TILES[2]} className="max-md:aspect-[3/2] md:col-span-4 md:aspect-auto" />

          <div className="flex flex-col justify-between md:col-span-5 md:pl-6">
            <ul>
              {ALL.map((l) => (
                <li key={l.to} data-menu-item>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="hair-row text-36 first:border-t md:text-48"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-16 text-13 text-grey" data-menu-item>
              <div className="flex flex-col gap-2">
                <p className="text-ink">Dubai</p>
                <a href="tel:+97142955299" className="u-num transition-colors hover:text-ink">+971 4 295 5299</a>
                <p>Head office and commissioning</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-ink">Chennai</p>
                <a href="tel:+917558164222" className="u-num transition-colors hover:text-ink">+91 75581 64222</a>
                <p>Engineering centre</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
