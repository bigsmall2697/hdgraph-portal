module.exports = {
    root: true,
    env: {
        browser: true
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/typescript",
        "plugin:vue/recommended",
        "@vue/prettier",
        "@vue/typescript",
        "plugin:compat/recommended"
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    settings: {
        "import/extensions": [".js", ".ts"],
        "import/resolver": {
            webpack: {},
            typescript: {}
        }
    },
    rules: {
        indent: ["error", 4],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

        // Vue
        // https://eslint.vuejs.org/rules/#uncategorized
        "vue/array-bracket-spacing": "error",
        "vue/arrow-spacing": "error",
        "vue/block-spacing": "error",
        "vue/brace-style": "error",
        "vue/camelcase": "error",
        "vue/comma-dangle": "error",
        "vue/component-name-in-template-casing": "error",
        "vue/eqeqeq": ["error", "smart"],
        "vue/key-spacing": "error",
        "vue/match-component-file-name": "error",
        "vue/no-boolean-default": "error",
        "vue/object-curly-spacing": ["error", "always"],
        "vue/script-indent": ["error", 4],
        "vue/space-infix-ops": "error",
        "vue/space-unary-ops": "error",
        "vue/v-on-function-call": "error"
    }
};
