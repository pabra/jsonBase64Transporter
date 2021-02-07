module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    // 'jest',
    'prettier',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
    'prettier/standard',
  ],
  env: {
    'jest/globals': true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'no-duplicate-imports': 'off',

    // ts
    '@typescript-eslint/explicit-module-boundary-types': 2,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 2,
    '@typescript-eslint/no-unused-vars': [2],
    '@typescript-eslint/no-duplicate-imports': ['error'],

    // js
    'no-shadow': 2,
    'import/no-unused-modules': [2, { unusedExports: true }],
    eqeqeq: 2,
  },
};
