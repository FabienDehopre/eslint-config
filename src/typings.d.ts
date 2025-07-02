declare module '@eslint-community/eslint-plugin-eslint-comments' {
  import type { ESLint, Linter } from 'eslint';

  export declare const configs: { recommended: Linter.Config };

  export declare const rules: NonNullable<ESLint.Plugin['rules']>;

  export declare const utils: { patch: (ruleId?: string) => void };
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

  export = _default;
}
