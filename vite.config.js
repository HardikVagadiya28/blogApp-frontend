import { defineConfig } from 'vite'
import react from '@react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173, 
    allowedHosts: [
      'blogapp-frontend-dz8q.onrender.com' 
    ]
  },
  server: {
    allowedHosts: ['blogapp-frontend-dz8q.onrender.com']
  }
})
