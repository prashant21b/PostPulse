const { override, addWebpackResolve, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  // Add resolve fallbacks
  addWebpackResolve({
    fallback: {
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
    },
  }),

  // Add webpack plugins
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ),
);
