# AUTOCAR — Luxury Car Rental

A premium, cinematic single-page website for a luxury car rental house: dark
editorial design, interactive fleet filtering, vehicle detail views with booking
inquiries, and a contact form backed by a small API.

## Stack

- `web/` — Vite + React (dev server on port 3000, live reload)
- `api/` — Express + SQLite (inquiries persisted to a Docker volume)

## Run locally

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Open http://localhost:3000.

## Editing content

| What | Where |
| --- | --- |
| Vehicles, prices, specs, categories, images | `web/src/data/vehicles.js` |
| Brand name, phone, email, location, social links | `web/src/data/site.js` |
| Colours, typography, spacing tokens | `web/src/styles/global.css` (`:root`) |

Contact details ship as `[Business Location]` / `[Business Phone]` /
`[Business Email]` placeholders — replace them in `web/src/data/site.js`.

## Enquiries

Both the vehicle inquiry form and the contact form `POST /api/inquiries`; rows are
stored in the `inquiries` table of the SQLite database (`/data/inquiries.db`).
Submitting a form records an **inquiry**, never a confirmed reservation.
