import type { Linter } from 'eslint';

import { Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';

import type { ConfigNames, ConfigOptions, TypedFlatConfigItem } from './types';

import { comments, ignores, imports, javascript, jsdoc, perfectionist, unicorn } from './configs';
import { interopDefault, isInEditorEnv } from './utils';

/**
 * Construct an array of ESLint flat config items.
 * @param options - The options for generating the ESLint configurations.
 * @param userConfigs - The user configurations to be merged with the generated configurations.
 * @returns The merged ESLint configurations.
 */
export function fabdehConfig(
  options: ConfigOptions & Omit<TypedFlatConfigItem, 'files'> = {},
  ...userConfigs: (
    | Awaitable<Linter.Config[] | TypedFlatConfigItem | TypedFlatConfigItem[]>
    | FlatConfigComposer<TypedFlatConfigItem, string>
  )[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const { gitignore: enableGitignore = true, unicorn: enableUnicorn = true, isInEditor = isInEditorEnv() } = options;

  if (isInEditor) {
    // eslint-disable-next-line no-console
    console.log(
      '[@fabdeh/eslint-config] Detected running in editor, some rules are configured as warn or completely turned off.'
    );
  }

  const stylisticOptions =
    options.stylistic === false ? false : typeof options.stylistic === 'object' ? options.stylistic : {};

  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];
  if (enableGitignore) {
    if (typeof enableGitignore === 'boolean') {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) => [
          r({
            name: 'fabdh/gitignore',
            strict: true,
          }),
        ])
      );
    } else {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) => [
          r({
            name: 'fabdeh/gitignore',
            ...enableGitignore,
          }),
        ])
      );
    }
  }

  configs.push(
    ignores(options.ignores),
    javascript({ isInEditor, overrides: options.javascript?.overrides }),
    comments(),
    imports({ stylistic: stylisticOptions }),
    jsdoc({ stylistic: stylisticOptions }),
    perfectionist()
  );

  if (enableUnicorn) {
    configs.push(unicorn(enableUnicorn === true ? {} : enableUnicorn));
  }

  return new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>().append(...configs).append(...userConfigs);
}
