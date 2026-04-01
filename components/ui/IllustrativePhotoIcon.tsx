"use client";

import { useState } from "react";

export default function IllustrativePhotoIcon() {
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <div
      className="absolute top-2 left-2 group/tooltip"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setTipOpen((p) => !p);
      }}
    >
      <div className="w-4 h-4 rounded-full bg-green-700/70 flex items-center justify-center cursor-default">
        <span className="text-white text-[0.55rem] font-sans leading-none">
          i
        </span>
      </div>
      <div
        className={`absolute left-0 top-5 w-44 bg-green-900/80 text-white text-[0.6rem] font-sans rounded px-2 py-1.5 leading-snug transition-opacity duration-200 pointer-events-none z-10
        ${tipOpen ? "opacity-100" : "opacity-0 md:group-hover/tooltip:opacity-100"}`}
      >
        Illustrative photo — not from this venue.
      </div>
    </div>
  );
}
