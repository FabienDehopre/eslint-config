import type { ConfigArray } from 'typescript-eslint';

import tseslint from 'typescript-eslint';

import { GLOB_EXCLUDE } from '../globs';

/**
 * Generates a configuration array for ESLint with default and user-defined ignore patterns.
 *
 * @param userIgnores - An array of user-defined glob patterns to ignore. Defaults to an empty array.
 * @returns A ConfigArray object containing the combined ignore patterns.
 */
export function ignores(userIgnores: string[] = []): ConfigArray {
  return tseslint.config({
    name: 'fabdeh/ignores',
    ignores: [...GLOB_EXCLUDE, ...userIgnores],
  });
}
