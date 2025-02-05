import eslintConfigPrettier from 'eslint-config-prettier';

import { fabdehConfig } from './src';

export default fabdehConfig({}, { name: 'eslint-config-prettier', ...eslintConfigPrettier });
