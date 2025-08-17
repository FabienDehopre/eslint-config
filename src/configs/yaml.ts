import type { FilesOptions, OverridesOptions, StylisticOptions, TypedConfigArray } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_YAML } from '../globs';
import { interopDefault } from '../utils';

/**
 * Generates an ESLint configuration for YAML files.
 *
 * @param options - Configuration options for the YAML setup.
 * @param options.files - An array of glob patterns to specify the YAML files to lint. Defaults to `[GLOB_YAML]`.
 * @param options.overrides - An object containing rule overrides.
 * @param options.stylistic - A boolean or object to specify stylistic rules. Defaults to `true`.
 * @param options.stylistic.indent - The number of spaces for indentation or 'tab'. Defaults to `2`.
 * @param options.stylistic.quotes - The type of quotes to use ('single', 'double', or 'backtick'). Defaults to `'single'`.
 * @returns A promise that resolves to a `TypedConfigArray` containing the ESLint configuration.
 */
export async function yaml(options: FilesOptions & OverridesOptions & StylisticOptions = {}): Promise<TypedConfigArray> {
  const {
    files = [GLOB_YAML],
    overrides = {},
    stylistic = true,
  } = options;
  const {
    indent = 2,
    quotes = 'single',
  } = typeof stylistic === 'object' ? stylistic : {};
  const [yamlPlugin, yamlParser] = await Promise.all([
    interopDefault(import('eslint-plugin-yml')),
    interopDefault(import('yaml-eslint-parser')),
  ]);

  return tseslint.config(
    {
      name: 'fabdeh/yaml/setup',
      plugins: {
        yaml: yamlPlugin,
      },
    },
    {
      name: 'fabdeh/yaml/rules',
      languageOptions: {
        parser: yamlParser,
      },
      files,
      rules: {
        '@stylistic/spaced-comment': 'off',
        'yaml/block-mapping': 'error',
        'yaml/block-sequence': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/plain-scalar': 'error',
        'yaml/vue-custom-block/no-parsing-error': 'error',
        ...stylistic
          ? {
              'yaml/block-mapping-question-indicator-newline': 'error',
              'yaml/block-sequence-hyphen-indicator-newline': 'error',
              'yaml/flow-mapping-curly-newline': 'error',
              'yaml/flow-mapping-curly-spacing': 'error',
              'yaml/flow-sequence-bracket-newline': 'error',
              'yaml/flow-sequence-bracket-spacing': 'error',
              'yaml/indent': ['error', indent === 'tab' ? 2 : indent],
              'yaml/key-spacing': 'error',
              'yaml/no-tab-indent': 'error',
              'yaml/quotes': ['error', { avoidEscape: true, prefer: quotes === 'backtick' ? 'single' : quotes }],
              'yaml/spaced-comment': 'error',
            }
          : {},
        ...overrides,
      },
    }
  );
}
