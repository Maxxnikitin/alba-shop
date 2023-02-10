module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-prettier', 'stylelint-order', 'stylelint-scss'],
  rules: {
    'no-empty-source': null,
    'declaration-empty-line-before': null,
    'no-missing-end-of-source-newline': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
  },
};
