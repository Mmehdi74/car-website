import { useEffect, useRef } from 'react';
import { site } from '../data/site';

const content = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'We collect only the details you choose to share with us when you send a rental inquiry, and we use them solely to respond to that inquiry.',
    sections: [
      {
        heading: 'What we collect',
        body: 'Your name, email address, phone number, requested dates, pickup location and any message you include in an inquiry form.',
      },
      {
        heading: 'How we use it',
        body: 'To confirm vehicle availability, prepare a quote and arrange delivery. We never sell your information to third parties.',
      },
      {
        heading: 'Retention',
        body: 'Inquiry records are kept for as long as needed to service your request and to meet our accounting obligations.',
      },
      {
        heading: 'Your rights',
        body: `You may request access to, correction of, or deletion of your details at any time by writing to ${site.email}.`,
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro:
      'Submitting an inquiry does not create a reservation. A rental is confirmed only once our team has accepted the request in writing.',
    sections: [
      {
        heading: 'Eligibility',
        body: 'Drivers must be at least 25 years old and hold a valid driving licence in the country of rental.',
      },
      {
        heading: 'Reservations',
        body: 'Availability and pricing are confirmed by our concierge after your inquiry. Dates are held only once a rental agreement is signed.',
      },
      {
        heading: 'Vehicle condition',
        body: 'All vehicles are delivered cleaned, fuelled and inspected with you at handover, and must be returned in the same condition.',
      },
      {
        heading: 'Cancellation',
        body: 'Cancellation terms are stated in your individual rental agreement and may vary by vehicle and season.',
      },
    ],
  },
};

export default function LegalModal({ kind, onClose }) {
  const closeRef = useRef(null);
  const doc = content[kind] || content.privacy;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal modal--legal" role="dialog" aria-modal="true" aria-labelledby="legal-title">
      <div className="modal__scrim" onClick={onClose} aria-hidden="true" />
      <div className="modal__panel modal__panel--legal">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="modal__body">
          <p className="eyebrow">{site.brand}</p>
          <h2 id="legal-title" className="modal__title">
            {doc.title}
          </h2>
          <p className="modal__text">{doc.intro}</p>
          {doc.sections.map((section) => (
            <div className="legal-block" key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </div>
          ))}
          <p className="legal-updated">Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
