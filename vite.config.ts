import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  base: '/binary-bridges-ui/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
};

export default defineConfig(config);