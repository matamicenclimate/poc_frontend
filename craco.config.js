const path = require('path');
const { POSTCSS_MODES } = require('@craco/craco');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss/nesting'), require('tailwindcss'), require('autoprefixer')],
    },
  },
};
