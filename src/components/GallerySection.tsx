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

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2">
          {gallery.map((item, i) => (
            <Reveal key={item.caption} delay={(i % 2) * 70}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-[2px]">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.035]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/5 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <p className="font-tech text-[9px] uppercase tracking-[0.24em] text-orange">
                      {item.meta}
                    </p>
                    <p className="mt-1.5 font-tech text-[10.5px] uppercase tracking-[0.14em] text-cream/85">
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
