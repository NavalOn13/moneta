/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moneta: {
          primary: '#292330',     // Obsidian Plum (22%)
          plum: '#292330',
          plumLight: '#3D3446',
          plumDark: '#140E1A',
          secondary: '#C7D8C5',   // Celadon Mist (10%)
          celadon: '#C7D8C5',
          celadonLight: '#DDE8DB',
          celadonDark: '#A2BAA0',
          tertiary: '#B86F52',    // Oxidised Copper (3%)
          copper: '#B86F52',
          copperHover: '#A45F44',
          copperLight: '#E8A58D',
          neutral: '#F3EBDD',     // Porcelain Sand (65%)
          sand: '#F3EBDD',
          sandLight: '#FAF6F0',
          sandBorder: 'rgba(41, 35, 48, 0.12)',
          sandBorderActive: 'rgba(41, 35, 48, 0.24)',
          surface: '#FFF8F0',
        }
      },
      fontFamily: {
        display: ['Newsreader', 'DM Serif Display', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'moneta-sm': '0 2px 8px -1px rgba(41, 35, 48, 0.05)',
        'moneta-card': '0 4px 20px -2px rgba(41, 35, 48, 0.04)',
        'moneta-hover': '0 12px 32px -4px rgba(41, 35, 48, 0.08)',
        'moneta-modal': '0 16px 40px -4px rgba(41, 35, 48, 0.12)',
      }
    },
  },
  plugins: [],
}
