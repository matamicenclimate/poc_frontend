/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
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
    configure: {
      resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer'),
        },
      },
    },
  },
};
