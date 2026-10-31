import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const PORT = Number(process.env.PORT || 4000);
const DB_FILE = process.env.DATABASE_FILE || path.join(process.cwd(), 'data', 'inquiries.db');

fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    vehicle TEXT,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    pickup_date TEXT,
    return_date TEXT,
    pickup_location TEXT,
    message TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

const insertInquiry = db.prepare(`
  INSERT INTO inquiries
    (type, vehicle, first_name, last_name, email, phone, pickup_date, return_date, pickup_location, message)
  VALUES
    (@type, @vehicle, @firstName, @lastName, @email, @phone, @pickupDate, @returnDate, @pickupLocation, @message)
`);

const app = express();
app.use(express.json({ limit: '32kb' }));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Trims a value to a string, never undefined. */
function str(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/** Server-side mirror of the client validation: the API never trusts the browser. */
function validate(body) {
  const errors = {};
  const type = body?.type === 'vehicle' ? 'vehicle' : 'contact';
  const email = str(body?.email);
  const phone = str(body?.phone);

  if (!str(body?.firstName)) errors.firstName = 'First name is required.';
  if (!str(body?.lastName)) errors.lastName = 'Last name is required.';
  if (!email) errors.email = 'Email address is required.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';
  if (phone && phone.replace(/[^\d]/g, '').length < 6) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (type === 'vehicle') {
    if (!str(body?.vehicle)) errors.vehicle = 'Vehicle is required.';
    const pickup = str(body?.pickupDate);
    const ret = str(body?.returnDate);
    if (!pickup) errors.pickupDate = 'Pickup date is required.';
    else if (!DATE_RE.test(pickup)) errors.pickupDate = 'Enter a valid pickup date.';
    if (!ret) errors.returnDate = 'Return date is required.';
    else if (!DATE_RE.test(ret)) errors.returnDate = 'Enter a valid return date.';
    if (pickup && ret && DATE_RE.test(pickup) && DATE_RE.test(ret) && ret < pickup) {
      errors.returnDate = 'Return date must be after the pickup date.';
    }
    if (!str(body?.pickupLocation)) errors.pickupLocation = 'Pickup location is required.';
  } else if (!str(body?.message)) {
    errors.message = 'Please tell us how we can help.';
  }

  return { errors, type };
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/inquiries', (req, res) => {
  const { errors, type } = validate(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const saved = insertInquiry.run({
    type,
    vehicle: str(req.body.vehicle) || null,
    firstName: str(req.body.firstName),
    lastName: str(req.body.lastName),
    email: str(req.body.email),
    phone: str(req.body.phone) || null,
    pickupDate: str(req.body.pickupDate) || null,
    returnDate: str(req.body.returnDate) || null,
    pickupLocation: str(req.body.pickupLocation) || null,
    message: str(req.body.message) || null,
  });

  res.status(201).json({ ok: true, id: saved.lastInsertRowid });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AUTOCAR API listening on ${PORT}`);
});
