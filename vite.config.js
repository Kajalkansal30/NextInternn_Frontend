import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Combine all into a single vendor file
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1000kb to reduce warnings
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
