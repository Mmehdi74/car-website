import { useEffect, useState } from 'react';
import { navLinks, site } from '../data/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-menu-open', open);
    return () => document.body.classList.remove('is-menu-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="header__inner">
        <a href="#home" className="logo" onClick={() => setOpen(false)} aria-label={`${site.brand} home`}>
          <svg viewBox="0 0 32 32" className="logo__mark" aria-hidden="true">
            <path d="M3 22h26M6.5 22l3.2-9.6A3 3 0 0 1 12.5 10h7a3 3 0 0 1 2.8 2.4L25.5 22" />
            <path d="M10 22v3M22 22v3" />
          </svg>
          <span className="logo__text">
            {site.brand}
            <em className="logo__dot">.</em>
          </span>
        </a>

        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href="#contact" className="header__phone" aria-label="Contact our rental desk">
            {site.phone}
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu__link"
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
              onClick={() => setOpen(false)}
            >
              <span className="mobile-menu__index">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <a href="#contact" onClick={() => setOpen(false)}>
            {site.phone}
          </a>
          <span>{site.location}</span>
        </div>
      </div>
    </header>
  );
}
