import ngrx from '@ngrx/eslint-plugin/v9';
import tseslint from 'typescript-eslint';

import { GLOB_TS_EXT } from '../../globs';
import namingConvention from '../rules-configs/naming-convention';

export default tseslint.config({
  name: 'fabdeh/ngrx-effects/rules',
  files: [`**/*.effects.${GLOB_TS_EXT}`],
  extends: [ngrx.configs.effects, ngrx.configs.operators],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      ...namingConvention,
      {
        selector: 'variable',
        modifiers: ['const', 'global', 'exported'],
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
        suffix: ['$'],
      },
    ],
  },
});
