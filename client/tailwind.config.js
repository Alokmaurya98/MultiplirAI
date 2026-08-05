/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      colors: {
        /* ── Legacy (kept for safety) ──────────────────── */
        primary: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe',
          300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1',
          600: '#4f46e5', 700: '#4338ca', 800: '#3730a3',
          900: '#312e81', 950: '#1e1b4b',
        },
        dark: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
          300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b',
          600: '#475569', 700: '#334155', 800: '#1e293b',
          900: '#0f172a', 950: '#020617',
        },
        /* ── Design-system palette ─────────────────────── */
        brass:          { DEFAULT: '#C9A15A', light: '#D4B06E', dark: '#B08C45' },
        sage:           { DEFAULT: '#7FA98F', light: '#95BBA3', dark: '#6A9479' },
        ink:            '#0B1210',
        cream:          '#F1EDE4',
        parchment:      '#F1EDE4',
        muted:          '#A8A296',
        stone:          '#A8A296',
        brick:          '#C1554A',
        'emerald-deep': '#1C3B33',
        umber:          '#3E2723',
      },
      animation: {
        'fade-in':      'fadeIn 0.5s ease-out',
        'slide-up':     'slideUp 0.5s ease-out',
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'auth-enter':   'authEnter 400ms ease-out forwards',
        'card-enter':   'cardEnter 350ms ease-out forwards',
        'modal-enter':  'modalEnter 200ms ease-out forwards',
        'toast-enter':  'toastEnter 200ms ease-out forwards',
        'shimmer':      'shimmer 2.5s infinite ease-in-out',
        'spin-slow':    'spin 1.2s linear infinite',
      },
      keyframes: {
        fadeIn:     { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:    { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        authEnter:  { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        cardEnter:  { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        modalEnter: { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        toastEnter: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer:    { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
