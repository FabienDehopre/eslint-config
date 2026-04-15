import type {
  Awaitable,
  ConfigNames,
  DefineWorkspaceConfigOptions,
  FlatConfigComposerWithOptions,
  TypedConfig,
  TypedConfigWithExtends
} from '../shared/types';

import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { findUpSync } from 'find-up-simple';
import { isPackageExists } from 'local-pkg';

import {
  comments,
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
} from '../configs';
import { OPTIONS_SYMBOL } from '../shared/constants';
import { interopDefault, isInEditorEnv, resolveSubOptions } from '../shared/utils';

/**
 * Creates an ESLint configuration array based on the provided options and user configurations.
 * This function is similar to `defineConfig`, but it is designed for use in the root of a workspace environment.
 * Contrary to `defineConfig`, it will not automatically detect the presence of certain packages and will not enable corresponding rules.
 *
 * @param options - Configuration options.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns The merged ESLint configurations.
 * @example
 * ```typescript
 * import { defineWorkspaceConfig } from '@fabdeh/eslint-config';
 *
 * export default defineWorkspaceConfig({ typescript: { parserOptions: { project: './tsconfig.json' } } });
 * ```
 */
export function defineWorkspaceConfig(
  options: DefineWorkspaceConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigWithExtends | TypedConfigWithExtends[]>[]
): FlatConfigComposerWithOptions<TypedConfig, ConfigNames> {
  const {
    gitignore: enableGitignore = true,
    // eslint-disable-next-line @angular-eslint/no-experimental
    pnpm: enableCatalogs = !!findUpSync('pnpm-workspace.yaml'),
    regexp: enableRegexp = true,
    typescript: enableTypescript = isPackageExists('typescript'),
    unicorn: enableUnicorn = true,
  } = options;

  let isInEditor = options.isInEditor;
  if (isInEditor === undefined) {
    isInEditor = isInEditorEnv();
    if (isInEditor) {
      // eslint-disable-next-line no-console
      console.log('[@fabdeh/eslint-config] Detected running in editor, some rules are disabled.');
    }
  }

  const stylisticOptions =
    options.stylistic === false ? false : typeof options.stylistic === 'object' ? options.stylistic : {};

  const configs: Awaitable<TypedConfig[]>[] = [];
  if (enableGitignore) {
    if (typeof enableGitignore === 'object') {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) => [r({
          name: 'fabdeh/gitignore',
          ...enableGitignore,
        })])
      );
    } else {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) => [r({
          name: 'fabdeh/gitignore',
          strict: true,
        })])
      );
    }
  }

  configs.push(
    ignores(options.ignores, 'workspace'),
    javascript({ isInEditor, overrides: options.javascript?.overrides }),
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
    const pnpmOptions = resolveSubOptions(options, 'pnpm');
    configs.push(pnpm({
      isInEditor,
      json: options.jsonc !== false,
      yaml: options.yaml !== false,
      ...pnpmOptions,
    }));
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

  let composer = new FlatConfigComposer<TypedConfig, ConfigNames>();
  composer = composer
    .append(
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

  const composerWithOptions = composer as FlatConfigComposerWithOptions<TypedConfig, ConfigNames>;
  composerWithOptions[OPTIONS_SYMBOL] = options;
  return composerWithOptions;
}
