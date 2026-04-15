import type {
  Awaitable, ConfigNames, DefineProjectConfigOptions, FlatConfigComposerWithOptions, TypedConfig,
  TypedConfigWithExtends
} from '../shared/types';

import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import {
  angular,
  ignores,
  jsdoc,
  ngrx,
  tailwindcss,
  typescript,
  vitest
} from '../configs';
import { NGRX_PACKAGES, OPTIONS_SYMBOL } from '../shared/constants';
import { isInEditorEnv, resolveSubOptions } from '../shared/utils';

/**
 * Creates an ESLint configuration array based on the provided base configuration, options and user configurations.
 * This function is similar to `defineConfig`, but it is designed for use in a project of a workspace environment.
 * It requires a base configuration that is already defined in the root of the workspace via the `defineWorkspaceConfig` function.
 *
 * @param baseConfig - The base configuration to extend from.
 * @param options - Configuration options.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns The merged ESLint configurations.
 * @example
 * ```typescript
 * import { defineProjectConfig } from '@fabdeh/eslint-config';
 *
 * import baseConfig from '../../eslint.base.js';
 *
 * export default defineProjectConfig(baseConfig, { vitest: true, typescript: { parserOptions: { project: './tsconfig.json' } } });
 * ```
 */
export function defineProjectConfig(
  baseConfig: FlatConfigComposerWithOptions<TypedConfig, ConfigNames>,
  options: DefineProjectConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigWithExtends | TypedConfigWithExtends[]>[]
): FlatConfigComposer<TypedConfig, ConfigNames> {
  const workspaceOptions = baseConfig[OPTIONS_SYMBOL];
  const {
    angular: enableAngular = isPackageExists('@angular/core'),
    jsdoc: enableJsdoc = options.type === 'lib',
    ngrx: enableNgrx = NGRX_PACKAGES.some((p) => isPackageExists(p)),
    tailwindcss: enableTailwind = false,
    typescript: typescriptOptions,
    vitest: enableVitest = isPackageExists('vitest'),
  } = options;

  let isInEditor = workspaceOptions.isInEditor;
  if (isInEditor === undefined) {
    isInEditor = isInEditorEnv();
    if (isInEditor) {
      // eslint-disable-next-line no-console
      console.log('[@fabdeh/eslint-config] Detected running in editor, some rules are disabled.');
    }
  }

  if (enableNgrx && !enableAngular) {
    throw new Error('NgRx rules can only be enabled if Angular rules are also enabled.');
  }

  const configs: Awaitable<TypedConfig[]>[] = [];
  const stylisticOptions = workspaceOptions.stylistic === false ? false : typeof workspaceOptions.stylistic === 'object' ? workspaceOptions.stylistic : {};

  if (options.ignores && options.ignores.length > 0) {
    configs.push(ignores(options.ignores, 'project'));
  }

  // Add JSDoc configuration (project-specific feature)
  if (enableJsdoc) {
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
    configs.push(tailwindcss({ ...tailwindcssOptions, stylistic: stylisticOptions }));
  }

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
