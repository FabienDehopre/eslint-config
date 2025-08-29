import type { StylisticOptions, TypedConfigArray } from '../shared/types';

import * as importX from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

import { GLOB_SRC, GLOB_TS } from '../shared/globs';

/**
 * Generates an ESLint configuration array for import rules.
 *
 * @param options - An object containing stylistic options.
 * @param options.stylistic - A boolean indicating whether to include stylistic rules. Defaults to true.
 * @returns A TypedConfigArray object with the specified import rules.
 */
export function imports(options: StylisticOptions = {}): TypedConfigArray {
  const { stylistic = true } = options;
  return tseslint.config(
    {
      name: 'fabdeh/imports/rules',
      files: [GLOB_SRC],
      plugins: {
        'import-x': importX,
      },
      rules: {
        'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import-x/default': 'error',
        'import-x/export': 'error',
        'import-x/first': 'error',
        'import-x/named': 'error',
        'import-x/no-absolute-path': 'error',
        'import-x/no-deprecated': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-empty-named-blocks': 'error',
        'import-x/no-extraneous-dependencies': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-named-as-default': 'warn',
        'import-x/no-named-as-default-member': 'warn',
        'import-x/no-named-default': 'error',
        'import-x/no-self-import': 'error',
        'import-x/no-useless-path-segments': 'error',
        'import-x/no-webpack-loader-syntax': 'error',
        ...(stylistic
          ? {
              'import-x/newline-after-import': ['error', { considerComments: true, count: 1 }],
            }
          : {}),
      },
    },
    {
      name: 'fabdeh/imports/ts-disables',
      files: [GLOB_TS],
      rules: {
        'import-x/named': 'off',
        'import-x/no-deprecated': 'off',
      },
    }
  );
}
