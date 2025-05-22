import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/binary-bridges-ui/', // <-- CORRECT: with slashes
  plugins: [react()],
})
