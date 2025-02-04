import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';

import type { TypedFlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';

/**
 * Generates a configuration object for ESLint comments rules.
 * @returns An array containing the configuration object for ESLint comments rules.
 */
export function comments(): TypedFlatConfigItem[] {
  return [
    {
      name: 'fabdeh/comments/rules',
      files: [GLOB_SRC],
      plugins: {
        '@eslint-community/eslint-comments': eslintComments,
      },
      rules: {
        '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        '@eslint-community/eslint-comments/no-aggregating-enable': 'error',
        '@eslint-community/eslint-comments/no-duplicate-disable': 'error',
        '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
        '@eslint-community/eslint-comments/no-unused-disable': 'error',
        '@eslint-community/eslint-comments/no-unused-enable': 'error',
      },
    },
  ];
}
