import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        preto: '#0A0A0A',
        escuro: '#111111',
        dourado: '#C9A84C',
        douradoSuave: '#E8C97A',
        branco: '#F5F0E8',
        cinza: '#888880',
        borda: '#2A2A2A'
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        editorial: ['var(--font-cormorant)', 'serif']
      }
    }
  },
  plugins: []
}

export default config
