import type { ConfigArray } from 'typescript-eslint';
import type { OverridesOptions, TestingOptions } from '../types';

import globals from 'globals';
import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import { GLOB_TESTS } from '../globs';
import { interopDefault } from '../utils';

/**
 *
 * @param options
 */
export async function vitest(options: OverridesOptions & TestingOptions = {}): Promise<ConfigArray> {
  const {
    overrides = {},
    useJestDom = isPackageExists('@testing-library/jest-dom'),
    useTestingLibrary = isPackageExists('@testing-library/angular'),
  } = options;
  const [vitestPlugin, jestDomPlugin, testingLibraryPlugin] = await Promise.all([
    interopDefault(import('@vitest/eslint-plugin')),
    useJestDom ? interopDefault(import('eslint-plugin-jest-dom')) : Promise.resolve(undefined),
    useTestingLibrary ? interopDefault(import('eslint-plugin-testing-library')) : Promise.resolve(undefined),
  ]);
  return tseslint.config({
    name: 'fabdeh/vitest/rules',
    plugins: { vitest: vitestPlugin },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
        ...vitestPlugin.environments.env.globals,
      },
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    files: [...GLOB_TESTS],
    extends: [
      vitestPlugin.configs.recommended,
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
      'unicorn/no-null': 'off',
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/no-standalone-expect': 'error',
      'vitest/no-test-return-statement': 'error',
      'vitest/prefer-hooks-in-order': 'error',
      'vitest/prefer-hooks-on-top': 'error',
      'vitest/prefer-lowercase-title': 'error',
      'vitest/prefer-spy-on': 'error',
      'vitest/prefer-to-be': 'error',
      'vitest/prefer-to-be-falsy': 'error',
      'vitest/prefer-to-be-object': 'error',
      'vitest/prefer-to-be-truthy': 'error',
      'vitest/prefer-to-contain': 'error',
      'vitest/prefer-to-have-length': 'error',
      'vitest/prefer-todo': 'error',
      'vitest/prefer-vi-mocked': 'error',
      'vitest/require-top-level-describe': 'error',
      ...overrides,
    },
  });
}
