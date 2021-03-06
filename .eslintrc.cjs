/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier',
        '@vue/eslint-config-typescript/recommended',
    ],
    env: {
        node: true,
    },
    rules: {
        'no-console': 'warn',
        'prefer-const': 'error',
        'prefer-template': 'error',
    },
};
