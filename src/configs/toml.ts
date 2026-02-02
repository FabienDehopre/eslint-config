import type { FilesOptions, OverridesOptions, StylisticOptions, TypedConfigArray } from '../shared/types';

import tseslint from 'typescript-eslint';

import { GLOB_TOML } from '../shared/globs';
import { interopDefault } from '../shared/utils';

/**
 * Generates an ESLint configuration for TOML files.
 *
 * @param options -  The configuration options.
 * @param options.files - The glob patterns for the files to lint.
 * @param options.overrides - The rules to override the default configuration.
 * @param options.stylistic - Whether to apply stylistic rules or a configuration object for stylistic rules.
 * @param options.stylistic.indent - The indentation style for stylistic rules.
 * @returns A promise that resolves to the ESLint configuration array.
 */
export async function toml(options: FilesOptions & OverridesOptions & StylisticOptions = {}): Promise<TypedConfigArray> {
  const {
    files = [GLOB_TOML],
    overrides = {},
    stylistic = true,
  } = options;
  const { indent = 2 } = typeof stylistic === 'object' ? stylistic : {};
  const tomlPlugin = await interopDefault(import('eslint-plugin-toml'));

  return tseslint.config(
    {
      name: 'fabdeh/toml/setup',
      plugins: {
        toml: tomlPlugin,
      },
    },
    {
      name: 'fabdeh/toml/rules',
      files,
      language: 'toml/toml',
      rules: {
        '@stylistic/spaced-comment': 'off',
        'toml/comma-style': 'error',
        'toml/keys-order': 'error',
        'toml/no-space-dots': 'error',
        'toml/no-unreadable-number-separator': 'error',
        'toml/precision-of-fractional-seconds': 'error',
        'toml/precision-of-integer': 'error',
        'toml/tables-order': 'error',
        'toml/vue-custom-block/no-parsing-error': 'error',
        ...stylistic
          ? {
              'toml/array-bracket-newline': 'error',
              'toml/array-bracket-spacing': 'error',
              'toml/array-element-newline': 'error',
              'toml/indent': ['error', indent],
              'toml/inline-table-curly-spacing': 'error',
              'toml/key-spacing': 'error',
              'toml/padding-line-between-pairs': 'error',
              'toml/padding-line-between-tables': 'error',
              'toml/quoted-keys': 'error',
              'toml/spaced-comment': 'error',
              'toml/table-bracket-spacing': 'error',
            }
          : {},
        ...overrides,
      },
    }
  );
}
