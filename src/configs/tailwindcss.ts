import type { ConfigArray } from 'typescript-eslint';
import type { FilesOptions, OverridesOptions } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_HTML, GLOB_SRC } from '../globs';
import { interopDefault } from '../utils';

/**
 * Generates an ESLint configuration array for Tailwind CSS.
 *
 * @param [options] - Optional overrides for the configuration.
 * @returns  A promise that resolves to the ESLint configuration array.
 * @example
 * const config = await tailwindcss({
 *   overrides: {
 *     'tailwindcss/classnames-order': 'warn',
 *   },
 * });
 */
export async function tailwindcss(options: FilesOptions & OverridesOptions = {}): Promise<ConfigArray> {
  const tailwindcssPlugin = await interopDefault(import('eslint-plugin-tailwindcss'));
  const { files = [GLOB_SRC, GLOB_HTML], overrides = {} } = options;
  return tseslint.config({
    name: 'fabdeh/tailwindcss/rules',
    plugins: { tailwindcss: tailwindcssPlugin },
    files,
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/enforces-negative-arbitrary-values': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
      ...overrides,
    },
  });
}
