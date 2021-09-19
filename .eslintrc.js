module.exports = {
    // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
    // This option interrupts the configuration hierarchy at this file
    // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
    root: true,

    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },

    env: {
        browser: true
    },

    // Rules order is important, please avoid shuffling them
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],

    plugins: [
        'vue',
    ],
    globals: {
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        __statics: 'readonly',
        __QUASAR_SSR__: 'readonly',
        __QUASAR_SSR_SERVER__: 'readonly',
        __QUASAR_SSR_CLIENT__: 'readonly',
        __QUASAR_SSR_PWA__: 'readonly',
        process: 'readonly',
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
        'camelcase': 'error',
        'eol-last': 'error',
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'no-lonely-if': 'error',
        'prefer-template': 'error'
    }
}
