import type { TSESLint } from '@typescript-eslint/utils';
import type { OverridesOptions, RegExpOptions, TypedConfig } from '../shared/types';

import { configs } from 'eslint-plugin-regexp';

import { GLOB_SRC } from '../shared/globs';

/**
 * Configure the recommended regexp rules.
 *
 * @param options - The options
 * @returns The ESLint configuration for regexp linting
 */
export function regexp(options: OverridesOptions & RegExpOptions = {}): TypedConfig[] {
  const { level, overrides } = options;
  const config = configs['flat/recommended'];
  const rules = Object.fromEntries(
    Object.entries(config.rules)
      .map(([ruleName, ruleLevel]) => [ruleName, level === 'warn' ? level : ruleLevel])
  ) as TSESLint.FlatConfig.Config['rules'];

  return [
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
    },
  ];
}
