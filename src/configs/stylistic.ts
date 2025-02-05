import type { ConfigArray } from 'typescript-eslint';

import tseslint from 'typescript-eslint';

import type { StylisticConfig, StylisticOptions } from '../types';

import { GLOB_SRC } from '../globs';
import { interopDefault } from '../utils';

const DEFAULT_OPTIONS: StylisticConfig = {
  semi: true,
  arrowParens: true,
  braceStyle: '1tbs',
};

/**
 *
 * @param options
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
