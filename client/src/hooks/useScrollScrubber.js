import { useEffect, useRef } from 'react';

/** The supplied asset is 24 fps — frame boundaries and the end clamp derive from it. */
const FPS = 24;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Turns a scroll runway into a scrubbed, permanently paused video timeline.
 *
 * Scroll events never touch `video.currentTime` directly: they only schedule one
 * animation frame, which converts the latest scroll offset into a frame index
 * and seeks there. While a seek is in flight only the newest frame is kept
 * pending, so a fast scroll cannot queue dozens of stale seeks. Nothing here
 * updates React state, so scrubbing never re-renders the page.
 */
export function useScrollScrubber({ wrapperRef, stageRef, videoRef, enabled = true, onProgress }) {
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!enabled || !wrapper || !video) return undefined;

    let rafId = 0;
    let inView = false;
    let top = 0;
    let distance = 1;
    let lastProgress = -1;
    let pendingFrame = null;

    const measure = () => {
      const rect = wrapper.getBoundingClientRect();
      const stageHeight = stageRef.current?.clientHeight || window.innerHeight;
      top = rect.top + window.scrollY;
      distance = Math.max(rect.height - stageHeight, 1);
    };

    /** Seek to the newest requested frame, unless one is already being decoded. */
    const commit = () => {
      if (pendingFrame === null || !video.duration) return;
      if (video.seeking) return; // resumed by the `seeked` handler below

      const frameCount = Math.max(1, Math.round(video.duration * FPS));
      const index = clamp(pendingFrame, 0, frameCount - 1);
      pendingFrame = null;

      // Sub-frame requests are pointless: we are already showing that frame.
      if (Math.round(video.currentTime * FPS) === index) return;
      video.currentTime = index / FPS;
    };

    const render = () => {
      rafId = 0;
      if (!inView || !video.duration) return;

      const progress = clamp((window.scrollY - top) / distance, 0, 1);
      if (Math.abs(progress - lastProgress) > 0.0001) {
        lastProgress = progress;
        onProgressRef.current?.(progress);
      }

      // The whole timeline maps linearly onto the whole runway; the last frame
      // is reached exactly at the end of the scroll.
      const frameCount = Math.max(1, Math.round(video.duration * FPS));
      pendingFrame = Math.floor(progress * frameCount);
      commit();
    };

    const schedule = () => {
      if (!rafId) rafId = window.requestAnimationFrame(render);
    };

    const refresh = () => {
      measure();
      schedule();
    };

    const onVideoReady = () => schedule();
    const onSeeked = () => commit();

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView) refresh();
        else if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { rootMargin: '10% 0px' },
    );

    const resizeObserver = new ResizeObserver(refresh);

    measure();
    observer.observe(wrapper);
    resizeObserver.observe(wrapper);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('orientationchange', refresh);
    video.addEventListener('loadedmetadata', onVideoReady);
    video.addEventListener('loadeddata', onVideoReady);
    video.addEventListener('seeked', onSeeked);

    // A reload can restore a scroll position inside the runway before metadata
    // is available, so also try once the element is ready.
    if (video.readyState >= 1) schedule();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('orientationchange', refresh);
      video.removeEventListener('loadedmetadata', onVideoReady);
      video.removeEventListener('loadeddata', onVideoReady);
      video.removeEventListener('seeked', onSeeked);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [enabled, stageRef, videoRef, wrapperRef]);
}
