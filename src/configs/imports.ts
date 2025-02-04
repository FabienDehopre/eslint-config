import * as importX from 'eslint-plugin-import-x';

import type { StylisticOptions, TypedFlatConfigItem } from '../types';

import { GLOB_JS, GLOB_SRC, GLOB_TS } from '../globs';

/**
 * Generates an array of TypedFlatConfigItem objects containing import rules configurations.
 * @param options - The stylistic options for the import rules.
 * @returns An array of configuration objects for import rules.
 */
export function imports(options: StylisticOptions = {}): TypedFlatConfigItem[] {
  const { stylistic = true } = options;
  return [
    {
      name: 'fabdeh/imports/common/rules',
      files: [GLOB_SRC],
      plugins: {
        'import-x': importX,
      },
      rules: {
        'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import-x/default': 'error',
        'import-x/export': 'error',
        'import-x/first': 'error',
        'import-x/no-absolute-path': 'error',
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
      name: 'fabdeh/imports/js-only/rules',
      files: [GLOB_JS],
      rules: {
        'import-x/named': 'error',
        'import-x/no-deprecated': 'error',
      },
    },
    {
      name: 'fabdeh/imports/ts-only/rules',
      files: [GLOB_TS],
      rules: {
        'import-x/named': 'off',
        'import-x/no-deprecated': 'off',
      },
    },
  ];
}
