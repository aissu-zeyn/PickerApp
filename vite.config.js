import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: '/picker-app/',
  server: {
    host: true, // This allows connections from your local network
    port: 3000,
    strictPort: true, // Don't try other ports if 3000 is taken
    open: true // Open the browser automatically
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets'
  },
  assetsInclude: ['**/*.glb']
=======
  base: '/picker-app/'
>>>>>>> d2668f09f45e95ad1823e954f15c4ca55b5fd4cd
})
