// webpack v4
const path = require('path')
const views = require('./webpack.helper.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  stats: {
    modules: false,
    colors: true,
    version: false,
    children: false
  },
  entry: {
    index: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },

  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    hot: true
    // open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true
    }
  },
  mode:'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'dist/css')
            }
          },
          'css-loader',
          'sass-loader'
        ]

      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|JPG|PNG|GIF|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...views.pages({
      srcDir: './src/views',
      filesExt:'html'
    })
  ]
};