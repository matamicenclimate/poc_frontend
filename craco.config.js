const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    module: {
      rules: [
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true, // true outputs JSX tags
          },
        },
      ],
    },
  },
};
