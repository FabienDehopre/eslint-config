import type { ConfigArray } from 'typescript-eslint';
import type { OverridesOptions, StylisticOptions, TypeScriptParserOptions } from '../types';

import process from 'node:process';

import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

import { GLOB_MARKDOWN, GLOB_TS } from '../globs';
import { getWorkspaceRoot } from '../utils';
import memberOrdering from './rules-configs/member-ordering';
import namingConvention from './rules-configs/naming-convention';

/**
 * Generates a TypeScript ESLint configuration.
 *
 * @param options - Configuration options that include overrides, stylistic preferences, and parser options.
 * @param options.stylistic - A boolean indicating whether stylistic rules should be included. Defaults to true.
 * @param options.parserOptions - Options for the TypeScript parser.
 * @param options.overrides - Additional rule overrides.
 * @returns A ConfigArray containing the TypeScript ESLint configuration.
 */
export function typescript(options: OverridesOptions & StylisticOptions & TypeScriptParserOptions = {}): ConfigArray {
  const { stylistic = true, parserOptions = {}, overrides = {} } = options;

  return tseslint.config(
    {
      name: 'fabdeh/typescript/setup',
      files: [GLOB_TS],
      ignores: [`${GLOB_MARKDOWN}/**`],
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          sourceType: 'module',
          projectService: {
            allowDefaultProject: ['*.js'],
            defaultProject: 'tsconfig.json',
          },
          tsconfigRootDir: getWorkspaceRoot(process.cwd(), process.cwd()),
          ...parserOptions,
        },
      },
    },
    {
      name: 'fabdeh/typescript/rules',
      files: [GLOB_TS],
      ignores: [`${GLOB_MARKDOWN}/**`],
      plugins: {
        '@typescript-eslint': tseslint.plugin,
        'unused-imports': unusedImports,
      },
      rules: {
        ...tseslint.configs.strictTypeChecked.find((c) => c.name === 'typescript-eslint/eslint-recommended')?.rules,
        ...tseslint.configs.strictTypeChecked.find((c) => c.name === 'typescript-eslint/strict-type-checked')?.rules,
        ...(stylistic
          ? tseslint.configs.stylisticTypeChecked.find((c) => c.name === 'typescript-eslint/stylistic-type-checked')?.rules
          : {}),
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        }],
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowDirectConstAssertionInArrowFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        '@typescript-eslint/member-ordering': ['error', memberOrdering],
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/naming-convention': ['error', ...namingConvention],
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
        '@typescript-eslint/no-empty-interface': 'off', // deprecated but included in nx
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extraneous-class': ['error', { allowStaticOnly: true, allowWithDecorator: true }],
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/only-throw-error': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unsafe-unary-minus': 'error',
        '@typescript-eslint/parameter-properties': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/restrict-plus-operands': ['error', { skipCompoundAssignments: true }],
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        ...overrides,
      },
    }
  );
}
