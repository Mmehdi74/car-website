import { Reveal } from './Reveal.jsx';
import { HashLink } from './HashLink.jsx';
import { ArrowRight, Check, Clock, Handshake, Pin } from './icons.jsx';
import './Essentials.css';

const requirements = [
  'Drivers aged 25 and over, holding a valid licence for at least three years.',
  'A refundable security deposit, released within five working days of return.',
  'Full coverage insurance included on every reservation, with no excess surprises.',
  'A second driver may be added at no extra cost with a valid licence.',
];

const delivery = [
  { Icon: Pin, copy: 'Delivered across Miami-Dade — airport, hotels, residences and marinas.' },
  { Icon: Clock, copy: 'Handover daily from 08:00 to 22:00, seven days a week.' },
  { Icon: Handshake, copy: 'Collection at the end of the rental, at the same address or elsewhere in the county.' },
];

export function Essentials() {
  return (
    <section
      className="section section--ruled essentials"
      id="essentials"
      aria-labelledby="essentials-title"
    >
      <div className="container essentials__grid">
        <Reveal>
          <p className="eyebrow">The essentials</p>
          <h2 className="section__title essentials__title" id="essentials-title">
            Before
            <br />
            you drive
          </h2>
          <p className="lede essentials__lede">
            Everything is arranged before the car arrives, so handover is a signature and a set of
            keys. Here is what the concierge will ask for.
          </p>
        </Reveal>

        <div className="essentials__cols">
          <Reveal className="essentials__block" delay={80}>
            <p className="micro">Requirements</p>
            <ul className="essentials__list">
              {requirements.map((item) => (
                <li key={item}>
                  <Check size={15} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="essentials__block" delay={160}>
            <p className="micro">Delivery &amp; collection</p>
            <ul className="essentials__list">
              {delivery.map(({ Icon, copy }) => (
                <li key={copy}>
                  <Icon size={15} />
                  <span>{copy}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="essentials__foot" delay={120}>
          <p>
            100 miles per day are included; additional miles are settled at collection. Weekly rates
            are available on request.
          </p>
          <HashLink to="/#contact" className="link-arrow">
            Speak with the concierge
            <ArrowRight />
          </HashLink>
        </Reveal>
      </div>
    </section>
  );
}
