import { Reveal } from './Reveal.jsx';
import { Car, Handshake, Pin } from './icons.jsx';
import './Process.css';

const steps = [
  {
    number: '01',
    title: 'Choose the vehicle',
    copy: 'Browse the collection and pick the car that fits the occasion. Looking for something rarer? The concierge sources from private collections on request.',
    Icon: Car,
  },
  {
    number: '02',
    title: 'Confirm with the concierge',
    copy: 'Send your dates and delivery address. We confirm availability and the all-in price the same day — no surprises at handover.',
    Icon: Handshake,
  },
  {
    number: '03',
    title: 'Delivered, detailed, fuelled',
    copy: 'The car arrives wherever you are in Miami-Dade, detailed and fuelled. Keys in hand within minutes, collection arranged at the end.',
    Icon: Pin,
  },
];

export function Process() {
  return (
    <section className="section section--ruled process" id="process" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="section__title" id="process-title">
              Three steps to the keys
            </h2>
          </div>
          <p className="section__note">
            No queues, no paperwork on the kerb. Choose the car, confirm with the concierge, and we
            bring it to you.
          </p>
        </Reveal>

        <Reveal as="ol" className="process__grid" delay={100}>
          {steps.map(({ number, title, copy, Icon }) => (
            <li className="step" key={number}>
              <div className="step__top">
                <span className="step__number">{number}</span>
                <span className="step__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
              </div>
              <h3 className="step__title">{title}</h3>
              <p className="step__copy">{copy}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
