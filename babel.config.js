module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3.19, modules: false }],
    ['@vue/babel-preset-jsx', { injectH: true }]
  ]
}
