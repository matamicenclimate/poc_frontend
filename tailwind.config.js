/* eslint-env node */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-image': "url('/src/assets/images/login.jpg')",
        'overview-image': "url('/src/assets/images/overview.jpg')",
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color--primary-blue)',
          purple: 'var(--color--primary-purple)',
          orange: 'var(--color--primary-orange)',
          green: 'var(--color--primary-green)',
        },
        secondary: {
          DEFAULT: 'var(--color--secondary-blue)',
          purple: 'var(--color--secondary-purple)',
          yellow: 'var(--color--secondary-yellow)',
          green: 'var(--color--secondary-green)',
        },
        neutral: {
          1: 'var(--color--neutral-1)',
          2: 'var(--color--neutral-2)',
          3: 'var(--color--neutral-3)',
          4: 'var(--color--neutral-4)',
          5: 'var(--color--neutral-5)',
          6: 'var(--color--neutral-6)',
          7: 'var(--color--neutral-7)',
          8: 'var(--color--neutral-8)',
          9: 'var(--color--neutral-9)',
        },
        accent: {
          primary: {
            DEFAULT: 'var(--color--primary-blue-accent)',
          },
        },
        fontSize: {
          xs: ['12px', '1,8'],
          sm: ['0.875rem', '1rem'],
          md: ['1rem', '0.712rem'],
          lg: ['1.2rem', '1.8'],
        },
      },
    },
    fontSize: {
      xs: ['12px', '1,8'],
      sm: ['0.875rem', '1rem'],
      md: ['1rem', '0.712rem'],
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    fontFamily: {
      DEFAULT: ['Poppins'],
      alt: ['DMSans'],
    },
  },
  plugins: [],
};
