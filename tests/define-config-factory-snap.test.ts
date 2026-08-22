import type { DefineConfigOptions } from '../src/shared/types';
import type { Suite } from './utils';

import { describe, test } from 'vitest';

import { CONFIG_PRESET_FULL_OFF, CONFIG_PRESET_FULL_ON } from '../src/config-presets';
import { defineConfig } from '../src/factories/standard-config';
import { serializeConfigs } from './utils';

const SUITES: Suite<DefineConfigOptions>[] = [
  {
    name: 'default',
    configs: {},
  },
  {
    name: 'full-off',
    configs: CONFIG_PRESET_FULL_OFF,
  },
  {
    name: 'full-on',
    configs: CONFIG_PRESET_FULL_ON,
  },
  {
    name: 'pnpm-without-yaml',
    configs: {
      yaml: false,
      pnpm: true,
    },
  },
  {
    name: 'pnpm-without-jsonc',
    configs: {
      jsonc: false,
      pnpm: true,
    },
  },
  {
    name: 'lib',
    configs: { type: 'lib' },
  },
];

const IGNORE_CONFIGS = new Set([
  'fabdeh/gitignore',
  'fabdeh/ignores',
  'fabdeh/javascript/setup',
]);

/**
 * Collects the names of every rule the resulting config leaves enabled, so two configs can be
 * compared for strictness. A rule set to `'off'` in a later config block wins, as it does in ESLint.
 */
async function collectRules(configs: DefineConfigOptions): Promise<Set<string>> {
  const enabled = new Set<string>();
  for (const config of await defineConfig(configs)) {
    for (const [rule, entry] of Object.entries(config.rules ?? {})) {
      const level = Array.isArray(entry) ? entry[0] : entry;
      if (level === 'off' || level === 0) {
        enabled.delete(rule);
      } else if (level !== undefined) {
        enabled.add(rule);
      }
    }
  }

  return enabled;
}

describe('defineConfig factory snapshot', () => {
  for (const { name, configs } of SUITES) {
    test.concurrent(`factory ${name}`, async ({ expect }) => {
      const config = await defineConfig(configs);
      await expect(serializeConfigs(config, IGNORE_CONFIGS)).toMatchFileSnapshot(`./__snapshots__/factories/define-config/${name}.snap.js`);
    });
  }
});

/**
 * Rules the default config enables that `CONFIG_PRESET_FULL_ON` switches off because a stricter
 * option supersedes them: `stylistic: { experimental: true }` replaces the granular spacing and
 * newline rules with `@stylistic/exp-list-style` and `@stylistic/exp-jsx-props-style`.
 */
const SUPERSEDED_BY_A_STRICTER_OPTION = new Set([
  '@stylistic/array-bracket-spacing',
  '@stylistic/jsx-first-prop-new-line',
  '@stylistic/jsx-function-call-newline',
  '@stylistic/jsx-max-props-per-line',
  '@stylistic/object-curly-spacing',
]);

describe('cONFIG_PRESET_FULL_ON', () => {
  test('never turns off a rule the default config turns on', async ({ expect }) => {
    const [defaultRules, fullOnRules] = await Promise.all([
      collectRules({}),
      collectRules(CONFIG_PRESET_FULL_ON),
    ]);
    const downgraded = [...defaultRules].filter((rule) => !fullOnRules.has(rule) && !SUPERSEDED_BY_A_STRICTER_OPTION.has(rule));

    expect(downgraded).toEqual([]);
  });
});
