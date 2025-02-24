import type { ConfigArray } from 'typescript-eslint';
import type { FilesOptions, OverridesOptions, TailwindcssParserPerGlobOptions } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_HTML, GLOB_SRC } from '../globs';
import { ensurePackages, interopDefault } from '../utils';

/**
 * Checks whether options is the {@link TailwindcssParserPerGlobOptions} or not.
 *
 * @param options - The option object to check.
 * @returns `true` if options object is {@link TailwindcssParserPerGlobOptions}; `false` otherwise.
 */
function isTailwindcssParserPerGlobOptions(
  options: FilesOptions | TailwindcssParserPerGlobOptions
): options is TailwindcssParserPerGlobOptions {
  return 'parsers' in options && options.parsers !== undefined;
}

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
export async function tailwindcss(options: (FilesOptions & OverridesOptions) | (OverridesOptions & TailwindcssParserPerGlobOptions) = {}): Promise<ConfigArray> {
  await ensurePackages(['eslint-plugin-tailwindcss']);
  const tailwindcssPlugin = await interopDefault(import('eslint-plugin-tailwindcss'));
  let files: { files?: string[] };
  let parserConfigs: ConfigArray;
  const { overrides = {} } = options;
  if (isTailwindcssParserPerGlobOptions(options)) {
    files = {};
    parserConfigs = Object.entries(options.parsers ?? {})
      .map(([glob, parser], index) => ({
        name: `fabdeh/tailwindcss/parser-${index + 1}`,
        file: [glob],
        languageOptions: {
          parser,
        },
      }));
  } else {
    files = { files: options.files ?? [GLOB_SRC, GLOB_HTML] };
    parserConfigs = [];
  }

  return tseslint.config(
    ...parserConfigs,
    {
      name: 'fabdeh/tailwindcss/rules',
      plugins: { tailwindcss: tailwindcssPlugin },
      ...files,
      rules: {
        'tailwindcss/classnames-order': 'error',
        'tailwindcss/enforces-negative-arbitrary-values': 'error',
        'tailwindcss/enforces-shorthand': 'error',
        'tailwindcss/no-contradicting-classname': 'error',
        'tailwindcss/no-unnecessary-arbitrary-value': 'error',
        ...overrides,
      },
    }
  );
}
