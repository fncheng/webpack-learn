const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const webpackConfig = require('./webpack.config')
const svgToMiniDataURI = require('mini-svg-data-uri')
const CopyPlugin = require('copy-webpack-plugin')

console.log('【process.env】prod', process.env.NODE_ENV)
module.exports = merge(webpackConfig(), {
  mode: 'production',
  output: {
    clean: true,
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[contenthash].bundle.js'
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
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist/static')
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // drop_console: true, // 这会删除console.*,如果只想删除console.log，请使用pure_funcs
            // pure_funcs: ['console.log'] // 这会删除console.log
          }
        }
      })
    ]
  }
})
