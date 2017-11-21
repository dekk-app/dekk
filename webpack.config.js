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
const plugins = [
  new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
  }),
  new FaviconsWebpackPlugin({
    logo: path.join(__dirname, 'app/assets/logo.png'),
    //prefix: 'icons',
    //icons: {
    //  android: true,
    //  appleIcon: true,
    //  favicons: true
    //}
  }),

]

if (NODE_ENV === 'production') {
  plugins.push(
    new UglifyJSPlugin(),
    new MinifyPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      // inlineSource: '.(js, css)$',
      minify: {
        collapseWhitespace: true
      }
    })
    // new HtmlWebpackInlineSourcePlugin()
  )
} else {
  plugins.push(
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new HotModuleReplacementPlugin()
  )
}

module.exports = {
  plugins,
  entry: {
    demo: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    sourceMapFilename: 'sourcemaps/[file].map',
    crossOriginLoading: false
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map', // enum
  context: __dirname,
  devServer: {
    contentBase: path.join(__dirname, 'public'),
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
}
