module.exports = {
  'parserOptions': {
    'parser': 'babel-eslint',
  },
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  'rules': {
    'no-useless-constructor': 0,
    'no-undef': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': 2,
    'no-console': [2, { allow: ["info", "warn", "error"] }],
    'no-shadow': 2,
  },
  'plugins': ['prettier'],
}
