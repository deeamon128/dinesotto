"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SottoLogo from "@/components/ui/SottoLogo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 h-16
        flex items-center justify-between
        px-8 transition-all duration-300
        ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md border-b border-warm-border shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      {/* Logo */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <SottoLogo
            className="h-14 w-auto transition-all duration-300"
            darkMode={!scrolled}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/explore" },
            { label: "About", href: "/about" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`
              text-[0.78rem] tracking-[0.07em] uppercase
              transition-colors duration-200
              ${
                scrolled
                  ? "text-muted hover:text-green-600"
                  : "text-green-300/60 hover:text-green-100"
              }
            `}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className={`
            text-[0.76rem] tracking-[0.04em] px-4 py-2
            rounded border transition-all duration-200
            ${
              scrolled
                ? "border-warm-border text-charcoal hover:border-green-600 hover:text-green-600"
                : "border-green-300/25 text-green-300/70 hover:border-green-300/50 hover:text-green-100"
            }
          `}
          >
            Sign In
          </button>
          <Link
            href="/suggest"
            className="
            bg-green-600 hover:bg-green-400 
            text-white text-[0.76rem] font-medium
            tracking-[0.04em] px-4 py-2 rounded
            transition-colors duration-200
          "
          >
            Suggest a Restaurant
          </Link>
        </div>
      </div>
      {/* Mobile menu button */}
      <button
        className="md:hidden text-green-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="
          absolute top-16 left-0 right-0
          bg-ivory border-b border-warm-border
          flex flex-col px-8 py-6 gap-5
          md:hidden
        "
        >
          {[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/explore" },
            { label: "About", href: "/about" },
            { label: "Sign In", href: "/signin" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="
                text-sm text-muted hover:text-green-600
                tracking-wide uppercase transition-colors
              "
            >
              {label}
            </Link>
          ))}
          <Link
            href="/suggest"
            onClick={() => setMenuOpen(false)}
            className="
              bg-green-600 text-white text-sm font-medium
              px-4 py-3 rounded text-center
              tracking-wide transition-colors
              hover:bg-green-400
            "
          >
            Suggest a Restaurant
          </Link>
        </div>
      )}
    </header>
  );
}

/* ── Logo mark ── */
function SottoLogoMark({ scrolled }: { scrolled: boolean }) {
  const stroke = scrolled ? "#3d5a3d" : "#8aaa8a";
  const opacity = scrolled ? 0.5 : 0.45;

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {/* Left waves */}
      <path
        d="M7,10 Q3,16 7,22"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity={opacity}
      />
      <path
        d="M4,7 Q-1,16 4,25"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        opacity={opacity * 0.55}
      />
      {/* Right waves */}
      <path
        d="M25,10 Q29,16 25,22"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity={opacity}
      />
      <path
        d="M28,7 Q33,16 28,25"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        opacity={opacity * 0.55}
      />
      {/* S letter */}
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="15"
        fontWeight="300"
        fill={scrolled ? "#3d5a3d" : "#c8dcc8"}
        opacity="0.9"
      >
        S
      </text>
      {/* Plate */}
      <ellipse
        cx="16"
        cy="27"
        rx="7"
        ry="1.8"
        stroke={stroke}
        strokeWidth="1"
        fill="none"
        opacity={opacity}
      />
      <ellipse
        cx="16"
        cy="27"
        rx="4"
        ry="1"
        stroke={stroke}
        strokeWidth="0.7"
        fill="none"
        opacity={opacity * 0.65}
      />
    </svg>
  );
}
