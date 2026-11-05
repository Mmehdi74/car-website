import { gallery } from '../data/content';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="04"
            title="Gallery"
            kicker="Field photography"
            body="Shots from the proving ground, the race weekends and the long way home. Dust, chrome and the last light of the day."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-12">
          {gallery.map((item, i) => (
            <Reveal key={item.caption} delay={(i % 3) * 60} className={item.span}>
              <figure className={`group relative overflow-hidden rounded-[3px] ${item.ratio}`}>
                <img
                  src={item.src}
                  alt={item.caption}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <div>
                    <p className="font-tech text-[8px] uppercase tracking-[0.24em] text-orange">
                      {item.meta}
                    </p>
                    <p className="mt-1.5 font-tech text-[10.5px] uppercase tracking-[0.14em] text-cream/90">
                      {item.caption}
                    </p>
                  </div>
                  <span className="mb-0.5 h-px w-6 shrink-0 bg-orange/70 transition-all duration-500 group-hover:w-10" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
