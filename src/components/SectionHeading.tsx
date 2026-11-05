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
    <div className="grid gap-9 border-t border-white/10 pt-7 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1fr)] lg:gap-16 lg:pt-8">
      <div className="flex items-start gap-5 sm:gap-6">
        <span className="mt-[0.85rem] font-tech text-[10.5px] uppercase tracking-[0.24em] text-orange sm:mt-[1.15rem]">
          {index}
        </span>
        <h2 className="display-lg text-cream">{title}</h2>
      </div>

      <div className="max-w-[33rem] lg:pt-2">
        <h3 className="font-display text-[clamp(1.3rem,2vw,1.75rem)] uppercase leading-[1.18] tracking-[0.035em] text-cream">
          {kicker}
        </h3>
        <p className="copy mt-4">{body}</p>
        {body2 ? <p className="copy mt-3.5">{body2}</p> : null}
      </div>
    </div>
  );
}
