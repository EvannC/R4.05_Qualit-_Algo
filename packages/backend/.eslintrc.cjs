module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script'
  },
  extends: ['eslint:recommended'],

  ignorePatterns: ['node_modules/', 'coverage/', 'jest.config.cjs', 'src/__tests__/'],

  rules: {}
};
