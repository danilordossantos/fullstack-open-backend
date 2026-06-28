import js from '@eslint/js'
import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        ignores: ['dist/', 'eslint.configr.mjs'],
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js, '@stylistic/js': stylisticJs },
        extends: ['js/recommended'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.node,
                ...globals.commonjs,
            },
        },
        rules: {
            '@stylistic/js/indent': ['error', 4],
            '@stylistic/js/linebreak-style': ['error', 'unix'],
            '@stylistic/js/quotes': ['error', 'single'],
            '@stylistic/js/semi': ['error', 'never'],
            '@stylistic/js/no-trailing-spaces': 'error',
            '@stylistic/js/object-curly-spacing': ['error', 'always'],
            '@stylistic/js/arrow-spacing': ['error', { 'before': true, 'after': true }],
            'eqeqeq': 'error',
            'no-console': 0,
            'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        },
    },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
])
