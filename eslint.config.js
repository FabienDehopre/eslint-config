import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig(
  {
    formatters: true,
    typescript: {
      enableErasableSyntaxOnly: true,
      useRelaxedNamingConventionForCamelAndPascalCases: true,
      overrides: {
        // to be removed when migrated from tseslint.config to eslint defineConfig
        '@typescript-eslint/no-deprecated': 'off',
      },
    },
    type: 'lib',
  },
  {
    ignores: ['fixtures', '_fixtures'],
  }
);
