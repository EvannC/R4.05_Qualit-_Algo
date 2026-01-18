module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['n', 'unicorn', 'perfectionist', 'prettier'],
  extends: ['eslint:recommended', 'plugin:n/recommended', 'plugin:unicorn/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',

    // Node plugin: adapte si tu utilises ESM/CommonJS
    'n/no-missing-import': 'off',

    // unicorn un peu strict -> on garde utile mais pas pénible
    'unicorn/prevent-abbreviations': 'off',

    // Tri
    'perfectionist/sort-imports': ['error', { type: 'natural', order: 'asc', newlinesBetween: 'always' }]
  }
};
