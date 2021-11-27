const path = require('path')
const { merge } = require('webpack-merge')
const dotenv = require('dotenv')
const webpackConfig = require('./webpack.config')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
dotenv.config({
  path: path.resolve(process.cwd(), '.env.development')
})

console.log('【process.env】dev', process.env.ENV)
module.exports = () => {
  return merge(webpackConfig(), {
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
