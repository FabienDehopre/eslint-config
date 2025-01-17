import type { TSESLint } from '@typescript-eslint/utils';

export default [
  'error',
  {
    default: [
      'signature',
      '#private-field',
      'private-field',
      'protected-field',
      'public-field',
      ['#private-accessor', '#private-get', '#private-set'],
      ['private-accessor', 'private-get', 'private-set'],
      ['protected-accessor', 'protected-get', 'protected-set'],
      ['public-accessor', 'public-get', 'public-set'],
      'static-initialization',
      'constructor',
      'call-signature',
      'public-method',
      'protected-method',
      'private-method',
      '#private-method',
    ],
  },
] satisfies TSESLint.SharedConfig.RuleEntry;
