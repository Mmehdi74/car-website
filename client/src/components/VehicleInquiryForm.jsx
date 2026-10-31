import { useState } from 'react';
import { Field } from './Field.jsx';
import { ArrowRight, Check } from './icons.jsx';
import { validateVehicleRequest, todayISO } from '../lib/validation.js';
import { submitInquiry } from '../lib/api.js';
import { pickupLocations } from '../data/vehicles.js';

const emptyValues = {
  pickupDate: '',
  returnDate: '',
  pickupLocation: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

export function VehicleInquiryForm({ vehicle }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle');

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors(({ [field]: _removed, ...rest }) => rest);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateVehicleRequest(values);
    setErrors(nextErrors);
    setFormError('');
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      await submitInquiry({
        kind: 'vehicle',
        vehicleSlug: vehicle.slug,
        vehicleName: vehicle.name,
        ...values,
      });
      setStatus('success');
    } catch (error) {
      setErrors(error.fieldErrors ?? {});
      setFormError(error.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="vd-form" id="request">
        <div className="form-success" role="status">
          <span className="form-success__icon" aria-hidden="true">
            <Check size={22} />
          </span>
          <h3 className="form-success__title">Request received</h3>
          <p className="form-success__copy">
            Your request for the {vehicle.name} has been sent to our concierge. We will confirm
            availability, pricing and delivery details by phone or email — this is an inquiry, not a
            confirmed reservation.
          </p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setValues(emptyValues);
              setStatus('idle');
            }}
          >
            Send another request
            <ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <div className="vd-form" id="request">
      <div className="vd-form__head">
        <p className="eyebrow">Request this vehicle</p>
        <p className="vd-form__note">Inquiry only — no payment is taken online.</p>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        {formError ? (
          <p className="form-alert" role="alert">
            {formError}
          </p>
        ) : null}

        <div className="form__grid">
          <Field
            id="vd-pickup-date"
            label="Pickup Date"
            type="date"
            name="pickupDate"
            min={todayISO()}
            value={values.pickupDate}
            onChange={update('pickupDate')}
            error={errors.pickupDate}
            required
          />
          <Field
            id="vd-return-date"
            label="Return Date"
            type="date"
            name="returnDate"
            min={values.pickupDate || todayISO()}
            value={values.returnDate}
            onChange={update('returnDate')}
            error={errors.returnDate}
            required
          />
        </div>

        <Field
          id="vd-location"
          label="Pickup Location"
          as="select"
          name="pickupLocation"
          value={values.pickupLocation}
          onChange={update('pickupLocation')}
          error={errors.pickupLocation}
          required
        >
          <option value="">Select a location</option>
          {pickupLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </Field>

        <div className="form__grid">
          <Field
            id="vd-first"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={update('firstName')}
            error={errors.firstName}
            required
          />
          <Field
            id="vd-last"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={update('lastName')}
            error={errors.lastName}
            required
          />
        </div>

        <div className="form__grid">
          <Field
            id="vd-email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            error={errors.email}
            required
          />
          <Field
            id="vd-phone"
            label="Phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            error={errors.phone}
            required
          />
        </div>

        <Field
          id="vd-message"
          label="Notes (optional)"
          as="textarea"
          name="message"
          rows={3}
          value={values.message}
          onChange={update('message')}
          error={errors.message}
          placeholder="Flight number, delivery address, child seat, chauffeur…"
        />

        <button type="submit" className="btn btn--gold btn--block" disabled={submitting}>
          {submitting ? 'Sending…' : 'Request this vehicle'}
          {submitting ? null : <ArrowRight />}
        </button>
      </form>
    </div>
  );
}
