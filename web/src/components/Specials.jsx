import { useState } from 'react';
import { categories, vehicles } from '../data/vehicles';
import Reveal from './Reveal';
import VehicleCard from './VehicleCard';

const labels = { All: 'View All Cars' };

export default function Specials({ onOpenVehicle }) {
  const [active, setActive] = useState('All');

  const visible =
    active === 'All' ? vehicles : vehicles.filter((v) => v.category === active);

  return (
    <section className="section fleet" id="fleet">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            The collection
          </p>
          <h2 className="section__title">Today’s Specials</h2>
          <p className="section__lead">
            A hand-picked selection from our fleet, available for daily hire with concierge
            delivery across the city.
          </p>
        </Reveal>

        <Reveal className="filters" delay={80}>
          <div className="filters__list" role="tablist" aria-label="Filter vehicles by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active === category}
                className={`filter${active === category ? ' is-active' : ''}`}
                onClick={() => setActive(category)}
              >
                {labels[category] || category}
                <span className="filter__count">
                  {category === 'All'
                    ? vehicles.length
                    : vehicles.filter((v) => v.category === category).length}
                </span>
              </button>
            ))}
          </div>
          <p className="filters__result" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'vehicle' : 'vehicles'}
          </p>
        </Reveal>

        <div className="fleet__grid" key={active}>
          {visible.map((vehicle, i) => (
            <div className="fleet__cell" style={{ animationDelay: `${i * 70}ms` }} key={vehicle.id}>
              <VehicleCard vehicle={vehicle} onOpen={onOpenVehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
