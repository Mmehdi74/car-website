import express from 'express';
import pg from 'pg';

const PORT = Number(process.env.PORT || 8000);
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5 });

const SCHEMA = `
CREATE TABLE IF NOT EXISTS inquiries (
  id              serial PRIMARY KEY,
  kind            text        NOT NULL DEFAULT 'contact',
  first_name      text        NOT NULL,
  last_name       text        NOT NULL,
  email           text        NOT NULL,
  phone           text,
  vehicle_slug    text,
  vehicle_name    text,
  pickup_date     date,
  return_date     date,
  pickup_location text,
  message         text,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const str = (value) => (typeof value === 'string' ? value.trim() : '');
const digits = (value) => value.replace(/[^\d]/g, '').length;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function validateInquiry(body = {}) {
  const errors = {};
  const values = {
    kind: str(body.kind) === 'vehicle' ? 'vehicle' : 'contact',
    firstName: str(body.firstName),
    lastName: str(body.lastName),
    email: str(body.email),
    phone: str(body.phone),
    vehicleSlug: str(body.vehicleSlug),
    vehicleName: str(body.vehicleName),
    pickupDate: str(body.pickupDate),
    returnDate: str(body.returnDate),
    pickupLocation: str(body.pickupLocation),
    message: str(body.message),
  };

  if (!values.firstName) errors.firstName = 'Please enter your first name.';
  else if (values.firstName.length > 60) errors.firstName = 'That name is too long.';

  if (!values.lastName) errors.lastName = 'Please enter your last name.';
  else if (values.lastName.length > 60) errors.lastName = 'That name is too long.';

  if (!values.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid email address.';

  if (values.phone && digits(values.phone) < 7) errors.phone = 'Please enter a valid phone number.';
  else if (values.phone.length > 40) errors.phone = 'That phone number is too long.';

  if (values.kind === 'vehicle') {
    if (!values.vehicleSlug) errors.vehicleSlug = 'Please choose a vehicle.';
    if (!values.phone) errors.phone = 'A phone number is required for vehicle requests.';
    if (!values.pickupDate) errors.pickupDate = 'Please choose a pickup date.';
    else if (!DATE_RE.test(values.pickupDate)) errors.pickupDate = 'Please choose a valid date.';
    if (!values.returnDate) errors.returnDate = 'Please choose a return date.';
    else if (!DATE_RE.test(values.returnDate)) errors.returnDate = 'Please choose a valid date.';
    if (!errors.pickupDate && !errors.returnDate && values.returnDate < values.pickupDate) {
      errors.returnDate = 'The return date must be after the pickup date.';
    }
    if (!values.pickupLocation) errors.pickupLocation = 'Please choose a pickup location.';
  } else if (values.message.length < 10) {
    errors.message = 'Please tell us a little more (at least 10 characters).';
  }

  if (values.message.length > 2000) errors.message = 'Please keep your message under 2000 characters.';

  return { errors, values };
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'up' });
  } catch (error) {
    console.error('[api] health check failed:', error.message);
    res.status(503).json({ status: 'degraded', database: 'down' });
  }
});

app.post('/api/inquiries', async (req, res, next) => {
  try {
    const { errors, values } = validateInquiry(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Please check the highlighted fields.', errors });
    }

    const { rows } = await pool.query(
      `INSERT INTO inquiries
         (kind, first_name, last_name, email, phone, vehicle_slug, vehicle_name,
          pickup_date, return_date, pickup_location, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, created_at`,
      [
        values.kind,
        values.firstName,
        values.lastName,
        values.email,
        values.phone || null,
        values.vehicleSlug || null,
        values.vehicleName || null,
        values.pickupDate || null,
        values.returnDate || null,
        values.pickupLocation || null,
        values.message || null,
      ],
    );

    res.status(201).json({ id: rows[0].id, receivedAt: rows[0].created_at });
  } catch (error) {
    next(error);
  }
});

app.use('/api', (_req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  console.error('[api] request failed:', error);
  res.status(500).json({ message: 'Something went wrong on our side. Please try again.' });
});

async function start() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      await pool.query(SCHEMA);
      break;
    } catch (error) {
      if (attempt === 30) throw error;
      console.warn(`[api] database not ready (attempt ${attempt}): ${error.message}`);
      await sleep(1000);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[api] listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((error) => {
  console.error('[api] failed to start:', error);
  process.exit(1);
});
