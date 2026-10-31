import { useEffect, useRef } from 'react';
import { images } from '../data/images.js';
import { HashLink } from './HashLink.jsx';
import { ArrowRight } from './icons.jsx';
import './Hero.css';

const lines = ['Luxury', 'Lifestyle', 'Rentals'];

export function Hero() {
  const mediaRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduceMotion || !finePointer) return undefined;

    let frame = 0;
    const onPointerMove = (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        if (mediaRef.current) {
          mediaRef.current.style.transform = `translate3d(${(-x * 16).toFixed(2)}px, ${(
            -y * 12
          ).toFixed(2)}px, 0) scale(1.06)`;
        }
      });
    };

    window.addEventListener('pointermove', onPointerMove);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" ref={mediaRef}>
        <img
          src={images.hero}
          alt="Luxury performance coupe photographed in a dark architectural studio"
          fetchpriority="high"
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__inner container">
        <p className="eyebrow hero__eyebrow">Miami — Est. 2011</p>

        <h1 className="hero__title" id="hero-title">
          {lines.map((line, index) => (
            <span key={line} style={{ animationDelay: `${140 + index * 130}ms` }}>
              {line}
            </span>
          ))}
        </h1>

        <p className="hero__lede">
          Experience the extraordinary. Discover exceptional luxury vehicles and redefine every
          journey.
        </p>

        <div className="hero__actions">
          <HashLink to="/#fleet" className="btn btn--gold">
            Explore our fleet
            <ArrowRight />
          </HashLink>
          <a className="hero__phone" href="tel:+13055550138">
            Or call our concierge
          </a>
        </div>
      </div>

      <div className="hero__meta">
        <span className="hero__scroll">
          <i aria-hidden="true" />
          Scroll
        </span>
        <span className="hero__meta-right">Curated fleet — Concierge delivery</span>
      </div>
    </section>
  );
}
