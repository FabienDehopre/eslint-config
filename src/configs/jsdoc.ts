import type { ConfigArray } from 'typescript-eslint';

import jsdocPlugin from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';

import type { StylisticOptions } from '../types';

import { GLOB_SRC, GLOB_TS } from '../globs';

/**
 *
 * @param options
 */
export function jsdoc(options: StylisticOptions = {}): ConfigArray {
  const { stylistic = true } = options;
  return tseslint.config(
    {
      name: 'fabdeh/jsdoc/rules',
      files: [GLOB_SRC],
      plugins: { jsdoc: jsdocPlugin },
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/check-values': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/no-defaults': 'warn',
        'jsdoc/no-multi-asterisks': 'warn',
        'jsdoc/no-undefined-types': 'warn',
        'jsdoc/require-jsdoc': 'warn',
        'jsdoc/require-param': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-property-type': 'warn',
        'jsdoc/require-returns': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn',
        'jsdoc/require-yields': 'warn',
        'jsdoc/require-yields-check': 'warn',
        'jsdoc/tag-lines': 'warn',
        'jsdoc/valid-types': 'warn',
        ...(stylistic
          ? {
              'jsdoc/check-alignment': 'warn',
              'jsdoc/multiline-blocks': 'warn',
            }
          : {}),
      },
    },
    {
      name: 'fabdeh/jsdoc/ts-only/rules',
      files: [GLOB_TS],
      rules: {
        'jsdoc/check-tag-names': ['warn', { typed: true }],
        'jsdoc/no-types': 'warn',
        'jsdoc/no-undefined-types': 'off',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-property-type': 'off',
        'jsdoc/require-returns-type': 'off',
      },
    }
  );
}
