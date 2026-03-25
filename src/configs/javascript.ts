import type { OverridesOptions, TypedConfigArray } from '../shared/types';

import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { GLOB_SRC } from '../shared/globs';

/**
 * Generates a configuration array for JavaScript projects with ESLint.
 *
 * This function sets up ESLint configurations for JavaScript projects, including language options,
 * linter options, and specific rules. It supports options for Angular decorators and unused imports
 * handling based on the environment (editor or not).
 *
 * @param options - Configuration options for the JavaScript setup.
 * @param options.overrides - Additional rule overrides.
 * @returns A configuration array for ESLint.
 * @example
 * ```typescript
 * const config = javascript();
 * ```
 */
export function javascript(
  options: OverridesOptions = {}
): TypedConfigArray {
  const { overrides = {} } = options;

  return tseslint.config(
    {
      name: 'fabdeh/javascript/setup',
      languageOptions: {
        ecmaVersion: 'latest',
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
          ecmaVersion: 'latest',
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
      files: [GLOB_SRC],
      plugins: {
        '@typescript-eslint': tseslint.plugin,
        'prefer-arrow-functions': preferArrowFunctions,
        'unused-imports': unusedImports,
      },
      rules: {
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'constructor-super': 'error',
        'default-case-last': 'error',
        'dot-notation': 'error',
        eqeqeq: 'error',
        'for-direction': 'error',
        'getter-return': 'error',
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
        'no-async-promise-executor': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-compare-neg-zero': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-const-assign': 'error',
        'no-constant-binary-expression': 'error',
        'no-constant-condition': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-empty-static-block': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-global-assign': 'error',
        'no-import-assign': 'error',
        'no-implied-eval': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loss-of-precision': 'error',
        'no-misleading-character-class': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-new-wrappers': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-prototype-builtins': 'error',
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-regex-spaces': 'error',
        /*
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: '',
          },
          {
            selector: 'TSExportAssignment',
            message: '',
          },
          {
            selector: 'ForInStatement',
            message: '',
          },
          {
            selector: ':matches(PropertyDefinition, MethodDefinition)[accessibility="private"]',
            message: 'Use `#private` members instead.',
          },
        ],
        */
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-setter-return': 'error',
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-unassigned-vars': 'error',
        'no-unexpected-multiline': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unsafe-optional-chaining': 'error',
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        'no-unused-labels': 'error',
        'no-unused-private-class-members': 'error',
        'no-unused-vars': 'off',
        'no-use-before-define': ['error', { classes: false, functions: false }],
        'no-useless-assignment': 'error',
        'no-useless-backreference': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-with': 'error',
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
        'preserve-caught-error': 'error',
        'require-yield': 'error',
        'symbol-description': 'error',
        'unicode-bom': ['error', 'never'],
        'use-isnan': ['error', { enforceForIndexOf: true }],
        'unused-imports/no-unused-imports': 'error',
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
