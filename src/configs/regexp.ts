import type { TSESLint } from '@typescript-eslint/utils';
import type { OverridesOptions, RegExpOptions, TypedConfigArray } from '../types';

import { configs } from 'eslint-plugin-regexp';
import tseslint from 'typescript-eslint';

import { GLOB_SRC } from '../globs';

/**
 * Configure the recommended regexp rules.
 *
 * @param options - The options
 * @returns The ESLint configuration for regexp linting
 */
export function regexp(options: OverridesOptions & RegExpOptions = {}): TypedConfigArray {
  const { level, overrides } = options;
  const config = configs['flat/recommended'];
  const rules = Object.fromEntries(
    Object.entries(config.rules)
      .map(([ruleName, ruleLevel]) => [ruleName, level === 'warn' ? level : ruleLevel])
  ) as TSESLint.FlatConfig.Config['rules'];

  return tseslint.config(
    {
      name: 'fabdeh/regexp/rules',
      files: [GLOB_SRC],
      plugins: {
        ...config.plugins,
      },
      rules: {
        ...rules,
        ...overrides,
      },
    }
  );
}
