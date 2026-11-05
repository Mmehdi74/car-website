import { ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-orange/[0.07] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#171e27_0%,#0c1016_60%)]" />
        <div className="absolute inset-0 grain" />
      </div>

      <div className="shell relative py-24 text-center sm:py-28 lg:py-36">
        <p className="label-orange">Start the engine</p>

        <h2 className="display-lg mx-auto mt-6 max-w-[14ch] text-cream">
          Ready to ride?
        </h2>

        <p className="mx-auto mt-5 max-w-md text-[13.5px] leading-relaxed text-muted">
          Discover the world beyond the road.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#bikes" className="btn-primary group">
            Explore the experience
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="mailto:ride@squadro.com?subject=Test%20ride%20request"
            className="btn-ghost"
          >
            ride@squadro.com
          </a>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/10 pt-8 text-center sm:grid-cols-3 sm:text-left">
          {[
            { term: 'Showroom', value: 'Calle del Polvo 14, Almería' },
            { term: 'Hours', value: 'Mon — Sat / 09:00 — 19:00' },
            { term: 'Dealers', value: '38 across Europe' },
          ].map((item) => (
            <div key={item.term}>
              <dt className="font-tech text-[8.5px] uppercase tracking-[0.24em] text-dim">
                {item.term}
              </dt>
              <dd className="mt-2 text-[12px] leading-relaxed text-cream/80">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
