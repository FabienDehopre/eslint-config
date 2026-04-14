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

describe('defineConfig factory snapshot', () => {
  for (const { name, configs } of SUITES) {
    test.concurrent(`factory ${name}`, async ({ expect }) => {
      const config = await defineConfig(configs);
      await expect(serializeConfigs(config, IGNORE_CONFIGS)).toMatchFileSnapshot(`./__snapshots__/factories/define-config/${name}.snap.js`);
    });
  }
});
