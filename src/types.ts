import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';

import type { RuleOptions } from './typegen';

export type Rules = RuleOptions;
export type { ConfigNames } from './typegen';

export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
};

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
  overrides?: TypedFlatConfigItem['rules'];
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
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean;
}
