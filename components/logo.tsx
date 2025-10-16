export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Appreciation Logo"
      role="img"
      focusable="false"
    >
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5b5bd6" />
          <stop offset="100%" stopColor="#7c4dff" />
        </linearGradient>
      </defs>
      {/* Gradient rounded square */}
      <rect x="24" y="24" width="208" height="208" rx="56" fill="url(#logo-g)" />
      {/* Stylized A mark (matches app/icon.svg) */}
      <g transform="translate(64,64)">
        <path d="M64 0 L96 96 H80 L70 70 H58 L48 96 H32 L64 0 Z" fill="#fff" opacity="0.95" />
        <rect x="52" y="58" width="24" height="12" rx="6" fill="#fff" opacity="0.95" />
      </g>
    </svg>
  )
}
