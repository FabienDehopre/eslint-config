import type { ConfigArray } from 'typescript-eslint';

import perfectionistPlugin from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

import { SORT_IMPORT_GROUPS, SORT_UNION_OR_INTERSECTION_GROUPS } from './rules-configs/perfectionist-groups';

/**
 *
 */
export function perfectionist(): ConfigArray {
  return tseslint.config({
    name: 'fabdeh/perfectionist/rules',
    plugins: {
      perfectionist: perfectionistPlugin,
    },
    rules: {
      'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-imports': [
        'error',
        {
          newlinesBetween: 'never',
          groups: SORT_IMPORT_GROUPS,
          tsconfigRootDir: process.cwd(),
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-intersection-types': [
        'error',
        {
          groups: SORT_UNION_OR_INTERSECTION_GROUPS,
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-switch-case': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-union-types': [
        'error',
        {
          groups: SORT_UNION_OR_INTERSECTION_GROUPS,
          order: 'asc',
          type: 'natural',
        },
      ],
    },
  });
}
