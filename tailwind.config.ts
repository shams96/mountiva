import type { Config } from 'tailwindcss';

/**
 * Mountiva design system — tokens mirror the physical bottle label:
 * generous white space, deep charcoal typography, restrained Northern blue
 * and earth accents. Nothing loud.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', lg: '2.5rem' },
      screens: { '2xl': '1200px' }
    },
    extend: {
      colors: {
        paper: '#FBFBF9',
        surface: '#FFFFFF',
        mist: '#F2F2EF',
        stone: '#E4E4DF',
        ash: '#9B9B93',
        slate: '#5B5B54',
        ink: '#161615',
        charcoal: '#0E0E0D',
        // Northern accents — used sparingly
        northern: {
          DEFAULT: '#2E4A5A',
          soft: '#5C7A8A',
          pale: '#E8EEF1'
        },
        earth: {
          DEFAULT: '#8C7355',
          soft: '#B49E82',
          pale: '#F0EAE1'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        urdu: ['var(--font-urdu)', 'var(--font-serif)', 'serif'],
        arabic: ['var(--font-arabic)', 'var(--font-serif)', 'serif']
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.018em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.14', letterSpacing: '-0.012em' }],
        'title': ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.008em' }],
        'lede': ['clamp(1.0625rem, 1.4vw, 1.25rem)', { lineHeight: '1.65' }]
      },
      letterSpacing: {
        wordmark: '0.14em',
        eyebrow: '0.22em'
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 8.5rem)'
      },
      maxWidth: {
        prose: '68ch',
        measure: '54ch'
      },
      borderRadius: {
        xs: '2px',
        sm: '4px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(14, 14, 13, 0.04), 0 8px 24px -12px rgba(14, 14, 13, 0.12)',
        lift: '0 2px 4px rgba(14, 14, 13, 0.05), 0 24px 48px -20px rgba(14, 14, 13, 0.18)'
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both'
      }
    }
  },
  plugins: []
};

export default config;
