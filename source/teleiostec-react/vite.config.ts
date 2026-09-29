import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// VITE_SINGLE=1 builds the review copy (scripts/build-review.mjs): one bundle,
// no code splitting, so the page can be inlined and opened straight from disk.
const single = process.env.VITE_SINGLE === '1'

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src') },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome111',
    cssCodeSplit: !single,
    rollupOptions: {
      output: single ? { inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: 'app.[ext]' } : {
        // Animation libraries live in their own long-cached chunks.
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/motion')) return 'motion'
          if (id.includes('node_modules/react-router')) return 'router'
          return undefined
        },
      },
    },
  },
})
