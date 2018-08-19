// webpack v4
const path = require('path')
const views = require('./webpack.helper.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  }

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    ...views.pages({
      srcDir: './src/views',
      filesExt:'html'
    }) 
  ]
};