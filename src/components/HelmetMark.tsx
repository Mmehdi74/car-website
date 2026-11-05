import { useId } from 'react';

type HelmetMarkProps = {
  className?: string;
  accent?: string;
  accentDeep?: string;
};

/**
 * Front-facing motocross helmet used as the "O" of the wordmark and as the
 * studio product shot inside the gear card. Drawn as layered SVG so it stays
 * crisp at any size and needs no external asset.
 */
export default function HelmetMark({
  className = '',
  accent = '#FF681E',
  accentDeep = '#E94B13',
}: HelmetMarkProps) {
  const uid = useId().replace(/[:]/g, '');
  const id = (name: string) => `${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 240 264"
      className={className}
      role="img"
      aria-label="SQUADRO motocross helmet"
    >
      <defs>
        <linearGradient id={id('shell')} x1="16%" y1="4%" x2="84%" y2="96%">
          <stop offset="0%" stopColor="#525b67" />
          <stop offset="26%" stopColor="#2b333e" />
          <stop offset="62%" stopColor="#151b24" />
          <stop offset="100%" stopColor="#080b10" />
        </linearGradient>
        <linearGradient id={id('jaw')} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#20262f" />
          <stop offset="100%" stopColor="#0a0d13" />
        </linearGradient>
        <linearGradient id={id('peak')} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#3d4652" />
          <stop offset="55%" stopColor="#1b212a" />
          <stop offset="100%" stopColor="#0b0e14" />
        </linearGradient>
        <radialGradient id={id('gloss')} cx="34%" cy="16%" r="58%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.26" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('lens')} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#ffca9f" />
          <stop offset="30%" stopColor={accent} />
          <stop offset="72%" stopColor={accentDeep} />
          <stop offset="100%" stopColor="#7a2405" />
        </linearGradient>
        <linearGradient id={id('rim')} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="45%" stopColor={accent} stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id('clip')}>
          <path d="M120 8c-45 0-83 27-95 76-6 24-6 50 2 72 4 12 10 20 13 32 5 26 20 52 42 61 13 6 25 5 38 5s25 1 38-5c22-9 37-35 42-61 3-12 9-20 13-32 8-22 8-48 2-72-12-49-50-76-95-76Z" />
        </clipPath>
      </defs>

      {/* shell */}
      <path
        d="M120 8c-45 0-83 27-95 76-6 24-6 50 2 72 4 12 10 20 13 32 5 26 20 52 42 61 13 6 25 5 38 5s25 1 38-5c22-9 37-35 42-61 3-12 9-20 13-32 8-22 8-48 2-72-12-49-50-76-95-76Z"
        fill={`url(#${id('shell')})`}
      />

      <g clipPath={`url(#${id('clip')})`}>
        {/* crown shading + specular */}
        <ellipse cx="120" cy="118" rx="118" ry="126" fill={`url(#${id('gloss')})`} />
        <path
          d="M120 8c-45 0-83 27-95 76-3 12-4 25-4 37 14-64 46-93 99-93s85 29 99 93c0-12-1-25-4-37-12-49-50-76-95-76Z"
          fill="#ffffff"
          opacity="0.06"
        />

        {/* brow / peak band */}
        <path
          d="M30 108c4-40 24-66 52-78 12-5 25-8 38-8s26 3 38 8c28 12 48 38 52 78l-16 6c-8-32-34-52-74-52s-66 20-74 52Z"
          fill={`url(#${id('peak')})`}
        />
        <path
          d="M32 108c6-38 25-63 51-75"
          fill="none"
          stroke="#8e97a3"
          strokeOpacity="0.35"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* peak tips */}
        <path d="M26 104c6-4 14-1 16 6l-6 12c-7-1-12-9-10-18Z" fill="#0d1117" />
        <path d="M214 104c-6-4-14-1-16 6l6 12c7-1 12-9 10-18Z" fill="#0d1117" />

        {/* forehead vents */}
        <g fill="#05080c" opacity="0.85">
          <rect x="109" y="46" width="7" height="22" rx="3.5" />
          <rect x="122" y="44" width="7" height="24" rx="3.5" />
        </g>

        {/* face aperture */}
        <path
          d="M54 124c4-18 28-30 66-30s62 12 66 30c3 24-6 52-22 68-12 12-27 18-44 18s-32-6-44-18c-16-16-25-44-22-68Z"
          fill="#070a0f"
        />

        {/* goggles strap */}
        <path
          d="M56 118C36 112 22 118 12 132"
          fill="none"
          stroke="#c9ccd1"
          strokeOpacity="0.85"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M184 118c20-6 34 0 44 14"
          fill="none"
          stroke="#c9ccd1"
          strokeOpacity="0.85"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* goggles */}
        <path
          d="M52 120c-2-12 10-21 27-21h82c17 0 29 9 27 21-2 16-12 30-28 34-13 4-21-1-40-1s-27 5-40 1c-16-4-26-18-28-34Z"
          fill="#161b23"
          stroke="#04070b"
          strokeWidth="2"
        />
        <path
          d="M62 119c-1-8 8-14 19-14h78c11 0 20 6 19 14-2 12-10 23-23 26-11 3-18-1-35-1s-24 4-35 1c-13-3-21-14-23-26Z"
          fill={`url(#${id('lens')})`}
        />
        <path
          d="M68 116c5-7 15-11 27-11h20l-4 9H88c-8 0-14 3-18 7Z"
          fill="#ffffff"
          opacity="0.45"
        />
        <path
          d="M160 128c4 9 11 15 20 18"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* goggle frame rivets */}
        <g fill="#8e97a3" opacity="0.5">
          <circle cx="60" cy="112" r="2" />
          <circle cx="180" cy="112" r="2" />
        </g>

        {/* orange cheek flashes */}
        <path d="M64 190c6 20 17 37 30 48l-12 4c-16-12-27-31-31-50Z" fill={accent} opacity="0.9" />
        <path d="M176 190c-6 20-17 37-30 48l12 4c16-12 27-31 31-50Z" fill={accent} opacity="0.9" />
        <path d="M186 158l14-3 3 12-14 3Z" fill={accent} opacity="0.55" />

        {/* chin bar */}
        <path
          d="M70 196h100c6 0 10 5 9 11l-3 15c-1 7-7 12-14 12H78c-7 0-13-5-14-12l-3-15c-1-6 3-11 9-11Z"
          fill={`url(#${id('jaw')})`}
          stroke="#2b323c"
          strokeWidth="1.2"
        />
        <g stroke="#3a424e" strokeWidth="2" strokeLinecap="round" opacity="0.8">
          <path d="M104 205v16" />
          <path d="M114 205v16" />
          <path d="M124 205v16" />
          <path d="M134 205v16" />
        </g>
        <path
          d="M78 188c10 5 26 8 42 8s32-3 42-8"
          fill="none"
          stroke="#000"
          strokeOpacity="0.6"
          strokeWidth="3"
        />

        {/* rim light */}
        <path
          d="M120 8c-45 0-83 27-95 76-6 24-6 50 2 72 4 12 10 20 13 32 5 26 20 52 42 61"
          fill="none"
          stroke={`url(#${id('rim')})`}
          strokeWidth="2.4"
        />
      </g>

      {/* outer outline keeps it anchored on dark surfaces */}
      <path
        d="M120 8c-45 0-83 27-95 76-6 24-6 50 2 72 4 12 10 20 13 32 5 26 20 52 42 61 13 6 25 5 38 5s25 1 38-5c22-9 37-35 42-61 3-12 9-20 13-32 8-22 8-48 2-72-12-49-50-76-95-76Z"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.12"
        strokeWidth="1.2"
      />
    </svg>
  );
}
