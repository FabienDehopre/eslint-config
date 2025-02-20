import { createConfig } from '@fabdeh/eslint-config';

export default createConfig(
  { formatters: true },
  {
    ignores: ['fixtures', '_fixtures'],
  }
);
