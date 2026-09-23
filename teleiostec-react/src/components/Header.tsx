import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { nav } from '@/data/site'
import { useLenis } from '@/lib/smooth'
import { cn } from '@/lib/cn'

/**
 * mix-blend-difference turns the white header near-black over ivory pages
 * with no per-section bookkeeping. Over the home hero film it is switched
 * off: difference against mid-tone footage lands on mid-grey, while plain
 * white sits cleanly on the hero's darkened top band.
 */
export function Header({ menuOpen, onMenu }: { menuOpen: boolean; onMenu: () => void }) {
  const lenis = useLenis()
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const [overHero, setOverHero] = useState(pathname === '/')

  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = lenis ? lenis.scroll : window.scrollY
      setHidden(y > 160 && y > last)
      setOverHero(pathname === '/' && y < window.innerHeight - 80)
      last = y
    }
    onScroll()
    if (lenis) { lenis.on('scroll', onScroll); return () => lenis.off('scroll', onScroll) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lenis, pathname])

  return (
    <motion.header
      className={cn('pointer-events-none fixed inset-x-0 top-0 z-[80] text-white', !(overHero && !menuOpen) && 'mix-blend-difference')}
      animate={{ y: hidden && !menuOpen ? '-110%' : '0%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="wrap pointer-events-auto flex h-[var(--header-h)] items-center gap-8">
        <Link to="/" className="font-display text-[clamp(18px,1.4vw,22px)] tracking-[0.04em]" aria-label="Teleiostec — home">
          Teleiostec
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden gap-[clamp(20px,2.4vw,40px)] lg:flex">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} data-cursor-hover className={({ isActive }) => cn('link-line text-[12px] uppercase tracking-[0.16em]', isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100')}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={onMenu}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          className="ml-auto flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] lg:ml-10"
          data-cursor-hover
        >
          <span className="relative inline-block h-[1.2em] overflow-hidden">
            <span className={cn('block transition-transform duration-700 ease-out-expo', menuOpen && '-translate-y-full')}>Menu</span>
            <span className={cn('absolute left-0 top-full block transition-transform duration-700 ease-out-expo', menuOpen && '-translate-y-full')}>Close</span>
          </span>
          <span className="relative block h-[10px] w-7">
            <span className={cn('absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo', menuOpen && 'translate-y-[5px] rotate-45')} />
            <span className={cn('absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo', menuOpen && '-translate-y-[4px] -rotate-45')} />
          </span>
        </button>
      </div>
    </motion.header>
  )
}
