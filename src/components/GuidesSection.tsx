import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { guides, type Guide } from '../data/content';
import GuideModal from './GuideModal';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function GuidesSection() {
  const [selected, setSelected] = useState<Guide | null>(null);

  return (
    <section id="guides" className="relative py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="02"
            title="Guides"
            kicker="So what did we have to do"
            body="Build a knowledge base that respects the rider: how to choose a machine, how to read terrain, how to protect yourself and how to keep the thing running when the nearest workshop is two valleys away."
            body2="Six field guides, written by the people who test the bikes. No marketing, just the things that keep you moving."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {guides.map((guide, i) => (
            <Reveal key={guide.id} delay={(i % 3) * 70}>
              <button
                type="button"
                onClick={() => setSelected(guide)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col overflow-hidden rounded-[3px] border border-white/10 bg-card text-left shadow-cinematic transition-colors duration-500 ease-premium hover:border-white/25"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                  <span className="absolute left-4 top-4 font-tech text-[10px] tracking-[0.2em] text-cream/90">
                    {guide.index}
                  </span>
                  <span className="absolute bottom-3 right-4 font-tech text-[8.5px] uppercase tracking-[0.22em] text-cream/60">
                    {guide.read} read
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="label-orange">{guide.category}</p>
                  <h3 className="mt-3 font-display text-[26px] uppercase leading-none tracking-[0.02em] text-cream transition-colors duration-300 group-hover:text-white">
                    {guide.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-muted">
                    {guide.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="label text-dim">Open guide</span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="text-dim/70 transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange"
                      aria-hidden
                    />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected ? <GuideModal guide={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
}
