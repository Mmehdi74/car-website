/**
 * Every photographic asset in the site lives here so it can be swapped in one place.
 * Replace any URL with your own licensed automotive photography — keep the same keys.
 */
const unsplash = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const images = {
  // Cinematic hero — black Porsche, low-key studio lighting.
  hero: unsplash('photo-1503376780353-7e6692767b70', 2000),
  // Promotional campaign banner.
  promo: unsplash('photo-1618843479313-40f8afb4b4d8', 1400),
  // Brand story: one wide frame + one smaller overlapping detail frame.
  aboutWide: unsplash('photo-1542362567-b07e54358753', 1200),
  aboutDetail: unsplash('photo-1493238792000-8113da705763', 800),
  // Vehicle photography.
  rollsGhost: unsplash('photo-1631295868223-63265b40d9e4', 1200),
  audiRs7: unsplash('photo-1606664515524-ed2f786a0bd6', 1200),
  audiA7: unsplash('photo-1616422285623-13ff0162193c', 1200),
  rangeRover: unsplash('photo-1563720223185-11003d516935', 1200),
  amgG63: unsplash('photo-1520031441872-265e4ff70366', 1200),
  amgGt: unsplash('photo-1553440569-bcc63803a83d', 1200),
  huracan: unsplash('photo-1503736334956-4c8f8e92946d', 1200),
  ferrariRoma: unsplash('photo-1592198084033-aade902d1aae', 1200),
  bmwM4: unsplash('photo-1580273916550-e323be2ae537', 1200),
};
