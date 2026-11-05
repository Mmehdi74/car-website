import { ArrowDownRight } from 'lucide-react';
import { images } from '../data/content';
import HelmetMark from './HelmetMark';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pb-10 pt-24 sm:pt-28 lg:pb-14 lg:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={images.mountains}
          alt=""
          className="h-full w-full scale-105 object-cover object-center opacity-[0.26]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/85 to-ink" />
        <div className="absolute inset-0 noise-veil opacity-80" />
        <div className="absolute left-1/2 top-[38%] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-orange/[0.13] blur-[110px] sm:h-[540px] sm:w-[540px]" />
      </div>

      <div className="shell relative">
        <div
          className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '80ms' }}
        >
          <span className="label">2019</span>
          <span className="label hidden sm:block">Alex Bunin — art direction</span>
          <span className="label">M / EN</span>
        </div>

        <div className="pt-10 text-center sm:pt-12 lg:pt-16">
          <p
            className="label-orange opacity-0 animate-fade-in"
            style={{ animationDelay: '180ms' }}
          >
            Website design concept
          </p>

          <h1
            className="mt-5 flex select-none items-center justify-center font-display uppercase leading-[0.78] text-cream opacity-0 animate-fade-up sm:mt-6"
            style={{
              animationDelay: '260ms',
              fontSize: 'clamp(3.4rem, 22vw, 18.5rem)',
              letterSpacing: '-0.005em',
            }}
          >
            <span className="wordmark-grain">SQUADR</span>
            <span
              className="relative inline-flex shrink-0 items-center justify-center opacity-0 animate-scale-in"
              style={{
                width: '0.8em',
                height: '0.92em',
                marginLeft: '-0.02em',
                animationDelay: '620ms',
              }}
            >
              <HelmetMark className="h-[1.04em] w-auto drop-shadow-[0_26px_45px_rgba(0,0,0,0.65)]" />
            </span>
          </h1>

          <div
            className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 opacity-0 animate-fade-in sm:mt-10"
            style={{ animationDelay: '760ms' }}
          >
            <p className="max-w-md text-[13px] leading-relaxed text-muted">
              ATVs, motocross and adventure riding. A dark, technical home for a
              brand built on dust, torque and terrain.
            </p>
          </div>

          <div
            className="mt-10 grid grid-cols-2 items-end gap-6 border-t border-white/10 pt-5 text-left opacity-0 animate-fade-in sm:mt-14 sm:grid-cols-3"
            style={{ animationDelay: '900ms' }}
          >
            <div>
              <p className="label text-dim">Terrain</p>
              <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.12em] text-cream/90">
                ATV / MX / Adventure
              </p>
            </div>
            <div className="hidden sm:block">
              <p className="label text-dim">Base camp</p>
              <p className="mt-2 font-tech text-[12px] uppercase tracking-[0.12em] text-cream/90">
                Almería — ES
              </p>
            </div>
            <div className="flex justify-end">
              <a
                href="#showcase"
                className="arrow-slide group inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-orange"
              >
                Scroll to explore
                <ArrowDownRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
