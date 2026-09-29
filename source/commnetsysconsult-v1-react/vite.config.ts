import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const single = process.env.VITE_SINGLE === '1'

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // The review copy is one inlined bundle, so it can open from disk.
        ...(single ? { inlineDynamicImports: true } : {}),
        manualChunks: single ? undefined : (id) => {
          if (!id.includes('node_modules')) return
          if (/[\\/]three[\\/]/.test(id)) return 'three'
          if (/gsap|lenis/.test(id)) return 'gsap'
          if (/motion|framer/.test(id)) return 'motion'
          if (/lucide/.test(id)) return 'icons'
          return 'vendor'
        },
      },
    },
  },
})
