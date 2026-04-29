import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FAF7F2',
        paperWarm: '#F2EBDD',
        ink: '#111111',
        accent: {
          DEFAULT: '#FF5A1F',
          dark: '#E04E18',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
          deep: '#075E54',
          glass: '#0F4A47',
          tint: '#E7F4F0',
        },
        muted: '#6B6B6B',
        line: '#E5DFD3',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightish: '-0.015em',
        tighter2: '-0.03em',
      },
      maxWidth: {
        prose2: '64ch',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
