import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The preview proxy forwards the sandbox host (`<port>-<sandbox id>.<domain>`) as
 * the Host header and the public preview origin as Origin. Allow both, but only
 * inside the Base44 sandbox so normal local/production runs keep the Vite
 * defaults.
 */
export default defineConfig(() => {
  const allowedHosts: string[] = [];
  if (process.env.BASE44_PREVIEW_MODE === '1') {
    if (process.env.BASE44_SANDBOX_HOST_DOMAIN) {
      allowedHosts.push(`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`);
    }
    if (process.env.BASE44_PUBLIC_HOST_SUFFIX) {
      allowedHosts.push(`.${process.env.BASE44_PUBLIC_HOST_SUFFIX}`);
    }
  }

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      allowedHosts: allowedHosts.length ? allowedHosts : undefined,
      watch: { usePolling: true, interval: 400 },
    },
  };
});
