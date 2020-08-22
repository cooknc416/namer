const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map',
  entry: './src/electron/main.ts',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
        ...process.env.stringified,
        'process.env.FLUENTFFMPEG_COV': false
    })
  ]
};
