import ngrx from '@ngrx/eslint-plugin/v9';
import tseslint from 'typescript-eslint';

import { GLOB_TS_EXT } from '../../globs';
import namingConvention from '../rules-configs/naming-convention';

export default tseslint.config({
  name: 'fabdeh/ngrx-store/rules',
  files: [
    `**/*.actions.${GLOB_TS_EXT}`,
    `**/*.feature.${GLOB_TS_EXT}`,
    `**/*.reducer.${GLOB_TS_EXT}`,
    `**/*.state.${GLOB_TS_EXT}`,
  ],
  extends: [ngrx.configs.store, ngrx.configs.operators],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      ...namingConvention,
      {
        selector: ['objectLiteralProperty'],
        // eslint-disable-next-line unicorn/no-null
        format: null,
        custom: {
          regex: String.raw`^(?:(?:[a-z]+(?:[A-Z][a-z]*)*)|[A-Z][a-z]*(?:\s[A-Z][a-z]*)*)$`,
          match: true,
        },
      },
      {
        selector: 'variable',
        modifiers: ['const', 'global', 'exported'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],
  },
});
