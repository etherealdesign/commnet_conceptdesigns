import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { NAV } from '../data/company'
import { IMG } from '../lib/images'
import { useLenis } from './SmoothScroll'
import { gsap, prefersReducedMotion, finePointer } from '../lib/gsap'

/** v1 header: pill nav that hides on scroll down, turns solid past 40px and
 *  switches to the white logo over any section marked data-theme="dark". */
export function Header() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const nav = useRef<HTMLElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const cta = useRef<HTMLAnchorElement>(null)
  const openRef = useRef(open)
  openRef.current = open

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      header.current?.classList.toggle('hide', y > lastY && y > 200 && !openRef.current)
      nav.current?.classList.toggle('solid', y > 40)
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      lastY = y
      const overDark = [...document.querySelectorAll<HTMLElement>('[data-theme="dark"]')].some((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= 60 && r.bottom >= 60
      })
      document.body.classList.toggle('over-dark', overDark)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    // Re-check once the incoming page has mounted.
    const t = window.setTimeout(update, 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(t)
      cancelAnimationFrame(frame)
    }
  }, [pathname])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (open) lenis?.stop()
    else lenis?.start()
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  useEffect(() => {
    const b = cta.current
    if (!b || prefersReducedMotion() || !finePointer()) return
    const move = (e: MouseEvent) => {
      const r = b.getBoundingClientRect()
      gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5, ease: 'power3.out' })
    }
    const leave = () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,.4)' })
    b.addEventListener('mousemove', move)
    b.addEventListener('mouseleave', leave)
    return () => {
      b.removeEventListener('mousemove', move)
      b.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <>
      <div id="progress" ref={progress} />
      <header className="site-header" ref={header}>
        <div className="wrap">
          <nav className="nav" aria-label="Main" ref={nav}>
            <Link className="logo" to="/" aria-label="Commnet Systems Consultancy — home">
              <img className="ld" src={IMG.logoDark} alt="" width={71} height={30} />
              <img className="lw" src={IMG.logoLight} alt="" width={71} height={30} />
            </Link>
            <ul>
              {NAV.filter((n) => n.to !== '/contact').map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to}>{n.label}</NavLink>
                </li>
              ))}
            </ul>
            <Link className="btn btn-primary" to="/contact" ref={cta}>
              Start Your Project
            </Link>
            <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <NavLink to="/" end>
              Home
            </NavLink>
            {NAV.map((n, i) => (
              <motion.div key={n.to} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <NavLink to={n.to}>{n.label}</NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
