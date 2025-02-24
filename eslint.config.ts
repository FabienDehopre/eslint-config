import { createConfig } from './src';

export default createConfig(
  { formatters: true, typescript: { enableErasableSyntaxOnly: true } },
  {
    ignores: ['fixtures', '_fixtures'],
  }
);
