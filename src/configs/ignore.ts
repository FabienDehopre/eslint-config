import type { ConfigArray } from 'typescript-eslint';

import tseslint from 'typescript-eslint';

import { GLOB_EXCLUDE } from '../globs';

/**
 * Build the ignore configuration.
 * @param userIgnores  The user ignore glob patterns.
 * @returns  The ignore configuration.
 */
export function ignores(userIgnores: string[] = []): ConfigArray {
  return tseslint.config({
    name: 'fabdeh/ignores',
    ignores: [...GLOB_EXCLUDE, ...userIgnores],
  });
}
