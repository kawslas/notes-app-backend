import globals from "globals";
import pluginJs from "@eslint/js";
import daStyle from "eslint-config-dicodingacademy"; // Importing daStyle as per the instructions

/** @type {import('eslint').Linter.Config[]} */
export default [
  daStyle, // Adding daStyle to the exported configuration
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];


 