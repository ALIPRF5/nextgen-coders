/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-text': 'rgb(var(--accent-text) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
        night: '#17171D',
        sun: '#FFD166',
        sky: '#8ECAE6',
        grape: '#CDB4F6',
        mint: '#A7E8C4',
        blush: '#FFC2D1',
        tangerine: '#FFC27A',
      },
      fontFamily: {
        sans: [
          'Inter Variable',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      maxWidth: {
        site: '1280px',
      },
      borderRadius: {
        card: '18px',
        control: '10px',
        pill: '999px',
      },
      boxShadow: {
        soft: 'none',
        hard: '4px 5px 0 0 rgba(23, 23, 29, 0.28)',
        card: '0 14px 30px -18px rgba(23, 23, 29, 0.65)',
      },
    },
  },
  plugins: [],
}
