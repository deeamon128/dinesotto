export default function MapPlaceholder() {
  return (
    <div className="w-full h-full bg-green-900/5 relative overflow-hidden flex items-center justify-center">
      {/* Grid lines suggesting a map */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#3d5a3d"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Placeholder pins */}
      {[
        { top: "30%", left: "45%", label: "Sketch", score: 9.2, quiet: true },
        {
          top: "50%",
          left: "35%",
          label: "Ottolenghi",
          score: 8.7,
          quiet: true,
        },
        { top: "40%", left: "60%", label: "St. John", score: 9.4, quiet: true },
        { top: "60%", left: "55%", label: "Dishoom", score: 7.1, quiet: false },
        {
          top: "25%",
          left: "30%",
          label: "Le Gavroche",
          score: 8.9,
          quiet: true,
        },
      ].map((pin) => (
        <div
          key={pin.label}
          className="absolute flex flex-col items-center gap-1 cursor-pointer group"
          style={{ top: pin.top, left: pin.left }}
        >
          {/* Pin */}
          <div
            className={`
            w-8 h-8 rounded-full border-2 border-white shadow-lg
            flex items-center justify-center
            font-display text-xs font-medium text-white
            transition-transform group-hover:scale-110
            ${pin.quiet ? "bg-green-600" : "bg-amber"}
          `}
          >
            {pin.score}
          </div>
          {/* Label */}
          <span className="font-sans text-[0.6rem] text-green-800 bg-ivory/90 px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {pin.label}
          </span>
        </div>
      ))}

      {/* Centre label */}
      <div className="text-center z-10 pointer-events-none">
        <p className="font-display text-2xl italic text-green-600/20 mb-2">
          London
        </p>
        <p className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-muted/30">
          Google Maps coming soon
        </p>
      </div>

      {/* Map controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button className="w-8 h-8 bg-ivory border border-warm-border rounded shadow-sm text-muted hover:text-green-600 transition-colors flex items-center justify-center font-sans text-lg leading-none">
          +
        </button>
        <button className="w-8 h-8 bg-ivory border border-warm-border rounded shadow-sm text-muted hover:text-green-600 transition-colors flex items-center justify-center font-sans text-lg leading-none">
          −
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-ivory/90 border border-warm-border rounded p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-600" />
          <span className="font-sans text-[0.6rem] text-muted">Quiet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber" />
          <span className="font-sans text-[0.6rem] text-muted">Moderate</span>
        </div>
      </div>
    </div>
  );
}
