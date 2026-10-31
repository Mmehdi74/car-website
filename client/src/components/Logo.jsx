import { site } from '../data/site.js';

export function LogoMark({ size = 34 }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 9 20 33 36 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M11.5 9 20 22.2 28.5 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.5"
      />
      <circle cx="20" cy="33" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Logo({ withCaption = true }) {
  return (
    <span className="brand__lockup">
      <LogoMark />
      <span className="brand__text">
        <strong>{site.brand}</strong>
        {withCaption ? <em>{site.brandCaption}</em> : null}
      </span>
    </span>
  );
}
