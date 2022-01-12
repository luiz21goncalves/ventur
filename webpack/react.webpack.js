const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
  },
  entry: path.resolve(rootPath, 'src', 'index.tsx'),
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  devServer: {
    static: {
      directory: path.join(rootPath, 'dist/renderer'),
      publicPath: '/',
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    liveReload: true,
  },
  output: {
    path: path.resolve(rootPath, 'dist/renderer'),
    filename: 'js/[name].js',
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootPath,  'index.html'),
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
