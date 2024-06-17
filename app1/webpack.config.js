const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
module.exports = (env = {}) => ({
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  target: 'web',
  entry: path.resolve(__dirname, './src/index.ts'),
  externals: {
    vue: 'Vue',
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, './tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader', 'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      chunks: ['main'],
    }),
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      dts: {
        generateTypes: {
          compilerInstance: 'vue-tsc'
        }
      },
      remotes: {
        container: 'container@http://localhost:3000/mf-manifest.json'
      },
    }),
  ],
  devServer: {
    port: 3001,
    compress: true,
    historyApiFallback: {
      index: 'http://localhost:3001/index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
});
