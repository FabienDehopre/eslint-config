import type { Awaitable, CreateConfigOptions, CreateProjectConfigOptions, CreateWorkspaceConfigOptions, TypedConfigArray, TypedConfigArrayWithOptions, TypedConfigWithExtends } from './types';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import {
  angular,
  comments,
  formatters,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  ngrx,
  node,
  perfectionist,
  pnpm,
  regexp,
  sortPackageJson,
  sortTsConfig,
  stylistic,
  tailwindcss,
  toml,
  typescript,
  unicorn,
  vitest,
  yaml
} from './configs';
import { OPTIONS_SYMBOL } from './types';
import { interopDefault, resolveSubOptions } from './utils';

const NGRX_PACKAGES = ['@ngrx/store', '@ngrx/effects', '@ngrx/signals', '@ngrx/operators'];

/**
 * Creates an ESLint configuration array based on the provided options and user configurations.
 * Additionally, it will automatically detect the presence of certain packages and enable corresponding rules.
 *
 * @param options - Configuration options.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns A promise that resolves to a `ConfigArrayWithOptions`.
 * @example
 * ```typescript
 * const config = await createConfig({ vitest: true, typescript: { parserOptions: { project: './tsconfig.json' } } });
 * ```
 */
export async function defineConfig(
  options: CreateConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigWithExtends | TypedConfigWithExtends[]>[]
): Promise<TypedConfigArray> {
  const {
    angular: enableAngular = isPackageExists('@angular/core'),
    gitignore: enableGitignore = true,
    jsdoc: enableJsdoc = true,
    ngrx: enableNgrx = NGRX_PACKAGES.some((p) => isPackageExists(p)),
    // eslint-disable-next-line @angular-eslint/no-experimental
    pnpm: enableCatalogs = false, // TODO: smart detect
    regexp: enableRegexp = true,
    tailwindcss: enableTailwind = false,
    typescript: enableTypescript = isPackageExists('typescript'),
    unicorn: enableUnicorn = true,
    vitest: enableVitest = isPackageExists('vitest'),
  } = options;

  if (enableNgrx && !enableAngular) {
    throw new Error('NgRx rules can only be enabled if Angular rules are also enabled.');
  }

  const stylisticOptions =
    options.stylistic === false ? false : typeof options.stylistic === 'object' ? options.stylistic : {};

  const configs: Awaitable<TypedConfigArray>[] = [];
  if (enableGitignore) {
    if (typeof enableGitignore === 'object') {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) =>
          tseslint.config(r({ name: 'fabdeh/gitignore', ...enableGitignore }))
        )
      );
    } else {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) =>
          tseslint.config(r({ name: 'fabdeh/gitignore', strict: true }))
        )
      );
    }
  }

  configs.push(
    ignores(options.ignores),
    javascript({ overrides: options.javascript?.overrides }),
    comments(),
    node(),
    imports({ stylistic: stylisticOptions }),
    perfectionist()
  );

  if (enableJsdoc) {
    configs.push(jsdoc({ stylistic: stylisticOptions }));
  }

  if (enableUnicorn) {
    const unicornOptions = resolveSubOptions(options, 'unicorn');
    configs.push(unicorn(unicornOptions));
  }

  if (enableTypescript) {
    const typescriptOptions = resolveSubOptions(options, 'typescript');
    configs.push(typescript({
      ...typescriptOptions,
      stylistic: stylisticOptions,
      type: options.type,
    }));
  }

  if (stylisticOptions) {
    configs.push(stylistic({ stylistic: stylisticOptions }));
  }

  if (enableRegexp) {
    const regexpOptions = resolveSubOptions(options, 'regexp');
    configs.push(regexp(regexpOptions));
  }

  if (enableAngular) {
    const angularOptions = resolveSubOptions(options, 'angular');
    configs.push(angular(angularOptions));
  }

  if (enableNgrx) {
    const typescriptOptions = resolveSubOptions(options, 'typescript');
    const ngrxOptions = resolveSubOptions(options, 'ngrx');
    configs.push(ngrx({
      ...ngrxOptions,
      useRelaxedNamingConventionForCamelAndPascalCases: typescriptOptions.useRelaxedNamingConventionForCamelAndPascalCases,
    }));
  }

  if (enableVitest) {
    const vitestOptions = resolveSubOptions(options, 'vitest');
    configs.push(vitest(vitestOptions));
  }

  if (enableTailwind) {
    const tailwindcssOptions = resolveSubOptions(options, 'tailwindcss');
    configs.push(tailwindcss(tailwindcssOptions));
  }

  if (options.jsonc ?? true) {
    const jsoncOptions = resolveSubOptions(options, 'jsonc');
    configs.push(
      jsonc({
        ...jsoncOptions,
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsConfig()
    );
  }

  if (enableCatalogs) {
    configs.push(pnpm());
  }

  if (options.yaml ?? true) {
    const yamlOptions = resolveSubOptions(options, 'yaml');
    configs.push(yaml({
      ...yamlOptions,
      stylistic: stylisticOptions,
    }));
  }

  if (options.toml ?? true) {
    const tomlOptions = resolveSubOptions(options, 'toml');
    configs.push(toml({
      ...tomlOptions,
      stylistic: stylisticOptions,
    }));
  }

  if (options.markdown ?? true) {
    const markdownOptions = resolveSubOptions(options, 'markdown');
    configs.push(markdown(markdownOptions));
  }

  if (options.formatters) {
    configs.push(formatters(
      options.formatters,
      typeof stylisticOptions === 'boolean' ? {} : stylisticOptions,
      Boolean(enableAngular)
    ));
  }

  return tseslint.config(...(await Promise.all(configs)), ...(await Promise.all(userConfigs))) as TypedConfigArray;
}

/**
 * Creates an ESLint configuration array based on the provided options and user configurations.
 * This function is similar to `defineConfig`, but it is designed for use in the root of a workspace environment.
 * Contrary to `defineConfig`, it will not automatically detect the presence of certain packages and will not enable corresponding rules.
 *
 * @param options - Configuration options.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns A promise that resolves to a `ConfigArrayWithOptions`.
 * @example
 * ```typescript
 * const config = await defineWorkspaceConfig({ vitest: true, typescript: { parserOptions: { project: './tsconfig.json' } } });
 * ```
 */
export async function defineWorkspaceConfig(
  options: CreateWorkspaceConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigWithExtends | TypedConfigWithExtends[]>[]
): Promise<TypedConfigArrayWithOptions> {
  const {
    gitignore: enableGitignore = true,
    // eslint-disable-next-line @angular-eslint/no-experimental
    pnpm: enableCatalogs = false, // TODO: smart detect
    regexp: enableRegexp = true,
    typescript: enableTypescript = isPackageExists('typescript'),
    unicorn: enableUnicorn = true,
  } = options;

  const stylisticOptions =
    options.stylistic === false ? false : typeof options.stylistic === 'object' ? options.stylistic : {};

  const configs: Awaitable<TypedConfigArray>[] = [];
  if (enableGitignore) {
    if (typeof enableGitignore === 'object') {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) =>
          tseslint.config(r({ name: 'fabdeh/gitignore', ...enableGitignore }))
        )
      );
    } else {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) =>
          tseslint.config(r({ name: 'fabdeh/gitignore', strict: true }))
        )
      );
    }
  }

  configs.push(
    ignores(options.ignores),
    javascript({ overrides: options.javascript?.overrides }),
    comments(),
    node(),
    imports({ stylistic: stylisticOptions }),
    perfectionist()
  );

  if (enableUnicorn) {
    const unicornOptions = resolveSubOptions(options, 'unicorn');
    configs.push(unicorn(unicornOptions));
  }

  if (enableTypescript) {
    const typescriptOptions = resolveSubOptions(options, 'typescript');
    configs.push(typescript({
      ...typescriptOptions,
      stylistic: stylisticOptions,
      // type: options.type, // TODO: fix typescritpt for workspace
    }));
  }

  if (stylisticOptions) {
    configs.push(stylistic({ stylistic: stylisticOptions }));
  }

  if (enableRegexp) {
    const regexpOptions = resolveSubOptions(options, 'regexp');
    configs.push(regexp(regexpOptions));
  }

  if (options.jsonc ?? true) {
    const jsoncOptions = resolveSubOptions(options, 'jsonc');
    configs.push(
      jsonc({
        ...jsoncOptions,
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsConfig()
    );
  }

  if (enableCatalogs) {
    configs.push(pnpm());
  }

  if (options.yaml ?? true) {
    const yamlOptions = resolveSubOptions(options, 'yaml');
    configs.push(yaml({
      ...yamlOptions,
      stylistic: stylisticOptions,
    }));
  }

  if (options.toml ?? true) {
    const tomlOptions = resolveSubOptions(options, 'toml');
    configs.push(toml({
      ...tomlOptions,
      stylistic: stylisticOptions,
    }));
  }

  if (options.markdown ?? true) {
    const markdownOptions = resolveSubOptions(options, 'markdown');
    configs.push(markdown(markdownOptions));
  }

  if (options.formatters) {
    configs.push(formatters(
      options.formatters,
      typeof stylisticOptions === 'boolean' ? {} : stylisticOptions
      // Boolean(enableAngular) // TODO: fix formatters in project config when using angular
    ));
  }

  const eslintConfigWithOptions = tseslint.config(...(await Promise.all(configs)), ...(await Promise.all(userConfigs))) as TypedConfigArrayWithOptions;
  eslintConfigWithOptions[OPTIONS_SYMBOL] = options;
  return eslintConfigWithOptions;
}

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
    typescript: enableTypescript = false,
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
