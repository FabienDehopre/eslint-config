import type { FilesOptions, OverridesOptions, PlaywrightOptions, TypedConfig } from '../shared/types';

import { join } from 'node:path';

import { GLOB_TESTS } from '../shared/globs';
import { convertPathToPosix, interopDefault, isDirectory } from '../shared/utils';
import { getJsDocRules } from './jsdoc';

/**
 * Configures and returns an ESLint flat config for Playwright test files.
 *
 * @param [options] - Options used to customize the Playwright config.
 * @param [options.e2eFolderPath] - The path to the e2e folder to prepend to each `options.files` glob pattern (defaults to `e2e`).
 * @param [options.files] - File globs to target (defaults to `GLOB_TESTS`).
 * @param [options.overrides] - Custom ESLint rule overrides merged last.
 * @returns A promise that resolves to a single-entry ESLint config array.
 * @example
 * const config = await playwright({
 *   e2eFolderPath: 'tests/e2e',
 *   files: ['**\/*.test.ts'], // will become 'tests\/e2e\/**\/*.test.ts' because of the e2eFolderPath option
 *   overrides: {
 *     'playwright/no-page-pause': 'off',
 *   },
 * });
 */
export async function playwright(options: FilesOptions & OverridesOptions & PlaywrightOptions = {}): Promise<TypedConfig[]> {
  const {
    e2eFolderPath = 'e2e',
    files = GLOB_TESTS.map((glob) => convertPathToPosix(join(e2eFolderPath, glob))),
    overrides = {},
  } = options;
  if (!isDirectory(e2eFolderPath)) {
    // end-to-end tests folder does not exist or is not a directory,
    // so we skip loading the Playwright plugin and return an empty config to avoid errors
    return [];
  }

  const playwrightPlugin = await interopDefault(import('eslint-plugin-playwright'));
  return [{
    name: 'fabdeh/playwright/rules',
    plugins: {
      playwright: playwrightPlugin,
    },
    files,
    rules: {
      ...playwrightPlugin.configs.recommended.rules,
      'max-lines': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'unicorn/no-null': 'off',
      'playwright/no-get-by-title': 'error',
      'playwright/no-nth-methods': 'error',
      'playwright/prefer-comparison-matcher': 'error',
      'playwright/prefer-equality-matcher': 'error',
      'playwright/prefer-lowercase-title': ['error', { allowedPrefixes: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] }],
      'playwright/prefer-native-locators': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-contain': 'error',
      ...getJsDocRules('off', true, 'both'),
      ...overrides,
    },
  }];
}
