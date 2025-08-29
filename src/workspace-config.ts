import type { Awaitable, CreateWorkspaceConfigOptions, TypedConfigArray, TypedConfigArrayWithOptions, TypedConfigWithExtends } from './types';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import {
  comments,
  formatters,
  ignores,
  imports,
  javascript,
  jsonc,
  markdown,
  node,
  perfectionist,
  pnpm,
  regexp,
  sortPackageJson,
  sortTsConfig,
  stylistic,
  toml,
  typescript,
  unicorn,
  yaml
} from './configs';
import { OPTIONS_SYMBOL } from './types';
import { interopDefault, resolveSubOptions } from './utils';

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
      type: 'workspace',
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
