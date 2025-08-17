import type { TypedConfigArray } from '../types';

import nodePlugin from 'eslint-plugin-n';
import tseslint from 'typescript-eslint';

import { GLOB_SRC } from '../globs';

/**
 * Generates an array containing configuration settings for Node.js-specific rules and plugins.
 *
 * @returns An array defining Node.js rules, plugins, and their configurations.
 */
export function node(): TypedConfigArray {
  return tseslint.config(
    {
      name: 'fabdeh/node/rules',
      files: [GLOB_SRC],
      plugins: {
        n: nodePlugin,
      },
      rules: {
        'n/handle-callback-err': ['error', '^(err|error)$'],
        'n/no-callback-literal': 'error',
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/prefer-global/buffer': ['error', 'never'],
        'n/prefer-global/process': ['error', 'never'],
        'n/prefer-promises/dns': 'error',
        'n/prefer-promises/fs': 'error',
        'n/process-exit-as-throw': 'error',
      },
    }
  );
}
