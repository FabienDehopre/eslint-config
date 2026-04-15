import type {
  Awaitable,
  ConfigNames,
  DefinePlaywrightConfigOptions,
  FlatConfigComposerWithOptions,
  TypedConfig, TypedConfigWithExtends
} from '../shared/types';

import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import { ignores, playwright, typescript } from '../configs';
import { OPTIONS_SYMBOL, PLAYWRIGHT_PACKAGES } from '../shared/constants';
import { isInEditorEnv } from '../shared/utils';

/**
 * Creates an ESLint configuration array for Playwright projects based on the provided base configuration,
 * options and user configurations.
 * This function is designed for use in an end-to-end project of a workspace environment and extends a base configuration
 * that is already defined in the root of the workspace.
 *
 * @param baseConfig - The base configuration to extend from.
 * @param options - Playwright-specific configuration options.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns A promise that resolves to a `TypedConfig[]`.
 * @example
 * ```typescript
 * import { definePlaywrightConfig } from '@fabdeh/eslint-config';
 *
 * import baseConfig from '../../eslint.base.js';
 *
 * export default definePlaywrightConfig(baseConfig, { ignores: ['playwright-report/**'] });
 */
export function definePlaywrightConfig(
  baseConfig: FlatConfigComposerWithOptions<TypedConfig, ConfigNames>,
  options: DefinePlaywrightConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigWithExtends | TypedConfigWithExtends[]>[]
): FlatConfigComposer<TypedConfig, ConfigNames> {
  if (PLAYWRIGHT_PACKAGES.every((p) => !isPackageExists(p))) {
    throw new Error('Playwright rules require the "playwright" package to be installed.');
  }

  let isInEditor = options.isInEditor;
  if (isInEditor === undefined) {
    isInEditor = isInEditorEnv();
    if (isInEditor) {
      // eslint-disable-next-line no-console
      console.log('[@fabdeh/eslint-config] Detected running in editor, some rules are disabled.');
    }
  }

  const workspaceOptions = baseConfig[OPTIONS_SYMBOL];
  const configs: Awaitable<TypedConfig[]>[] = [];
  if (options.ignores && options.ignores.length > 0) {
    configs.push(ignores(options.ignores, 'project'));
  }

  if (workspaceOptions.typescript) {
    configs.push(typescript({ overrides: {}, parserOptions: {}, type: 'app' }, true));
  }

  configs.push(playwright(options));

  let composer = new FlatConfigComposer<TypedConfig, ConfigNames>();
  composer = composer
    .append(
      baseConfig,
      ...configs,
      ...userConfigs
    );

  if (isInEditor) {
    composer = composer
      .disableRulesFix([
        'prefer-const',
        'unused-imports/no-unused-imports',
      ], {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        builtinRules: () => import('eslint/use-at-your-own-risk').then((m) => m.builtinRules),
      });
  }

  return composer;
}
