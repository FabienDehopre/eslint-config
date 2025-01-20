import vitest from '@vitest/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { GLOB_TESTS } from '../globs';

export default tseslint.config({
  name: 'fabdeh/vitest/rules',
  plugins: {
    vitest,
  },
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.vitest,
      ...vitest.environments.env.globals,
    },
  },
  settings: {
    vitest: {
      typecheck: true,
    },
  },
  files: [GLOB_TESTS],
  extends: [vitest.configs.recommended, jestDom.configs['flat/recommended'], testingLibrary.configs['flat/angular']],
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
  },
});
