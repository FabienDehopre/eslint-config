import type { ConfigArray, ConfigWithExtends } from 'typescript-eslint';
import type { Awaitable, CreateConfigOptions } from './types';

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
  perfectionist,
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
import { interopDefault } from './utils';

type FlatConfigProps = keyof Omit<ConfigWithExtends, 'files' | 'ignores' | 'language'>;
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
export async function createConfig(
  options: ConfigWithExtends & CreateConfigOptions = {},
  ...userConfigs: Awaitable<ConfigWithExtends | ConfigWithExtends[]>[]
): Promise<ConfigArray> {
  const {
    angular: enableAngular = isPackageExists('@angular/core'),
    gitignore: enableGitignore = true,
    ngrx: enableNgrx = NGRX_PACKAGES.some((p) => isPackageExists(p)),
    tailwindcss: enableTailwind = isPackageExists('tailwindcss'),
    unicorn: enableUnicorn = true,
    vitest: enableVitest = isPackageExists('vitest'),
  } = options;

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
    typescript({
      stylistic: stylisticOptions,
      parserOptions: options.typescript?.parserOptions,
      overrides: options.typescript?.overrides,
    }),
    comments(),
    imports({ stylistic: stylisticOptions }),
    jsdoc({ stylistic: stylisticOptions }),
    perfectionist()
  );

  if (enableUnicorn) {
    configs.push(unicorn(typeof enableUnicorn === 'object' ? enableUnicorn : {}));
  }

  if (stylisticOptions) {
    configs.push(stylistic({ stylistic: stylisticOptions }));
  }

  if (enableAngular) {
    configs.push(angular(typeof enableAngular === 'object' ? enableAngular : {}));
  }

  if (enableNgrx) {
    configs.push(ngrx(typeof enableNgrx === 'object' ? enableNgrx : {}));
  }

  if (enableVitest) {
    configs.push(vitest(typeof enableVitest === 'object' ? enableVitest : {}));
  }

  if (enableTailwind) {
    configs.push(tailwindcss(typeof enableTailwind === 'object' ? enableTailwind : {}));
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: typeof options.jsonc === 'object' ? options.jsonc.overrides : {},
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsConfig()
    );
  }

  if (options.yaml ?? true) {
    configs.push(yaml({
      overrides: typeof options.yaml === 'object' ? options.yaml.overrides : {},
      stylistic: stylisticOptions,
    }));
  }

  if (options.toml ?? true) {
    configs.push(toml({
      overrides: typeof options.toml === 'object' ? options.toml.overrides : {},
      stylistic: stylisticOptions,
    }));
  }

  if (options.markdown ?? true) {
    configs.push(markdown({
      overrides: typeof options.markdown === 'object' ? options.markdown.overrides : {},
    }));
  }

  if (options.formatters) {
    configs.push(formatters(options.formatters, typeof stylisticOptions === 'boolean' ? {} : stylisticOptions));
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

  return tseslint.config(...(await Promise.all(configs)), ...(await Promise.all(userConfigs)));
}
