import { createConfig } from './src';

export default createConfig(
  { formatters: true, markdown: false },
  {
    ignores: ['fixtures', '_fixtures'],
  }
);
