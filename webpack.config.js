const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const ROOT = __dirname
const DOCS = path.resolve(ROOT, 'docs')

module.exports = {
  entry: {
    'gh-pages': './gh-pages/gh-pages.js'
  },
  output: {
    path: DOCS,
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: DOCS,
    compress: false,
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dekk Demo',
      filename: 'index.html',
      template: 'gh-pages/index.html',
      alwaysWriteToDisk: true,
      minify: {
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        quoteCharacter: '"',
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortClassName: true,
        sortAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: DOCS
    }),
    new FaviconsWebpackPlugin({
      logo: './gh-pages/favico.png',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ]
}
