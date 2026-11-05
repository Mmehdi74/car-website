import { ArrowUpRight, LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import { images, showcaseStrip } from '../data/content';

export default function MainShowcase() {
  return (
    <section id="showcase" className="relative pb-16 pt-2 lg:pb-24 lg:pt-6">
      <div className="shell">
        <div className="card-surface bg-base shadow-cinematic">
          {/* miniature site navigation */}
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.09] px-4 py-3 sm:px-6">
            <span className="font-display text-[17px] tracking-[0.24em] text-cream">
              SQUADRO
            </span>
            <div className="hidden items-center gap-8 font-tech text-[9.5px] uppercase tracking-[0.22em] md:flex">
              <span className="text-cream">Main</span>
              <span className="text-dim">Bikes</span>
              <span className="text-dim">Gear</span>
              <span className="text-dim">Guides</span>
            </div>
            <div className="flex items-center gap-4 text-cream/55">
              <Search size={14} strokeWidth={1.4} aria-hidden />
              <ShoppingBag size={14} strokeWidth={1.4} aria-hidden />
              <LayoutGrid size={14} strokeWidth={1.4} aria-hidden />
            </div>
          </div>

          <div className="grid lg:aspect-[16/8.4] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
            {/* copy block */}
            <div className="relative order-2 flex flex-col justify-between gap-9 overflow-hidden px-5 py-8 sm:px-8 sm:py-9 lg:order-1 lg:px-10 lg:py-11">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 top-4 select-none font-display text-[5.5rem] uppercase leading-none tracking-[0.02em] text-white/[0.035] sm:text-[7rem] lg:text-[8rem]"
              >
                MAIN RIDE
              </span>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg leading-none text-orange">01</span>
                  <span className="label text-cream/70">Main page</span>
                  <span className="ml-1 border border-white/15 px-2 py-1 font-tech text-[9px] uppercase tracking-[0.18em] text-orange">
                    Best quad bike
                  </span>
                </div>

                <h2 className="mt-7 font-display uppercase leading-[0.8] text-cream">
                  <span className="block text-[clamp(2.6rem,5.4vw,4.4rem)]">Drive</span>
                  <span className="block text-[clamp(2.6rem,5.4vw,4.4rem)]">
                    your beast
                  </span>
                </h2>

                <p className="mt-5 max-w-[20rem] text-[12.5px] leading-[1.8] text-muted">
                  976 cc of controlled violence. Built to hold a line through rock
                  gardens, sand washes and everything the map forgot.
                </p>
              </div>

              <div className="relative flex flex-wrap items-center gap-5">
                <a href="#bikes" className="btn-primary group">
                  Discover the quad
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <span className="font-tech text-[9.5px] uppercase tracking-[0.2em] text-dim">
                  From €14,900
                </span>
              </div>
            </div>

            {/* hero visual */}
            <div className="group relative order-1 aspect-[16/11] overflow-hidden border-b border-white/[0.09] sm:aspect-[16/10] lg:order-2 lg:aspect-auto lg:h-full lg:border-b-0 lg:border-l">
              <img
                src={images.heroAtv}
                alt="Rider on a yellow and black ATV throwing dust on an off-road track"
                className="h-full w-full object-cover object-[center_58%] transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base/70 via-base/5 to-transparent lg:from-base/60" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/15" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <span className="font-tech text-[9px] uppercase tracking-[0.24em] text-cream/80">
                  Renegad XXC 1000
                </span>
                <span className="border border-white/20 bg-ink/40 px-2 py-1 font-tech text-[9px] uppercase tracking-[0.2em] text-cream/80 backdrop-blur-sm">
                  Dust / Stage 03
                </span>
              </div>
            </div>
          </div>

          {/* information strip */}
          <div className="grid border-t border-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative hidden overflow-hidden border-white/[0.09] sm:col-span-1 sm:block sm:border-r">
              <img
                src={images.atvTrail}
                alt="ATV crossing a desert trail"
                className="h-full min-h-[112px] w-full object-cover transition-transform duration-[900ms] ease-premium hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-ink/30" />
            </div>

            {showcaseStrip.map((item, i) => (
              <div
                key={item.title}
                className={`group/cell flex flex-col gap-2 border-white/[0.09] p-4 transition-colors duration-500 hover:bg-white/[0.02] sm:p-4 ${
                  i < showcaseStrip.length - 1 ? 'border-b sm:border-b-0' : ''
                } ${i === 0 ? 'sm:col-span-2 sm:border-b lg:col-span-1 lg:border-b-0' : ''} sm:border-r lg:border-r last:border-r-0`}
              >
                <span className="font-tech text-[9px] uppercase tracking-[0.22em] text-orange">
                  0{i + 2}
                </span>
                <div>
                  <p className="font-tech text-[10.5px] uppercase tracking-[0.1em] text-cream">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[10.5px] leading-[1.55] text-dim">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3.5 text-right font-tech text-[9px] uppercase tracking-[0.26em] text-dim/70">
          Interactive concept preview — SQUADRO / 2019
        </p>
      </div>
    </section>
  );
}
