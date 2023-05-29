const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const webpackBase = require('./webpack.base')
const svgToMiniDataURI = require('mini-svg-data-uri')
const CopyPlugin = require('copy-webpack-plugin')
const { setBuildPath } = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log('【process.env】prod', process.env.NODE_ENV)
module.exports = merge(webpackBase(), {
  mode: 'production',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: setBuildPath(process.env.buildPath),
    publicPath: '/'
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
  externals: {
    vue: 'Vue'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist/static/dll')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: (process.env.buildPath ?? '') + 'css/[name].[chunkhash].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
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
