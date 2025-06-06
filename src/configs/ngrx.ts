import type { ConfigArray, ConfigWithExtends } from 'typescript-eslint';
import type { NgrxOptions } from '../types';
import type { Selector } from './rules-configs/naming-convention';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import { GLOB_TS_EXT } from '../globs';
import { interopDefault } from '../utils';
import namingConvention from './rules-configs/naming-convention';

const DEFAULT_STORE_GLOB = [
  `**/*.actions.${GLOB_TS_EXT}`,
  `**/*.feature.${GLOB_TS_EXT}`,
  `**/*.reducer.${GLOB_TS_EXT}`,
  `**/*.state.${GLOB_TS_EXT}`,
];
const DEFAULT_EFFECTS_GLOB = [`**/*.effects.${GLOB_TS_EXT}`];
const DEFAULT_SIGNALS_GLOB = [`**/*.store.${GLOB_TS_EXT}`];

/**
 * Generates an ESLint configuration array for NgRx based on the provided options.
 *
 * @param [options] - The options to configure NgRx rules.
 * @param [options.store] - If true or an object, includes NgRx store rules.
 * @param [options.effects] - If true or an object, includes NgRx effects rules.
 * @param [options.signals] - If true or an object, includes NgRx signals rules.
 * @returns A promise that resolves to the ESLint configuration array.
 * @example
 * // Basic usage
 * const config = await ngrx();
 * @example
 * ```ts
 * // With custom options
 * const config = await ngrx({
 *   store: { files: ['**\/*.store.ts'] },
 *   effects: { files: ['**\/*.effects.ts'] },
 *   signals: { files: ['**\/*.signals.ts'] }
 * });
 * ```
 */
export async function ngrx(options: NgrxOptions = {}): Promise<ConfigArray> {
  const ngrxPlugin = await interopDefault(import('@ngrx/eslint-plugin/v9'));
  const {
    store = isPackageExists('@ngrx/store'),
    effects = isPackageExists('@ngrx/effects'),
    signals = isPackageExists('@ngrx/signals'),
  } = options;

  const configs: ConfigWithExtends[] = [];
  let addOperatorsRules = false;
  const ngrxOperatorsFiles = [];
  if (store) {
    const {
      files = DEFAULT_STORE_GLOB,
      enforceOperatorsRules = isPackageExists('@ngrx/operators'),
      overrides = {},
    } = typeof store === 'object' ? store : {};
    addOperatorsRules ||= enforceOperatorsRules;
    ngrxOperatorsFiles.push(files);
    configs.push({
      name: 'fabdeh/ngrx-store/rules',
      files,
      plugins: { '@ngrx': ngrxPlugin },
      rules: {
        ...ngrxPlugin.configs.store.find((c) => c.name === 'ngrx/store')?.rules,
        '@typescript-eslint/naming-convention': [
          'error',
          ...namingConvention,
          {
            selector: ['objectLiteralProperty'],
            // eslint-disable-next-line unicorn/no-null
            format: null,
            custom: {
              regex: String.raw`^(?:(?:[a-z]+(?:[A-Z][a-z]*)*)|[A-Z][a-z]*(?:\s[A-Z][a-z]*)*)$`,
              match: true,
            },
          },
          {
            selector: 'variable',
            modifiers: ['const', 'global', 'exported'],
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
        ],
        ...overrides,
      },
    });
  }

  if (effects) {
    const {
      files = DEFAULT_EFFECTS_GLOB,
      enforceOperatorsRules = isPackageExists('@ngrx/operators'),
      overrides = {},
    } = typeof effects === 'object' ? effects : {};
    addOperatorsRules ||= enforceOperatorsRules;
    ngrxOperatorsFiles.push(files);
    configs.push({
      name: 'fabdeh/ngrx-effects/rules',
      files,
      plugins: { '@ngrx': ngrxPlugin },
      rules: {
        ...ngrxPlugin.configs.effects.find((c) => c.name === 'ngrx/effects')?.rules,
        '@typescript-eslint/naming-convention': [
          'error',
          ...namingConvention,
          {
            selector: 'variable',
            modifiers: ['const', 'global', 'exported'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
            suffix: ['$'],
          },
        ],
        ...overrides,
      },
    });
  }

  if (signals) {
    const {
      files = DEFAULT_SIGNALS_GLOB,
      enforceOperatorsRules = isPackageExists('@ngrx/operators'),
      overrides = {},
    } = typeof signals === 'object' ? signals : {};
    const allowLeadingUnderscoreOnMemberLike = (conventions: Selector[]): Selector[] => [
      ...conventions.filter((c) => !Array.isArray(c.selector)),
      { selector: 'variableLike', format: ['camelCase'] },
      { selector: 'memberLike', format: ['camelCase'], leadingUnderscore: 'allow' },
    ];
    addOperatorsRules ||= enforceOperatorsRules;
    ngrxOperatorsFiles.push(files);
    configs.push({
      name: 'fabdeh/ngrx-signals/rules',
      files,
      plugins: { '@ngrx': ngrxPlugin },
      rules: {
        ...ngrxPlugin.configs.signals.find((c) => c.name === 'ngrx/signals')?.rules,
        '@typescript-eslint/naming-convention': [
          'error',
          ...allowLeadingUnderscoreOnMemberLike(namingConvention),
          {
            selector: 'variable',
            modifiers: ['const', 'global', 'exported'],
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
        ],
        ...overrides,
      },
    });
  }

  if (addOperatorsRules) {
    configs.push({
      name: 'fabdeh/ngrx-operators/rules',
      files: [...ngrxOperatorsFiles],
      plugins: { '@ngrx': ngrxPlugin },
      rules: {
        ...ngrxPlugin.configs.operators.find((c) => c.name === 'ngrx/operators')?.rules,
      },
    });
  }

  return tseslint.config(configs);
}
