import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CursorGlow } from './components/CursorGlow'
import { PageTransition } from './components/PageTransition'
import { useLenis, scrollToTarget } from './components/SmoothScroll'
import { ScrollTrigger } from './lib/gsap'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Solutions from './pages/Solutions'
import SolutionDetail from './pages/SolutionDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Compliance from './pages/Compliance'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const lenis = useLenis()

  // In-page anchors (#evidence, #brief) scroll through Lenis instead of jumping.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')!.slice(1)
      const el = id && document.getElementById(id)
      if (!el) return
      e.preventDefault()
      scrollToTarget(lenis, el, -20)
      if (id === 'main') el.focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis])

  const onExitComplete = () => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <CursorGlow />
      <Header />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="solutions/:slug" element={<SolutionDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <PageTransition label="Not found">
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
