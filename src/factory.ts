import type { ConfigArray, ConfigWithExtends } from 'typescript-eslint';
import type { Awaitable, ConfigArrayWithOptions, CreateConfigOptions } from './types';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import {
  angular,
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  ngrx,
  perfectionist, regexp,
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
import { formatters } from './configs/formatters';
import { OPTIONS_SYMBOL } from './types';
import { interopDefault, resolveSubOptions } from './utils';

type FlatConfigProps = keyof Omit<ConfigWithExtends, 'basePath' | 'files' | 'ignores' | 'language'>;
const FLAT_CONFIG_PROPS = [
  'name',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
  'extends',
] satisfies FlatConfigProps[];

const NGRX_PACKAGES = ['@ngrx/store', '@ngrx/effects', '@ngrx/signals', '@ngrx/operators'];

/**
 * Creates an ESLint configuration array based on the provided options and user configurations.
 *
 * @param options - Configuration options that extend `ConfigWithExtends` and `CreateConfigOptions`.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns A promise that resolves to a `ConfigArray`.
 * @example
 * ```typescript
 * const config = await createConfig({ vitest: true, typescript: { parserOptions: { project: './tsconfig.json' } } });
 * ```
 */
/**
 * Deep merge utility for configuration options
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' && 
        source[key] !== null && 
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' && 
        result[key] !== null && 
        !Array.isArray(result[key])
      ) {
        result[key] = deepMerge(result[key], source[key] as any);
      } else {
        result[key] = source[key] as any;
      }
    }
  }
  
  return result;
}

export async function defineConfig(
  options: ConfigWithExtends & CreateConfigOptions = {},
  ...userConfigs: Awaitable<ConfigWithExtends | ConfigWithExtends[]>[]
): Promise<ConfigArrayWithOptions> {
  const {
    angular: enableAngular = isPackageExists('@angular/core'),
    gitignore: enableGitignore = true,
    jsdoc: enableJsdoc = true,
    ngrx: enableNgrx = NGRX_PACKAGES.some((p) => isPackageExists(p)),
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

  const configs: Awaitable<ConfigArray>[] = [];
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
    imports({ stylistic: stylisticOptions }),
    perfectionist()
  );

  // TODO: add node rules as optional ???

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
      useRelaxedNamingConventionForCamelAndPascalCases: typescriptOptions?.useRelaxedNamingConventionForCamelAndPascalCases,
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

  if ('files' in options) {
    throw new Error('[@fabdeh/eslint-config] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.');
  }

  const fusedConfig = Object.fromEntries(
    Object.entries(options).filter(([k]) => FLAT_CONFIG_PROPS.includes(k as FlatConfigProps))
  ) satisfies ConfigWithExtends;
  if (Object.keys(fusedConfig).length > 0) {
    configs.push([fusedConfig]);
  }

  const config = tseslint.config(...(await Promise.all(configs)), ...(await Promise.all(userConfigs))) as ConfigArrayWithOptions;
  config[OPTIONS_SYMBOL] = options;
  return config;
}

/**
 * Creates an overridden ESLint configuration by merging new options with an existing configuration.
 * This function is designed for Nx workspaces where you want to customize project-level configurations
 * while preserving the base workspace configuration and its auto-detection logic.
 * 
 * @param config - An existing configuration created with `defineConfig()`
 * @param options - New configuration options to merge with the original ones
 * @param userConfigs - Additional user configurations that can be awaited
 * @returns A promise that resolves to a new `ConfigArrayWithOptions`
 * 
 * @example
 * ```typescript
 * // Root config
 * const rootConfig = await defineConfig({ typescript: true, angular: true });
 * 
 * // Project-specific override
 * const projectConfig = await overrideConfig(rootConfig, {
 *   typescript: { parserOptions: { project: './libs/my-lib/tsconfig.json' } },
 *   ignores: ['**/*.spec.ts'] // additional ignores for this project
 * });
 * ```
 */
export async function overrideConfig(
  config: Awaitable<ConfigArrayWithOptions>,
  options: ConfigWithExtends & CreateConfigOptions,
  ...userConfigs: Awaitable<ConfigWithExtends | ConfigWithExtends[]>[]
): Promise<ConfigArrayWithOptions> {
  const resolvedConfig = await config;
  
  // Extract original options from the config
  const originalOptions = resolvedConfig[OPTIONS_SYMBOL];
  if (!originalOptions) {
    throw new Error('[@fabdeh/eslint-config] The provided config was not created with defineConfig() or does not contain original options.');
  }
  
  // Deep merge the original options with the new options
  const mergedOptions = deepMerge(originalOptions, options);
  
  // Create a new configuration with the merged options
  return defineConfig(mergedOptions, ...userConfigs);
}
