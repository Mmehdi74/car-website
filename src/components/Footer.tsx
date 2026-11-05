import { footerLinks } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#090c11]">
      <div className="shell pb-8 pt-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none tracking-[0.22em] text-cream">
              SQUA<span className="text-orange">DRO</span>
            </p>
            <p className="mt-4 max-w-[22rem] text-[12px] leading-relaxed text-dim">
              Off-road motorsport, designed as a brand experience. ATVs, motocross
              and adventure riding from Almería, Spain.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 border-b border-orange/50 pb-1 font-tech text-[10px] uppercase tracking-[0.2em] text-orange transition-colors hover:border-orange hover:text-cream"
            >
              Book a test ride
            </a>
          </div>

          <nav aria-label="Explore">
            <p className="label text-dim">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-tech text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="label text-dim">Company</p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-tech text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-dim">Follow</p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 font-tech text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-cream"
                  >
                    {link.label}
                    <span className="text-orange/0 transition-colors group-hover:text-orange">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-tech text-[9px] uppercase tracking-[0.22em] text-dim">
            © 2020 SQUADRO — All rights reserved
          </p>
          <p className="font-tech text-[9px] uppercase tracking-[0.22em] text-dim">
            Website design concept <span className="text-orange">/</span> 2019
          </p>
        </div>
      </div>
    </footer>
  );
}
