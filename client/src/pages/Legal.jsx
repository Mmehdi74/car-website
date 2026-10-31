import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { site } from '../data/site.js';
import { ArrowRight } from '../components/icons.jsx';
import './Legal.css';

const content = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'This policy explains what information VELARIS collects when you send a rental inquiry, why we collect it, and how it is handled.',
    sections: [
      {
        heading: 'Information we collect',
        body: 'When you submit an inquiry we collect the details you provide: your name, email address, phone number, the dates and vehicle you are interested in, and any message you send us.',
      },
      {
        heading: 'How we use it',
        body: 'Your details are used only to answer your inquiry, confirm vehicle availability and arrange delivery. We do not sell or rent your information to third parties.',
      },
      {
        heading: 'Retention',
        body: 'Inquiries are retained for as long as needed to service your request and to meet our accounting obligations. You can ask us to delete your inquiry at any time.',
      },
      {
        heading: 'Your rights',
        body: `Write to ${site.email} to request a copy of the information we hold about you, or to have it corrected or removed.`,
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro:
      'These terms cover the use of this website and the inquiry process. Rental agreements are concluded separately, in writing, before any vehicle is released.',
    sections: [
      {
        heading: 'Inquiries are not reservations',
        body: 'Submitting a form on this site starts a conversation with our concierge. No vehicle is held, and no booking is confirmed, until you receive written confirmation from us and the rental agreement is signed.',
      },
      {
        heading: 'Rates and availability',
        body: 'Daily rates shown on this site are indicative and exclude fuel, tolls, insurance and any delivery fee. Availability changes daily and is confirmed by our concierge.',
      },
      {
        heading: 'Driver requirements',
        body: 'Drivers must hold a valid licence, meet the minimum age for the selected vehicle and present identification and a payment method at delivery. Requirements vary by vehicle class.',
      },
      {
        heading: 'Vehicle care',
        body: 'Vehicles are delivered detailed and fuelled. The renter is responsible for traffic violations, tolls and any damage incurred during the rental period.',
      },
    ],
  },
};

export function Legal({ kind }) {
  const page = content[kind];
  usePageMeta(`${page.title} — ${site.brand}`, page.intro);

  return (
    <section className="legal">
      <div className="container legal__inner">
        <p className="eyebrow">Legal</p>
        <h1 className="legal__title">{page.title}</h1>
        <p className="lede legal__intro">{page.intro}</p>

        <div className="legal__body">
          {page.sections.map((section) => (
            <article key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>

        <p className="legal__updated">Last updated — 31 October 2026</p>

        <Link to="/" className="link-arrow legal__back">
          Back to home
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
