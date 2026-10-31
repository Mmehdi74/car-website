const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Svg = ({ children, size = 18, ...rest }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...rest}>
    {children}
  </svg>
);

export const ArrowRight = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M4 12h15M13 6l6 6-6 6" />
  </Svg>
);

export const ArrowUpRight = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M7 17 17 7M8 7h9v9" />
  </Svg>
);

export const Star = ({ filled = false, size = 13 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
    <path
      d="M12 3.4l2.55 5.3 5.79.81-4.2 4.06.99 5.78L12 16.62l-5.13 2.73.99-5.78L3.66 9.5l5.79-.81L12 3.4z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export const Check = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M4.5 12.5l4.5 4.5 10-10" />
  </Svg>
);

export const Phone = (props) => (
  <Svg {...props}>
    <path
      {...stroke}
      d="M7.2 3.5h2.3l1.4 3.6-1.8 1.3a10.6 10.6 0 0 0 5 5l1.3-1.8 3.6 1.4v2.3a2.2 2.2 0 0 1-2.4 2.2A15.6 15.6 0 0 1 5 5.9a2.2 2.2 0 0 1 2.2-2.4z"
    />
  </Svg>
);

export const Mail = (props) => (
  <Svg {...props}>
    <rect {...stroke} x="3" y="5.5" width="18" height="13" rx="1.4" />
    <path {...stroke} d="m3.8 7 8.2 6 8.2-6" />
  </Svg>
);

export const Pin = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M12 21s6.5-6.1 6.5-10.6A6.5 6.5 0 0 0 5.5 10.4C5.5 14.9 12 21 12 21z" />
    <circle {...stroke} cx="12" cy="10.3" r="2.3" />
  </Svg>
);

export const Clock = (props) => (
  <Svg {...props}>
    <circle {...stroke} cx="12" cy="12" r="8.5" />
    <path {...stroke} d="M12 7.5V12l3 1.8" />
  </Svg>
);

export const Car = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M3.5 14.5h17M4.8 14.5 6 9.6a2 2 0 0 1 1.9-1.5h8.2a2 2 0 0 1 1.9 1.5l1.2 4.9" />
    <path {...stroke} d="M4.2 14.5v2.3h2.4v-2.3M17.4 14.5v2.3h2.4v-2.3" />
    <path {...stroke} d="M6.7 11.7h10.6" />
  </Svg>
);

export const Diamond = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M7 4h10l4 5.6-9 10.4L3 9.6 7 4z" />
    <path {...stroke} d="M3 9.6h18M9.6 4 8 9.6 12 20l4-10.4L14.4 4" />
  </Svg>
);

export const Handshake = (props) => (
  <Svg {...props}>
    <path {...stroke} d="m2.8 12 3.6-3.6 4 1.2 1.6 1.6 1.6-1.6 4-1.2L21.2 12" />
    <path {...stroke} d="m2.8 12 4.4 4.4 2.2-1.4 2.3 2.3 2.3-2.3 2.2 1.4 4.4-4.4" />
    <path {...stroke} d="m8.6 10.8 2 2M11 9.8l2 2" />
  </Svg>
);

export const Users = (props) => (
  <Svg {...props}>
    <circle {...stroke} cx="9.5" cy="8.2" r="3.2" />
    <path {...stroke} d="M3.6 19.4c.4-2.9 2.9-4.7 5.9-4.7s5.5 1.8 5.9 4.7" />
    <path {...stroke} d="M15.6 5.4a3 3 0 0 1 0 5.7M17 14.9c2 .5 3.3 2.1 3.6 4.5" />
  </Svg>
);

export const Cog = (props) => (
  <Svg {...props}>
    <circle {...stroke} cx="12" cy="12" r="2.6" />
    <path
      {...stroke}
      d="M12 3.5v2.2M12 18.3v2.2M4.9 7.9l1.9 1.1M17.2 15l1.9 1.1M4.9 16.1l1.9-1.1M17.2 9l1.9-1.1"
    />
  </Svg>
);

export const Fuel = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M5 20V5.6A1.6 1.6 0 0 1 6.6 4h4.8A1.6 1.6 0 0 1 13 5.6V20" />
    <path {...stroke} d="M3.5 20h11M5.6 9.6h6.8" />
    <path {...stroke} d="M13 8.4h2.6a2 2 0 0 1 2 2v5.4a1.9 1.9 0 0 0 3.8 0V9.6l-2-2" />
  </Svg>
);

export const Bolt = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M13.2 3 6 13.4h4.6L10.2 21 18 10.2h-4.8L13.2 3z" />
  </Svg>
);

export const Instagram = (props) => (
  <Svg {...props}>
    <rect {...stroke} x="4" y="4" width="16" height="16" rx="4.4" />
    <circle {...stroke} cx="12" cy="12" r="3.6" />
    <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" />
  </Svg>
);

export const Facebook = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M14.5 8.5h2.2V5.6h-2.4c-2 0-3.3 1.4-3.3 3.4v2H8.6v3h2.4V21h3.2v-7h2.3l.5-3h-2.8V9.4c0-.6.3-.9 1.3-.9z" />
  </Svg>
);

export const WhatsApp = (props) => (
  <Svg {...props}>
    <path
      {...stroke}
      d="M20 11.7a8 8 0 0 1-11.9 7L4 20l1.4-4a8 8 0 1 1 14.6-4.3z"
    />
    <path {...stroke} d="M9.2 8.7c.4-.1.6 0 .8.4l.7 1.2c.1.3.1.5-.1.7l-.5.5c-.2.2-.2.4-.1.6.6 1 1.4 1.8 2.4 2.3.3.2.5.1.7-.1l.5-.5c.2-.2.4-.2.7-.1l1.3.6c.4.2.5.4.4.8-.2 1-1 1.5-2 1.4-2.6-.2-5.4-3-5.6-5.5 0-1 .4-1.8 1.4-2z"
    />
  </Svg>
);

export const XBrand = (props) => (
  <Svg {...props}>
    <path {...stroke} d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
  </Svg>
);

export const socialIcons = {
  Instagram,
  Facebook,
  WhatsApp,
  X: XBrand,
};
