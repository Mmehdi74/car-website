export function scrollToId(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const headerHeight = 76;
  const top = element.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top: Math.max(top, 0), behavior: reduceMotion ? 'auto' : 'smooth' });
}
