import { Link, useParams } from 'react-router-dom';
import { getVehicle } from '../data/vehicles.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { Stars } from '../components/Stars.jsx';
import { VehicleInquiryForm } from '../components/VehicleInquiryForm.jsx';
import { Users, Cog, Fuel, Bolt, Check, ArrowRight } from '../components/icons.jsx';
import { NotFound } from './NotFound.jsx';
import './VehicleDetail.css';

export function VehicleDetail() {
  const { slug } = useParams();
  const vehicle = getVehicle(slug);

  usePageMeta(
    vehicle ? `${vehicle.name} — VELARIS Luxury Car Rental` : 'Vehicle not found — VELARIS',
    vehicle
      ? `Request the ${vehicle.name} from $${vehicle.price} per day, delivered by concierge across Miami.`
      : undefined,
  );

  if (!vehicle) {
    return <NotFound />;
  }

  const specs = [
    { Icon: Users, label: 'Passengers', value: `${vehicle.seats}` },
    { Icon: Cog, label: 'Transmission', value: vehicle.transmission },
    { Icon: Fuel, label: 'Fuel', value: vehicle.fuel },
    { Icon: Bolt, label: 'Power', value: vehicle.power },
  ];

  return (
    <article className="vd">
      <div className="container">
        <nav className="vd__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/#fleet">Our Fleet</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{vehicle.name}</span>
        </nav>

        <div className="vd__grid">
          <div className="vd__media">
            <img
              src={vehicle.image}
              alt={`${vehicle.name} — ${vehicle.categoryLabel.toLowerCase()} luxury car rental in Miami`}
            />
            <div className="vd__media-foot">
              <span>{vehicle.categoryLabel}</span>
              <span>
                {vehicle.power} · {vehicle.acceleration}
              </span>
            </div>
          </div>

          <div className="vd__detail">
            <p className="eyebrow">Available by the day</p>
            <h1 className="vd__title">{vehicle.name}</h1>

            <div className="vd__meta">
              <span className="vd__rating">
                <Stars rating={vehicle.rating} size={14} />
                {vehicle.rating.toFixed(1)}
              </span>
              <span className="vd__sep" aria-hidden="true" />
              <span className="vd__cat">{vehicle.categoryLabel}</span>
            </div>

            <div className="vd__price">
              <strong>${vehicle.price.toLocaleString('en-US')}</strong>
              <em>/ day</em>
            </div>
            <p className="vd__price-note">Rate excludes fuel, tolls and insurance. Multi-day rates on request.</p>

            <p className="vd__desc">{vehicle.description}</p>

            <ul className="vd__specs">
              {specs.map(({ Icon, label, value }) => (
                <li key={label}>
                  <Icon size={18} />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>

            <div className="vd__features">
              <p className="micro">Included features</p>
              <ul>
                {vehicle.features.map((feature) => (
                  <li key={feature}>
                    <Check size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <VehicleInquiryForm vehicle={vehicle} />

            <Link to="/#fleet" className="vd__back">
              Back to the fleet
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
