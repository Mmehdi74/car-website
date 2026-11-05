import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

type CardShellProps = {
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
};

function CardShell({ index, label, children, className = '' }: CardShellProps) {
  return (
    <article
      className={`group card-surface shadow-cinematic transition-colors duration-500 ease-premium hover:border-white/25 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-3.5">
        <span className="flex items-center gap-2.5">
          <span className="font-tech text-[10px] tracking-[0.2em] text-orange">{index}</span>
          <span className="h-2.5 w-px bg-white/15" />
          <span className="font-tech text-[9px] uppercase tracking-[0.22em] text-dim">
            {label}
          </span>
        </span>
        <ArrowUpRight
          size={13}
          strokeWidth={1.5}
          className="text-dim/60 transition-colors duration-400 group-hover:text-orange"
          aria-hidden
        />
      </div>
      {children}
    </article>
  );
}

type AboutCardProps = {
  index: string;
  label: string;
  className?: string;
  children: ReactNode;
};

/** Thin wrapper re-exported so each grid card can own its own composition. */
export default function AboutCard({ index, label, className, children }: AboutCardProps) {
  return (
    <CardShell index={index} label={label} className={className}>
      {children}
    </CardShell>
  );
}
