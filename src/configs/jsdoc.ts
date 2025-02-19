import type { ConfigArray } from 'typescript-eslint';
import type { StylisticOptions } from '../types';

import jsdocPlugin from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';

import { GLOB_TS } from '../globs';

/**
 * Generates a configuration array for JSDoc rules.
 *
 * @param options - An object containing stylistic options.
 * @param options.stylistic - A boolean indicating whether to include stylistic rules. Defaults to true.
 * @returns A configuration array for JSDoc rules.
 */
export function jsdoc(options: StylisticOptions = {}): ConfigArray {
  const { stylistic = true } = options;
  return tseslint.config(
    {
      name: 'fabdeh/jsdoc/rules',
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
        'jsdoc/tag-lines': ['warn', 'never', { startLines: 1 }],
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
