const {extract} = require('extract-text-webpack-plugin')
const path = require('path')
const {NODE_ENV} = process.env

module.exports = [
  {
    test: /\.js$/,
    loader: 'babel-loader'
  },
  {
    test: /\.scss$/,
    use: extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            camelCase: true,
            importLoaders: 2,
            ident: 'css',
            getLocalIdent: (context, localIdentName, localName, options) => {
              const {name} = path.parse(context.context)
              return `${name}_${localName}`
            }
          }
       },
       {
        loader: 'postcss-loader'
       },
       {
        loader: 'sass-loader'
       }
     ]
    })
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.(woff|woff2)$/,
    loader: 'url-loader?prefix=font/&limit=5000'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.gif/,
    loader: 'url-loader?limit=10000&mimetype=image/gif'
  },
  {
    test: /\.jpg/,
    loader: 'url-loader?limit=10000&mimetype=image/jpg'
  },
  {
    test: /\.png/,
    loader: 'url-loader?limit=10000&mimetype=image/png'
  }
]
