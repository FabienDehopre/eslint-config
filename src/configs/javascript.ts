import type { ConfigArray } from 'typescript-eslint';
import type { OverridesOptions } from '../types';

import eslint from '@eslint/js';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Generates a configuration array for JavaScript projects with ESLint.
 *
 * This function sets up ESLint configurations for JavaScript projects, including language options,
 * linter options, and specific rules. It supports options for Angular decorators and unused imports
 * handling based on the environment (editor or not).
 *
 * @param options - Configuration options for the JavaScript setup.
 * @param options.overrides - Additional rule overrides.
 * @param options.allowAngularDecorator - Allows specific Angular decorators to be used without new-cap errors.
 * @returns A configuration array for ESLint.
 * @example
 * ```typescript
 * const config = javascript({ allowAngularDecorator: true });
 * ```
 */
export function javascript(
  options: OverridesOptions = {}
): ConfigArray {
  const { overrides = {} } = options;

  return tseslint.config(
    {
      name: 'fabdeh/javascript/setup',
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: 'error',
      },
    },
    {
      name: 'fabdeh/javascript/rules',
      plugins: {
        '@typescript-eslint': tseslint.plugin,
        'prefer-arrow-functions': preferArrowFunctions,
        'unused-imports': unusedImports,
      },
      rules: {
        ...eslint.configs.recommended.rules,
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'default-case-last': 'error',
        'dot-notation': 'error',
        eqeqeq: 'error',
        'id-denylist': [
          'error',
          'any',
          'Number',
          'number',
          'String',
          'string',
          'Boolean',
          'boolean',
          'Undefined',
          'undefined',
        ],
        'new-cap': 'error',
        'no-alert': 'error',
        'no-caller': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-implied-eval': 'error',
        'no-iterator': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-proto': 'error',
        'no-restricted-syntax': ['error', 'TSEnumDeclaration[const=true]', 'TSExportAssignment', 'ForInStatement'],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unreachable-loop': 'error',
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        'no-use-before-define': ['error', { classes: false, functions: false }],
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'prefer-arrow-callback': 'error',
        'prefer-arrow-functions/prefer-arrow-functions': [
          'error',
          { singleReturnOnly: true, allowNamedFunctions: true },
        ],
        'prefer-const': 'error',
        'prefer-exponentiation-operator': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'symbol-description': 'error',
        'unicode-bom': ['error', 'never'],
        'unused-imports/no-unused-imports': 'error',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        'use-isnan': ['error', { enforceForIndexOf: true }],
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'vars-on-top': 'error',
        yoda: ['error', 'never', { exceptRange: true }],
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-require-imports': ['error', { allowAsImport: true }],
        '@typescript-eslint/no-this-alias': 'error',
        ...overrides,
      },
    }
  );
}
