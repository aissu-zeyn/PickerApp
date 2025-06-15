import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/picker-app/',
  server: {
    host: true, // This allows connections from your local network
    port: 5174,
    strictPort: true, // Don't try other ports if 5174 is taken
    open: true // Open the browser automatically
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
