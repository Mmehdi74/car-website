# AUTOCAR — luxury car rental website

Vite + React single-page site (`web/`) plus a small Express + SQLite API (`api/`)
that persists rental and contact inquiries.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Web (public entry point): http://localhost:3000
- API: http://localhost:4000/api/health (the browser never needs this origin —
  `/api/*` on port 3000 is proxied to it by Vite, keeping everything same-origin)

Both app services run from the bind-mounted source with live reload (`vite` and
`node --watch`), so edits appear without a rebuild. Dependencies live in named
volumes and are installed on container start.

## Notes that are not obvious from the manifests

- Inquiries are stored in SQLite at `/data/inquiries.db` inside the `api_data`
  volume. The table is created when the API starts; there are no migration files.
- `better-sqlite3` is a native module, so both app images use the glibc-based
  `node:22-bookworm-slim` (not Alpine).
- Fleet content, prices, specs and image URLs live in `web/src/data/vehicles.js`;
  brand/contact placeholders live in `web/src/data/site.js`. Both are real
  source: `.gitignore` ignores `/api/data/` only, because a bare `data/` rule
  also swallowed `web/src/data/` and left the app unable to build from a clean
  clone.
- Vehicle photos are remote Unsplash URLs except the Mercedes G-Class, which is
  bundled at `web/public/images/mercedes-g-class.jpg` (the upstream photo was
  deleted). The app runs React 18, which does not map the camelCase
  `fetchPriority` prop — use the lowercase `fetchpriority` attribute on `<img>`.
- `BASE44_PREVIEW_MODE=1` is only set inside the sandbox preview. When it is
  `"1"`, `web/vite.config.js` adds the preview proxy host to
  `server.allowedHosts` — the proxy reaches Vite as
  `3000-<BASE44_PUBLIC_HOST_SUFFIX>` (a dash, so it needs an exact entry rather
  than a `*.domain` wildcard) and as `.${BASE44_SANDBOX_HOST_DOMAIN}`. When the
  flag is unset or any other value, none of those hosts are added and Vite's
  normal host checking applies.
- The mobile menu is absolutely positioned below the header on purpose: the
  sticky header uses `backdrop-filter`, which makes it the containing block for
  fixed-position descendants.

## Verify

```bash
curl -s localhost:3000/ | head -5                    # served HTML
curl -s localhost:3000/api/health                    # {"status":"ok"}
curl -s -X POST localhost:3000/api/inquiries \
  -H 'Content-Type: application/json' \
  -d '{"type":"contact","firstName":"A","lastName":"B","email":"a@b.co","message":"hi"}'
```

A successful inquiry returns `201 {"ok":true,"id":...}`; invalid input returns
`400` with a field->message `errors` map.
