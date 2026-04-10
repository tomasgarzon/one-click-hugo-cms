const babelParser = require("@babel/eslint-parser");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        },
        ecmaVersion: "latest",
        requireConfigFile: false,
        sourceType: "module"
      },
      globals: {
        $: "readonly",
        ENV: "readonly",
        __dirname: "readonly",
        console: "readonly",
        document: "readonly",
        grecaptcha: "readonly",
        module: "readonly",
        process: "readonly",
        require: "readonly",
        tns: "readonly",
        window: "readonly"
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      "import/export": 2,
      "no-console": 1,
      "no-debugger": 2,
      "no-dupe-args": 2,
      "no-dupe-keys": 2,
      "no-duplicate-case": 2,
      "no-empty-character-class": 2,
      "no-ex-assign": 2,
      "no-extra-boolean-cast": 2,
      "no-fallthrough": 2,
      "no-invalid-regexp": 2,
      "no-redeclare": 2,
      "no-unreachable": 2,
      "no-undef": 2,
      "no-unused-vars": [2, { args: "none" }],
      "valid-typeof": 2
    }
  }
];
