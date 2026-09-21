import { Suspense, lazy, useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Nav } from '@/components/nav/Nav'
import { Footer } from '@/components/footer/Footer'
import { Loader } from '@/components/loader/Loader'
import { SmoothScroll } from '@/components/shared/SmoothScroll'
import { HeaderProvider } from '@/components/shared/HeaderStore'
import { PageEnterProvider, usePageEnterContext } from '@/components/shared/PageEnter'
import { PageTransitionProvider } from '@/components/shared/PageTransition'
import { AccentSwitch } from '@/components/shared/AccentSwitch'
import { ContactModal } from '@/components/contact/ContactModal'
import { VersionSwitch } from '@/components/shared/VersionSwitch'
import { Home } from '@/pages/Home'

const ServicesHub = lazy(() => import('@/pages/ServicesHub').then((m) => ({ default: m.ServicesHub })))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail').then((m) => ({ default: m.ServiceDetail })))
const SolutionsHub = lazy(() => import('@/pages/SolutionsHub').then((m) => ({ default: m.SolutionsHub })))
const SolutionDetail = lazy(() => import('@/pages/SolutionDetail').then((m) => ({ default: m.SolutionDetail })))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const CompliancePage = lazy(() => import('@/pages/CompliancePage').then((m) => ({ default: m.CompliancePage })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

function RouteFallback() {
  return <div className="theme-light min-h-[80svh]" aria-busy="true" aria-live="polite" />
}

/** The loader tells the sequencer to start the page entrance at 90 % of its wipe. */
function Shell() {
  const [loaded, setLoaded] = useState(false)
  const { run } = usePageEnterContext()
  const onReveal = useCallback(() => run(), [run])
  const onDone = useCallback(() => setLoaded(true), [])
  return (
    <>
      {!loaded && <Loader onReveal={onReveal} onDone={onDone} />}
      <Nav />
      <main id="main" className="theme-light">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesHub />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/solutions" element={<SolutionsHub />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ContactModal />
      <VersionSwitch />
    </>
  )
}

export default function App() {
  return (
    <HeaderProvider>
      <SmoothScroll>
        <PageEnterProvider>
          <PageTransitionProvider>
            <AccentSwitch />
            <Shell />
          </PageTransitionProvider>
        </PageEnterProvider>
      </SmoothScroll>
    </HeaderProvider>
  )
}
