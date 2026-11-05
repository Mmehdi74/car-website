import { ArrowDownRight } from 'lucide-react';
import { images } from '../data/content';
import HelmetMark from './HelmetMark';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[88svh] flex-col overflow-hidden pb-8 pt-24 sm:min-h-[100svh] sm:pt-28 lg:pb-10"
    >
      {/* terrain backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={images.mountains}
          alt=""
          className="h-full w-full scale-105 object-cover object-[center_46%] opacity-[0.52] saturate-[0.4] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0A0D11_0%,rgba(10,13,17,0.82)_14%,rgba(10,13,17,0.38)_44%,rgba(10,13,17,0.72)_74%,#0A0D11_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(115%_75%_at_50%_42%,rgba(10,13,17,0)_0%,rgba(10,13,17,0.55)_68%,#0A0D11_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="shell relative flex flex-1 flex-col">
        <div
          className="flex items-center justify-between gap-4 border-b border-white/10 pb-3.5 opacity-0 animate-fade-in"
          style={{ animationDelay: '80ms' }}
        >
          <span className="label">2019</span>
          <span className="label hidden sm:block">Alex Bunin — art direction</span>
          <span className="label">M / EN</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-14 text-center sm:py-16 lg:py-20">
          <p
            className="label-orange opacity-0 animate-fade-in"
            style={{ animationDelay: '180ms' }}
          >
            Website design concept
          </p>

          <h1
            className="mt-5 flex select-none items-center justify-center font-display uppercase leading-[0.74] text-cream opacity-0 animate-fade-up sm:mt-6"
            style={{
              animationDelay: '260ms',
              fontSize: 'clamp(3rem, 27.4vw, 22.5rem)',
              letterSpacing: '0.005em',
            }}
          >
            <span className="wordmark-grain">SQUADR</span>
            <span
              className="relative -ml-[0.055em] inline-flex shrink-0 items-center justify-center opacity-0 animate-scale-in"
              style={{
                width: '0.62em',
                height: '0.76em',
                animationDelay: '620ms',
              }}
            >
              <HelmetMark className="h-[0.94em] w-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.75)]" />
            </span>
          </h1>

          <p
            className="mt-11 max-w-[24rem] text-[12.5px] leading-[1.85] text-muted opacity-0 animate-fade-in sm:mt-12 sm:max-w-[26rem] sm:text-[13px]"
            style={{ animationDelay: '760ms' }}
          >
            ATVs, motocross and adventure riding. A dark, technical home for a brand
            built on dust, torque and terrain.
          </p>
        </div>

        <div
          className="grid grid-cols-2 items-end gap-6 border-t border-white/10 pt-4 text-left opacity-0 animate-fade-in sm:grid-cols-3 sm:pt-5"
          style={{ animationDelay: '900ms' }}
        >
          <div>
            <p className="label text-dim">Terrain</p>
            <p className="mt-2 font-tech text-[11.5px] uppercase tracking-[0.12em] text-cream/90">
              ATV / MX / Adventure
            </p>
          </div>
          <div className="hidden sm:block">
            <p className="label text-dim">Base camp</p>
            <p className="mt-2 font-tech text-[11.5px] uppercase tracking-[0.12em] text-cream/90">
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
    </section>
  );
}
