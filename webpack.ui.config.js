const createConfig = require('./webpack.base.config.js')

module.exports = createConfig('dekk-ui', 'ui-public', {
  faviconsWebpackPlugin: {},
  extractTextPlugin: {},
  htmlWebpackPlugin: {prod: {}, dev: {}}
})
