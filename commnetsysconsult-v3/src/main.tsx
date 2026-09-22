import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

// The review copy is served from a sub-folder with no SPA rewrite, and from
// disk there is no server at all, so it routes on the hash. The hosted site
// keeps real paths.
const Router =
  import.meta.env.VITE_HASH_ROUTER === '1' || window.location.protocol === 'file:' ? HashRouter : BrowserRouter
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
