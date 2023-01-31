const path = require('path')

module.exports = {
  env: {
    es2022: true,
    browser: true
  },
  plugins: ['prettier'],
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.join(__dirname, 'tsconfig.json')
  },
  rules: {
  }
}
