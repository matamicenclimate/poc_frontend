module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      primary: {
        DEFAULT: 'var(--color-primary)',
        light: 'var(--color-primary-light)',
        contrast: 'var(--color-primary-contrast)',
      },
    },
  },
  plugins: [],
};
