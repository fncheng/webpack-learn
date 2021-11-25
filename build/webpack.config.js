const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// console.log('dotenv: ', dotenv.config().parsed)
// console.log(process.env.DB_HOST)

module.exports = (env) => {
  console.log('env: ', env)
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
    module: {
      rules: [
        { test: /\.vue$/, loader: 'vue-loader' },
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
        }
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
      new webpack.DefinePlugin({
        VERSION: JSON.stringify('some')
      })
    ]
  }
}
