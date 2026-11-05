import { ArrowRight } from 'lucide-react';
import { rides } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function FeaturedRides() {
  return (
    <section id="bikes" className="relative py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="03"
            title="Featured rides"
            kicker="Machines built for broken ground"
            body="Three platforms, three purposes. Every SQUADRO is developed on the same proving ground — volcanic rock, shale, sand and a lot of dust — before it earns a badge."
          />
        </Reveal>

        <div className="mt-10 flex flex-col lg:mt-14">
          {rides.map((ride, i) => (
            <Reveal key={ride.id} delay={i * 60}>
              <article
                className={`group grid gap-6 border-t border-white/10 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10 ${
                  i === rides.length - 1 ? 'border-b' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-[3px] border border-white/10 lg:col-span-7 ${
                    i % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={ride.image}
                      alt={ride.name}
                      className="h-full w-full object-cover transition-transform duration-[1300ms] ease-premium group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 border border-white/20 bg-ink/45 px-2 py-1 font-tech text-[8px] uppercase tracking-[0.22em] text-cream/85 backdrop-blur-sm">
                    {ride.sub}
                  </span>
                </div>

                <div className="flex flex-col justify-between lg:col-span-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-tech text-[10px] tracking-[0.2em] text-orange">
                        {ride.index}
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="label text-dim">2020 / Series</span>
                    </div>

                    <h3 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] uppercase leading-[0.95] tracking-[0.015em] text-cream">
                      {ride.name}
                    </h3>
                    <p className="copy mt-4 max-w-md">{ride.copy}</p>

                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-5">
                      {ride.specs.map((spec) => (
                        <div key={spec.label}>
                          <dt className="font-tech text-[8.5px] uppercase tracking-[0.22em] text-dim">
                            {spec.label}
                          </dt>
                          <dd className="mt-1.5 font-tech text-[13px] uppercase tracking-[0.06em] text-cream/90">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <a
                    href="#contact"
                    className="arrow-slide mt-7 inline-flex items-center gap-2 self-start border-b border-orange/50 pb-1 font-tech text-[10px] uppercase tracking-[0.22em] text-orange transition-colors hover:border-orange hover:text-cream"
                  >
                    Book a test ride
                    <ArrowRight size={13} strokeWidth={1.75} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
