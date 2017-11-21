const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const {HotModuleReplacementPlugin} = require('webpack')
const {NODE_ENV} = process.env
const loaders = require('./webpack.loaders.js')

const getPlugins = (inputFolder, {
  faviconsWebpackPlugin = {},
  extractTextPlugin = {},
  htmlWebpackPlugin = {prod: {}, dev: {}}
}) => {
  const plugins = [
    new ExtractTextPlugin(Object.assign({
      filename: '[name].css',
      allChunks: true
    }, extractTextPlugin)),
    new FaviconsWebpackPlugin(Object.assign({
      logo: path.join(__dirname, `resources/logo.png`),
      prefix: 'icons-[hash]',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }, faviconsWebpackPlugin))
  ]

  if (NODE_ENV === 'production') {
    plugins.push(
      new UglifyJSPlugin(),
      new MinifyPlugin(),
      new HtmlWebpackPlugin(Object.assign({
        template: path.join(inputFolder, 'index.html'),
        minify: {
          collapseWhitespace: true
        }
      }, htmlWebpackPlugin.prod))
    )
  } else {
    plugins.push(
      new HtmlWebpackPlugin(Object.assign({
        template: path.join(inputFolder, 'index.html')
      }, htmlWebpackPlugin.dev)),
      new HotModuleReplacementPlugin()
    )
  }
  return plugins
}

module.exports = (inputFolder, outputFolder, pluginSettings) => ({
  plugins: getPlugins(inputFolder, pluginSettings),
  entry: `./${inputFolder}/index.js`,
  output: {
    path: path.resolve(__dirname, outputFolder),
    filename: '[name].js',
    sourceMapFilename: 'sourcemaps/[file].map',
    crossOriginLoading: false
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: NODE_ENV === 'production' ? false : 'source-map',
  context: __dirname,
  devServer: {
    contentBase: path.join(__dirname, outputFolder),
    hot: true,
    port: 8080,
    https: true,
    progress: true
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 500
  },
  module: {
    loaders
  }
})
