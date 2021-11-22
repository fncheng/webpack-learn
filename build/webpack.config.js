const { VueLoaderPlugin } = require('vue-loader')
const postcssPxToViewport = require('postcss-px-to-viewport')

module.exports = {
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
                  ['postcss-preset-env',{
                    // 其他选项
                  },],
                  new postcssPxToViewport({
                    viewportWidth: 750
                  })
                ],
              },
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
}
