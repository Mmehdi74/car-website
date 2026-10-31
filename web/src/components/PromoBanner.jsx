import { promoImage } from '../data/vehicles';
import Reveal from './Reveal';

export default function PromoBanner() {
  return (
    <section className="promo" aria-labelledby="promo-title">
      <div className="promo__inner">
        <Reveal className="promo__media">
          <img
            src={promoImage}
            alt="Luxury car photographed in dramatic low light"
            loading="lazy"
          />
        </Reveal>

        <Reveal className="promo__content" delay={120}>
          <p className="eyebrow">
            <span className="eyebrow__line" />
            The campaign
          </p>
          <h2 className="promo__title" id="promo-title">
            Drive beyond
            <br />
            ordinary
          </h2>
          <p className="promo__text">
            Luxury is not just where you go. It’s how you get there.
          </p>
          <a href="#fleet" className="btn btn--ghost">
            Discover more
          </a>
        </Reveal>
      </div>
    </section>
  );
}
