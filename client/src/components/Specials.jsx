import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { categoryFilters, vehicles } from '../data/vehicles.js';
import { VehicleCard } from './VehicleCard.jsx';
import { Reveal } from './Reveal.jsx';
import { HashLink } from './HashLink.jsx';
import { ArrowRight } from './icons.jsx';
import './Specials.css';

export function Specials() {
  const [active, setActive] = useState('all');
  const barRef = useRef(null);
  const [marker, setMarker] = useState({ left: 0, width: 0, visible: false });

  const measure = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    const button = bar.querySelector('[aria-pressed="true"]');
    if (!button) return;
    setMarker({ left: button.offsetLeft, width: button.offsetWidth, visible: true });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [active, measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const filtered = active === 'all' ? vehicles : vehicles.filter((v) => v.category === active);

  return (
    <section className="section section--ruled specials" id="fleet" aria-labelledby="specials-title">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="eyebrow">The Collection</p>
            <h2 className="section__title" id="specials-title">
              Today’s Specials
            </h2>
          </div>
          <p className="section__note">
            Every vehicle is delivered detailed, fuelled and photographed on arrival. Reserve by the
            day, with concierge delivery across Miami.
          </p>
        </Reveal>

        <div className="filters" ref={barRef} role="group" aria-label="Filter vehicles by category">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className="filter"
              aria-pressed={active === filter.id}
              onClick={() => setActive(filter.id)}
            >
              {filter.label}
            </button>
          ))}
          <span
            className="filters__marker"
            aria-hidden="true"
            style={{
              width: `${marker.width}px`,
              transform: `translateX(${marker.left}px)`,
              opacity: marker.visible ? 1 : 0,
            }}
          />
          <span className="filters__count" aria-live="polite">
            {String(filtered.length).padStart(2, '0')} vehicles
          </span>
        </div>

        <div className="fleet-grid" key={active}>
          {filtered.map((vehicle, index) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} index={index} />
          ))}
        </div>

        <Reveal className="specials__foot">
          <p>
            Looking for something specific? Our concierge sources vehicles from private collections
            on request.
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
