const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log('cross-env: ', process.env.NODE_ENV);

// console.log('dotenv: ', dotenv.config().parsed)
// console.log(process.env.DB_HOST)

module.exports = (env) => {
  return {
    entry: './src/main.js',
    target: 'web',
    devServer: {
      // static: {
      //   directory: path.join(__dirname, 'public'),
      // },
      client: {
        logging: 'warn'
      },
      compress: true,
      open: true,
      port: 9000
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src')
      }
    },
    module: {
      rules: [
        { test: /\.vue$/, loader: 'vue-loader', exclude: /node_modules/ },
        {
          test: /\.css$/,
          use: [
            process.env.NODE_ENV !== 'production'
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
            'style-loader',
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
        { test: /\.(jpeg|png)/i, type: 'asset' }
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
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify('some')
      })
    ]
  }
}
