import { navLinks, site } from '../data/site';

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="logo">
            <svg viewBox="0 0 32 32" className="logo__mark" aria-hidden="true">
              <path d="M3 22h26M6.5 22l3.2-9.6A3 3 0 0 1 12.5 10h7a3 3 0 0 1 2.8 2.4L25.5 22" />
              <path d="M10 22v3M22 22v3" />
            </svg>
            <span className="logo__text">
              {site.brand}
              <em className="logo__dot">.</em>
            </span>
          </a>
          <p className="footer__note">{site.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__legal">
          <button type="button" onClick={() => onOpenLegal('privacy')}>
            Privacy Policy
          </button>
          <button type="button" onClick={() => onOpenLegal('terms')}>
            Terms &amp; Conditions
          </button>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {site.brand}. All Rights Reserved.
        </p>
        <ul className="socials socials--sm">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer noopener">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
