import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { cn } from '@/lib/utils'

/**
 * Primary navigation. On the home page the links are anchors into the page
 * and light up while their section is in view; elsewhere they route to the
 * hub pages. An entry with only an `anchor` is home-only (Method is a
 * section, not a page); one with only a `to` is inner-only (Solutions has a
 * hub but no home section of its own).
 */
interface NavLink {
  label: string
  anchor?: string
  to?: string
}
const LINKS: NavLink[] = [
  { label: 'Systems', anchor: 'systems', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Method', anchor: 'method' },
  { label: 'Projects', anchor: 'projects', to: '/projects' },
  { label: 'Compliance', anchor: 'compliance', to: '/compliance' },
  { label: 'About', anchor: 'about', to: '/about' },
]

export function Nav() {
  const { theme, activeAnchor, setHeaderCenter, setModalOpen } = useHeaderStore()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const home = pathname === '/'
  const dark = theme === 'dark' && !open
  const links = LINKS.filter((l) => (home ? l.anchor : l.to))

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

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (open) {
      document.body.classList.add('is-locked')
      gsap.set(overlay, { display: 'flex' })
      if (prefersReducedMotion()) {
        gsap.set(overlay, { opacity: 1 })
        return
      }
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'expo.out', delay: 0.1 },
      )
    } else {
      document.body.classList.remove('is-locked')
      if (overlay.style.display === 'flex') {
        gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(overlay, { display: 'none' }) })
      }
    }
    return () => document.body.classList.remove('is-locked')
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-13 focus:text-cream"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-100 w-full p-3 transition-colors duration-500 md:px-6 md:py-5',
          dark ? 'text-cream' : 'text-ink',
        )}
        style={{ width: 'calc(100vw - var(--sbw, 0px))' }}
      >
        <nav className="flex h-11 items-center justify-between" aria-label="Primary">
          <Link to="/" aria-label="Commnet Systems Consultancy, home" className="pointer-events-auto">
            <Logo variant={dark ? 'light' : 'dark'} height={30} />
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-10 md:flex">
              {links.map((l) =>
                home ? (
                  <Button
                    key={l.label}
                    href={`#${l.anchor}`}
                    variant="underlined"
                    active={activeAnchor === l.anchor}
                    className="pointer-events-auto"
                  >
                    {l.label}
                  </Button>
                ) : (
                  <Button
                    key={l.label}
                    to={l.to}
                    variant="underlined"
                    active={pathname.startsWith(l.to!)}
                    className="pointer-events-auto"
                  >
                    {l.label}
                  </Button>
                ),
              )}
            </div>

            <Button
              variant="primary"
              theme={dark ? 'dark' : 'light'}
              className="pointer-events-auto max-md:h-9 max-md:px-4"
              onClick={() => setModalOpen(true)}
            >
              Get in contact
            </Button>

            <button
              type="button"
              className="pointer-events-auto cursor-pointer text-13 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={overlayRef}
        className="fixed inset-0 z-90 hidden flex-col bg-ink text-cream"
        style={{ display: 'none' }}
      >
        <div className="margin-px-1 flex flex-1 flex-col justify-end pb-24 pt-32">
          {links.map((l, i) => (
            <Link
              key={l.label}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              to={home ? `/#${l.anchor}` : l.to!}
              onClick={() => setOpen(false)}
              className="border-t border-cream/12 py-4 text-36"
            >
              {l.label}
            </Link>
          ))}
          <p
            ref={(el) => {
              itemRefs.current[links.length] = el
            }}
            className="mt-10 text-13 text-cream/60"
          >
            Dubai HQ · Chennai Engineering Centre
          </p>
        </div>
      </div>
    </>
  )
}
