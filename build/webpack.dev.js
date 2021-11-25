const path = require('path')
const { merge } = require('webpack-merge')
const dotenv = require('dotenv')
const webpackConfig = require('./webpack.config')
dotenv.config({
  path: path.resolve(process.cwd(), '.env.development')
})

console.log('【process.env】dev', process.env.ENV)
module.exports = (env) => {
  return merge(webpackConfig(), {
    devtool: 'cheap-source-map',
    module: {
      rules: [{ test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } }]
    }
  })
}
