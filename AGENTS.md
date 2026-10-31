# AGENTS.md

## What this repo is

A two-process app, run by `docker-compose.base44.yml`:

| Service | What it is | Port |
| --- | --- | --- |
| `web` | Vite + React SPA, dev server with HMR | host `3000` (the preview entry point) |
| `api` | Express (ESM) JSON API | `8000`, internal only — reached through the Vite `/api` proxy |
| `db` | Postgres 16 | internals only |

Single-origin wiring on purpose: the browser only ever talks to port 3000, and
`client/vite.config.js` proxies `/api` to `http://api:8000`. There is no CORS
configuration because there is no cross-origin request.

## Non-obvious things worth knowing

- **The API creates its own schema on boot** (`server/src/index.js` runs
  `CREATE TABLE IF NOT EXISTS inquiries` with retries against a cold database).
  There is no migration service and no seed step.
- **Inquiries are the only persisted entity.** Inspect them with:
  `docker compose -f docker-compose.base44.yml exec -T db psql -U carwebsite -d carwebsite -c "select id, kind, vehicle_slug, email, created_at from inquiries order by created_at desc limit 20;"`
- **All copy and prices are data, not markup.** Fleet, contact details and
  photography live in `client/src/data/{vehicles,site,images}.js`. Adding a
  vehicle = appending an object; `category` must match an id in `categoryFilters`.
- **Photography is remote** (Unsplash CDN in `images.js`). The page needs network
  access to render images; replacing a URL there is the only change needed to
  swap a photo. Keep `alt` text in the components meaningful.
- **Host allowlist for the preview proxy**: Compose passes
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (set by the platform) into the web
  service; Vite ≥ 6.1 appends it to `server.allowedHosts`. Nothing else gates
  hosts. `BASE44_PREVIEW_MODE` is also passed through but no application code is
  currently gated on it — shared behaviour is identical with or without it.
- **File watching**: `server.watch.usePolling` is enabled in the Vite config
  because bind mounts in this sandbox do not reliably emit inotify events.
  Node's `--watch` handles API restarts.

## How to run and verify

```bash
docker compose -f docker-compose.base44.yml up -d --build
curl -s http://localhost:3000/api/health          # {"status":"ok","database":"up"}
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/
```

Do not install node/npm on the sandbox host — every command runs inside a
container. There is no unit-test suite; the production build inside the web
container is the closest static check:

```bash
docker compose -f docker-compose.base44.yml exec -T web npm run build
```

End-to-end checks worth repeating after a change: category filters change the
card count, a vehicle card opens `/vehicle/:slug`, empty submits show field
errors, a valid submit returns `201` from `POST /api/inquiries`, and the mobile
menu closes after tapping a link.
