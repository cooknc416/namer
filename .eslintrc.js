module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript'],
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
    'modules-newline'
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    'comma-dangle': [2, 'never'],
    'no-trailing-spaces': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'max-len': 0,
    'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'always' }],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-indent-props': [2, 2],
    'object-property-newline': [2, {
      allowAllPropertiesOnSameLine: false,
    }],
    'object-curly-newline': [2, {
      ObjectExpression: { multiline: true, minProperties: 1 },
      ObjectPattern: { multiline: true, minProperties: 2 },
      ImportDeclaration: { multiline: true, minProperties: 2 },
      ExportDeclaration: { multiline: true, minProperties: 2 }
    }],
    'modules-newline/import-declaration-newline': 2,
    'consistent-return': 0
  }
}