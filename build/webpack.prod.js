const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const webpackBase = require('./webpack.base')
const svgToMiniDataURI = require('mini-svg-data-uri')
const CopyPlugin = require('copy-webpack-plugin')
const { setBuildPath } = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin')

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
      },
      { test: /\.ico/i, type: 'asset' }
    ]
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist/libs/')
        },
        {
          from: path.resolve(__dirname, '../public/favicon.ico'),
          to: path.resolve(__dirname, '../dist/libs/')
        },
        {
          from: 'node_modules/vue/dist/vue.runtime.min.js',
          to: path.resolve(__dirname, '../dist/libs/')
        },
        {
          from: 'node_modules/vue-router/dist/vue-router.min.js',
          to: path.resolve(__dirname, '../dist/libs/')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: (process.env.buildPath ?? '') + 'css/[name].[chunkhash].css'
    })
    // new PrerenderSPAPlugin({
    //   // Required - The path to the webpack-outputted app to prerender.
    //   staticDir: path.resolve(__dirname, '../dist/'),
    //   // Required - Routes to render.
    //   routes: ['/about']
    // })
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
