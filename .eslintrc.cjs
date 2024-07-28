/* eslint-env node */
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
    "vue/require-default-prop": "off",
    "vue/max-attributes-per-line": "off",
    "vue/multi-word-component-names": "off",
  },
};
