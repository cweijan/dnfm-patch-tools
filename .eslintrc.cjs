require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@electron-toolkit",
    "@electron-toolkit/eslint-config-ts/eslint-recommended",
    "@vue/eslint-config-typescript/recommended",
  ],
  rules: {
    "no-case-declarations": 'off',
    "vue/html-indent": "off",
    "vue/require-default-prop": "off",
    "vue/max-attributes-per-line": "off",
    "vue/first-attribute-linebreak": "off",
    "vue/html-closing-bracket-newline": "off",
    '@typescript-eslint/no-unused-vars': 'warn',
    "@typescript-eslint/no-explicit-any": "off",
  },
};
