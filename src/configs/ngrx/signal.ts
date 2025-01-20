import ngrx from '@ngrx/eslint-plugin/v9';
import tseslint from 'typescript-eslint';

import type { Selector } from '../rules-configs/naming-convention';

import { GLOB_TS_EXT } from '../../globs';
import namingConvention from '../rules-configs/naming-convention';

function allowLeadingUnderscoreOnMemberLike(conventions: Selector[]): Selector[] {
  return [
    ...conventions.filter((c) => !Array.isArray(c.selector)),
    { selector: 'variableLike', format: ['camelCase'] },
    { selector: 'memberLike', format: ['camelCase'], leadingUnderscore: 'allow' },
  ];
}

export default tseslint.config({
  name: 'fabdeh/ngrx-signals/rules',
  files: [`**/*.store.${GLOB_TS_EXT}`],
  extends: [ngrx.configs.signals, ngrx.configs.operators],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      ...allowLeadingUnderscoreOnMemberLike(namingConvention),
      {
        selector: 'variable',
        modifiers: ['const', 'global', 'exported'],
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],
  },
});
