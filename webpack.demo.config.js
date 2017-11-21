const createConfig = require('./webpack.base.config.js')

module.exports = createConfig('dekk-demo', 'demo-public', {
  faviconsWebpackPlugin: {},
  extractTextPlugin: {},
  htmlWebpackPlugin: {prod: {}, dev: {}}
})
