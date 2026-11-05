import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav } from '../data/content';

type HeaderProps = {
  active: string;
};

export default function Header({ active }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-premium ${
        scrolled || open
          ? 'border-b border-white/10 bg-ink/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-[76px]">
          <a
            href="#home"
            className="group flex shrink-0 flex-col leading-none"
            aria-label="SQUADRO home"
          >
            <span className="font-display text-[22px] tracking-[0.24em] text-cream transition-colors group-hover:text-orange">
              SQUADRO
            </span>
            <span className="mt-1 font-tech text-[9px] uppercase tracking-[0.42em] text-dim">
              Off-road motorsport
            </span>
          </a>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'page' : undefined}
                    className={`group relative py-2 font-tech text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                      active === item.id ? 'text-orange' : 'text-muted hover:text-cream'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-orange transition-all duration-500 ease-premium ${
                        active === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-2 font-tech text-[10px] uppercase tracking-[0.22em] text-dim sm:flex">
              <span className="text-cream">M</span>
              <span className="h-3 w-px bg-white/15" />
              <span>EN</span>
            </span>
            <a
              href="#contact"
              className="hidden border border-white/15 px-4 py-2 font-tech text-[10px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-orange/70 hover:text-orange md:inline-block"
            >
              Test ride
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-cream transition-colors hover:text-orange lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-ink/97 transition-[max-height,opacity] duration-500 ease-premium lg:hidden ${
          open ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="shell flex min-h-[calc(100vh-4rem)] flex-col py-6">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.id} className="border-b border-white/[0.07] last:border-none">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-tech text-[10px] text-orange">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl uppercase tracking-[0.12em] text-cream">
                      {item.label}
                    </span>
                  </span>
                  <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-dim">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-tech text-[10px] uppercase tracking-[0.24em] text-dim lg:mt-auto">
            M / EN — Off-road motorsport since 2019
          </p>
        </nav>
      </div>
    </header>
  );
}
