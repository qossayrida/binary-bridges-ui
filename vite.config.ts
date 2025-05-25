import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/binary-bridges-ui/',
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Required for Render
    port: process.env.PORT || 3000,
    strictPort: true // Exit if port is unavailable
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Organizes static assets
    emptyOutDir: true // Clears dist folder before build
  }
})