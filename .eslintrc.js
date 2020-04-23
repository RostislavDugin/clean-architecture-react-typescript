module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // Do not use this functions
    '@typescript-eslint/no-inferrable-types': 'off',
    'lines-between-class-members': 'off',
    // Cause problems with Prettier
    'operator-linebreak': 'off',
    'eslint-disable-next-line padded-blocks': 'off',
    // Disallowed by AirBnB style Guide
    'space-before-function-paren': 'off',
    semi: 'off',
    // Allows empty lines in comments
    'no-trailing-spaces': [2, { ignoreComments: true }],
    // Allows 'console.log(...)'
    'no-console': 'off',
    // Allows 'alert(...)'
    'no-alert': 'off',
    // Allows to use <label> for <input> and <input> without
    // being nested in each other. With Bootstrap it helps to
    // align elements by one side (line) - if elements are nested
    // it is hard to achieve the same result.
    'jsx-a11y/label-has-associated-control': 'off',
    // Allows use class methods without 'this'. It is required
    // because in some cases method should be attached to
    // specific class
    'class-methods-use-this': 'off',
    // We can use setState() in componentDidUpdate() if we are
    // checking that props are reaaly unequal
    'react/no-did-update-set-state': 'off',
    // This application shouldn't have support for people
    // with disabilities
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    // Sometimes we need to use links as buttons
    'jsx-a11y/anchor-is-valid': 'off',
    // Allows one line destructuring in params
    'object-curly-newline': 'off',
    // Unneccessary, when we use two buttons in group
    'jsx-a11y/control-has-associated-label': 'off',
    // Sometimes it breakes readability
    'no-lonely-if': 'off',
    // This method detects the order by start of method's
    // names and it creates unneccessary warnings. For
    // example, method 'clearSmth' will be underlined even
    // if doesn't clear React's component data
    'react/sort-comp': 'off',
    // There are situations, where you must use index
    // key. For example, if an array contains equal
    // elements
    'react/no-array-index-key': 'off',
    // These rules cause problems with TypeScript files,
    // however TS compiler detects them
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    // Causes problems with TypeScript declaring
    'spaced-comment': 'off',
    // Causes problems when editing JSON files
    // in TypeScript files
    '@typescript-eslint/camelcase': 'off',
    // Causes problems with Prettier
    'react/jsx-one-expression-per-line': 'off',
    // Cause problems in TypeScript files
    'react/jsx-filename-extension': 'off',
    'react/static-property-placement': 'off',
    // Required in TypeScript JSON models
    camelcase: 'off',
    // Not always reasonable
    'arrow-body-style': 'off',
    // We use Prettier formating and it is sometimes
    // not similar to ESLint
    indent: 'off',
  },
};
