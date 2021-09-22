/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
    root: true,
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    plugins: [
        'vue',
    ],
    globals: {
        process: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        H: 'readonly'
    },
    rules: {
        'indent': [
            'error',
            4,
            { SwitchCase: 1 },
        ],
        'vue/html-indent': [
            'error',
            4,
        ],
        'vue/component-tags-order': ['error', {
            order: ['script', 'template', 'style'],
        }],
        'vue/no-v-html': 'error',
        'vue/max-attributes-per-line': 'off',
        'vue/require-default-prop': 'off',
        'vue/valid-template-root': 'off',
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
            { allowTemplateLiterals: true },
        ],
        'semi': [
            'error',
            'always',
        ],
        'eqeqeq': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'no-case-declarations': 'off',
        'no-unsafe-optional-chaining': [
            'error',
            { disallowArithmeticOperators: true },
        ],
        'no-unreachable-loop': 'error',
        'dot-location': [
            'error',
            'property',
        ],
        'array-callback-return': 'error',
        'dot-notation': 'error',
        'no-await-in-loop': 'error',
        'no-implicit-coercion': 'error',
        'no-invalid-this': 'error',
        'no-implied-eval': 'error',
        'yoda': [
            'error',
            'never',
        ],
        'comma-dangle': [
            'error',
            'only-multiline',
        ],
        'comma-style': 'error',
        'comma-spacing': 'error',
        'eol-last': 'error',
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'no-lonely-if': 'error',
        'prefer-template': 'error',
        'no-unused-vars': 'warn',
    },
    overrides: [
        {
            files: ['.eslintrc.js', 'babel.config.js', '.postcssrc.js'],
            env: {
                node: true,
            },
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
};

module.exports = config;
