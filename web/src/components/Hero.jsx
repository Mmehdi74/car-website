import { useEffect, useRef } from 'react';
import { heroImage } from '../data/vehicles';
import { site } from '../data/site';

export default function Hero() {
  const mediaRef = useRef(null);

  // Very subtle parallax: the hero image drifts slower than the page.
  useEffect(() => {
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const offset = Math.min(window.scrollY, window.innerHeight);
        if (mediaRef.current) {
          mediaRef.current.style.transform = `translate3d(0, ${offset * 0.12}px, 0) scale(1.04)`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero__media" ref={mediaRef}>
        <img
          src={heroImage}
          alt="Luxury sports car lit in a dark automotive studio"
          width="2000"
          height="1250"
          fetchPriority="high"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__inner">
        <p className="eyebrow hero__eyebrow">
          <span className="eyebrow__line" />
          {site.brand} · {site.brandSuffix}
        </p>

        <h1 className="hero__title">
          <span>Luxury</span>
          <span>Lifestyle</span>
          <span className="hero__title-accent">Rentals</span>
        </h1>

        <p className="hero__lead">
          Experience the extraordinary. Discover exceptional luxury vehicles and redefine every
          journey.
        </p>

        <div className="hero__actions">
          <a href="#fleet" className="btn btn--solid">
            Explore our fleet
          </a>
          <a href="#contact" className="btn btn--ghost">
            Speak to concierge
          </a>
        </div>
      </div>

      <div className="hero__meta">
        <span className="hero__meta-item">
          <strong>40+</strong> Curated vehicles
        </span>
        <span className="hero__meta-item">
          <strong>24/7</strong> Concierge
        </span>
        <a className="hero__scroll" href="#fleet" aria-label="Scroll to fleet">
          <span className="hero__scroll-line" aria-hidden="true" />
          Scroll
        </a>
      </div>
    </section>
  );
}
