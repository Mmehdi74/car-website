import { Link } from 'react-router-dom';
import { site } from '../data/site.js';
import { Logo } from './Logo.jsx';
import { HashLink } from './HashLink.jsx';
import { socialIcons } from './icons.jsx';
import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <HashLink to="/" aria-label={`${site.brand} — home`}>
              <Logo />
            </HashLink>
            <p>
              Curated luxury vehicles with concierge delivery. Every journey begins before you turn
              the key.
            </p>
            <div className="site-footer__socials">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <nav className="site-footer__col" aria-label="Footer navigation">
            <p className="micro">Explore</p>
            {site.nav.map((item) => (
              <HashLink key={item.label} to={item.to}>
                {item.label}
              </HashLink>
            ))}
          </nav>

          <div className="site-footer__col">
            <p className="micro">Concierge</p>
            <a href={site.phoneHref}>{site.phoneLabel}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.location}</span>
          </div>

          <div className="site-footer__cta">
            <p className="micro">Reserve</p>
            <HashLink to="/#fleet" className="btn btn--ghost btn--sm">
              View the fleet
            </HashLink>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 {site.brand}. All Rights Reserved.</p>
          <div className="site-footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
          <button
            type="button"
            className="site-footer__top-link"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
