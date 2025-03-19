import { defineConfig } from './src';

export default defineConfig(
  { formatters: true, typescript: { enableErasableSyntaxOnly: true } },
  {
    ignores: ['fixtures', '_fixtures'],
  }
);
