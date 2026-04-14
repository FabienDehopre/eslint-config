import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig(
  {
    ignores: ['src/typings.d.ts'],
    playwright: { e2eFolderPath: './fixtures/' },
    typescript: {
      enableErasableSyntaxOnly: true,
      useRelaxedNamingConventionForCamelAndPascalCases: true,
      overrides: {
        // to be removed when migrated from tseslint.config to eslint defineConfig
        '@typescript-eslint/no-deprecated': 'warn',
      },
    },
    type: 'lib',
  },
  {
    name: 'project/ignores',
    ignores: ['**/fixtures/**', '**/_fixtures/**', '**/typegen/**'],
  },
  {
    name: 'project/overrides',
    rules: {
      '@typescript-eslint/await-thenable': 'off', // TODO: remove once TSEslint fixes the rule correctly.
    },
  },
  {
    name: 'project/tests/overrides',
    files: ['tests/**/*.ts'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-param-description': 'off',
    },
  },
  {
    name: 'project/scripts/overrides',
    files: ['scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'jsdoc/require-jsdoc': 'off',
    },
  }
);
