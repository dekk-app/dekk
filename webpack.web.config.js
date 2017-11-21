const createConfig = require('./webpack.base.config.js')

module.exports = createConfig('dekk-web', 'web-public', {
  faviconsWebpackPlugin: {},
  extractTextPlugin: {},
  htmlWebpackPlugin: {prod: {}, dev: {}}
})
