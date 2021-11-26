const path = require('path')
const { merge } = require('webpack-merge')
const dotenv = require('dotenv')
const TerserPlugin = require('terser-webpack-plugin')
const webpackConfig = require('./webpack.config')
const svgToMiniDataURI = require('mini-svg-data-uri')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
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
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.svg/i,
        type: 'asset/inline',
        generator: {
          dataUrl: (content) => {
            content = content.toString()
            return svgToMiniDataURI(content)
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // drop_console: true, // 这会删除console.*,如果只想删除console.log，请使用pure_funcs
            pure_funcs: ['console.log'] // 这会删除console.log
          }
        }
      })
    ]
  }
})
