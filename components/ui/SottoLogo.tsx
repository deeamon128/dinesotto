interface SottoLogoProps {
  className?: string;
  darkMode?: boolean; // true = on dark hero, false = on ivory header
}

export default function SottoLogo({
  className = "",
  darkMode = false,
}: SottoLogoProps) {
  const color = darkMode ? "#8aaa8a" : "#3d5a3d";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 320"
      className={className}
      aria-label="Sotto — Quiet Dining"
    >
      {/* DINE label */}
      <text
        x="400"
        y="120"
        fontFamily="Georgia, serif"
        fontSize="28"
        letterSpacing="6"
        textAnchor="middle"
        fill={color}
        opacity="0.65"
      >
        DINE
      </text>

      {/* Sotto wordmark */}
      <text
        x="400"
        y="200"
        fontFamily="Georgia, serif"
        fontSize="90"
        textAnchor="middle"
        fill={color}
      >
        Sotto
      </text>

      {/* Left sound waves */}
      <path
        d="M210 170 q-18 15 0 30"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M195 165 q-28 20 0 40"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M180 160 q-38 25 0 50"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />

      {/* Right sound waves */}
      <path
        d="M590 170 q18 15 0 30"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M605 165 q28 20 0 40"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M620 160 q38 25 0 50"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />

      {/* Plate */}
      <ellipse
        cx="400"
        cy="260"
        rx="120"
        ry="12"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.4"
      />
      <ellipse
        cx="400"
        cy="260"
        rx="80"
        ry="8"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <ellipse
        cx="400"
        cy="260"
        rx="40"
        ry="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
