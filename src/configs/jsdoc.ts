import type { TSESLint } from '@typescript-eslint/utils';
import type { ConfigArray } from 'typescript-eslint';
import type { StylisticOptions } from '../types';

import jsdocPlugin from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';

import { GLOB_SRC, GLOB_TS } from '../globs';

/**
 * Get the JSDoc rules based on specific parameters.
 *
 * @param level - The level of (mostly) all rules.
 * @param stylistic - Does the stylistic rules be included.
 * @param mode - To get on JS or TS rules or both.
 * @returns The JSDoc eslint rules configured with the requested level.
 */
export function getJsDocRules(
  level: TSESLint.SharedConfig.RuleLevel,
  stylistic: boolean,
  mode: 'both' | 'jsOnly' | 'tsOnly'
): TSESLint.FlatConfig.Rules {
  return {
    ...(mode === 'both' || mode === 'jsOnly'
      ? {
          'jsdoc/check-access': level,
          'jsdoc/check-param-names': level,
          'jsdoc/check-property-names': level,
          'jsdoc/check-tag-names': level,
          'jsdoc/check-types': level,
          'jsdoc/check-values': level,
          'jsdoc/empty-tags': level,
          'jsdoc/implements-on-classes': level,
          'jsdoc/no-defaults': level,
          'jsdoc/no-undefined-types': level,
          'jsdoc/require-jsdoc': level,
          'jsdoc/require-param': level,
          'jsdoc/require-param-description': level,
          'jsdoc/require-param-name': level,
          'jsdoc/require-param-type': level,
          'jsdoc/require-property': level,
          'jsdoc/require-property-description': level,
          'jsdoc/require-property-name': level,
          'jsdoc/require-property-type': level,
          'jsdoc/require-returns': level,
          'jsdoc/require-returns-check': level,
          'jsdoc/require-returns-description': level,
          'jsdoc/require-returns-type': level,
          'jsdoc/require-yields': level,
          'jsdoc/require-yields-check': level,
          'jsdoc/valid-types': level,
          ...(stylistic
            ? {
                'jsdoc/check-alignment': level,
                'jsdoc/multiline-blocks': level,
                'jsdoc/no-multi-asterisks': level,
                'jsdoc/require-asterisk-prefix': level,
                'jsdoc/require-hyphen-before-param-description': level,
                'jsdoc/tag-lines': [level, 'never', { startLines: 1 }],
              }
            : {}),
        }
      : {}),
    ...(mode === 'both' || mode === 'tsOnly'
      ? {
          'jsdoc/check-tag-names': [level, { typed: true }],
          'jsdoc/no-types': level,
          'jsdoc/no-undefined-types': 'off',
          'jsdoc/require-param-type': 'off',
          'jsdoc/require-property-type': 'off',
          'jsdoc/require-returns-type': 'off',
        }
      : {}),
  };
}

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
      files: [GLOB_SRC],
      plugins: { jsdoc: jsdocPlugin },
      rules: getJsDocRules('warn', !!stylistic, 'jsOnly'),
    },
    {
      name: 'fabdeh/jsdoc/ts-only/rules',
      files: [GLOB_TS],
      rules: getJsDocRules('warn', !!stylistic, 'tsOnly'),
    }
  );
}
