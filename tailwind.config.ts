import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-inter)',      'system-ui', 'sans-serif'],
        sans:    ['var(--font-inter)',      'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT:   '#111827',
          card:      '#1F2937',
          deep:      '#162032',
        },
        em: {
          DEFAULT:   '#10B981',
          dark:      '#059669',
          light:     '#34D399',
          subtle:    'rgba(16,185,129,0.08)',
          glow:      'rgba(16,185,129,0.18)',
          border:    'rgba(16,185,129,0.35)',
        },
        brand: {
          gold:      '#F59E0B',
          border:    'rgba(255,255,255,0.07)',
        },
        content: {
          DEFAULT:   '#F9FAFB',
          muted:     '#9CA3AF',
          subtle:    '#9198A6',
        },
      },
      animation: {
        'bounce-slow':  'bounce-slow 2.5s ease-in-out infinite',
        'pulse-dot':    'pulse-dot 2s ease-in-out infinite',
        'fade-up':      'fade-up 0.6s ease-out both',
        shimmer:        'shimmer 1.6s linear infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(6px)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.5', transform: 'scale(1.3)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'em-sm':  '0 0 16px rgba(16,185,129,0.12)',
        'em-md':  '0 0 32px rgba(16,185,129,0.18)',
        'em-lg':  '0 0 48px rgba(16,185,129,0.25)',
        card:     '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
