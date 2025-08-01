/* eslint-disable max-lines -- this file contains all options objects that make it bigger than usual */

import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
import type { TSESLint } from '@typescript-eslint/utils';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { Attributes, Callees, Tags, Variables } from 'eslint-plugin-better-tailwindcss/api/types';
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
 * An alias for the `StylisticCustomizeOptions` type without the `pluginName` property.
 */
export type StylisticConfig = Omit<StylisticCustomizeOptions, 'pluginName'>;

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

export interface TypeScriptErasableSyntaxOnlyOptions {
  /**
   * Indicates whether the erasable syntax only rules should be enabled or not.
   *
   * @default false
   */
  enableErasableSyntaxOnly?: boolean;
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

  /**
   * A class name pattern that allows service using `@Injectable` decorator to not use `providedIn` option.
   */
  ignoreClassNamePatternForInjectableProvidedIn?: string;

  /**
   * Defines whether the `styles`, `styleUrl`, `styleUrls` must be used.
   *
   * @default 'string'
   */
  componentStylesMode?: 'array' | 'string';

  /**
   * Indicates whether all component should use `OnPush` change strategy or not.
   *
   * @default true
   */
  preferOnPushOnly?: boolean;

  /**
   * Disallow using code which is marked as experimental.
   *
   * @default true
   */
  banExperimentalApi?: boolean;

  /**
   * Disallow using code which is marked as developer preview.
   *
   * @default true
   */
  banDeveloperPreviewApi?: boolean;
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

/**
 * Interface for better-tailwindcss specific options.
 */
export interface TailwindCssOptions {
  /**
   * Provides a specific ESLint parser per glob pattern.
   */
  parsers?: Record<string, TSESLint.FlatConfig.Parser>;

  /**
   * Use all better-tailwindcss rules or only recommended ones.
   *
   * @default false
   */
  enableAllRules?: boolean;

  /**
   * The path to the entry file of the CSS-based tailwind config (eg: `src/global.css`). If not specified, the plugin will fall back to the default configuration.
   * The tailwind config is used to determine the sorting order.
   */
  entryPoint?: string;

  /**
   * The path to the `tailwind.config.js` file. If not specified, the plugin will try to find it automatically or falls back to the default configuration.
   * The tailwind config is used to determine the sorting order.
   */
  tailwindConfig?: string;

  /**
   * The name of the attribute that contains the tailwind classes.
   *
   * @default Name for `"class"` and strings Matcher for `"class", "className"`.
   */
  attributes?: Attributes;

  /**
   * List of function names which arguments should also get linted.
   *
   * @default  Matchers for `"cc", "clb", "clsx", "cn", "cnb", "ctl", "cva", "cx", "dcnb", "objstr", "tv", "twJoin", "twMerge"`.
   */
  callees?: Callees;

  /**
   * List of variable names whose initializer should also get linted.
   *
   * @default strings Matcher for `"className", "classNames", "classes", "style", "styles"`.
   */
  variables?: Variables;

  /**
   * List of template literal tag names whose content should get linted.
   * When using the `tags` option, it is recommended to use the strings Matcher for your tag names. This will ensure that nested expressions get linted correctly.
   *
   * @default None
   */
  tags?: Tags;
}

export interface ProjectTypeOptions {
  /**
   * Type of the project. `lib` will enable more strict rules for libraries.
   *
   * @default 'app'
   */
  type?: 'app' | 'lib';
}

/**
 * Options for creating an ESLint configuration.
 *
 * @see createConfig function
 */
export interface CreateConfigOptions extends ProjectTypeOptions {
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
  typescript?: boolean | (OverridesOptions & TypeScriptErasableSyntaxOnlyOptions & TypeScriptParserOptions);

  /**
   * Enable stylistic rules.
   *
   * @see https://eslint.style/
   * @default true
   */
  stylistic?: boolean | (OverridesOptions & StylisticConfig);

  /**
   * Enable or disable JSDoc rules.
   *
   * @default true
   */
  jsdoc?: boolean;

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
  tailwindcss?: boolean | (FilesOptions & OverridesOptions & TailwindCssOptions);

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
