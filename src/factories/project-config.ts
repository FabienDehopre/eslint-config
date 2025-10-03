import type { Awaitable, CreateProjectConfigOptions, TypedConfigArray, TypedConfigArrayWithOptions, TypedConfigWithExtends } from '../shared/types';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import {
  angular, ignores,
  jsdoc,
  ngrx,
  tailwindcss,
  typescript,
  vitest
} from '../configs';
import { NGRX_PACKAGES, OPTIONS_SYMBOL } from '../shared/constants';
import { resolveSubOptions } from '../shared/utils';

/**
 * Creates an ESLint configuration array based on the provided base configuration, options and user configurations.
 * This function is similar to `defineConfig`, but it is designed for use in a project of a workspace environment.
 * It requires a base configuration that is already defined in the root of the workspace via the `defineWorkspaceConfig` function.
 *
 * @param baseConfig - The base configuration to extend from.
 * @param options - Configuration options.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns A promise that resolves to a `TypedConfigArray`.
 * @example
 * ```typescript
 * import baseConfig from '../../eslint.base.js';
 *
 * const config = await defineProjectConfig(baseConfig, { vitest: true, typescript: { parserOptions: { project: './tsconfig.json' } } });
 * ```
 */
export async function defineProjectConfig(
  baseConfig: Awaitable<TypedConfigArrayWithOptions>,
  options: CreateProjectConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigWithExtends | TypedConfigWithExtends[]>[]
): Promise<TypedConfigArray> {
  const resolvedBaseConfig = await baseConfig;
  const workspaceOptions = resolvedBaseConfig[OPTIONS_SYMBOL];
  const {
    angular: enableAngular = isPackageExists('@angular/core'),
    jsdoc: enableJsdoc = options.type === 'lib',
    ngrx: enableNgrx = NGRX_PACKAGES.some((p) => isPackageExists(p)),
    tailwindcss: enableTailwind = false,
    typescript: typescriptOptions,
    vitest: enableVitest = isPackageExists('vitest'),
  } = options;

  if (enableNgrx && !enableAngular) {
    throw new Error('NgRx rules can only be enabled if Angular rules are also enabled.');
  }

  const configs: Awaitable<TypedConfigArray>[] = [
    ignores(options.ignores, 'project'),
  ];

  // Add JSDoc configuration (project-specific feature)
  if (enableJsdoc) {
    const stylisticOptions = workspaceOptions.stylistic === false ? false : typeof workspaceOptions.stylistic === 'object' ? workspaceOptions.stylistic : {};
    configs.push(jsdoc({ stylistic: stylisticOptions }));
  }

  // Handle project-specific TypeScript
  if (typescriptOptions) {
    if (!workspaceOptions.typescript) {
      throw new Error('Project-specific TypeScript configuration requires a base configuration with TypeScript support.');
    }

    configs.push(typescript({
      ...typescriptOptions,
      type: options.type,
    }, true));
  }

  // Add Angular configuration (project-specific feature)
  if (enableAngular) {
    const angularOptions = resolveSubOptions(options, 'angular');
    configs.push(angular(angularOptions));
    if (workspaceOptions.formatters) {
      const htmlFormatters = resolvedBaseConfig.find((c) => c.name === 'fabdeh/formatter/html');
      if (htmlFormatters) {
        delete htmlFormatters.languageOptions;
      }
    }
  }

  // Add NgRx configuration (project-specific feature)
  if (enableNgrx) {
    const ngrxOptions = resolveSubOptions(options, 'ngrx');
    // Get naming convention setting from workspace TypeScript options
    const typescriptOptions = resolveSubOptions(workspaceOptions, 'typescript');
    configs.push(ngrx({
      ...ngrxOptions,
      useRelaxedNamingConventionForCamelAndPascalCases: typescriptOptions.useRelaxedNamingConventionForCamelAndPascalCases,
    }));
  }

  // Add Vitest configuration (project-specific feature)
  if (enableVitest) {
    const vitestOptions = resolveSubOptions(options, 'vitest');
    configs.push(vitest(vitestOptions));
  }

  // Add TailwindCSS configuration (project-specific feature)
  if (enableTailwind) {
    const tailwindcssOptions = resolveSubOptions(options, 'tailwindcss');
    configs.push(tailwindcss(tailwindcssOptions));
  }

  return tseslint.config(...resolvedBaseConfig, ...(await Promise.all(configs)), ...(await Promise.all(userConfigs))) as TypedConfigArray;
}
