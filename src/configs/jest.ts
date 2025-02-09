import type { ConfigArray } from 'typescript-eslint';
import type { OverridesOptions, StylisticOptions, TestingOptions } from '../types';

import globals from 'globals';
import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import { GLOB_SRC_EXT, GLOB_TESTS } from '../globs';
import { interopDefault } from '../utils';

/**
 * Generates an ESLint configuration for Jest testing environments.
 *
 * @param options - Configuration options for the Jest setup.
 * @param options.overrides - Custom rule overrides to apply.
 * @param options.useJestDom - Whether to include `@testing-library/jest-dom` plugin. Defaults to checking if the package exists.
 * @param options.useTestingLibrary - Whether to include `@testing-library/angular` plugin. Defaults to checking if the package exists.
 * @param options.stylistic - Whether to include stylistic rules. Defaults to `true`.
 * @returns A promise that resolves to a `ConfigArray` containing the ESLint configuration.
 */
export async function jest(options: OverridesOptions & StylisticOptions & TestingOptions = {}): Promise<ConfigArray> {
  const {
    overrides = {},
    useJestDom = isPackageExists('@testing-library/jest-dom'),
    useTestingLibrary = isPackageExists('@testing-library/angular'),
    stylistic = true,
  } = options;
  const [jestPlugin, jestDomPlugin, testingLibraryPlugin] = await Promise.all([
    interopDefault(import('eslint-plugin-jest')),
    useJestDom ? interopDefault(import('eslint-plugin-jest-dom')) : Promise.resolve(undefined),
    useTestingLibrary ? interopDefault(import('eslint-plugin-testing-library')) : Promise.resolve(undefined),
  ]);

  return tseslint.config({
    name: 'fabdeh/jest/rules',
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    files: [...GLOB_TESTS, `** /jest.config.${GLOB_SRC_EXT}`],
    extends: [
      jestPlugin.configs['flat/recommended'],
      ...(stylistic ? [jestPlugin.configs['flat/style']] : []),
      ...(jestDomPlugin ? [jestDomPlugin.configs['flat/recommended']] : []),
      ...(testingLibraryPlugin ? [testingLibraryPlugin.configs['flat/angular']] : []),
    ],
    rules: {
      'max-classes-per-file': 'off',
      'max-lines': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'jest/consistent-test-it': ['error', { fn: 'test' }],
      'jest/prefer-spy-on': 'error',
      'jest/require-top-level-describe': 'error',
      'jest/unbound-method': 'error',
      'unicorn/no-null': 'off',
      ...overrides,
    },
  });
}
