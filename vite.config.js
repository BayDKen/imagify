import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bgEraser: resolve(__dirname, 'bg-eraser.html'),
        stockPhotos: resolve(__dirname, 'stock-photos.html'),
        upscaler: resolve(__dirname, 'upscaler.html'),
      },
    },
  },
});
