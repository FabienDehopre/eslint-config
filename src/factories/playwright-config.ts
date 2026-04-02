import type {
  Awaitable,
  DefinePlaywrightConfigOptions,
  TypedConfigArray,
  TypedConfigArrayWithOptions,
  TypedConfigWithExtends
} from '../shared/types';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import { ignores, playwright, typescript } from '../configs';
import { OPTIONS_SYMBOL } from '../shared/constants';

/**
 * Creates an ESLint configuration array for Playwright projects based on the provided base configuration,
 * options and user configurations.
 * This function is designed for use in an end-to-end project of a workspace environment and extends a base configuration
 * that is already defined in the root of the workspace.
 *
 * @param baseConfig - The base configuration to extend from.
 * @param options - Playwright-specific configuration options.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns A promise that resolves to a `TypedConfigArray`.
 * @example
 * ```typescript
 * import baseConfig from '../../eslint.base.js';
 *
 * const config = await definePlaywrightConfig(baseConfig, { ignores: ['playwright-report/**'] });
 */
export async function definePlaywrightConfig(
  baseConfig: Awaitable<TypedConfigArrayWithOptions>,
  options: DefinePlaywrightConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigWithExtends | TypedConfigWithExtends[]>[]
): Promise<TypedConfigArray> {
  if (!isPackageExists('playwright')) {
    throw new Error('Playwright rules require the "playwright" package to be installed.');
  }

  const resolvedBaseConfig = await baseConfig;
  const workspaceOptions = resolvedBaseConfig[OPTIONS_SYMBOL];
  const configs: Awaitable<TypedConfigArray>[] = [];
  if (options.ignores && options.ignores.length > 0) {
    configs.push(ignores(options.ignores, 'project'));
  }

  if (workspaceOptions.typescript) {
    configs.push(typescript({ overrides: {}, parserOptions: {}, type: 'app' }, true));
  }

  configs.push(playwright(options));

  return tseslint.config(...resolvedBaseConfig, ...(await Promise.all(configs)), ...(await Promise.all(userConfigs))) as TypedConfigArray;
}
