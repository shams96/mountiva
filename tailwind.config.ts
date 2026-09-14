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
        // Grounds — snowfield / limestone / glacier melt
        paper: '#FAFAF7',
        surface: '#FFFFFF',
        mist: '#EFF1EE',
        stone: '#E0E1DB',
        ash: '#94978F',
        slate: '#555A52',
        ink: '#15181A',
        charcoal: '#0C0F11',
        // Deep dusk over the Karakoram — used for full-bleed dark sections
        night: {
          DEFAULT: '#141C22',
          soft: '#243139'
        },
        // Label red — the mark from the physical bottle. Used only as thin
        // rules, the mountain motif and small accents, the way the label does.
        signal: {
          DEFAULT: '#D42E24',
          soft: '#E06A63',
          pale: '#FBE7E5'
        },
        // Karakoram river blue — landscape accent, still restrained
        northern: {
          DEFAULT: '#245A6B',
          soft: '#6C97A3',
          pale: '#E2ECEE'
        },
        // Glacial meltwater turquoise — highlights, washes, focus
        glacier: {
          DEFAULT: '#3C8C8B',
          soft: '#7FB3B1',
          pale: '#E0EEEC'
        },
        // Deodar cedar / Kaghan pine — sparing organic accent
        pine: {
          DEFAULT: '#3A5647',
          soft: '#6E8778',
          pale: '#E6EDE7'
        },
        // Skardu cold-desert sandstone / Hunza apricot clay — warm counterweight
        earth: {
          DEFAULT: '#9A6B49',
          soft: '#C29A79',
          pale: '#F1E8DD'
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
        // Applied as py- (top AND bottom) on every Section, so two adjacent
        // sections stack to roughly double this value at the seam between
        // them — keep it tight enough that the total doesn't read as a dead
        // zone, generous enough that dense content still breathes.
        section: 'clamp(3.5rem, 6vw, 6rem)'
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
