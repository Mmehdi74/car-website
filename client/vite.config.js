import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // Bind mounts in the sandbox do not always emit inotify events.
    watch: { usePolling: true, interval: 300 },
    proxy: {
      // Single-origin wiring: the dev server forwards API calls to the api service.
      '/api': {
        target: 'http://api:8000',
        changeOrigin: true,
      },
    },
  },
});
