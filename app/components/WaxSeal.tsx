type WaxSealProps = {
  size?: number;
  className?: string;
};

// SVG tabanlı mühür mumu — kullanıcı kendi PNG'sini /public klasörüne ekleyip
// bu komponenti <img src="/wax-seal.png" /> ile değiştirebilir.
export default function WaxSeal({ size = 140, className = "" }: WaxSealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Mühür mumu"
    >
      <defs>
        <radialGradient id="waxBody" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#a8ab86" />
          <stop offset="55%" stopColor="#8d9171" />
          <stop offset="100%" stopColor="#6f7456" />
        </radialGradient>
        <filter id="waxTexture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* irregular blob edge to mimic dripped wax */}
      <g filter="url(#waxTexture)">
        <circle cx="100" cy="100" r="84" fill="url(#waxBody)" />
      </g>

      {/* inner pressed ring */}
      <circle
        cx="100"
        cy="100"
        r="68"
        fill="none"
        stroke="#5f6347"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* sprig motif */}
      <g stroke="#f3efe6" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M100 60 L100 142" />
        <path d="M100 78 C 88 72, 80 76, 76 86" />
        <path d="M100 78 C 112 72, 120 76, 124 86" />
        <path d="M100 96 C 86 92, 78 96, 73 106" />
        <path d="M100 96 C 114 92, 122 96, 127 106" />
        <path d="M100 114 C 89 111, 82 115, 78 123" />
        <path d="M100 114 C 111 111, 118 115, 122 123" />
      </g>
      <circle cx="76" cy="86" r="2.4" fill="#f3efe6" />
      <circle cx="124" cy="86" r="2.4" fill="#f3efe6" />
      <circle cx="73" cy="106" r="2.4" fill="#f3efe6" />
      <circle cx="127" cy="106" r="2.4" fill="#f3efe6" />
      <circle cx="78" cy="123" r="2.4" fill="#f3efe6" />
      <circle cx="122" cy="123" r="2.4" fill="#f3efe6" />
    </svg>
  );
}
