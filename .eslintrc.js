/* global  module */
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module"
    },
    plugins: ["prettier"],
    extends: ["eslint:recommended", "prettier"],
    env: {
        amd: true,
        browser: true,
        node: true
    },
    globals: {
        Ember: true,
        computed: true
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                printWidth: 120,
                tabWidth: 4,
                semi: true,
                bracketSpacing: true
            }
        ],
        "no-var": "error",
        "prefer-const": "error",
        eqeqeq: "error",
        "block-scoped-var": "error"
    }
};
