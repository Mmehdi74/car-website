import { useEffect, useState } from 'react';

/**
 * Tracks which section owns the viewport. A section becomes active once its top
 * crosses the upper third of the screen, which matches where anchor scrolling
 * (plus scroll-margin) leaves it.
 */
export function useActiveSection(ids: readonly string[]) {
  const key = ids.join('|');
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = key.split('|');
    const update = () => {
      const marker = window.innerHeight * 0.38;
      let current = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [key]);

  return active;
}
