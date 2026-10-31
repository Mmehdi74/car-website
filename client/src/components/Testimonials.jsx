import { Reveal } from './Reveal.jsx';
import { Stars } from './Stars.jsx';
import './Testimonials.css';

const quotes = [
  {
    rating: 5,
    text: 'The G 63 was waiting at arrivals, spotless and fuelled. Fifteen minutes from landing to driving away.',
    name: 'Daniel R.',
    meta: 'Miami Beach — Mercedes-AMG G 63',
  },
  {
    rating: 5,
    text: 'One message and it was arranged. The concierge chose the right car for the weekend and had it at the hotel before check-in.',
    name: 'Sofia M.',
    meta: 'Brickell — Rolls-Royce Ghost',
  },
  {
    rating: 5,
    text: 'A full week with the Huracán and not a single phone call about a problem. That is what a concierge is for.',
    name: 'Marcus L.',
    meta: 'Coral Gables — Lamborghini Huracán EVO',
  },
];

export function Testimonials() {
  return (
    <section
      className="section section--ruled testimonials"
      id="reviews"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="eyebrow">Client voices</p>
            <h2 className="section__title" id="testimonials-title">
              Trusted by those who expect more
            </h2>
          </div>
          <p className="section__note">
            Notes from recent reservations across Miami — airport arrivals, weekend escapes and
            month-long stays.
          </p>
        </Reveal>

        <Reveal as="ul" className="quotes" delay={100}>
          {quotes.map(({ rating, text, name, meta }) => (
            <li className="quote" key={name}>
              <Stars rating={rating} size={12} />
              <p className="quote__text">&ldquo;{text}&rdquo;</p>
              <div className="quote__who">
                <span className="quote__name">{name}</span>
                <span className="quote__meta">{meta}</span>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
