import { useCallback, useRef, useState } from 'react';
import { images } from '../data/images.js';
import { useScrollScrubber } from '../hooks/useScrollScrubber.js';
import { HashLink } from './HashLink.jsx';
import { ArrowRight } from './icons.jsx';
import './ScrollDrivenHero.css';

const lines = ['Luxury', 'Lifestyle', 'Rentals'];

/**
 * The supplied Mercedes-Benz reveal (3.75 s · 24 fps · 1280×720), re-encoded
 * all-intra so every frame is a keyframe: seeking is a single-frame decode and
 * scrubbing stays smooth in both directions.
 * `benz-poster.webp` is frame 0, `benz-final.webp` frame 89 (the three-quarter view).
 */
const VIDEO_SRC = '/media/benz-scrub.mp4';
const POSTER_SRC = '/media/benz-poster.webp';
const FINAL_STILL = '/media/benz-final.webp';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ScrollDrivenHero() {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const veilRef = useRef(null);
  const metaRef = useRef(null);
  const barRef = useRef(null);

  const [reduced] = useState(prefersReducedMotion);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  /** Written straight to the DOM — the hero never re-renders while scrolling. */
  const handleProgress = useCallback((progress) => {
    const fade = 1 - Math.min(Math.max((progress - 0.1) / 0.2, 0), 1);

    if (contentRef.current) {
      contentRef.current.style.opacity = fade.toFixed(3);
      contentRef.current.style.transform = `translate3d(0, ${(-36 * (1 - fade)).toFixed(2)}px, 0)`;
      contentRef.current.style.pointerEvents = fade < 0.05 ? 'none' : '';
    }
    if (veilRef.current) veilRef.current.style.opacity = (1 - progress * 0.55).toFixed(3);
    if (metaRef.current) {
      metaRef.current.style.opacity = (1 - Math.min(progress / 0.12, 1)).toFixed(3);
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
  }, []);

  const useVideo = !reduced && !failed;

  useScrollScrubber({
    wrapperRef,
    stageRef,
    videoRef,
    enabled: useVideo,
    onProgress: handleProgress,
  });

  const fallbackImage = (event) => {
    event.currentTarget.src = images.hero;
  };

  return (
    <section
      ref={wrapperRef}
      className={`hero ${reduced ? 'hero--static' : ''} ${ready ? 'is-ready' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="hero__stage" ref={stageRef}>
        <div className="hero__media">
          {useVideo ? (
            <>
              <img className="hero__poster" src={POSTER_SRC} alt="" aria-hidden="true" />
              <video
                ref={videoRef}
                className="hero__video"
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                preload="auto"
                muted
                playsInline
                disablePictureInPicture
                tabIndex={-1}
                aria-hidden="true"
                onLoadedData={() => setReady(true)}
                onError={() => setFailed(true)}
              />
            </>
          ) : (
            <img
              className="hero__still"
              src={FINAL_STILL}
              alt="Mercedes-Benz G-Class in a cinematic three-quarter front view"
              onError={fallbackImage}
            />
          )}
        </div>

        <div className="hero__veil" ref={veilRef} aria-hidden="true" />

        <div className="hero__inner container" ref={contentRef}>
          <p className="eyebrow hero__eyebrow">Miami — Est. 2011</p>

          <h1 className="hero__title" id="hero-title">
            {lines.map((line, index) => (
              <span key={line} style={{ animationDelay: `${140 + index * 130}ms` }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__lede">
            Experience the extraordinary. Discover exceptional luxury vehicles and redefine every
            journey.
          </p>

          <div className="hero__actions">
            <HashLink to="/#fleet" className="btn btn--gold">
              Explore our fleet
              <ArrowRight />
            </HashLink>
            <a className="hero__phone" href="tel:+13055550138">
              Or call our concierge
            </a>
          </div>
        </div>

        <div className="hero__meta" ref={metaRef}>
          <span className="hero__scroll">
            <i aria-hidden="true" />
            Scroll to reveal
          </span>
          <span className="hero__meta-right">Cinematic reveal — Scroll drives the film</span>
        </div>

        <div className="hero__progress" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  );
}
