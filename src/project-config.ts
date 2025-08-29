import type { Awaitable, CreateProjectConfigOptions, TypedConfigArray, TypedConfigArrayWithOptions, TypedConfigWithExtends } from './types';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import {
  angular,
  jsdoc,
  ngrx,
  tailwindcss,
  typescript,
  vitest
} from './configs';
import { NGRX_PACKAGES } from './constants';
import { OPTIONS_SYMBOL } from './types';
import { resolveSubOptions } from './utils';

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
    jsdoc: enableJsdoc = true,
    ngrx: enableNgrx = NGRX_PACKAGES.some((p) => isPackageExists(p)),
    tailwindcss: enableTailwind = false,
    typescript: typescriptOptions,
    vitest: enableVitest = isPackageExists('vitest'),
  } = options;

  if (enableNgrx && !enableAngular) {
    throw new Error('NgRx rules can only be enabled if Angular rules are also enabled.');
  }

  const configs: Awaitable<TypedConfigArray>[] = [];

  // Add JSDoc configuration (project-specific feature)
  if (enableJsdoc) {
    const stylisticOptions = workspaceOptions.stylistic === false ? false : typeof workspaceOptions.stylistic === 'object' ? workspaceOptions.stylistic : {};
    configs.push(jsdoc({ stylistic: stylisticOptions }));
  }

  // Add Angular configuration (project-specific feature)
  if (enableAngular) {
    const angularOptions = resolveSubOptions(options, 'angular');
    configs.push(angular(angularOptions));
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

  // Handle project-specific TypeScript
  if (typescriptOptions) {
    if (!workspaceOptions.typescript) {
      throw new Error('Project-specific TypeScript configuration requires a base configuration with TypeScript support.');
    }

    configs.push(typescript({
      ...typescriptOptions,
      stylistic: false,
      type: options.type,
    }, true));
  }
  /*
  if (enableProjectTypescript && workspaceOptions.typescript) {
    const projectTypescriptOptions = typeof enableProjectTypescript === 'object' ? enableProjectTypescript : {};

    // Create TypeScript override configs for project-specific options
    if (projectTypescriptOptions.parserOptions || projectTypescriptOptions.overrides) {
      const configs: TypedConfigArray = [];

      // Add parser options override if specified
      if (projectTypescriptOptions.parserOptions) {
        configs.push({
          name: 'fabdeh/project/typescript/parser-options',
          files: [GLOB_TS],
          languageOptions: {
            parser: tseslint.parser,
            parserOptions: projectTypescriptOptions.parserOptions,
          },
        });
      }

      // Add rule overrides if specified
      if (projectTypescriptOptions.overrides) {
        configs.push({
          name: 'fabdeh/project/typescript/rules',
          files: [GLOB_TS],
          rules: projectTypescriptOptions.overrides,
        });
      }

      configs.push(Promise.resolve(configs));
    }
  }
  */

  return tseslint.config(...resolvedBaseConfig, ...(await Promise.all(configs)), ...(await Promise.all(userConfigs))) as TypedConfigArray;
}
