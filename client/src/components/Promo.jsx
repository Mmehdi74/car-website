import { images } from '../data/images.js';
import { Reveal } from './Reveal.jsx';
import { HashLink } from './HashLink.jsx';
import { ArrowRight } from './icons.jsx';
import './Promo.css';

export function Promo() {
  return (
    <section className="promo" aria-labelledby="promo-title">
      <div className="container promo__grid">
        <Reveal className="promo__media">
          <img
            src={images.promo}
            alt="Front view of a black luxury sedan under dramatic studio lighting"
            loading="lazy"
            decoding="async"
          />
          <span className="promo__caption">Campaign — 2026</span>
        </Reveal>

        <Reveal className="promo__copy" delay={120}>
          <p className="eyebrow">The Experience</p>
          <h2 className="promo__title" id="promo-title">
            Drive beyond
            <br />
            ordinary
          </h2>
          <p className="promo__lede">
            Luxury is not just where you go. It’s how you get there.
          </p>
          <div className="promo__rule" aria-hidden="true" />
          <HashLink to="/#about" className="btn btn--ghost">
            Discover more
            <ArrowRight />
          </HashLink>
        </Reveal>
      </div>
    </section>
  );
}
