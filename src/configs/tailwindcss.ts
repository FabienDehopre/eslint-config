import type { FilesOptions, OverridesOptions, TailwindCssOptions, TypedConfigArray } from '../shared/types';

import tseslint from 'typescript-eslint';

import { GLOB_HTML, GLOB_SRC } from '../shared/globs';
import { ensurePackages, interopDefault } from '../shared/utils';

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
export async function tailwindcss(options: (FilesOptions & OverridesOptions & TailwindCssOptions) = {}): Promise<TypedConfigArray> {
  await ensurePackages(['eslint-plugin-better-tailwindcss']);
  const betterTailwindcssPlugin = await interopDefault(import('eslint-plugin-better-tailwindcss'));
  const { files: filesGlob, overrides, enableAllRules, parsers, ...settings } = options;
  let files: { files?: string[] };
  let parserConfigs: TypedConfigArray;
  if (parsers) {
    files = { files: [...new Set(Object.keys(parsers))] };
    parserConfigs = Object.entries(parsers)
      .map(([glob, parser], index) => ({
        name: `fabdeh/tailwindcss/parser-${index + 1}`,
        files: [glob],
        languageOptions: {
          parser,
        },
      }));
  } else {
    files = { files: filesGlob ?? [GLOB_SRC, GLOB_HTML] };
    parserConfigs = [];
  }

  return tseslint.config(
    ...parserConfigs,
    {
      name: '@fabdeh/tailwindcss/rules',
      ...files,
      plugins: {
        'better-tailwindcss': betterTailwindcssPlugin,
      },
      settings: {
        'better-tailwindcss': settings,
      },
      rules: {
        ...betterTailwindcssPlugin.configs.recommended?.rules,
        ...(enableAllRules
          ? {
              'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
              'better-tailwindcss/no-conflicting-classes': 'error',
              'better-tailwindcss/no-restricted-classes': 'error',
            }
          : {}),
      },
    }
  );
}
