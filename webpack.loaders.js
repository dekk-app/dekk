const {extract} = require('extract-text-webpack-plugin')
const path = require('path')
const ABCQ = require('abcq')
const {NODE_ENV} = process.env

function generator(opts = {}) {
  const shortid = new ABCQ(opts)
  this.names = {}
  return (name, file) => {
    const obj = this.names[file] || {}
    if (!(name in obj)) {
      obj[name] = shortid.generate()
    }
    this.names[file] = obj
    return obj[name]
  }
}

const generateScopedName = new generator()

const rootFolderName = __dirname.split('/').reverse()[0]

module.exports = [
  {
    test: /\.js$/,
    exclude: /(node_modules)/,
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
            sourceMap: NODE_ENV !== 'production',
            importLoaders: 2,
            ident: 'css',
            getLocalIdent: ({resource}, localIdentName, localName) => {
              if (NODE_ENV === 'production') {
                return generateScopedName(localName, resource)
              }
              const reversedPath = resource.replace('.scss', '').split('/').reverse()
              const index = reversedPath.indexOf(rootFolderName)
              const pathString = reversedPath.splice(0, index).reverse().join('/')
              const className = `${pathString}[${localName}]`
              return className
            }
          }
       },
       {
          loader: 'postcss-loader',
          options: {
            config: {
              ctx: {
                'normalize': {},
                'clean': false,
                autoprefixer: {
                  browsers: ['last 2 versions']
                }
              }
            }
          }
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
