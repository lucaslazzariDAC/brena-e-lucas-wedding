// Decorative SVG ornaments inspired by the wedding invitation
import { type SVGProps } from "react";

const silver = "currentColor";

/* ─── Art-deco corner frame ─── */
export function CornerOrnament({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g fill="none" stroke={silver} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer L */}
        <path d="M4 60 L4 4 L60 4" />
        {/* Inner stepped L */}
        <path d="M10 50 L10 10 L50 10" opacity="0.85" />
        <path d="M16 38 L16 16 L38 16" opacity="0.7" />
        {/* Decorative diagonal */}
        <path d="M22 22 L34 22 L34 34" opacity="0.6" />
        <path d="M22 22 L40 4" opacity="0.4" />
        {/* Dots */}
        <circle cx="55" cy="4" r="1.2" fill={silver} />
        <circle cx="4" cy="55" r="1.2" fill={silver} />
        <circle cx="34" cy="34" r="1.5" fill={silver} />
        {/* Inward fan */}
        <path d="M44 4 Q50 12 60 14" opacity="0.5" />
        <path d="M4 44 Q12 50 14 60" opacity="0.5" />
      </g>
    </svg>
  );
}

/* ─── Crossed crest: spear + sword + leaves + shell — matches reference ─── */
export function OrixaCrest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden>
      <g fill="none" stroke={silver} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        {/* Crossed spear (left) */}
        <line x1="40" y1="14" x2="150" y2="106" />
        <path d="M40 14 L34 22 L42 26 L48 18 Z" fill={silver} fillOpacity="0.35" />
        <line x1="150" y1="106" x2="156" y2="114" />

        {/* Crossed sword (right) */}
        <line x1="160" y1="14" x2="50" y2="106" />
        <path d="M160 14 L154 22 L162 26 L168 18 Z" fill={silver} fillOpacity="0.35" />
        <line x1="44" y1="100" x2="56" y2="112" />
        <line x1="50" y1="106" x2="44" y2="114" />

        {/* Leaves wrapping behind */}
        <g opacity="0.7">
          <path d="M70 60 Q56 50 50 60 Q60 66 72 64" fill={silver} fillOpacity="0.12" />
          <path d="M130 60 Q144 50 150 60 Q140 66 128 64" fill={silver} fillOpacity="0.12" />
          <path d="M82 78 Q70 72 62 82 Q74 86 84 82" fill={silver} fillOpacity="0.1" />
          <path d="M118 78 Q130 72 138 82 Q126 86 116 82" fill={silver} fillOpacity="0.1" />
        </g>

        {/* Central scallop shell on top */}
        <g transform="translate(85 6)">
          <path d="M15 4 Q2 26 4 38 Q15 42 26 38 Q28 26 15 4 Z" fill={silver} fillOpacity="0.2" />
          <path d="M15 4 L15 38" />
          <path d="M15 4 Q10 22 9 38" />
          <path d="M15 4 Q20 22 21 38" />
          <path d="M15 4 Q5 26 4 38" />
          <path d="M15 4 Q25 26 26 38" />
        </g>

        {/* Star sparkle accent */}
        <path d="M100 50 L102 56 L108 58 L102 60 L100 66 L98 60 L92 58 L98 56 Z" fill={silver} />
      </g>
    </svg>
  );
}

/* ─── Lateral spear with leaves (used on side panels) ─── */
export function SpearWithLeaves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 240" className={className} aria-hidden>
      <g fill="none" stroke={silver} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="40" y1="34" x2="40" y2="210" />
        <path d="M40 6 L30 30 L40 36 L50 30 Z" fill={silver} fillOpacity="0.35" />
        <line x1="40" y1="6" x2="40" y2="34" />
        <g opacity="0.85">
          <path d="M40 60 Q22 54 14 72 Q28 76 40 66" fill={silver} fillOpacity="0.15" />
          <path d="M40 84 Q58 78 66 96 Q52 100 40 90" fill={silver} fillOpacity="0.15" />
          <path d="M40 110 Q20 104 12 124 Q28 128 40 116" fill={silver} fillOpacity="0.15" />
          <path d="M40 138 Q60 132 68 152 Q52 156 40 144" fill={silver} fillOpacity="0.15" />
          <path d="M40 166 Q22 160 14 180 Q30 184 40 170" fill={silver} fillOpacity="0.15" />
        </g>
        <line x1="40" y1="210" x2="34" y2="228" />
        <line x1="40" y1="210" x2="46" y2="228" />
      </g>
    </svg>
  );
}

/* ─── Refined scallop ─── */
export function ShellIcon({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 56" className={className} aria-hidden {...rest}>
      <g fill="none" stroke={silver} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6 Q6 30 8 46 Q20 52 32 50 Q44 52 56 46 Q58 30 32 6 Z" fill={silver} fillOpacity="0.12" />
        <path d="M32 6 L32 50" />
        <path d="M32 6 Q26 28 23 48" />
        <path d="M32 6 Q38 28 41 48" />
        <path d="M32 6 Q20 30 15 48" />
        <path d="M32 6 Q44 30 49 48" />
        <path d="M32 6 Q12 28 9 46" opacity="0.6" />
        <path d="M32 6 Q52 28 55 46" opacity="0.6" />
        {/* hinge */}
        <circle cx="32" cy="6" r="1.6" fill={silver} />
      </g>
    </svg>
  );
}

/* ─── Layered wave ─── */
export function WaveIcon({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 36" className={className} aria-hidden {...rest}>
      <g fill="none" stroke={silver} strokeWidth="1.2" strokeLinecap="round">
        <path d="M4 22 Q14 8 24 22 T44 22 T64 22 T84 22 T96 22" />
        <path d="M4 28 Q14 18 24 28 T44 28 T64 28 T84 28 T96 28" opacity="0.55" />
        <path d="M14 14 Q22 6 30 14" opacity="0.7" />
        <path d="M68 14 Q76 6 84 14" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ─── Sword wrapped with leaves ─── */
export function SwordIcon({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 80" className={className} aria-hidden {...rest}>
      <g fill="none" stroke={silver} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Pommel & guard */}
        <circle cx="20" cy="74" r="2.2" fill={silver} fillOpacity="0.4" />
        <line x1="20" y1="58" x2="20" y2="72" />
        <line x1="10" y1="58" x2="30" y2="58" />
        <line x1="12" y1="58" x2="14" y2="62" />
        <line x1="28" y1="58" x2="26" y2="62" />
        {/* Blade */}
        <path d="M20 6 L16 14 L16 56 L24 56 L24 14 Z" fill={silver} fillOpacity="0.18" />
        <line x1="20" y1="6" x2="20" y2="56" />
        {/* Wrapping leaves */}
        <path d="M16 24 Q8 22 6 30 Q12 32 16 28" fill={silver} fillOpacity="0.18" opacity="0.85" />
        <path d="M24 32 Q32 30 34 38 Q28 40 24 36" fill={silver} fillOpacity="0.18" opacity="0.85" />
        <path d="M16 42 Q8 40 6 48 Q12 50 16 46" fill={silver} fillOpacity="0.18" opacity="0.85" />
      </g>
    </svg>
  );
}

/* ─── Starfish ─── */
export function StarfishIcon({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden {...rest}>
      <g fill="none" stroke={silver} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <path
          d="M32 6 L38 24 L56 26 L42 38 L46 56 L32 46 L18 56 L22 38 L8 26 L26 24 Z"
          fill={silver}
          fillOpacity="0.12"
        />
        <circle cx="32" cy="32" r="1.5" fill={silver} />
        <circle cx="32" cy="22" r="0.8" fill={silver} />
        <circle cx="40" cy="34" r="0.8" fill={silver} />
        <circle cx="24" cy="34" r="0.8" fill={silver} />
      </g>
    </svg>
  );
}

/* ─── Crown ─── */
export function CrownIcon({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 40" className={className} aria-hidden {...rest}>
      <g fill="none" stroke={silver} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M6 32 L12 8 L24 24 L40 4 L56 24 L68 8 L74 32 Z" fill={silver} fillOpacity="0.15" />
        <line x1="4" y1="35" x2="76" y2="35" />
        <circle cx="12" cy="8" r="1.8" fill={silver} />
        <circle cx="40" cy="4" r="2.2" fill={silver} />
        <circle cx="68" cy="8" r="1.8" fill={silver} />
        <circle cx="24" cy="24" r="1" fill={silver} />
        <circle cx="56" cy="24" r="1" fill={silver} />
      </g>
    </svg>
  );
}

/* ─── Crescent moon ─── */
export function MoonIcon({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden {...rest}>
      <g fill="none" stroke={silver} strokeWidth="1.2">
        <path d="M22 4 Q12 8 12 16 Q12 24 22 28 Q12 28 8 18 Q12 6 22 4 Z" fill={silver} fillOpacity="0.25" />
      </g>
    </svg>
  );
}

/* ─── Divider with sparkle ─── */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-silver ${className ?? ""}`}>
      <span className="h-px w-10 bg-current opacity-50 sm:w-14" />
      <svg viewBox="0 0 20 20" className="h-3 w-3" aria-hidden>
        <path d="M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8 Z" fill="currentColor" />
      </svg>
      <span className="h-px w-10 bg-current opacity-50 sm:w-14" />
    </div>
  );
}

/* ─── Wide ornamental wave band (for footer/hero bottom) ─── */
export function WaveBand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 60" className={className} aria-hidden preserveAspectRatio="none">
      <g fill="none" stroke={silver} strokeWidth="1" strokeLinecap="round">
        <path d="M0 30 Q40 10 80 30 T160 30 T240 30 T320 30 T400 30" opacity="0.9" />
        <path d="M0 40 Q40 22 80 40 T160 40 T240 40 T320 40 T400 40" opacity="0.6" />
        <path d="M0 50 Q40 36 80 50 T160 50 T240 50 T320 50 T400 50" opacity="0.4" />
      </g>
    </svg>
  );
}

export function WaveBackground({ className, opacity = 0.4 }: { className?: string; opacity?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      <svg
        viewBox="0 0 2400 200"
        className="wave-drift-slow h-32 w-[200%] text-ocean"
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <path
          d="M0 100 Q150 60 300 100 T600 100 T900 100 T1200 100 T1500 100 T1800 100 T2100 100 T2400 100 V200 H0 Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M0 120 Q150 90 300 120 T600 120 T900 120 T1200 120 T1500 120 T1800 120 T2100 120 T2400 120 V200 H0 Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
}
