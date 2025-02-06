import type { ConfigArray, ConfigWithExtends } from 'typescript-eslint';
import type { Awaitable, ConfigOptions } from './types';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import {
  angular,
  comments,
  ignores,
  imports,
  javascript,
  jest,
  jsdoc,
  ngrx,
  perfectionist,
  stylistic,
  tailwindcss,
  typescript,
  unicorn,
  vitest,
} from './configs';
import { interopDefault, isInEditorEnv } from './utils';

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
 * Construct an array of ESLint flat config items.
 * @param options - The options for generating the ESLint configurations.
 * @param userConfigs - Additional user configuration to apply.
 * @returns The merged ESLint configurations.
 */
export async function createConfig(
  options: ConfigOptions & ConfigWithExtends = {},
  ...userConfigs: Awaitable<ConfigWithExtends | ConfigWithExtends[]>[]
): Promise<ConfigArray> {
  const {
    angular: enableAngular = isPackageExists('@angular/core'),
    gitignore: enableGitignore = true,
    isInEditor = isInEditorEnv(),
    jest: enableJest = isPackageExists('jest'),
    ngrx: enableNgrx = NGRX_PACKAGES.some((p) => isPackageExists(p)),
    tailwindcss: enableTailwind = isPackageExists('tailwindcss'),
    unicorn: enableUnicorn = true,
    vitest: enableVitest = isPackageExists('vitest'),
  } = options;

  if (isInEditor) {
    // eslint-disable-next-line no-console
    console.log(
      '[@fabdeh/eslint-config] Detected running in editor, some rules are configured as warn or completely turned off.'
    );
  }

  if (enableJest && enableVitest) {
    throw new Error(
      '[@fabdeh/eslint-config] Detected that both "jest" and "vitest" are enabled which is not supported. ' +
        'Manually disable or uninstall one of them.'
    );
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

  const allowAngularDecorator = options.angular !== false;

  configs.push(
    ignores(options.ignores),
    javascript({ isInEditor, overrides: options.javascript?.overrides, allowAngularDecorator }),
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

  if (enableJest) {
    configs.push(
      jest(
        typeof enableJest === 'object'
          ? { ...enableJest, stylistic: stylisticOptions }
          : { stylistic: stylisticOptions }
      )
    );
  }

  if (enableVitest) {
    configs.push(vitest(typeof enableVitest === 'object' ? enableVitest : {}));
  }

  if (enableTailwind) {
    configs.push(tailwindcss(typeof enableTailwind === 'object' ? enableTailwind : {}));
  }

  const fusedConfig = Object.fromEntries(
    Object.entries(options).filter(([k]) => FLAT_CONFIG_PROPS.includes(k as FlatConfigProps))
  ) satisfies ConfigWithExtends;
  if (Object.keys(fusedConfig).length > 0) {
    configs.push([fusedConfig]);
  }

  return tseslint.config(...(await Promise.all(configs)), ...(await Promise.all(userConfigs)));
}
