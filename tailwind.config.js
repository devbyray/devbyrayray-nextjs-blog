
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontSize: {
      sm: ['18px', '24px'],
      base: ['16px', '28px'],
      lg: ['20px', '32px'],
      xl: ['24px', '36px'],
    },
    colors: {
      primary: 'var(--color-darkblue)',
      secondary: 'var(--color-deeppurple)',
      skin: 'var(--color-pinky)',
      yelloww: 'var(--color-darkyellow)'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
