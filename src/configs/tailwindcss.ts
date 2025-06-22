import type { ConfigArray } from 'typescript-eslint';
import type { BetterTailwindcssOptions, FilesOptions, OverridesOptions, TailwindcssParserPerGlobOptions } from '../types';

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
 * Generates an ESLint configuration array for Tailwind CSS using better-tailwindcss plugin.
 *
 * @param [options] - Optional overrides for the configuration.
 * @returns  A promise that resolves to the ESLint configuration array.
 * @example
 * const config = await tailwindcss({
 *   enableAllRules: true,
 *   overrides: {
 *     'better-tailwindcss/recommended': 'warn',
 *   },
 * });
 */
export async function tailwindcss(options: (BetterTailwindcssOptions & FilesOptions & OverridesOptions) | (BetterTailwindcssOptions & OverridesOptions & TailwindcssParserPerGlobOptions) = {}): Promise<ConfigArray> {
  await ensurePackages(['eslint-plugin-better-tailwindcss']);
  const betterTailwindcssPlugin = await interopDefault(import('eslint-plugin-better-tailwindcss'));
  let files: { files?: string[] };
  let parserConfigs: ConfigArray;
  const { overrides = {}, enableAllRules = false } = options;
  if (isTailwindcssParserPerGlobOptions(options)) {
    const parsers = options.parsers ?? {};
    files = { files: [...new Set(Object.keys(parsers))] };
    parserConfigs = Object.entries(parsers)
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
      plugins: { 'better-tailwindcss': betterTailwindcssPlugin },
      ...files,
      rules: {
        ...(enableAllRules && {
          'better-tailwindcss/recommended': 'warn',
        }),
        ...overrides,
      },
    }
  );
}
