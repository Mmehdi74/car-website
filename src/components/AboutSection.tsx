import { ArrowRight } from 'lucide-react';
import { aboutCopy, images } from '../data/content';
import AboutCard from './AboutCard';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import HelmetMark from './HelmetMark';

const gear = [
  { name: 'Vantage MX', price: '$150.00', accent: '#FF681E', deep: '#E94B13' },
  { name: 'Carbon Pro', price: '$240.00', accent: '#F5F5F3', deep: '#9CA3AD' },
  { name: 'Dust Series', price: '$190.00', accent: '#E94B13', deep: '#7A2405' },
];

const stories = [
  { title: 'Ridge run', meta: '3 days / 210 km', image: images.mxMountain },
  { title: 'Dust line', meta: 'Dawn session', image: images.atvLine },
  { title: 'Desert camp', meta: 'Almería / ES', image: images.desertRoad },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="01"
            title="About"
            kicker={aboutCopy.kicker}
            body={aboutCopy.body}
            body2={aboutCopy.body2}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:gap-4">
          {/* 01 — main ride */}
          <Reveal className="h-full">
            <AboutCard index="01" label="Main ride" className="h-full">
              <div className="relative min-h-[240px] flex-1 overflow-hidden">
                <img
                  src={images.heroAtv}
                  alt="Rider on a yellow quad bike drifting through dust"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span className="absolute left-5 top-5 border border-white/20 bg-ink/40 px-2 py-1 font-tech text-[9px] uppercase tracking-[0.22em] text-cream/80 backdrop-blur-sm">
                  Featured
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h4 className="display-md text-cream">Drive your beast</h4>
                  <p className="mt-2 max-w-sm text-[12.5px] leading-relaxed text-muted">
                    One machine, one line. The flagship quad in its natural element.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.09] px-6 py-3.5">
                <span className="label text-dim">Renegad XXC 1000</span>
                <span className="label text-dim">4x4 / 976 cc</span>
              </div>
            </AboutCard>
          </Reveal>

          {/* 02 — bikes */}
          <Reveal delay={80} className="h-full">
            <AboutCard index="02" label="Bikes" className="h-full">
              <div className="relative overflow-hidden bg-[radial-gradient(circle_at_62%_28%,#242c36_0%,#161c24_48%,#0f141a_100%)] p-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[6rem] leading-none text-white/[0.035]"
                >
                  02
                </span>
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="label-orange">02 Bikes</p>
                    <h4 className="display-md mt-3 max-w-[15rem] text-cream">
                      ATV Redefined
                    </h4>
                  </div>
                  <span className="mt-1 shrink-0 border border-orange/40 px-2 py-1 font-tech text-[9px] uppercase tracking-[0.18em] text-orange">
                    New
                  </span>
                </div>

                <div className="relative mt-5 overflow-hidden">
                  <img
                    src={images.atvDirt}
                    alt="Aggressive off-road quad bike on a dirt track"
                    className="aspect-[16/10] w-full rounded-[2px] object-cover object-center transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[2px] ring-1 ring-inset ring-white/10" />
                </div>

                <p className="copy mt-5 max-w-[26rem]">
                  ATV RENEGAD XXC 1000 — a 976 cc V-twin, 89 hp and 412 kg of
                  deliberately low centre of gravity.
                </p>

                <a
                  href="#bikes"
                  className="btn-primary mt-6 group/cta"
                  aria-label="Explore the ATV Renegad XXC 1000"
                >
                  Explore the bike
                  <ArrowRight
                    size={14}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover/cta:translate-x-1"
                  />
                </a>
              </div>
            </AboutCard>
          </Reveal>

          {/* 03 — gear */}
          <Reveal delay={120} className="h-full">
            <AboutCard index="03" label="Gear" className="h-full">
              <div className="p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="label-orange">03 Gear</p>
                    <h4 className="display-md mt-3 text-cream">Riding gear</h4>
                  </div>
                  <span className="label text-dim">3 colourways</span>
                </div>

                <ul className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                  {gear.map((item) => (
                    <li key={item.name} className="group/gear">
                      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2px] border border-white/10 bg-[radial-gradient(circle_at_50%_30%,#232b35_0%,#161c24_60%,#10151b_100%)]">
                        <div className="absolute inset-x-4 bottom-3 h-2 rounded-full bg-black/40 blur-md" />
                        <HelmetMark
                          accent={item.accent}
                          accentDeep={item.deep}
                          className="relative h-[78%] w-auto drop-shadow-[0_12px_18px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-premium group-hover/gear:-translate-y-1 group-hover/gear:scale-[1.04]"
                        />
                      </div>
                      <p className="mt-2 font-tech text-[9px] uppercase tracking-[0.16em] text-dim">
                        {item.name}
                      </p>
                      <p className="mt-0.5 font-tech text-[11px] tracking-[0.06em] text-cream/90">
                        {item.price}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="label text-dim">Certified ECE 22.06</span>
                  <a
                    href="#contact"
                    className="arrow-slide inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.18em] text-cream transition-colors hover:text-orange"
                  >
                    Shop gear
                    <ArrowRight size={12} strokeWidth={1.75} />
                  </a>
                </div>
              </div>
            </AboutCard>
          </Reveal>

          {/* 04 — stories */}
          <Reveal delay={160} className="h-full">
            <AboutCard index="04" label="Stories" className="h-full">
              <div className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="label-orange">04 Adventures</p>
                      <h4 className="display-md mt-3 text-cream">Off-road stories</h4>
                    </div>
                    <span className="label text-dim">Journal</span>
                  </div>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
                    {stories.map((story) => (
                      <li key={story.title} className="group/story">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-white/10">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-premium group-hover/story:scale-[1.06]"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                        </div>
                        <p className="mt-2 font-tech text-[9.5px] uppercase tracking-[0.14em] text-cream/85">
                          {story.title}
                        </p>
                        <p className="mt-0.5 font-tech text-[9px] uppercase tracking-[0.16em] text-dim">
                          {story.meta}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="#guides" className="btn-primary mt-6 self-start group/cta2">
                  All adventures
                  <ArrowRight
                    size={14}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover/cta2:translate-x-1"
                  />
                </a>
              </div>
            </AboutCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
