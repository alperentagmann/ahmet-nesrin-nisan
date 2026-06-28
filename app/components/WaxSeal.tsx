type WaxSealProps = {
  size?: number;
  className?: string;
};

export default function WaxSeal({ size = 140, className = "" }: WaxSealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="N & A mühür"
    >
      <defs>
        {/* Warm gold radial gradient — lighter highlight top-left */}
        <radialGradient id="waxBody" cx="38%" cy="32%" r="75%">
          <stop offset="0%"   stopColor="#ede0c8" />
          <stop offset="50%"  stopColor="#c5a880" />
          <stop offset="100%" stopColor="#8c6e45" />
        </radialGradient>

        {/* Subtle highlight for the pressed centre */}
        <radialGradient id="waxInner" cx="42%" cy="36%" r="60%">
          <stop offset="0%"   stopColor="#f2e8d5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#b8935e" stopOpacity="0" />
        </radialGradient>

        {/* Soft wax drip texture */}
        <filter id="waxTexture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="12" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Subtle inner shadow for depth */}
        <filter id="innerDepth" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset dx="0" dy="2" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
        </filter>
      </defs>

      {/* Outer blob — irregular wax drip edge */}
      <g filter="url(#waxTexture)">
        <circle cx="100" cy="100" r="86" fill="url(#waxBody)" />
      </g>

      {/* Inner highlight wash */}
      <circle cx="100" cy="100" r="74" fill="url(#waxInner)" />

      {/* Pressed ring — outer */}
      <circle
        cx="100" cy="100" r="72"
        fill="none"
        stroke="#7a5c30"
        strokeWidth="1.2"
        opacity="0.45"
      />

      {/* Pressed ring — inner thin */}
      <circle
        cx="100" cy="100" r="65"
        fill="none"
        stroke="#7a5c30"
        strokeWidth="0.7"
        opacity="0.3"
      />

      {/* ── Monogram: N & A ── */}
      {/*
        Laid out as: N · & · A  in a tight row, centred at (100, 100)
        Font-style rendered in SVG paths for crisp rendering at all sizes.
        Using elegant serif strokes with serifs implied by stroke caps.
      */}

      {/* --- Letter N (left, centred around x=78) --- */}
      <g stroke="#faf7f2" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* N: left vertical */}
        <line x1="70" y1="78" x2="70" y2="122" />
        {/* N: diagonal stroke */}
        <line x1="70" y1="78" x2="86" y2="122" />
        {/* N: right vertical */}
        <line x1="86" y1="78" x2="86" y2="122" />

        {/* Serif caps for N */}
        <line x1="66.5" y1="78"  x2="73.5" y2="78"  strokeWidth="2" />
        <line x1="66.5" y1="122" x2="73.5" y2="122" strokeWidth="2" />
        <line x1="82.5" y1="78"  x2="89.5" y2="78"  strokeWidth="2" />
        <line x1="82.5" y1="122" x2="89.5" y2="122" strokeWidth="2" />
      </g>

      {/* --- Ampersand & (centre, x=100) --- */}
      <g stroke="#faf7f2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* A small elegant & made from two arcs + tail */}
        <path
          d="M104 94 C104 88, 97 86, 95 90 C93 94, 96 97, 100 100 C104 103, 107 107, 104 112 C101 117, 93 117, 91 112 C89 107, 93 104, 97 103"
          strokeWidth="2.4"
        />
        {/* Tail sweep right */}
        <path d="M97 103 L107 115" strokeWidth="2.4" />
      </g>

      {/* --- Letter A (right, centred around x=122) --- */}
      <g stroke="#faf7f2" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* A: left diagonal */}
        <line x1="114" y1="122" x2="122" y2="78" />
        {/* A: right diagonal */}
        <line x1="122" y1="78"  x2="130" y2="122" />
        {/* A: crossbar */}
        <line x1="116.5" y1="108" x2="127.5" y2="108" strokeWidth="2.2" />

        {/* Serif caps for A */}
        <line x1="110.5" y1="122" x2="117.5" y2="122" strokeWidth="2" />
        <line x1="126.5" y1="122" x2="133.5" y2="122" strokeWidth="2" />
      </g>

      {/* Tiny star ornaments inside ring */}
      <g fill="#faf7f2" opacity="0.55">
        <circle cx="100" cy="68" r="1.6" />
        <circle cx="100" cy="132" r="1.6" />
        <circle cx="68"  cy="100" r="1.6" />
        <circle cx="132" cy="100" r="1.6" />
      </g>
    </svg>
  );
}
