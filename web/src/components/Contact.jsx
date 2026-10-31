import { useState } from 'react';
import Field from './Field';
import Reveal from './Reveal';
import { site } from '../data/site';
import { submitInquiry } from '../lib/api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle');

  const update = (id) => (e) => {
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
    setFormError('');
  };

  const validate = () => {
    const next = {};
    if (!values.firstName.trim()) next.firstName = 'First name is required.';
    if (!values.lastName.trim()) next.lastName = 'Last name is required.';
    if (!values.email.trim()) next.email = 'Email address is required.';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (values.phone && values.phone.replace(/\D/g, '').length < 6) {
      next.phone = 'Enter a valid phone number.';
    }
    if (!values.message.trim()) next.message = 'Please tell us how we can help.';
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    const result = await submitInquiry({ ...values, type: 'contact' });
    if (result.ok) {
      setStatus('sent');
      setValues({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      return;
    }
    setStatus('idle');
    if (result.errors) setErrors(result.errors);
    if (result.formError) setFormError(result.formError);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact__inner">
        <Reveal className="contact__brand">
          <a href="#home" className="logo logo--lg">
            <svg viewBox="0 0 32 32" className="logo__mark" aria-hidden="true">
              <path d="M3 22h26M6.5 22l3.2-9.6A3 3 0 0 1 12.5 10h7a3 3 0 0 1 2.8 2.4L25.5 22" />
              <path d="M10 22v3M22 22v3" />
            </svg>
            <span className="logo__text">
              {site.brand}
              <em className="logo__dot">.</em>
            </span>
          </a>
          <p className="contact__tagline">
            A private collection of exceptional automobiles, delivered with concierge care.
          </p>
          <ul className="socials">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="contact__details" delay={90}>
          <h2 className="contact__heading">Let’s plan your drive</h2>
          <dl className="contact__list">
            <div>
              <dt>Location</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{site.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{site.email}</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>Daily · 08:00 – 23:00</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="contact__form" delay={160}>
          {status === 'sent' ? (
            <div className="notice notice--success" role="status">
              <strong>Thank you — your inquiry is on its way.</strong>
              <p>
                A member of our concierge team will reply within one business day. This is an
                inquiry, not a confirmed reservation.
              </p>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setStatus('idle')}
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form className="form form--grid" onSubmit={onSubmit} noValidate>
              <Field
                id="firstName"
                label="First name"
                autoComplete="given-name"
                value={values.firstName}
                onChange={update('firstName')}
                error={errors.firstName}
                required
              />
              <Field
                id="lastName"
                label="Last name"
                autoComplete="family-name"
                value={values.lastName}
                onChange={update('lastName')}
                error={errors.lastName}
                required
              />
              <Field
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={update('email')}
                error={errors.email}
                required
              />
              <Field
                id="phone"
                label="Phone number"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={update('phone')}
                error={errors.phone}
              />
              <Field
                id="message"
                as="textarea"
                label="Message"
                rows={4}
                placeholder="Tell us the dates, the car you have in mind, or anything else."
                value={values.message}
                onChange={update('message')}
                error={errors.message}
                className="field--wide"
                required
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
                {status === 'sending' ? 'Sending…' : 'Send inquiry'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
