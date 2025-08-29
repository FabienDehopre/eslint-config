/* eslint-disable max-lines -- this file contains all options objects that make it bigger than usual */

import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
import type { TSESLint } from '@typescript-eslint/utils';
import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { Attributes, Callees, Tags, Variables } from 'eslint-plugin-better-tailwindcss/api/types';
import type { OPTIONS_SYMBOL } from './constants';
import type { RuleOptions } from './typegen';
import type { VendoredPrettierOptions } from './vendor/prettier-types';

export type { ConfigNames } from './typegen';

/**
 * A type that can be awaited. Promise<T> or T.
 */
export type Awaitable<T> = Promise<T> | T;

// eslint-disable-next-line perfectionist/sort-intersection-types
export type Rules = TSESLint.FlatConfig.Config['rules'] & RuleOptions;

export type InfiniteDepthConfigWithExtends = InfiniteDepthConfigWithExtends[] | TypedConfig;

/**
 * An updated version of ESLint's `TSESLint.FlatConfig.Config`, which provides autocompletion
 * for `rules` and relaxes type limitations for `plugins` and `rules`, because
 * many plugins still lack proper type definitions.
 */
export type TypedConfig = Omit<TSESLint.FlatConfig.Config, 'rules'> & {
  /**
   * An object containing the configured rules. When `files` or `ignores` are
   * specified, these rule configurations are only available to the matching files.
   */
  rules?: Rules;
};

export type TypedConfigWithExtends = TypedConfig & {
  /**
   * Allows you to "extend" a set of configs similar to `extends` from the
   * classic configs.
   *
   * This is just a convenience shorthand to help reduce duplication.
   *
   * ```js
   * export default tseslint.config({
   *   files: ['** /*.ts'],
   *   extends: [
   *     eslint.configs.recommended,
   *     tseslint.configs.recommended,
   *   ],
   *   rules: {
   *     '@typescript-eslint/array-type': 'error',
   *     '@typescript-eslint/consistent-type-imports': 'error',
   *   },
   * })
   *
   * // expands to
   *
   * export default [
   *   {
   *     ...eslint.configs.recommended,
   *     files: ['** /*.ts'],
   *   },
   *   ...tseslint.configs.recommended.map(conf => ({
   *     ...conf,
   *     files: ['** /*.ts'],
   *   })),
   *   {
   *     files: ['** /*.ts'],
   *     rules: {
   *       '@typescript-eslint/array-type': 'error',
   *       '@typescript-eslint/consistent-type-imports': 'error',
   *     },
   *   },
   * ]
   * ```
   */
  extends?: InfiniteDepthConfigWithExtends[];
};

export type TypedConfigArray = TypedConfig[];

export type ExtractRuleOptionsType<RuleEntry> = RuleEntry extends Linter.RuleSeverityAndOptions<infer Options> ? Options : never;
export type ArrayItemType<T> = T extends (infer U)[] ? U : never;

/**
 * Interface representing options for overriding default ESLint rules.
 */
export interface OverridesOptions {
  /**
   * Optional property that allows specifying custom rules to override the default ones.
   */
  overrides?: TypedConfig['rules'];
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
 * Options for configuring the TypeScript rules.
 */
export interface TypeScriptOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: TSESLint.FlatConfig.ParserOptions;

  /**
   * Indicates whether the erasable syntax-only rules should be enabled or not.
   *
   * @default false
   */
  enableErasableSyntaxOnly?: boolean;
}

/**
 * Options for configuration the naming convention rule.
 */
export interface NamingConventionOptions {
  /**
   * Indicates whether you want to relax the naming convention for both "camelCase" and "PascalCase" names.
   * Otherwise (the default), both "camelCase" and "PascalCase" names will be treated as strict.
   *
   * @default false
   */
  useRelaxedNamingConventionForCamelAndPascalCases?: boolean;
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
  tsOverrides?: TypedConfig['rules'];

  /**
   * HTML-specific linting rule overrides.
   */
  htmlOverrides?: TypedConfig['rules'];

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
export interface NgrxOperatorsOptions {
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
  store?: boolean | (FilesOptions & NgrxOperatorsOptions & OverridesOptions);

  /**
   * Configuration for NGRX effects.
   *
   * If set to `true`, the default configuration will be used.
   * If set to an object, it should contain options for files, NGRX operators, and overrides.
   */
  effects?: boolean | (FilesOptions & NgrxOperatorsOptions & OverridesOptions);

  /**
   * Configuration for NGRX signals.
   *
   * If set to `true`, the default configuration will be used.
   * If set to an object, it should contain options for files, NGRX operators, and overrides.
   */
  signals?: boolean | (FilesOptions & NgrxOperatorsOptions & OverridesOptions);
}

/**
 * Options for configuring testing utilities.
 */
export interface UnitTestingOptions {
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

export type ProjectType = 'app' | 'lib';
export type WorkspaceProjectType = ProjectType | 'workspace';
export interface ProjectTypeOptions<T = ProjectType> {
  /**
   * Type of the project. `lib` will enable more strict rules for libraries.
   *
   * @default 'app'
   */
  type?: T;
}

/**
 * Options for project-specific TypeScript configuration.
 */
export interface ProjectTypeScriptOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions: TSESLint.FlatConfig.ParserOptions;
}

/**
 * Options for creating workspace-level ESLint configuration.
 * These options define foundational, consistency-focused configurations.
 */
export interface CreateWorkspaceConfigOptions {
  /**
   * An array of glob patterns indicating the files that the configuration object should not apply to.
   * If not specified, the configuration object applies to all files matched by files.
   */
  ignores?: string[];

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
   * TypeScript rules overrides and basic configuration.
   *
   * @default false
   */
  typescript?: boolean | (NamingConventionOptions & OverridesOptions & TypeScriptOptions);

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

  /**
   * Enable pnpm (workspace/catalogs) support.
   *
   * Currently, it's disabled by default, as it's still experimental.
   * In the future it will be smartly enabled based on the project usage.
   *
   * @see https://github.com/antfu/pnpm-workspace-utils
   * @default false
   * @experimental
   */
  pnpm?: boolean;
}

/**
 * Options for creating project-level ESLint configuration.
 * These options define feature-specific, implementation-focused configurations.
 */
export interface CreateProjectConfigOptions extends ProjectTypeOptions {
  /**
   * Enable or disable JSDoc rules.
   *
   * @default true
   */
  jsdoc?: boolean;

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
  vitest?: boolean | (OverridesOptions & UnitTestingOptions);

  /**
   * Options for the TailwindCSS linting rules.
   *
   * @default false
   */
  tailwindcss?: boolean | (FilesOptions & OverridesOptions & TailwindCssOptions);

  /**
   * Project-specific TypeScript configuration.
   * Allows overriding parser options and adding project-specific rule overrides.
   */
  typescript?: OverridesOptions & ProjectTypeScriptOptions;
}

/**
 * Options for creating an ESLint configuration.
 * Combines workspace and project options for standalone usage.
 *
 * @see defineConfig function
 */
export type CreateConfigOptions = CreateWorkspaceConfigOptions & Omit<CreateProjectConfigOptions, 'typescript'>;

export type TypedConfigArrayWithOptions = TypedConfigArray & { [OPTIONS_SYMBOL]: CreateWorkspaceConfigOptions };
