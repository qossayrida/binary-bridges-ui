import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: parseInt(process.env.PORT || '4173'),
    host: '0.0.0.0',
    allowedHosts: ['binary-bridges-ui.onrender.com', 'localhost']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
} as UserConfig)
