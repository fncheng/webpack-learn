module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends: ["plugin:vue/essential", "eslint:recommended"],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 重写prettier验证规则
    'prettier/prettier': [
      'warn',
      // 针对会被 ESLint 格式化的文件类型，Prettier 会作为 ESLint 的一个规则运行并格式化文件，因此需要添加如下配置
      { printWidth: 100, semi: false, singleQuote: true, trailingComma: 'none' }
    ],
    'vue/multi-word-component-names': 'off'
  }
}
