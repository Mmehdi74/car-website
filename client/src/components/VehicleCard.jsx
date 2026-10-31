import { Link } from 'react-router-dom';
import { Stars } from './Stars.jsx';
import { ArrowUpRight } from './icons.jsx';

export function VehicleCard({ vehicle, index = 0 }) {
  return (
    <Link
      to={`/vehicle/${vehicle.slug}`}
      className="v-card"
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={`${vehicle.name} — $${vehicle.price} per day. View details.`}
    >
      <div className="v-card__media">
        <img
          src={vehicle.image}
          alt={`${vehicle.name} available for luxury rental in Miami`}
          loading="lazy"
          decoding="async"
        />
        <span className="v-card__cat">{vehicle.categoryLabel}</span>
        <span className="v-card__open">
          View details
          <ArrowUpRight size={14} />
        </span>
      </div>

      <div className="v-card__body">
        <div className="v-card__head">
          <h3 className="v-card__name">{vehicle.name}</h3>
          <span className="v-card__rating">
            <Stars rating={vehicle.rating} />
            <em>{vehicle.rating.toFixed(1)}</em>
          </span>
        </div>

        <div className="v-card__foot">
          <span className="v-card__specs">
            {vehicle.seats} seats · {vehicle.transmission}
          </span>
          <span className="v-card__price">
            ${vehicle.price.toLocaleString('en-US')}
            <em>/ day</em>
          </span>
        </div>
      </div>
    </Link>
  );
}
