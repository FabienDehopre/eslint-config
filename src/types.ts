import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
import type { TSESLint } from '@typescript-eslint/utils';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';

/**
 * A type that can be awaited. Promise<T> or T.
 */
export type Awaitable<T> = Promise<T> | T;

/**
 * Options for determining if the code is running in an editor environment.
 */
export interface IsInEditorOptions {
  /**
   * Optional property that allows specifying if the code is running in an editor environment.
   */
  isInEditor?: boolean;
}

/**
 * Interface representing options for overriding rules.
 */
export interface OverridesOptions {
  /**
   * Optional property that allows specifying custom rules to override the default ones.
   */
  overrides?: TSESLint.FlatConfig.Config['rules'];
}

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

export interface TypeScriptParserOptions {
  parserOptions?: TSESLint.FlatConfig.ParserOptions;
}

export interface AngularOptions {
  enableAccessibilityRules?: boolean;
  prefix?: string[] | string;
  tsOverrides?: TSESLint.FlatConfig.Config['rules'];
  htmlOverrides?: TSESLint.FlatConfig.Config['rules'];
}

export interface NgrxOperators {
  enforceOperatorsRules?: boolean;
}

export interface NgrxOptions {
  store?: boolean | (FilesOptions & NgrxOperators & OverridesOptions);
  effects?: boolean | (FilesOptions & NgrxOperators & OverridesOptions);
  signals?: boolean | (FilesOptions & NgrxOperators & OverridesOptions);
}

export interface TestingOptions {
  useJestDom?: boolean;
  useTestingLibrary?: boolean;
}

/**
 * Options for the `fabdehConfig` function.
 * @see fabdehConfig
 */
export interface ConfigOptions {
  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
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
   * @default auto-detected
   */
  typescript?: OverridesOptions & TypeScriptParserOptions;

  /**
   * Enable stylistic rules.
   * @see https://eslint.style/
   * @default true
   */
  stylistic?: boolean | (OverridesOptions & StylisticConfig);

  /**
   * Options for eslint-plugin-unicorn.
   * @default true
   */
  unicorn?: UnicornOptions | boolean;

  /**
   * Options for the angular linting rules
   * @default auto-detect based on the dependencies.
   */
  angular?: AngularOptions | boolean;

  /**
   * Options for the ngrx linting rules.
   * @default auto-detect based on dependencies.
   */
  ngrx?: NgrxOptions | boolean;

  /**
   * Options for the jest linting rules. This option is mutually exclusive with vitest.
   * @default auto-detect based on dependencies.
   */
  jest?: boolean | (OverridesOptions & TestingOptions);

  /**
   * Options for the vitest linting rules. This option is mutually exclusive with jest.
   * @default auto-detect based on dependencies.
   */
  vitest?: boolean | (OverridesOptions & TestingOptions);

  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean;
}
