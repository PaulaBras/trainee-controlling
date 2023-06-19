import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname),
  build: {
    lib: {
      entry: resolve(__dirname, 'index.html'),
      formats: ['es'],
    },
    minify: true,
    outDir: resolve(__dirname, '..', '..', 'dist', 'frontend'),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        // secure: false,
        // ws: true,
      },
    },
  },
});
