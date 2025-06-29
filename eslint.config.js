import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { globalIgnores } from 'eslint/config';
import airbnb from 'eslint-config-airbnb';
import airbnbTypescript from 'eslint-config-airbnb-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  globalIgnores(['dist', 'build/', 'node_modules/', 'config/']),
  eslintConfigPrettier,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...airbnb.rules,
      ...airbnbTypescript.rules,
      // TYPESCRIPT
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-redeclare': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      // IMPORT
      'import/first': 'error',
      'import/prefer-default-export': 'off',
      'no-duplicate-imports': 'error',
      'import/no-duplicates': 'off',
      'import/no-anonymous-default-export': 'error',
      'import/no-extraneous-dependencies': 'off',
      'simple-import-sort/imports': 'error',

      // REACT
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-curly-brace-presence': 'error',
      'react/jsx-no-bind': 'off',
      'react/jsx-key': 'error',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      'jsx-quotes': ['error', 'prefer-double'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-did-update-set-state': 'error',
      'react/no-unknown-property': 'error',
      'react/no-array-index-key': 'error',
      'react/no-unused-state': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',
      'react/prefer-stateless-function': 'warn',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/require-render-return': 'error',
      'react/no-unused-prop-types': 'warn',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/prop-types': 'off',
      'react/default-props-match-prop-types': 'off',
      // COMMON
      'no-console': [
        'warn',
        {
          allow: ['info', 'error'],
        },
      ],
      'no-debugger': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],
      'no-param-reassign': 'off',
      'array-callback-return': 'error',
      'object-shorthand': 'error',
      'quote-props': ['error', 'as-needed'],
      'prefer-template': 'warn',
      'no-useless-escape': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': 'warn',
      'no-dupe-class-members': 'error',
      'no-unneeded-ternary': 'error',
      'no-else-return': 'error',
      'no-undef': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'smart'],
      'no-unused-vars': 'off',
      'no-unused-expressions': 'error',
      semi: ['error', 'always'],
      'linebreak-style': 0,
      'default-case': 'warn',
      'new-parens': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-control-regex': 'warn',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty-pattern': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'warn',
      'no-extra-label': 'warn',
      'no-label-var': 'error',
      'no-labels': [
        'warn',
        {
          allowLoop: true,
          allowSwitch: false,
        },
      ],
      'no-fallthrough': 'warn',
      'no-func-assign': 'warn',
      'no-implied-eval': 'error',
      'no-invalid-regexp': 'error',
      'no-lone-blocks': 'error',
      'no-multi-str': 'warn',
      'no-global-assign': 'error',
      'no-unsafe-negation': 'error',
      'no-new-func': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-restricted-syntax': 'error',
      'no-script-url': 'error',
      'no-shadow-restricted-names': 'error',
      'no-unreachable': 'error',
      'no-use-before-define': 'off',
      'no-useless-concat': 'error',
      'no-with': 'error',
      // Импорт из пакета @mes-ui/eslint-config
      'max-len': [
        'error',
        140,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 2,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': ['error'],
      'import/no-unresolved': 'off',
      // 'import/no-default-export': 'error',
      'react/jsx-props-no-multi-spaces': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      camelcase: 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'no-shadow': 'off',
      'no-underscore-dangle': 'off',
      'import/no-cycle': 'off',
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        process: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        ...reactPlugin.configs.recommended.parserOptions,
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
);
