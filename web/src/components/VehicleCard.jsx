import Stars from './Stars';

export default function VehicleCard({ vehicle, onOpen }) {
  return (
    <button type="button" className="vcard" onClick={() => onOpen(vehicle)}>
      <span className="vcard__media">
        <img src={vehicle.image} alt={`${vehicle.name} ${vehicle.model}`} loading="lazy" />
        <span className="vcard__category">{vehicle.category}</span>
      </span>

      <span className="vcard__body">
        <span className="vcard__top">
          <span className="vcard__name">
            {vehicle.name}
            <em>{vehicle.model}</em>
          </span>
          <Stars rating={vehicle.rating} />
        </span>

        <span className="vcard__specs">
          <span>{vehicle.seats} seats</span>
          <span className="vcard__dot" aria-hidden="true" />
          <span>{vehicle.transmission}</span>
          <span className="vcard__dot" aria-hidden="true" />
          <span>{vehicle.fuel}</span>
        </span>

        <span className="vcard__footer">
          <span className="vcard__price">
            ${vehicle.price.toLocaleString()}
            <em>/ day</em>
          </span>
          <span className="vcard__cta">
            View details
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      </span>
    </button>
  );
}
