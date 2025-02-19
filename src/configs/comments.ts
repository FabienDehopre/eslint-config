import type { ConfigArray } from 'typescript-eslint';

import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import tseslint from 'typescript-eslint';

/**
 * Generates a configuration array for ESLint comments rules.
 *
 * This function returns a configuration array that includes rules for managing
 * ESLint comments in the codebase. It uses the `@eslint-community/eslint-comments`
 * plugin to enforce best practices and prevent common issues with ESLint comments.
 *
 * @returns The configuration array for ESLint comments rules.
 */
export function comments(): ConfigArray {
  return tseslint.config({
    name: 'fabdeh/comments/rules',
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
  });
}
