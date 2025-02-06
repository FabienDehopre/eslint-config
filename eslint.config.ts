import eslintConfigPrettier from 'eslint-config-prettier';

import { createConfig } from './src';

export default createConfig(
  {
    angular: false,
    ngrx: false,
    jest: false,
    vitest: false,
    tailwindcss: false,
  },
  { name: 'eslint-config-prettier', ...eslintConfigPrettier }
);
