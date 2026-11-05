import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Guide } from '../data/content';

type GuideModalProps = {
  guide: Guide;
  onClose: () => void;
};

export default function GuideModal({ guide, onClose }: GuideModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl animate-scale-in overflow-y-auto rounded-t-[4px] border border-white/12 bg-base shadow-lift sm:rounded-[3px]">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-cream transition-colors hover:border-orange hover:text-orange"
          aria-label="Close guide"
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        <div className="relative h-44 overflow-hidden sm:h-56">
          <img
            src={guide.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
          <div className="absolute inset-x-5 bottom-4">
            <p className="label-orange">
              {guide.index} / {guide.category}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <h3
            id="guide-modal-title"
            className="display-md text-cream"
          >
            {guide.title}
          </h3>
          <div className="mt-3 flex items-center gap-3 font-tech text-[9px] uppercase tracking-[0.2em] text-dim">
            <span>Reading time {guide.read}</span>
            <span className="h-2.5 w-px bg-white/15" />
            <span>Squadro field notes</span>
          </div>
          <p className="copy mt-5">{guide.body}</p>

          <button type="button" onClick={onClose} className="btn-ghost mt-7">
            Back to guides
          </button>
        </div>
      </div>
    </div>
  );
}
