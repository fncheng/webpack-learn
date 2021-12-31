const chalk = require('chalk')
const path = require('path')
const dotenv = require('dotenv')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
})
console.log(chalk.hex('#4E9F3D')('process.env.NODE_ENV', process.env.NODE_ENV))
console.log(chalk.hex('#4E9F3D')('process.env.buildPath', process.env.buildPath))
console.log(chalk.hex('#4E9F3D')('process.env.routerBase', process.env.routerBase))
console.log(chalk.hex('#4E9F3D')('process.env.VUE_APP_BASE_API', process.env.VUE_APP_BASE_API))

// console.log('dotenv: ', dotenv.config().parsed)
// console.log(process.env.DB_HOST)

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// eslint-disable-next-line
module.exports = (env) => {
  return {
    entry: './src/main.js',
    // entry: {
    //   main: './src/main.js',
    //   vendor: [path.resolve(__dirname, '../src/splitChunk.js')]
    // },
    target: 'web',
    devServer: {
      // static: {
      //   directory: path.join(__dirname, 'public'),
      // },
      client: {
        logging: 'warn'
      },
      compress: true,
      open: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src')
      },
      extensions: ['.tsx', '.ts', '.js', '.vue']
    },
    module: {
      rules: [
        { test: /\.vue$/, loader: 'vue-loader', exclude: /node_modules/ },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.css$/,
          use: [
            !IS_PRODUCTION
              ? {
                  loader: 'style-loader',
                  options: {
                    esModule: true
                  }
                }
              : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            !IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        // 其他选项
                      }
                    ]
                  ]
                }
              }
            },
            // Compiles Sass to CSS
            'sass-loader'
          ]
        },
        { test: /\.(jpeg|png)/i, type: 'asset' },
        { test: /\.gif/i, type: 'asset' }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title: 'Webpack Vue Template',
        template: path.resolve(__dirname, '../public/index.html'),
        inject: 'body',
        hash: true
      }),
      new MiniCssExtractPlugin({
        filename: (process.env.buildPath ?? '') + 'css/[name].[chunkhash].css'
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        'process.env.VERSION': JSON.stringify(process.env.VUE_APP_BASE_API)
      })
    ]
  }
}
