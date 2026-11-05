type SectionHeadingProps = {
  index: string;
  title: string;
  kicker: string;
  body: string;
  body2?: string;
};

export default function SectionHeading({
  index,
  title,
  kicker,
  body,
  body2,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-10">
      <div className="flex items-start gap-4 sm:gap-6">
        <span className="mt-2 font-tech text-[11px] uppercase tracking-[0.24em] text-orange">
          {index}
        </span>
        <h2 className="display-lg text-cream">{title}</h2>
      </div>

      <div className="max-w-[34rem] lg:pt-1">
        <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.9rem)] uppercase leading-[1.15] tracking-[0.03em] text-cream">
          {kicker}
        </h3>
        <p className="copy mt-4">{body}</p>
        {body2 ? <p className="copy mt-4">{body2}</p> : null}
      </div>
    </div>
  );
}
