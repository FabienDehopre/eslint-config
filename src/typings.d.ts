declare module '@nx/eslint-plugin' {
  import type { TSESLint } from '@typescript-eslint/utils';

  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare const _default: {
    configs: {
      'flat/base': TSESLint.FlatConfig.ConfigArray;
      'flat/typescript': TSESLint.FlatConfig.ConfigArray;
      'flat/javascript': TSESLint.FlatConfig.ConfigArray;
      'flat/angular': TSESLint.FlatConfig.ConfigArray;
      'flat/angular-template': TSESLint.FlatConfig.ConfigArray;
    };
    rules: Record<string, unknown>; // just need to be declared... we don't care about the rules
  };

  // eslint-disable-next-line no-restricted-syntax
  export = _default;
}

declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint';

  export declare const configs: { recommended: Linter.Config };

  export declare const rules: NonNullable<ESLint.Plugin['rules']>;

  export declare const utils: { patch: (ruleId?: string) => void };
}

declare module 'eslint-config-prettier' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare const _default: {
    rules: Record<string, 0 | 'off'>;
  };

  // eslint-disable-next-line no-restricted-syntax
  export = _default;
}

declare module 'eslint-plugin-tailwindcss' {
  import type { ESLint, Linter } from 'eslint';

  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare const _default: {
    rules: NonNullable<ESLint.Plugin['rules']>;
    configs: {
      recommended: Linter.Config;
      ['flat/recommended']: Linter.Config;
    };
  };

  // eslint-disable-next-line no-restricted-syntax
  export = _default;
}
