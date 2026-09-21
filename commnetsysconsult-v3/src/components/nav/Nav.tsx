import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gsap, prefersReducedMotion } from '@/animations/gsap'
import { Container } from '@/components/shared/Container'
import { MagneticButton } from '@/components/shared/MagneticButton'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (open) {
      gsap.set(overlay, { display: 'flex' })
      if (prefersReducedMotion()) {
        gsap.set(overlay, { opacity: 1 })
        return
      }
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(
        linkRefs.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out', delay: 0.1 },
      )
    } else if (overlay.style.display === 'flex') {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
    }
  }, [open])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <Container className="flex items-center justify-between py-5">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight text-[--color-navy]">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path
                d="M8 30 L8 16 A4 4 0 0 1 12 12 L20 12 A4 4 0 0 1 24 16 L24 22 A4 4 0 0 0 28 26 L32 26"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            COMMNET
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm font-medium text-[--color-text] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[--color-primary] after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton href="#contact">Send your BoQ</MagneticButton>
          </div>

          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[--color-secondary]/30"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </Container>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center gap-8 bg-[--color-navy] text-white"
        style={{ display: 'none' }}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            ref={(el) => {
              linkRefs.current[i] = el
            }}
            href={l.href}
            onClick={() => setOpen(false)}
            className="text-3xl font-semibold tracking-tight"
          >
            {l.label}
          </a>
        ))}
        <a
          ref={(el) => {
            linkRefs.current[LINKS.length] = el
          }}
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-4 text-sm font-medium px-6 py-3 rounded-full bg-[--color-primary]"
        >
          Send your BoQ
        </a>
      </div>
    </>
  )
}
