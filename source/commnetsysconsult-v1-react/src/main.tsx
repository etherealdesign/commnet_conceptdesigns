import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { SmoothScroll } from './components/SmoothScroll'
import { Intro } from './components/Intro'
import App from './App'
import './styles/index.css'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

// The review copy (npm run build:review) is opened from a static folder or from disk,
// where only the hash can carry the route.
const Router = import.meta.env.VITE_HASH_ROUTER === '1' || location.protocol === 'file:' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <SmoothScroll>
          <Intro>
            <App />
          </Intro>
        </SmoothScroll>
      </Router>
    </HelmetProvider>
  </StrictMode>,
)
