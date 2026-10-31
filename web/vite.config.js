import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The API is reached through this dev server's proxy, so the browser only ever
// talks to a single origin (host port 3000) and no CORS/session setup is needed.
const apiTarget = process.env.VITE_API_TARGET || 'http://localhost:4000';

// Inside the sandbox preview the page is served through a proxy whose host is
// environment-specific, so allow that proxy's host when (and only when) the
// preview flag is on. Unset/other values keep Vite's normal host checking.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1';
const allowedHosts = [];
if (previewMode) {
  const { BASE44_SANDBOX_HOST_DOMAIN, BASE44_PUBLIC_HOST_SUFFIX } = process.env;
  if (BASE44_SANDBOX_HOST_DOMAIN) allowedHosts.push(`.${BASE44_SANDBOX_HOST_DOMAIN}`);
  if (BASE44_PUBLIC_HOST_SUFFIX) {
    // The preview proxy reaches the dev server as "<port>-<suffix>" — a dash,
    // not a subdomain dot, so it needs an exact entry rather than a wildcard.
    allowedHosts.push(`3000-${BASE44_PUBLIC_HOST_SUFFIX}`);
    const baseDomain = BASE44_PUBLIC_HOST_SUFFIX.split('.').slice(1).join('.');
    if (baseDomain) allowedHosts.push(`.${baseDomain}`);
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: allowedHosts.length > 0 ? allowedHosts : undefined,
    // Bind-mounted volumes often miss native FS events; poll instead.
    watch: { usePolling: true, interval: 300 },
    proxy: {
      '/api': { target: apiTarget, changeOrigin: true },
    },
  },
});
