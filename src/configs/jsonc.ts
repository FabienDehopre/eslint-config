import type { FilesOptions, OverridesOptions, StylisticOptions, TypedConfigArray } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs';
import { interopDefault } from '../utils';

/**
 * Generates an ESLint configuration for JSONC files.
 *
 * @param options - Configuration options for the JSONC setup.
 * @param options.files - An array of glob patterns to specify the JSONC files to lint. Defaults to `[GLOB_JSON, GLOB_JSON5, GLOB_JSONC]`.
 * @param options.overrides - Additional rules or configurations to override the default settings.
 * @param options.stylistic - A boolean or object to enable or configure stylistic rules. Defaults to `true`.
 * @returns A promise that resolves to a `ConfigArray` containing the ESLint configuration.
 * @example
 * ```typescript
 * const config = await jsonc({
 *   files: ['**\/*.json'],
 *   stylistic: {
 *     indent: 4,
 *   },
 * });
 * ```
 */
export async function jsonc(options: FilesOptions & OverridesOptions & StylisticOptions = {}): Promise<TypedConfigArray> {
  const {
    files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    overrides = {},
    stylistic = true,
  } = options;
  const { indent = 2 } = typeof stylistic === 'object' ? stylistic : {};
  const [jsoncPlugin, jsoncParser] = await Promise.all([
    interopDefault(import('eslint-plugin-jsonc')),
    interopDefault(import('jsonc-eslint-parser')),
  ]);

  return tseslint.config(
    {
      name: 'fabdeh/jsonc/setup',
      plugins: {
        jsonc: jsoncPlugin,
      },
    },
    {
      name: 'fabdeh/jsonc/rules',
      languageOptions: {
        parser: jsoncParser,
      },
      files,
      rules: {
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/space-unary-ops': 'error',
        'jsonc/valid-json-number': 'error',
        'jsonc/vue-custom-block/no-parsing-error': 'error',
        ...stylistic
          ? {
              'jsonc/array-bracket-spacing': ['error', 'never'],
              'jsonc/comma-dangle': ['error', 'never'],
              'jsonc/comma-style': ['error', 'last'],
              'jsonc/indent': ['error', indent],
              'jsonc/key-spacing': ['error', { afterColon: true, beforeColon: false }],
              'jsonc/object-curly-newline': ['error', { consistent: true, multiline: true }],
              'jsonc/object-curly-spacing': ['error', 'always'],
              'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
              'jsonc/quote-props': 'error',
              'jsonc/quotes': 'error',
            }
          : {},
        ...overrides,
      },
    }
  );
}
