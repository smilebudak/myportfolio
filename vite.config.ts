import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large libraries into separate chunks for better caching
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap'],
          'vendor-lenis': ['lenis'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
    minify: 'esbuild',
    target: 'es2015',
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
