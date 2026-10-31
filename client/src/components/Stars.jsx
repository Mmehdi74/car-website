import { Star } from './icons.jsx';

export function Stars({ rating, size = 13 }) {
  const rounded = Math.round(rating);
  return (
    <span className="stars" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star key={index} filled={index <= rounded} size={size} />
      ))}
    </span>
  );
}
