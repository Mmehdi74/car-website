import { images } from '../data/content';

export default function Experience() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src={images.mxOrange}
          alt=""
          className="h-full w-full object-cover object-[center_38%]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="shell py-24 sm:py-28 lg:py-36">
        <p className="label-orange">Riding experience</p>
        <h2 className="display-lg mt-5 max-w-[18ch] text-cream">
          Built for the
          <br />
          unpredictable.
        </h2>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-[13px] leading-relaxed text-cream/70">
            Loose shale, dry riverbeds, altitude and weather. We develop on terrain
            that refuses to be tamed — then hand you the keys.
          </p>
          <a href="#gallery" className="btn-ghost shrink-0 self-start sm:self-auto">
            View the gallery
          </a>
        </div>
      </div>
    </section>
  );
}
