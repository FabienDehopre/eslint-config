import type { TypedFlatConfigItem } from '../types';

import { GLOB_EXCLUDE } from '../globs';

/**
 * Build the ignore configuration.
 * @param userIgnores  The user ignore glob patterns.
 * @returns  The ignore configuration.
 */
export function ignores(userIgnores: string[] = []): TypedFlatConfigItem[] {
  return [
    {
      name: 'fabdeh/ignores',
      ignores: [...GLOB_EXCLUDE, ...userIgnores],
    },
  ];
}
