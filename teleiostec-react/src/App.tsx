import { AnimatePresence } from 'motion/react'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SmoothScroll, scrollToTop, useLenis } from '@/lib/smooth'
import { ScrollTrigger } from '@/lib/gsap'
import { Header } from '@/components/Header'
import { Menu } from '@/components/Menu'
import { Footer } from '@/components/Footer'
import { Cursor } from '@/components/Cursor'
import { Preloader } from '@/components/Preloader'
import Home from '@/pages/Home'

// Home ships in the entry bundle; every other page is its own chunk.
const Projects = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Studio = lazy(() => import('@/pages/Studio'))
const Services = lazy(() => import('@/pages/Services'))
const Process = lazy(() => import('@/pages/Process'))
const Team = lazy(() => import('@/pages/Team'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function Shell() {
  const location = useLocation()
  const lenis = useLenis()
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    if (!lenis) return
    if (menu) lenis.stop()
    else lenis.start()
  }, [menu, lenis])

  useEffect(() => setMenu(false), [location.pathname])

  const onExit = useCallback(() => {
    scrollToTop(lenis)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [lenis])

  return (
    <>
      <a href="#main" className="sr-only bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[300]">Skip to content</a>
      <Preloader />
      <Cursor />
      <Header menuOpen={menu} onMenu={() => setMenu((m) => !m)} />
      <Menu open={menu} onClose={() => setMenu(false)} />
      <main id="main">
        <AnimatePresence mode="wait" onExitComplete={onExit}>
          <Suspense key={location.pathname} fallback={<div className="min-h-svh bg-dark" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/process" element={<Process />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export function App() {
  return (
    <SmoothScroll>
      <Shell />
    </SmoothScroll>
  )
}
