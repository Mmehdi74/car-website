export default function Stars({ rating, label = true }) {
  return (
    <span className="stars" aria-hidden={label ? undefined : 'true'}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`stars__item${i < rating ? ' is-on' : ''}`}
          focusable="false"
        >
          <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.45 6.19 20.5l1.11-6.47L2.6 9.45l6.5-.95L12 2.6z" />
        </svg>
      ))}
      {label && <span className="stars__sr">{rating} out of 5</span>}
    </span>
  );
}
