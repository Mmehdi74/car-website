# SQUADRO — agent notes

## Stack

Single-page marketing site: Vite 6 + React 18 + TypeScript + Tailwind CSS 3.
No backend, no database, no secrets. Content lives in `src/data/content.ts`.

## Run it (sandbox)

```bash
docker compose -f docker-compose.base44.yml up -d --build
docker compose -f docker-compose.base44.yml logs -f web
```

- The `web` service runs `vite` from the bind-mounted source on container port
  5173, published as host port **3000** (the preview entry point).
- Dependencies are installed by the container command on every start, so a
  changed `package.json` needs only a service restart:
  `docker compose -f docker-compose.base44.yml restart web`.
- `BASE44_PREVIEW_MODE=1` lets `vite.config.ts` append the sandbox and public
  preview hosts to `server.allowedHosts`. With the flag unset the Vite defaults
  apply — nothing about the site itself is sandbox-specific.
- File watching uses polling (`watch.usePolling`) because the source is a bind
  mount; HMR can take a couple of seconds after an edit.

## Checks

Run inside the container (the host has no Node runtime):

```bash
docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit
docker compose -f docker-compose.base44.yml exec -T web npm run build
```

There is no test suite. Visual checks are done through the preview tools at
desktop (1440) and mobile (375) widths.

## Notes

- Photography is hot-linked from the Unsplash CDN (`images.unsplash.com`) in
  `src/data/content.ts`. Each entry is a real photo id; replacing one is a
  one-line change. The helmet is drawn as SVG (`HelmetMark.tsx`) so the wordmark
  and gear card stay sharp and never depend on a remote asset.
- The wordmark is `SQUADR` plus the helmet in the `O` slot — the layout is
  intentional, not a missing glyph.
- Anchor scrolling relies on `scroll-padding-top: 88px` in `src/index.css`
  (header height + margin). Do not add per-section `scroll-mt-*` on top of it;
  the offsets compound.
- Reduced-motion preferences disable the reveal transitions and smooth scroll.
