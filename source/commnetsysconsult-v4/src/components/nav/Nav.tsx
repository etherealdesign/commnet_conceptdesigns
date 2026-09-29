import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/shared/Button'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { cn } from '@/lib/utils'

/**
 * Primary navigation: a solid bar with a hairline. Logo left, the five
 * sections centred-right, the contact button on the far right. It goes
 * navy over a dark block and white elsewhere. Six routes, nothing else.
 */
const LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export function Nav() {
  const { theme, setHeaderCenter, setModalOpen } = useHeaderStore()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-120 focus:rounded-md focus:bg-ink focus:px-5 focus:py-2.5 focus:text-14 focus:text-white"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-100 border-b backdrop-blur-md transition-[background-color,border-color,color] duration-500',
          dark ? 'border-white/12 bg-ink/85 text-white' : 'border-ink/10 bg-white/90 text-ink',
        )}
        style={{ width: 'calc(100vw - var(--sbw, 0px))' }}
      >
        <nav className="margin-px-1 flex h-18 items-center justify-between gap-6" aria-label="Primary">
          <Link to="/" aria-label="Commnet Systems Consultancy, home" className="flex items-center">
            <Logo variant={dark ? 'light' : 'dark'} height={28} />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Button key={l.to} to={l.to} variant="underlined" active={pathname.startsWith(l.to)}>
                {l.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" theme={dark ? 'dark' : 'light'} onClick={() => setModalOpen(true)} glyph="→" className="max-sm:hidden">
              Get in contact
            </Button>
            <button
              type="button"
              className="cursor-pointer text-14 font-medium md:hidden"
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
        className="fixed inset-0 z-90 hidden flex-col bg-ink text-white"
        style={{ display: 'none' }}
      >
        <div className="margin-px-1 flex flex-1 flex-col justify-end pb-16 pt-32">
          {LINKS.map((l, i) => (
            <Link
              key={l.to}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              to={l.to}
              onClick={() => setOpen(false)}
              className="d-2 border-t border-white/12 py-4"
            >
              {l.label}
            </Link>
          ))}
          <div
            ref={(el) => {
              itemRefs.current[LINKS.length] = el
            }}
            className="mt-8"
          >
            <Button variant="primary" theme="dark" onClick={() => { setOpen(false); setModalOpen(true) }} glyph="→">
              Get in contact
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
