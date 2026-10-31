const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const digitCount = (value) => value.replace(/[^\d]/g, '').length;

const isBlank = (value) => !value || !value.trim();

export function validateContact(values) {
  const errors = {};

  if (isBlank(values.firstName)) errors.firstName = 'Please enter your first name.';
  if (isBlank(values.lastName)) errors.lastName = 'Please enter your last name.';
  if (isBlank(values.email)) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!isBlank(values.phone) && digitCount(values.phone) < 7) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (isBlank(values.message) || values.message.trim().length < 10) {
    errors.message = 'Please tell us a little more (at least 10 characters).';
  }

  return errors;
}

export function validateVehicleRequest(values) {
  const errors = validateContact({ ...values, message: values.message || 'x' });
  delete errors.message;

  if (isBlank(values.pickupDate)) errors.pickupDate = 'Please choose a pickup date.';
  if (isBlank(values.returnDate)) errors.returnDate = 'Please choose a return date.';
  else if (!isBlank(values.pickupDate) && values.returnDate <= values.pickupDate) {
    errors.returnDate = 'The return date must be after the pickup date.';
  }
  if (isBlank(values.pickupLocation)) errors.pickupLocation = 'Please choose a pickup location.';
  if (isBlank(values.phone)) errors.phone = 'A phone number is required for vehicle requests.';
  else if (digitCount(values.phone) < 7) errors.phone = 'Please enter a valid phone number.';

  return errors;
}

export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
