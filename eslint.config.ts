import { defineConfig } from './src';

export default defineConfig(
  {
    formatters: true,
    typescript: {
      enableErasableSyntaxOnly: true,
      useRelaxedNamingConventionForCamelAndPascalCases: true,
    },
    type: 'lib',
  },
  {
    ignores: ['fixtures', '_fixtures'],
  }
);
