import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { ArrowRight } from '../components/icons.jsx';
import './Legal.css';

export function NotFound() {
  usePageMeta('Page not found — VELARIS');

  return (
    <section className="legal">
      <div className="container legal__inner">
        <p className="eyebrow">404</p>
        <h1 className="legal__title">This page is not in the fleet</h1>
        <p className="lede legal__intro">
          The page you were looking for has moved or no longer exists. Explore the collection
          instead.
        </p>
        <Link to="/#fleet" className="link-arrow legal__back">
          View the fleet
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
