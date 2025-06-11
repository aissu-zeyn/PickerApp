import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/picker-app/',
  server: {
    host: true, // This allows connections from your local network
    port: 5173
  }
})
