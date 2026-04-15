import type {
  Awaitable,
  ConfigNames,
  DefineConfigOptions,
  TypedConfig,
  TypedConfigWithExtends
} from '../shared/types';

import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { findUpSync } from 'find-up-simple';
import { isPackageExists } from 'local-pkg';

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
  node,
  perfectionist,
  playwright,
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
} from '../configs';
import { NGRX_PACKAGES, PLAYWRIGHT_PACKAGES } from '../shared/constants';
import { getPlaywrightDirectory, interopDefault, isInEditorEnv, resolveSubOptions } from '../shared/utils';

/**
 * Creates an ESLint configuration array based on the provided options and user configurations.
 * Additionally, it will automatically detect the presence of certain packages and enable corresponding rules.
 *
 * @param options - Configuration options.
 * @param userConfigs - Additional user configurations that can be awaited.
 * @returns A promise that resolves to a `ConfigArrayWithOptions`.
 * @example
 * ```typescript
 * import { defineConfig } from '@fabdeh/eslint-config';
 *
 * export default defineConfig({ vitest: true, typescript: { parserOptions: { project: './tsconfig.json' } } });
 * ```
 */
export function defineConfig(
  options: DefineConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigWithExtends | TypedConfigWithExtends[]>[]
): FlatConfigComposer<TypedConfig, ConfigNames> {
  const {
    angular: enableAngular = isPackageExists('@angular/core'),
    gitignore: enableGitignore = true,
    jsdoc: enableJsdoc = options.type === 'lib',
    ngrx: enableNgrx = NGRX_PACKAGES.some((p) => isPackageExists(p)),
    playwright: enablePlaywright = PLAYWRIGHT_PACKAGES.some((p) => isPackageExists(p)),
    // eslint-disable-next-line @angular-eslint/no-experimental
    pnpm: enableCatalogs = !!findUpSync('pnpm-workspace.yaml'),
    regexp: enableRegexp = true,
    tailwindcss: enableTailwind = false,
    typescript: enableTypescript = isPackageExists('typescript'),
    unicorn: enableUnicorn = true,
    vitest: enableVitest = isPackageExists('vitest'),
  } = options;

  let isInEditor = options.isInEditor;
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
    ignores(options.ignores),
    javascript({ isInEditor, overrides: options.javascript?.overrides }),
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

  let e2eFolderPath: string | undefined;
  if (enablePlaywright) {
    const playwrightOptions = resolveSubOptions(options, 'playwright');
    e2eFolderPath = playwrightOptions.e2eFolderPath ?? getPlaywrightDirectory() ?? 'e2e';
    configs.push(playwright({ ...playwrightOptions, e2eFolderPath }));
  }

  if (enableVitest) {
    const vitestOptions = resolveSubOptions(options, 'vitest');
    configs.push(vitest({ ...vitestOptions, e2eFolderPath }));
  }

  if (enableTailwind) {
    const tailwindcssOptions = resolveSubOptions(options, 'tailwindcss');
    configs.push(tailwindcss({
      ...tailwindcssOptions,
      stylistic: stylisticOptions,
    }));
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

  return composer;
}
