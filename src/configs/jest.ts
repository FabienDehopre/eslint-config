import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { GLOB_SRC_EXT, GLOB_TESTS } from '../globs';

export default tseslint.config({
  name: 'fabdeh/jest/rules',
  plugins: {
    jest,
  },
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
  },
  files: [GLOB_TESTS, `**/jest.config.${GLOB_SRC_EXT}`],
  extends: [
    jest.configs['flat/recommended'],
    jest.configs['flat/style'],
    jestDom.configs['flat/recommended'],
    testingLibrary.configs['flat/angular'],
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
  },
});
