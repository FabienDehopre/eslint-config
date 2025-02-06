import eslintConfigPrettier from 'eslint-config-prettier';

import { createConfig } from './src';

export default createConfig({}, { name: 'eslint-config-prettier', ...eslintConfigPrettier });
