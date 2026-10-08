/**
 * Prerender entry (scripts/prerender.mjs). Renders one route to HTML in Node,
 * so crawlers and link previews get each page's own content and head without
 * running JavaScript. The browser still starts from src/main.tsx and renders
 * over this markup.
 */
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'
import { HeadCollector, type Head } from './components/Seo'
import { projects } from './data/projects'

export const routes = ['/', '/projects', ...projects.map((p) => `/projects/${p.slug}`), '/studio', '/services', '/process', '/contact']

const once = async (url: string) => {
  let head: Head | null = null
  const { prelude } = await prerender(
    <HeadCollector.Provider value={(h) => { head = h }}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadCollector.Provider>,
  )
  return { html: await new Response(prelude).text(), head: head as Head | null }
}

export async function render(url: string) {
  // With no Suspense boundary around the routes (see App.tsx), the route's lazy page
  // suspends the whole render, and prerender waits for it — so the page lands inline.
  return once(url)
}
