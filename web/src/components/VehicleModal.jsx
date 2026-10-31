import { useEffect, useMemo, useRef, useState } from 'react';
import Field from './Field';
import Stars from './Stars';
import { submitInquiry } from '../lib/api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const today = () => new Date().toISOString().slice(0, 10);

export default function VehicleModal({ vehicle, onClose }) {
  const closeRef = useRef(null);
  const [values, setValues] = useState({
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const minDate = useMemo(today, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const update = (id) => (e) => {
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
    setFormError('');
  };

  const validate = () => {
    const next = {};
    if (!values.pickupDate) next.pickupDate = 'Choose a pickup date.';
    if (!values.returnDate) next.returnDate = 'Choose a return date.';
    if (values.pickupDate && values.returnDate && values.returnDate < values.pickupDate) {
      next.returnDate = 'Return must be on or after pickup.';
    }
    if (!values.pickupLocation.trim()) next.pickupLocation = 'Where should we deliver the car?';
    if (!values.firstName.trim()) next.firstName = 'First name is required.';
    if (!values.lastName.trim()) next.lastName = 'Last name is required.';
    if (!values.email.trim()) next.email = 'Email address is required.';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (values.phone && values.phone.replace(/\D/g, '').length < 6) {
      next.phone = 'Enter a valid phone number.';
    }
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    const result = await submitInquiry({ ...values, type: 'vehicle', vehicle: vehicle.name });
    if (result.ok) {
      setStatus('sent');
      return;
    }
    setStatus('idle');
    if (result.errors) setErrors(result.errors);
    if (result.formError) setFormError(result.formError);
  };

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="vehicle-modal-title">
      <div className="modal__scrim" onClick={onClose} aria-hidden="true" />

      <div className="modal__panel">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close vehicle details"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="modal__media">
          <img src={vehicle.image} alt={`${vehicle.name} ${vehicle.model}`} />
        </div>

        <div className="modal__body">
          <p className="eyebrow">{vehicle.category}</p>
          <h2 id="vehicle-modal-title" className="modal__title">
            {vehicle.name}
            <em>{vehicle.model}</em>
          </h2>

          <div className="modal__rate">
            <Stars rating={vehicle.rating} />
            <span className="modal__price">
              ${vehicle.price.toLocaleString()}
              <em>/ day</em>
            </span>
          </div>

          <p className="modal__text">{vehicle.description}</p>

          <dl className="spec-grid">
            <div>
              <dt>Passengers</dt>
              <dd>{vehicle.seats}</dd>
            </div>
            <div>
              <dt>Transmission</dt>
              <dd>{vehicle.transmission}</dd>
            </div>
            <div>
              <dt>Fuel</dt>
              <dd>{vehicle.fuel}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{vehicle.category}</dd>
            </div>
          </dl>

          <div className="features">
            <h3 className="features__title">Included features</h3>
            <ul className="features__list">
              {vehicle.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="inquiry">
            <h3 className="inquiry__title">Request this vehicle</h3>
            <p className="inquiry__note">
              Send an inquiry and our concierge will confirm availability and pricing with you
              directly. Submitting this form does not reserve the vehicle.
            </p>

            {status === 'sent' ? (
              <div className="notice notice--success" role="status">
                <strong>Inquiry received.</strong>
                <p>
                  Thank you, {values.firstName}. Our concierge team will contact you at{' '}
                  {values.email} to confirm availability for the {vehicle.name}. This is an
                  inquiry, not a confirmed reservation.
                </p>
                <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
                  Continue browsing
                </button>
              </div>
            ) : (
              <form className="form form--grid" onSubmit={onSubmit} noValidate>
                <Field
                  id="v-pickupDate"
                  label="Pickup date"
                  type="date"
                  min={minDate}
                  value={values.pickupDate}
                  onChange={update('pickupDate')}
                  error={errors.pickupDate}
                  required
                />
                <Field
                  id="v-returnDate"
                  label="Return date"
                  type="date"
                  min={values.pickupDate || minDate}
                  value={values.returnDate}
                  onChange={update('returnDate')}
                  error={errors.returnDate}
                  required
                />
                <Field
                  id="v-pickupLocation"
                  label="Pickup location"
                  placeholder="Hotel, airport or address"
                  value={values.pickupLocation}
                  onChange={update('pickupLocation')}
                  error={errors.pickupLocation}
                  className="field--wide"
                  required
                />
                <Field
                  id="v-firstName"
                  label="First name"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={update('firstName')}
                  error={errors.firstName}
                  required
                />
                <Field
                  id="v-lastName"
                  label="Last name"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={update('lastName')}
                  error={errors.lastName}
                  required
                />
                <Field
                  id="v-email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update('email')}
                  error={errors.email}
                  required
                />
                <Field
                  id="v-phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={update('phone')}
                  error={errors.phone}
                />

                {formError && (
                  <p className="form__error" role="alert">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn--solid btn--block field--wide"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Request this vehicle'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
