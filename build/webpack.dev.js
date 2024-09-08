const path = require('path')
const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.base')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
// const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin')

module.exports = () => {
  return merge(webpackBase(), {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      port: 7000,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000/api',
          changeOrigin: true,
          pathWrite: {
            '^/api': ''
          }
        }
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
      // new PrerenderSPAPlugin({
      //   // Required - The path to the webpack-outputted app to prerender.
      //   staticDir: path.resolve(__dirname, '../dist/'),
      //   // Required - Routes to render.
      //   routes: ['/home', '/about']
      // })
    ]
  })
}
