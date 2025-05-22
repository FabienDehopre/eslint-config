import type { ConfigArray } from 'typescript-eslint';

import process from 'node:process';

import perfectionistPlugin from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

import { GLOB_SRC } from '../globs';
import { findNearestPackageJsonName, getWorkspaceRoot } from '../utils';
import { SORT_IMPORT_GROUPS, SORT_UNION_OR_INTERSECTION_GROUPS } from './rules-configs/perfectionist-groups';

/**
 * Generates a configuration array for the "perfectionist" ESLint plugin.
 *
 * This configuration includes rules for sorting various elements in the codebase
 * such as exports, imports, intersection types, named exports, named imports,
 * switch cases, and union types. The sorting order is set to "ascending" and the
 * type is natural.
 *
 * @returns The configuration array for the "perfectionist" plugin.
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<ConfigArray> {
  const rootDir = (await findNearestPackageJsonName()) === '@fabdeh/eslint-config'
    ? undefined
    : getWorkspaceRoot(process.cwd(), process.cwd());
  return tseslint.config({
    name: 'fabdeh/perfectionist/rules',
    files: [GLOB_SRC],
    plugins: {
      perfectionist: perfectionistPlugin,
    },
    rules: {
      'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: SORT_IMPORT_GROUPS,
          tsconfig: rootDir
            ? {
                rootDir,
                filename: ['tsconfig.app.json', 'tsconfig.lib.json', 'tsconfig.spec.json', 'tsconfig.json', 'tsconfig.base.json'],
              }
            : undefined,
          order: 'asc',
          type: 'natural',
          newlinesBetween: 'never',
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
