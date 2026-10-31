import { site } from '../data/site.js';
import { Logo } from './Logo.jsx';
import { Reveal } from './Reveal.jsx';
import { ContactForm } from './ContactForm.jsx';
import { Pin, Phone, Mail, Clock, socialIcons } from './icons.jsx';
import './Contact.css';

const details = [
  { Icon: Pin, label: 'Location', value: site.location, extra: site.address },
  { Icon: Phone, label: 'Phone', value: site.phoneLabel, href: site.phoneHref },
  { Icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { Icon: Clock, label: 'Concierge', value: site.hours },
];

export function Contact() {
  return (
    <section className="section section--ruled contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <Reveal className="contact__brand">
          <Logo />

          <h2 className="section__title contact__title" id="contact-title">
            Plan your journey
          </h2>
          <p className="lede contact__lede">
            Tell us the dates and the vehicle you have in mind. Our concierge will confirm
            availability, arrange delivery and prepare the car before you land.
          </p>

          <ul className="contact__details">
            {details.map(({ Icon, label, value, extra, href }) => (
              <li key={label} className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">
                  <Icon size={17} />
                </span>
                <div>
                  <span className="micro">{label}</span>
                  {href ? (
                    <a href={href}>{value}</a>
                  ) : (
                    <p className="contact__detail-value">{value}</p>
                  )}
                  {extra ? <p className="contact__detail-extra">{extra}</p> : null}
                </div>
              </li>
            ))}
          </ul>

          <div className="contact__socials">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="contact__panel" delay={120}>
          <div className="contact__panel-head">
            <p className="eyebrow">Enquiries</p>
            <p className="contact__panel-note">Response within one business day</p>
          </div>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
