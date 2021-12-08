const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

console.log('【process.env】dev', process.env.ENV)
module.exports = () => {
  return merge(webpackConfig(), {
    mode: 'development',
    devtool: 'cheap-source-map',
    module: {
      rules: [
        /* @ts-ignore */
        { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }
      ]
    },
    plugins: [
      // @ts-ignore
      new EslintWebpackPlugin()
    ]
  })
}
