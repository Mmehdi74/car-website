# Lagunitas IPA — sandbox notes

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Two services, both mounting the cloned source and running a watcher:

- `web` — Vite dev server on host port 3000 (`client/`)
- `api` — Express on 4000, `node --watch` (`server/`), newsletter list stored in the
  `api-data` volume at `/data/subscribers.json`

The client talks to the API through Vite's proxy (`API_URL=http://api:4000`), so the
browser only ever uses one origin. Do not publish port 4000.

## Notes

- The site is a single page with hash-style sections; `src/content/site.ts` is the only
  place copy, specs, products and image paths should be edited.
- `src/styles/hero.css` owns the hero only and is imported after `sections.css`, so it
  wins on cascade. Everything else lives in `tokens.css` → `base.css` → `layout.css` →
  `sections.css`.
- The age gate writes `lagunitas.age-verified` to `localStorage`; to see the page again
  in a fresh browser, answer the gate once (it remembers for 30 days).
- Typecheck: `docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit`
- Production build is not wired into compose (dev server only); `npm run build` exists in
  `client/package.json`.
