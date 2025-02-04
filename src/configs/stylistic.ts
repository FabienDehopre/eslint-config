import type { StylisticConfig, StylisticOptions, TypedFlatConfigItem } from '../types';

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
export async function stylistic(options: StylisticOptions = {}): Promise<TypedFlatConfigItem[]> {
  const stylisticOptions = { ...DEFAULT_OPTIONS, ...options };
  const stylisticPlugin = await interopDefault(import('@stylistic/eslint-plugin'));
  const config = stylisticPlugin.configs.customize({ ...stylisticOptions, flat: true });

  return [
    {
      name: 'fabdeh/stylistic/rules',
      files: [GLOB_SRC],
      plugins: {
        '@stylistic': stylisticPlugin,
      },
      rules: {
        ...config.rules,
        '@stylistic/no-extra-semi': 'error',
      },
    },
  ];
}
