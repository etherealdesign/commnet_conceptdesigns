import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const single = process.env.VITE_SINGLE === '1'

export default defineConfig({
  // '/' for the hosted site. The local review build sets VITE_BASE='./' so the
  // folder opens straight off disk without a server.
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
    },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
    // The review copy is one file: a browser opening a folder from disk will
    // not fetch a module, so everything has to be in the document.
    cssCodeSplit: !single,
    rollupOptions: {
      output: single
        ? { inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: 'app.[ext]' }
        : {
        // Keep the animation libraries in their own long-lived chunks so a
        // content change never invalidates them in the browser cache.
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/motion')) return 'motion'
          if (id.includes('node_modules/react-router')) return 'router'
          if (id.includes('node_modules/lucide-react')) return 'icons'
          return undefined
        },
      },
  },
  },
})
