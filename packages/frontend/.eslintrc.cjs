module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' } },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'perfectionist', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // active prettier en règle ESLint + disable règles en conflit
  ],
  rules: {
    'prettier/prettier': 'error',

    // JSX / React modern
    'react/react-in-jsx-scope': 'off',

    // Tri (perfectionist)
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        newlinesBetween: 'always',
        internalPattern: ['^@/', '^src/'],
      },
    ],
    'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
    'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
  },
};
