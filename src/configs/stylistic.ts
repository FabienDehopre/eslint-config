import type { ConfigArray } from 'typescript-eslint';
import type { StylisticConfig, StylisticOptions } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_SRC } from '../globs';
import { interopDefault } from '../utils';

export const STYLISTIC_CONFIG_DEFAULT: StylisticConfig = {
  semi: true,
  arrowParens: true,
  braceStyle: '1tbs',
  quoteProps: 'as-needed',
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
  const stylisticOptions: StylisticConfig = {
    ...STYLISTIC_CONFIG_DEFAULT,
    ...(typeof options.stylistic === 'boolean' ? {} : options.stylistic),
  };
  const stylisticPlugin = await interopDefault(import('@stylistic/eslint-plugin'));
  const config = stylisticPlugin.configs.customize(stylisticOptions);

  return tseslint.config({
    name: 'fabdeh/stylistic/rules',
    files: [GLOB_SRC],
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      ...config.rules,
      '@stylistic/comma-dangle': ['error', { arrays: 'always-multiline', objects: 'always-multiline' }],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    },
  });
}
