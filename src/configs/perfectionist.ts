import perfectionistPlugin from 'eslint-plugin-perfectionist';

import type { TypedFlatConfigItem } from '../types';

import { SORT_IMPORT_GROUPS, SORT_UNION_OR_INTERSECTION_GROUPS } from './rules-configs/perfectionist-groups';

/**
 *
 */
export function perfectionist(): TypedFlatConfigItem[] {
  return [
    {
      name: 'fabdeh/perfectionist/rules',
      plugins: {
        perfectionist: perfectionistPlugin,
      },
      rules: {
        'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-imports': [
          'error',
          {
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
    },
  ];
}
