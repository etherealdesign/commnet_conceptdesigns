import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Nav } from '@/components/nav/Nav'
import { Footer } from '@/components/footer/Footer'
import { SmoothScroll } from '@/components/shared/SmoothScroll'
import { HeaderProvider } from '@/components/shared/HeaderStore'
import { ContactModal } from '@/components/contact/ContactModal'
import { VersionSwitch } from '@/components/shared/VersionSwitch'
import { Home } from '@/pages/Home'

// The home page ships in the entry bundle; every other route is split out so
// a first visit downloads only what it needs.
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

/** Holds the page height while a route chunk resolves, so the footer does not jump. */
function RouteFallback() {
  return <div className="min-h-[80svh]" aria-busy="true" aria-live="polite" />
}

export default function App() {
  return (
    <HeaderProvider>
      <SmoothScroll>
        <Nav />
        <main id="main">
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
      </SmoothScroll>
    </HeaderProvider>
  )
}
