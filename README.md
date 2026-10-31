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

## API

`POST /api/inquiries` accepts `kind: "contact" | "vehicle"` plus `firstName`,
`lastName`, `email`, `phone`, `message` and — for vehicle requests —
`vehicleSlug`, `vehicleName`, `pickupDate`, `returnDate`, `pickupLocation`.
It answers `201 { id, receivedAt }` or `400 { message, errors }` with per-field
messages. Inquiries are stored in Postgres; they are **not** bookings, and the UI
says so explicitly.
