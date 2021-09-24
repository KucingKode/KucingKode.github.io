const vars = {
  heading: 'var(--heading-color)',
  base: 'var(--text-color)',
  muted: 'var(--muted-color)',
  accent: 'var(--accent-color)',
  secondary: 'var(--secondary-color)',
  primary: 'var(--primary-color)'
}

module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: vars,
    borderColor: vars,
    extend: {
      backgroundColor: vars,
      gradientColorStops: vars
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  purge: ['./src/**/*.svelte']
}
