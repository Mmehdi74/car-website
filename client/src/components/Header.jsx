import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../data/site.js';
import { HashLink } from './HashLink.jsx';
import { Logo } from './Logo.jsx';
import { Phone, ArrowRight, socialIcons } from './icons.jsx';
import './Header.css';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="site-header__inner container">
          <HashLink to="/" className="brand" aria-label={`${site.brand} — home`}>
            <Logo />
          </HashLink>

          <nav className="site-nav" aria-label="Primary">
            {site.nav.map((item) => {
              const isActive = item.to === '/' && location.pathname === '/';
              return (
                <HashLink
                  key={item.label}
                  to={item.to}
                  className={`site-nav__link ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                </HashLink>
              );
            })}
          </nav>

          <div className="site-header__actions">
            <a className="btn btn--ghost btn--sm header-phone" href={site.phoneHref}>
              <Phone size={14} />
              <span>{site.phoneLabel}</span>
            </a>

            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {site.nav.map((item, index) => (
            <HashLink
              key={item.label}
              to={item.to}
              className="mobile-menu__link"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${120 + index * 60}ms` }}
            >
              <span>{item.label}</span>
              <em>{String(index + 1).padStart(2, '0')}</em>
            </HashLink>
          ))}
        </nav>

        <div className="mobile-menu__foot">
          <div className="mobile-menu__contact">
            <a href={site.phoneHref}>{site.phoneLabel}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>{site.location}</p>
          </div>
          <div className="mobile-menu__socials">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  tabIndex={open ? 0 : -1}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
          <HashLink
            to="/#fleet"
            className="btn btn--gold btn--block"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Explore the fleet
            <ArrowRight />
          </HashLink>
        </div>
      </div>
    </>
  );
}
