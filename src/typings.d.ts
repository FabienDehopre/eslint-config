declare module '@nx/eslint-plugin' {
  import type { TSESLint } from '@typescript-eslint/utils';

  export default {
    configs: {
      'flat/base': TSESLint.FlatConfig.ConfigArray,
      'flat/typescript': TSESLint.FlatConfig.ConfigArray,
      'flat/javascript': TSESLint.FlatConfig.ConfigArray,
      'flat/angular': TSESLint.FlatConfig.ConfigArray,
      'flat/angular-template': TSESLint.FlatConfig.ConfigArray,
    },
    rules: {}, // just need to be declared... we don't care about the rules
  };
}

declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint';

  export declare const configs: { recommended: Linter.FlatConfig };

  export declare const rules: NonNullable<ESLint.Plugin['rules']>;

  export declare const utils: { patch: (ruleId?: string) => void };
}
