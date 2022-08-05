const path = require('path')
const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.base')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = () => {
  return merge(webpackBase(), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      port: 1688,
      proxy: {
        // '/': { target: 'http://127.0.0.1:3000' }
      }
    },
    output: {
      path: path.resolve(__dirname, process.env.publicPath ?? '/', './dist'),
      filename: 'js/[name].[chunkhash].bundle.js',
      publicPath: process.env.publicPath ?? '/'
    },
    module: {
      rules: [
        /* @ts-ignore */
        // { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }
      ]
    },
    plugins: [
      // @ts-ignore
      new EslintWebpackPlugin()
    ]
  })
}
