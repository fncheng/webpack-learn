const path = require('path')
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.config')

module.exports = (env) => {
  return merge(webpackConfig(), {})
}
