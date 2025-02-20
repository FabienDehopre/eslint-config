import type { TSESLint } from '@typescript-eslint/utils';
import type { ConfigArray } from 'typescript-eslint';
import type { OverridesOptions, RegExpOptions } from '../types';

import { configs } from 'eslint-plugin-regexp';
import tseslint from 'typescript-eslint';

import { GLOB_SRC } from '../globs';

/**
 * Add linting rules for finding RegExp mistakes and RegExp style guide violations.
 *
 * @param options - Allow to turn all the linting rules as warning if necessary and provide overrides.
 * @returns The ESLint configuration about regexp.
 */
export function regexp(options: OverridesOptions & RegExpOptions = {}): ConfigArray {
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
