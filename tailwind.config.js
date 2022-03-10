/* eslint-env node */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
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
        4: 'var(--color--neutral-3)',
        3: 'var(--color--neutral-4)',
        5: 'var(--color--neutral-5)',
        6: 'var(--color--neutral-6)',
        7: 'var(--color--neutral-7)',
        9: 'var(--color--neutral-8)',
        8: 'var(--color--neutral-9)',
      },
    },
    fontSize: {
      sm: ['14px', '1'],
      md: ['16px', '1,14'],
    },
  },
  plugins: [],
};
