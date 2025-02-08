/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'tokyo-night': {
          bg: '#1a1b26',
          text: '#a9b1d6',
          accent: '#7aa2f7',
          highlight: '#bb9af7',
          error: '#f7768e'
        }
      }
    }
  },
  plugins: []
}