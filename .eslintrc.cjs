// @ts-check
const { defineConfig } = require('eslint-define-config');

/// <reference types="@eslint-types/typescript-eslint" />

module.exports = defineConfig({
    root: true,
    env: { browser: true, es2020: true },
    extends: [require.resolve('arui-presets-lint/eslint')],
    ignorePatterns: ['dist', 'coverage', '*.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.eslint.json', './cypress/tsconfig.json'],
    },
    plugins: ['react-refresh'],
    overrides: [
        {
            files: ['cypress/**/*.ts'],
            rules: {
                'cypress/no-unnecessary-waiting': 'off',
            },
        },
        {
            files: ['src/redux/**/*.ts', '*.reducer.ts'],
            rules: {
                'no-param-reassign': 'off',
                'no-return-assign': 'off',
                'import/no-default-export': 'off',
            },
        },
    ],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'import/no-absolute-path': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'cypress/**/*.ts',
                    '/*.test.{ts,tsx,js,jsx}',
                    'vite.config.ts',
                    'cypress.config.ts',
                ],
            },
        ],
        'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
        'react/jsx-sort-props': ['warn', { reservedFirst: true }],
        'no-underscore-dangle': 'off',
        'no-restricted-exports': ['error', { restrictDefaultExports: { defaultFrom: false } }],
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'variable', modifiers: ['destructured'], format: null },
        ],
    },
});
