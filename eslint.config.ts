import { createConfig } from './src';

export default createConfig(
  { formatters: true },
  {
    ignores: ['fixtures', '_fixtures'],
  }
);
