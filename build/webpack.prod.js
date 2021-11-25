const path = require('path')
const { merge } = require('webpack-merge')
const dotenv = require('dotenv')
const webpackConfig = require('./webpack.config')
dotenv.config({
  path: path.resolve(process.cwd(), '.env.production')
})

console.log('【process.env】prod', process.env.ENV)
module.exports = merge(webpackConfig(), {
  output: {
    clean: true,
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }]
  }
})
