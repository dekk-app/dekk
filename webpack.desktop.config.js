const createConfig = require('./webpack.base.config.js')

module.exports = createConfig('dekk-desktop', 'desktop-public', {
  faviconsWebpackPlugin: {},
  extractTextPlugin: {},
  htmlWebpackPlugin: {prod: {}, dev: {}}
})
