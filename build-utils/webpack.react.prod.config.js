const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser']
  },
  entry: path.resolve(__dirname, '../src/react/index.tsx'),
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/renderer'),
    filename: 'js/[name].js',
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Namer'
    })
  ]
};
