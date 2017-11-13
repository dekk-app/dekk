const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {HotModuleReplacementPlugin} = require('webpack')

const loaders = require('./webpack.loaders.js')
const plugins = [
  new ExtractTextPlugin({
    filename: 'bundle.css',
    allChunks: true
  }),
  new HtmlWebpackPlugin({
    template: 'app/index.html',
    minify: {
      collapseWhitespace: true
    }
  }),
  new HotModuleReplacementPlugin({})
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJSPlugin, new MinifyPlugin)
}

module.exports = {
  plugins,
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
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
