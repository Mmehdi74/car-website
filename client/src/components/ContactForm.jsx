import { useState } from 'react';
import { Field } from './Field.jsx';
import { Check, ArrowRight } from './icons.jsx';
import { validateContact } from '../lib/validation.js';
import { submitInquiry } from '../lib/api.js';

const emptyValues = { firstName: '', lastName: '', email: '', phone: '', message: '' };

export function ContactForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle');
  const [submittedName, setSubmittedName] = useState('');

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors(({ [field]: _removed, ...rest }) => rest);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setFormError('');
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      await submitInquiry({ kind: 'contact', ...values });
      setSubmittedName(values.firstName.trim());
      setValues(emptyValues);
      setStatus('success');
    } catch (error) {
      setErrors(error.fieldErrors ?? {});
      setFormError(error.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon" aria-hidden="true">
          <Check size={22} />
        </span>
        <h3 className="form-success__title">Inquiry received</h3>
        <p className="form-success__copy">
          Thank you{submittedName ? `, ${submittedName}` : ''}. A concierge will reply within one
          business day. This is an inquiry — no reservation has been made yet.
        </p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setStatus('idle');
            setSubmittedName('');
          }}
        >
          Send another inquiry
          <ArrowRight />
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {formError ? (
        <p className="form-alert" role="alert">
          {formError}
        </p>
      ) : null}

      <div className="form__grid">
        <Field
          id="contact-first"
          label="First Name"
          name="firstName"
          autoComplete="given-name"
          value={values.firstName}
          onChange={update('firstName')}
          error={errors.firstName}
          placeholder="Alex"
          required
        />
        <Field
          id="contact-last"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          value={values.lastName}
          onChange={update('lastName')}
          error={errors.lastName}
          placeholder="Moreau"
          required
        />
      </div>

      <div className="form__grid">
        <Field
          id="contact-email"
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
          placeholder="you@example.com"
          required
        />
        <Field
          id="contact-phone"
          label="Phone Number"
          type="tel"
          name="phone"
          autoComplete="tel"
          value={values.phone}
          onChange={update('phone')}
          error={errors.phone}
          placeholder="+1 (305) 000 0000"
        />
      </div>

      <Field
        id="contact-message"
        label="Message"
        as="textarea"
        name="message"
        rows={4}
        value={values.message}
        onChange={update('message')}
        error={errors.message}
        placeholder="Tell us about your dates, the vehicle you have in mind, or any special request."
        required
      />

      <div className="form__footer">
        <p className="form__note">
          Submitting sends an inquiry only. A concierge confirms availability and pricing by phone or
          email.
        </p>
        <button type="submit" className="btn btn--gold" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Inquiry'}
          {submitting ? null : <ArrowRight />}
        </button>
      </div>
    </form>
  );
}
