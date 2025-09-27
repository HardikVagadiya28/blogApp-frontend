import { defineConfig } from 'vite'
import react from '@react'

export default defineConfig({
  plugins: [react()],
  // Configuration for the preview server (used on Render)
  preview: {
    host: '0.0.0.0', // Essential for Render to connect:cite[1]:cite[3]
    port: process.env.PORT || 4173, // Use Render's assigned port:cite[3]
    allowedHosts: [
      'blogapp-frontend-dz8q.onrender.com' // Your Render domain
      // Optional: Add a pattern to allow all subdomains on render.com
      // '.render.com'
    ]
  },
  // Optional: Similar configuration for the dev server
  server: {
    allowedHosts: ['blogapp-frontend-dz8q.onrender.com']
  }
})
