import React from 'react';

/**
 * Shared split-panel layout for Login / Signup pages.
 *
 * Left panel  (~55 %) — brand moment: editorial heading, product copy,
 *                        abstract browser-window illustration.
 * Right panel (~45 %) — glass card with the form (rendered via children).
 *
 * Background layers (bottom → top):
 *   1. Off-centre radial gradient mesh  (emerald + umber on #0B1210)
 *   2. SVG noise-texture overlay         (2.5 % opacity)
 *   3. Two large blurred ambient shapes  (brass 10 %, sage 8 %)
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* ── 1. Base gradient mesh ──────────────────────────── */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 70% at 20% 15%, #1C3B33 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 50% at 85% 80%, #3E2723 0%, transparent 50%)',
            '#0B1210',
          ].join(', '),
        }}
      />

      {/* ── 2. Noise texture (inline SVG so the filter renders reliably) ── */}
      <svg
        className="fixed inset-0 w-full h-full z-[1] pointer-events-none"
        style={{ opacity: 0.025 }}
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* ── 3. Ambient blurred shapes ──────────────────────── */}
      <div
        className="fixed z-[1] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          top: '8%',
          left: '4%',
          width: 420,
          height: 320,
          background: '#C9A15A',
          opacity: 0.1,
          filter: 'blur(120px)',
        }}
      />
      <div
        className="fixed z-[1] pointer-events-none rounded-full"
        aria-hidden="true"
        style={{
          bottom: '12%',
          right: '6%',
          width: 360,
          height: 260,
          background: '#7FA98F',
          opacity: 0.08,
          filter: 'blur(110px)',
        }}
      />

      {/* ── Left panel · brand moment (hidden on mobile) ─── */}
      <div className="hidden lg:flex lg:w-[55%] relative z-10 flex-col justify-center px-16 xl:px-24">
        {/* Logo mark */}
        <div className="flex items-center gap-2.5 mb-14">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12.5 15.5L15.5 12.5M11.5 19.5L8.5 22.5C7.395 23.605 5.605 23.605 4.5 22.5C3.395 21.395 3.395 19.605 4.5 18.5L7.5 15.5M19.5 11.5L22.5 8.5C23.605 7.395 23.605 5.605 22.5 4.5C21.395 3.395 19.605 3.395 18.5 4.5L15.5 7.5"
              stroke="#C9A15A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="font-display text-xl text-parchment tracking-tight"
            style={{ fontWeight: 500 }}
          >
            LinkLens
          </span>
        </div>

        {/* Editorial heading */}
        <h1
          className="font-display text-parchment tracking-tight mb-6"
          style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
            lineHeight: 1.08,
          }}
        >
          Every link
          <br />
          tells a story.
        </h1>
        <p className="text-stone text-lg max-w-md leading-relaxed mb-16">
          Preview, save, and organise your links with rich metadata.
          See the full picture before you click.
        </p>

        {/* ── Abstract browser-window illustration ──────── */}
        <div className="max-w-[360px]">
          <svg
            viewBox="0 0 360 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            style={{ opacity: 0.45 }}
            aria-hidden="true"
          >
            {/* Browser frame */}
            <rect
              x="0.5" y="0.5" width="359" height="219" rx="12"
              stroke="rgba(212,224,213,0.15)"
            />
            <line
              x1="0" y1="38" x2="360" y2="38"
              stroke="rgba(212,224,213,0.1)"
            />

            {/* Traffic-light dots */}
            <circle cx="20" cy="19" r="4" fill="rgba(193,85,74,0.5)" />
            <circle cx="36" cy="19" r="4" fill="rgba(201,161,90,0.5)" />
            <circle cx="52" cy="19" r="4" fill="rgba(127,169,143,0.5)" />

            {/* URL bar */}
            <rect
              x="76" y="11" width="200" height="16" rx="4"
              stroke="rgba(212,224,213,0.1)"
            />
            <rect
              x="84" y="16" width="60" height="6" rx="2"
              fill="rgba(127,169,143,0.12)"
            />

            {/* Preview card 1 */}
            <rect
              x="20" y="52" width="152" height="76" rx="6"
              stroke="rgba(212,224,213,0.1)"
            />
            <rect
              x="20" y="52" width="152" height="40" rx="6"
              fill="rgba(127,169,143,0.06)"
            />
            <rect
              x="28" y="100" width="90" height="5" rx="2"
              fill="rgba(201,161,90,0.18)"
            />
            <rect
              x="28" y="112" width="65" height="4" rx="2"
              fill="rgba(212,224,213,0.07)"
            />

            {/* Preview card 2 */}
            <rect
              x="188" y="52" width="152" height="76" rx="6"
              stroke="rgba(212,224,213,0.1)"
            />
            <rect
              x="188" y="52" width="152" height="40" rx="6"
              fill="rgba(201,161,90,0.06)"
            />
            <rect
              x="196" y="100" width="90" height="5" rx="2"
              fill="rgba(127,169,143,0.18)"
            />
            <rect
              x="196" y="112" width="65" height="4" rx="2"
              fill="rgba(212,224,213,0.07)"
            />

            {/* Partial bottom row (fading out) */}
            <rect
              x="20" y="142" width="152" height="64" rx="6"
              stroke="rgba(212,224,213,0.06)"
            />
            <rect
              x="188" y="142" width="152" height="64" rx="6"
              stroke="rgba(212,224,213,0.06)"
            />
          </svg>
        </div>
      </div>

      {/* ── Right panel · form card ────────────────────────── */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-5 py-16 lg:py-0 lg:pr-16 xl:pr-24 lg:pl-8">
        {children}
      </div>

      {/* ── Mobile-only brand mark (fixed top-left) ────────── */}
      <div className="lg:hidden fixed top-6 left-5 z-20 flex items-center gap-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12.5 15.5L15.5 12.5M11.5 19.5L8.5 22.5C7.395 23.605 5.605 23.605 4.5 22.5C3.395 21.395 3.395 19.605 4.5 18.5L7.5 15.5M19.5 11.5L22.5 8.5C23.605 7.395 23.605 5.605 22.5 4.5C21.395 3.395 19.605 3.395 18.5 4.5L15.5 7.5"
            stroke="#C9A15A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="font-display text-base text-parchment tracking-tight"
          style={{ fontWeight: 500 }}
        >
          LinkLens
        </span>
      </div>
    </div>
  );
};

export default AuthLayout;
