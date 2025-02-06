import type { ConfigArray } from 'typescript-eslint';
import type { StylisticConfig, StylisticOptions } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_SRC } from '../globs';
import { interopDefault } from '../utils';

const DEFAULT_OPTIONS: StylisticConfig = {
  semi: true,
  arrowParens: true,
  braceStyle: '1tbs',
};

/**
 * Generates a stylistic ESLint configuration.
 *
 * @param [options] - Optional configuration options to customize the stylistic rules.
 * @returns A promise that resolves to an array of ESLint configurations.
 * @example
 * const config = await stylistic({ semi: false });
 */
export async function stylistic(options: StylisticOptions = {}): Promise<ConfigArray> {
  const stylisticOptions = { ...DEFAULT_OPTIONS, ...options };
  const stylisticPlugin = await interopDefault(import('@stylistic/eslint-plugin'));
  const config = stylisticPlugin.configs.customize({ ...stylisticOptions, flat: true });

  return tseslint.config({
    name: 'fabdeh/stylistic/rules',
    files: [GLOB_SRC],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...config.rules,
      '@stylistic/no-extra-semi': 'error',
    },
  });
}
