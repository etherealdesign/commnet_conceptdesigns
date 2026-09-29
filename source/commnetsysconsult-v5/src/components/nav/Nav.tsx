import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/shared/Button'
import { Scramble } from '@/components/shared/Scramble'
import { Indicator } from '@/components/shared/Indicator'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { usePageEnter } from '@/components/shared/PageEnter'
import { usePageTransition } from '@/components/shared/PageTransition'
import { useLenis } from '@/components/shared/SmoothScroll'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Systems', to: '/services' },
  { label: 'Environments', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'About', to: '/about' },
]

/**
 * The header, with the reference's behaviour:
 *
 * - a container-width panel: transparent at the top of the page, the
 *   section's surface colour once scrolled 50 px, wider padding while the
 *   menu is open;
 * - hidden (slid up) until the page has entered, during route transitions,
 *   and whenever the footer comes within 10 % of the viewport top;
 * - MENU / CLOSE rolls vertically, the two bars turn into a cross;
 * - the menu panel opens by growing its grid row (1 s expo in-out) with the
 *   links rising through masks (1.4 s expo out, 0.1 s apart), the contact
 *   rows following (0.5 s, 0.04 s apart), the photographs fading in and
 *   the labels resolving out of noise; it closes with a clip from the
 *   bottom (0.6 s expo in-out). A square flies to the current page.
 */
export function Nav() {
  const { theme, setHeaderCenter, setModalOpen, menuOpen, setMenuOpen } = useHeaderStore()
  const { pathname } = useLocation()
  const { phase } = usePageTransition()
  const lenis = useLenis()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [hover, setHover] = useState<number | null>(null)
  const [markerY, setMarkerY] = useState<number | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLElement>(null)
  const linkEls = useRef<(HTMLAnchorElement | null)[]>([])
  const dark = theme === 'dark'
  const still = prefersReducedMotion()

  // measure for the theme sampler
  useLayoutEffect(() => {
    const measure = () => {
      const el = headerRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setHeaderCenter(Math.max(36, r.height / 2))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [setHeaderCenter])

  // enters with the page (priority 0), 0.4 s slide
  usePageEnter((delay) => {
    window.setTimeout(() => setHidden(false), delay * 1000)
  }, { priority: 0 })

  useEffect(() => {
    if (phase === 'entering' || phase === 'holding') setHidden(true)
  }, [phase])

  // scroll state + footer proximity
  useEffect(() => {
    let footerHidden = false
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const f = document.querySelector('footer')
      const limit = window.innerHeight * 0.1
      const near = !!f && f.getBoundingClientRect().top <= limit
      if (near !== footerHidden) {
        footerHidden = near
        setHidden(near)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen])

  // menu open / close
  useEffect(() => {
    const p = panelRef.current
    if (!p) return
    const links = p.querySelectorAll('[data-menu-link]')
    const rows = p.querySelectorAll('[data-menu-row]')
    const media = p.querySelector('[data-menu-media]')
    if (menuOpen) {
      lenis?.stop()
      document.body.classList.add('is-locked')
      if (still) {
        gsap.set(p, { gridTemplateRows: '1fr', clipPath: 'none' })
        gsap.set([links, rows], { yPercent: 0 })
        gsap.set(media, { opacity: 1 })
        return
      }
      const tl = gsap.timeline()
      gsap.set(p, { clipPath: 'none', gridTemplateRows: '0fr' })
      tl.to(p, { gridTemplateRows: '1fr', duration: 1, ease: 'expo.inOut' })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.1, force3D: true }, '<+50%')
        .fromTo(rows, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: 'power2.out', stagger: 0.04, force3D: true }, '<+25%')
        .fromTo(media, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power1.out' }, '<+25%')
      return () => {
        tl.kill()
      }
    }
    lenis?.start()
    document.body.classList.remove('is-locked')
    if (p.style.gridTemplateRows === '1fr' || getComputedStyle(p).gridTemplateRows !== '0px') {
      if (still) {
        gsap.set(p, { gridTemplateRows: '0fr' })
        return
      }
      gsap.set(p, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.to(p, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: () => gsap.set(p, { gridTemplateRows: '0fr', clipPath: 'none' }) })
    }
  }, [menuOpen, lenis, still])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, setMenuOpen])

  // the square beside the current (or hovered) link
  const activeIndex = LINKS.findIndex((l) => (l.to === '/' ? pathname === '/' : pathname.startsWith(l.to)))
  const markerIndex = hover ?? (activeIndex >= 0 ? activeIndex : null)
  useEffect(() => {
    if (!menuOpen || markerIndex === null) {
      setMarkerY(null)
      return
    }
    const raf = requestAnimationFrame(() => {
      const el = linkEls.current[markerIndex]
      const list = linksRef.current
      if (!el || !list) return
      const a = el.getBoundingClientRect()
      const b = list.getBoundingClientRect()
      setMarkerY(a.top - b.top + a.height / 2 - 12)
    })
    return () => cancelAnimationFrame(raf)
  }, [markerIndex, menuOpen])

  const state = menuOpen ? 'menuOpen' : scrolled ? 'scrolled' : 'top'
  const pad = state === 'top' ? 0 : state === 'scrolled' ? 16 : 24

  return (
    <>
      <a href="#main" className="mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-accent focus:px-4 focus:py-2 focus:text-dark">
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={cn('site-header fixed inset-x-0 top-0 z-100 flex flex-col gap-2 pt-4', hidden && 'header-hidden', dark ? 'text-fg-light' : 'text-fg')}
      >
        <div
          className={cn('grid-container transition-[padding,background-color,color] duration-500 ease-out', state === 'top' ? 'bg-transparent' : dark ? 'bg-surface-dark' : 'bg-surface')}
          style={{ paddingLeft: `calc(var(--grid-margin) + ${pad}px)`, paddingRight: `calc(var(--grid-margin) + ${pad}px)` }}
        >
          <div className="py-4">
            <div className="grid grid-cols-2 items-center lg:grid-cols-3">
              <Link to="/" aria-label="Commnet Systems Consultancy, home" className="justify-self-start">
                <Logo variant={dark ? 'light' : 'dark'} height={26} />
              </Link>

              <button
                type="button"
                className="mono flex cursor-pointer items-center gap-2 justify-self-end transition-opacity duration-300 hover:opacity-70 lg:justify-self-center"
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="roll-label w-[3.5em]" data-open={menuOpen}>
                  <span>
                    <span>Menu</span>
                    <span>Close</span>
                  </span>
                </span>
                <span className="relative flex size-4 flex-col items-center justify-center" aria-hidden="true">
                  <span className="absolute h-[2px] w-full origin-center bg-current transition-transform duration-[250ms] ease-out" style={{ transform: menuOpen ? 'rotate(45deg)' : 'translateY(-3px)' }} />
                  <span className="absolute h-[2px] w-full origin-center bg-current transition-transform duration-[250ms] ease-out" style={{ transform: menuOpen ? 'rotate(-45deg)' : 'translateY(3px)' }} />
                </span>
              </button>

              <div className="hidden justify-self-end lg:block">
                <Button variant="accent" size="sm" onClick={() => setModalOpen(true)}>
                  Get in contact
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-container" style={{ paddingLeft: `calc(var(--grid-margin) + ${pad}px)`, paddingRight: `calc(var(--grid-margin) + ${pad}px)` }}>
          <div id="site-menu" ref={panelRef} className={cn('grid', dark ? 'theme-dark' : 'theme-light', 'bg-panel')} style={{ gridTemplateRows: '0fr' }} data-lenis-prevent aria-hidden={!menuOpen}>
            <div className="min-h-0 overflow-hidden">
              <div className="grid-layout max-h-[calc(100dvh-8rem)] overflow-y-auto px-4 py-10 md:py-14">
                <nav ref={linksRef} className="grid-span-12 relative flex flex-col items-start lg:grid-span-4 lg:pl-12" aria-label="Site" onMouseLeave={() => setHover(null)}>
                  <Indicator y={markerY} visible={menuOpen && markerY !== null} size={24} className="hidden lg:block" />
                  {LINKS.map((l, i) => {
                    const active = i === activeIndex
                    return (
                      <span key={l.to} className="block overflow-hidden py-0.5">
                        <Link
                          ref={(el) => {
                            linkEls.current[i] = el
                          }}
                          to={l.to}
                          data-menu-link
                          tabIndex={menuOpen ? 0 : -1}
                          onMouseEnter={() => setHover(i)}
                          className={cn('block text-[clamp(2.25rem,1.5rem+3vw,4rem)] leading-[1.05] tracking-[-0.04em] transition-colors duration-300', active ? 'text-accent' : 'hover:text-accent')}
                        >
                          {l.label}
                        </Link>
                      </span>
                    )
                  })}
                </nav>

                <div className="grid-span-12 mt-10 flex flex-col gap-6 lg:grid-span-3 lg:grid-start-5 lg:mt-0">
                  <div className="overflow-hidden"><p data-menu-row className="mono text-fg-muted">Contact</p></div>
                  <div className="overflow-hidden"><a data-menu-row href={`mailto:${site.email}`} className="block hover:text-accent" tabIndex={menuOpen ? 0 : -1}>{site.email}</a></div>
                  {site.offices.map((o) => (
                    <div key={o.id} className="overflow-hidden">
                      <p data-menu-row>
                        {o.city}: <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="hover:text-accent" tabIndex={menuOpen ? 0 : -1}>{o.phone}</a>
                      </p>
                    </div>
                  ))}
                  <div className="overflow-hidden"><p data-menu-row className="mono text-fg-muted">Working across the UAE</p></div>
                  <ul className="mono flex flex-col gap-2">
                    <li className="flex items-center gap-2"><span className="sq sq--pulse" /><Scramble text="Tenders open. Send the BoQ." trigger={menuOpen ? 'view' : 'manual'} /></li>
                    <li className="flex items-center gap-2"><span className="sq sq--pulse" /><Scramble text="Dubai · Abu Dhabi · Sharjah" trigger={menuOpen ? 'view' : 'manual'} delay={0.15} /></li>
                  </ul>
                </div>

                <div data-menu-media className="grid-span-12 mt-10 hidden gap-4 lg:grid-span-4 lg:grid-start-9 lg:mt-0 lg:grid lg:grid-cols-2">
                  <figure>
                    <img src="/media/professional-it.jpg" alt="" className="aspect-[4/5] w-full object-cover grayscale" loading="lazy" />
                    <figcaption className="mono mt-2 text-fg-muted"><Scramble text="About the team" trigger={menuOpen ? 'view' : 'manual'} delay={0.3} /></figcaption>
                  </figure>
                  <figure>
                    <img src="/media/security-operations.jpg" alt="" className="aspect-[4/5] w-full object-cover grayscale" loading="lazy" />
                    <figcaption className="mono mt-2 text-fg-muted"><Scramble text="Featured contract" trigger={menuOpen ? 'view' : 'manual'} delay={0.4} /></figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={cn('fixed inset-0 z-90 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ease-out', menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0')}
      />
    </>
  )
}
