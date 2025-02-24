import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
import type { TSESLint } from '@typescript-eslint/utils';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { VendoredPrettierOptions } from './vendor/prettier-types';

/**
 * A type that can be awaited. Promise<T> or T.
 */
export type Awaitable<T> = Promise<T> | T;

/**
 * Interface representing options for overriding default ESLint rules.
 */
export interface OverridesOptions {
  /**
   * Optional property that allows specifying custom rules to override the default ones.
   */
  overrides?: TSESLint.FlatConfig.Config['rules'];
}

/**
 * Options for specifying files.
 */
export interface FilesOptions {
  /**
   * Override the `files` option to provide custom globs.
   */
  files?: string[];
}

/**
 * Options for configuring the behavior of the Unicorn config.
 */
export interface UnicornOptions {
  /**
   * If set to `true`, enables all recommended settings from unicorn plugin.
   *
   * @default false
   */
  allRecommended?: boolean;
}

/**
 * An alias for the `StylisticCustomizeOptions` type without the `flat`, `name`, and `pluginName` properties.
 */
export type StylisticConfig = Omit<StylisticCustomizeOptions, 'flat' | 'name' | 'pluginName'>;

/**
 * Interface representing the stylistic options.
 */
export interface StylisticOptions {
  /**
   * Optional property that allows specifying stylistic options.
   */
  stylistic?: StylisticConfig | boolean;
}

/**
 * Options for configuring the TypeScript parser.
 */
export interface TypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: TSESLint.FlatConfig.ParserOptions;
}

/**
 * Options for configuring Angular-specific linting rules.
 */
export interface AngularOptions {
  /**
   * Whether to enable accessibility rules.
   *
   * @default true
   */
  enableAccessibilityRules?: boolean;

  /**
   * Prefix to use for Angular components, directives, and pipes.
   * Can be a single string or an array of strings.
   *
   * @default 'app'
   */
  prefix?: string[] | string;

  /**
   * TypeScript-specific linting rule overrides.
   */
  tsOverrides?: TSESLint.FlatConfig.Config['rules'];

  /**
   * HTML-specific linting rule overrides.
   */
  htmlOverrides?: TSESLint.FlatConfig.Config['rules'];
}

/**
 * Interface representing configuration options for enforcing NgRx operators rules.
 */
export interface NgrxOperators {
  /**
   * Whether to enforce NgRx operators rules.
   *
   * @default true
   */
  enforceOperatorsRules?: boolean;
}

/**
 * Configuration options for NGRX.
 */
export interface NgrxOptions {
  /**
   * Configuration for the NGRX store.
   *
   * If set to `true`, the default configuration will be used.
   * If set to an object, it should contain options for files, NGRX operators, and overrides.
   */
  store?: boolean | (FilesOptions & NgrxOperators & OverridesOptions);

  /**
   * Configuration for NGRX effects.
   *
   * If set to `true`, the default configuration will be used.
   * If set to an object, it should contain options for files, NGRX operators, and overrides.
   */
  effects?: boolean | (FilesOptions & NgrxOperators & OverridesOptions);

  /**
   * Configuration for NGRX signals.
   *
   * If set to `true`, the default configuration will be used.
   * If set to an object, it should contain options for files, NGRX operators, and overrides.
   */
  signals?: boolean | (FilesOptions & NgrxOperators & OverridesOptions);
}

/**
 * Options for configuring testing utilities.
 */
export interface TestingOptions {
  /**
   * Indicates whether to include Jest DOM matchers.
   *
   * @default auto-detect based on the dependencies.
   */
  useJestDom?: boolean;

  /**
   * Indicates whether to include Testing Library utilities.
   *
   * @default auto-detect based on the dependencies.
   */
  useTestingLibrary?: boolean;
}

export interface FormattersOptions {
  css?: boolean;
  html?: boolean;
  xml?: boolean;
  svg?: boolean;
  markdown?: boolean;
  graphql?: boolean;
  options?: VendoredPrettierOptions;
  slidev?: boolean | { files?: string[] };
}

export interface RegExpOptions {
  /**
   * Override rules level.
   */
  level?: 'error' | 'warn';
}

export interface TailwindcssParserPerGlobOptions {
  /**
   * Provides a specific ESLint parser per glob pattern.
   * This is only needed if you want to lint tailwindcss without using Angular and TypeScript.
   */
  parsers?: Record<string, TSESLint.FlatConfig.Parser>;
}

/**
 * Options for creating an ESLint configuration.
 *
 * @see createConfig function
 */
export interface CreateConfigOptions {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: FlatGitignoreOptions | boolean;

  /**
   * JavaScript rules overrides. Can't be disabled.
   */
  javascript?: OverridesOptions;

  /**
   * TypeScript rules overrides and parser configuration.
   *
   * @default auto-detected
   */
  typescript?: boolean | (OverridesOptions & TypeScriptParserOptions);

  /**
   * Enable stylistic rules.
   *
   * @see https://eslint.style/
   * @default true
   */
  stylistic?: boolean | (OverridesOptions & StylisticConfig);

  /**
   * Enable regexp rules.
   *
   * @see https://ota-meshi.github.io/eslint-plugin-regexp/
   * @default true
   */
  regexp?: boolean | (OverridesOptions & RegExpOptions);

  /**
   * Options for eslint-plugin-unicorn.
   *
   * @default true
   */
  unicorn?: UnicornOptions | boolean;

  /**
   * Options for the angular linting rules
   *
   * @default auto-detect based on the dependencies.
   */
  angular?: AngularOptions | boolean;

  /**
   * Options for the ngrx linting rules.
   *
   * @default auto-detect based on dependencies.
   */
  ngrx?: NgrxOptions | boolean;

  /**
   * Options for the vitest linting rules
   *
   * @default auto-detect based on dependencies.
   */
  vitest?: boolean | (OverridesOptions & TestingOptions);

  /**
   * Options for the TailwindCSS linting rules.
   *
   * @default false
   */
  tailwindcss?: boolean | (FilesOptions & OverridesOptions) | (OverridesOptions & TailwindcssParserPerGlobOptions);

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: OverridesOptions | boolean;

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: OverridesOptions | boolean;

  /**
   * Enable TOML support.
   *
   * @default true
   */
  toml?: OverridesOptions | boolean;

  /**
   * Enable linting for **code snippets** in Markdown.
   *
   * For formatting Markdown content, enable also `formatters.markdown`.
   *
   * @default true
   */
  markdown?: OverridesOptions | boolean;

  /**
   * Use external formatters to format files.
   *
   * Requires installing:
   * - `eslint-plugin-format`
   *
   * When set to `true`, it will enable all formatters.
   *
   * @default false
   */
  formatters?: FormattersOptions | boolean;
}
