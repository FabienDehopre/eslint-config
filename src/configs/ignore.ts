import type { TypedConfigArray } from '../shared/types';

import tseslint from 'typescript-eslint';

import { GLOB_EXCLUDE } from '../shared/globs';

/**
 * Generates a configuration array for ESLint with default and user-defined ignore patterns.
 *
 * @param userIgnores - An array of user-defined glob patterns to ignore. Defaults to an empty array.
 * @param fromFactory - An optional suffix to add to the config name.
 * @returns A TypedConfigArray object containing the combined "ignore" patterns.
 */
export function ignores(userIgnores: string[] = [], fromFactory?: 'project' | 'workspace'): TypedConfigArray {
  return tseslint.config({
    name: `fabdeh/ignores${fromFactory ? `/${fromFactory}` : ''}`,
    ignores: [...(!fromFactory || fromFactory === 'workspace' ? GLOB_EXCLUDE : []), ...userIgnores],
  });
}
