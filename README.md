# VELARIS — Luxury Car Rental

A cinematic, dark luxury car rental site: hero, filterable fleet, vehicle detail
pages with an inquiry form, brand story, contact section and legal pages.

## Stack

- **Client** — React 18 + Vite (React Router), hand-written CSS design system
  (no UI library), Manrope + Inter bundled via `@fontsource`.
- **API** — Express + `pg`, validation on both client and server.
- **Database** — Postgres, one `inquiries` table created automatically at boot.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Site: http://localhost:3000
- API health (through the proxy): http://localhost:3000/api/health

The web service is a Vite dev server, so edits hot-reload. `npm install` runs on
container start, so it is safe to change dependencies and restart the service.

## Editing content

| What | Where |
| --- | --- |
| Vehicles, prices, specs, features | `client/src/data/vehicles.js` |
| Brand name, phone, email, location, nav, socials | `client/src/data/site.js` |
| Every photograph (one URL per slot) | `client/src/data/images.js` |
| Hero film, its poster and static fallback | `client/public/media/` |

Contact details currently ship as neutral placeholders (`+1 (305) 555 0138`,
`concierge@velaris.example`) — replace them in `site.js`.

## Structure

```
client/src
  components/   Header, Hero, Specials, VehicleCard, Promo, About, Contact,
                ContactForm, VehicleInquiryForm, Field, Reveal, icons, Logo
  pages/        Home, VehicleDetail, Legal, NotFound
  data/         site.js, vehicles.js, images.js
  lib/          api.js, validation.js, scroll.js
server/src/     index.js  (GET /api/health, POST /api/inquiries)
```

## Cinematic hero

The hero is a scroll-scrubbed film, not a playing video. A 350vh runway holds a
sticky 100svh stage; scroll position maps linearly onto the 3.75 s Mercedes-Benz
reveal and the video is never played, looped or autoplayed — only seeked frame by
frame, forwards and backwards.

| File | What it is |
| --- | --- |
| `client/public/media/benz.mp4` | The uploaded master, untouched. |
| `client/public/media/benz-scrub.mp4` | All-intra re-encode used by the page: identical frames and order, but every frame is a keyframe so a seek decodes a single frame. |
| `client/public/media/benz-poster.webp` | Frame 0 — shown while the film loads and as the video `poster`. |
| `client/public/media/benz-final.webp` | Frame 89 (final three-quarter view) — the static hero for `prefers-reduced-motion` and the failover image. |

`client/src/hooks/useScrollScrubber.js` is the controller (passive scroll →
one animation frame → `video.currentTime`), `ScrollDrivenHero.jsx` the
presentation. Replacing the film means re-encoding it the same way and
regenerating both stills:

```bash
docker run --rm -v "$PWD/client/public/media":/m jrottenberg/ffmpeg:4.1-alpine \
  -y -i /m/benz.mp4 -an -c:v libx264 -pix_fmt yuv420p \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -g 1 -keyint_min 1 -sc_threshold 0 -crf 20 -movflags +faststart /m/benz-scrub.mp4
```

If the replaced film is not 24 fps, update `FPS` in `useScrollScrubber.js`.

## API

`POST /api/inquiries` accepts `kind: "contact" | "vehicle"` plus `firstName`,
`lastName`, `email`, `phone`, `message` and — for vehicle requests —
`vehicleSlug`, `vehicleName`, `pickupDate`, `returnDate`, `pickupLocation`.
It answers `201 { id, receivedAt }` or `400 { message, errors }` with per-field
messages. Inquiries are stored in Postgres; they are **not** bookings, and the UI
says so explicitly.
