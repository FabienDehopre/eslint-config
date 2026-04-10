/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
import type { DefineConfigOptions, TypedConfigArray } from '../src/shared/types';

import { describe, test } from 'vitest';

import { CONFIG_PRESET_FULL_OFF, CONFIG_PRESET_FULL_ON } from '../src/config-presets';
import { defineConfig } from '../src/factories/standard-config';

interface Suite {
  name: string;
  configs: DefineConfigOptions;
}

const SUITES: Suite[] = [
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

function serializeConfigs(configs: TypedConfigArray): any[] {
  return configs.map((config) => {
    if (config.name && IGNORE_CONFIGS.has(config.name)) {
      return '<ignored>';
    }

    const clone = { ...config } as any;
    if (config.plugins) {
      clone.plugins = Object.keys(config.plugins);
    }

    if (config.languageOptions) {
      if (config.languageOptions.parser && typeof config.languageOptions.parser !== 'string') {
        clone.languageOptions.parse = config.languageOptions.parser.meta?.name ?? (config.languageOptions.parser as any).name ?? 'unknown';
      }

      delete clone.languageOptions.globals;
      if (config.languageOptions.parserOptions) {
        delete clone.languageOptions.parserOptions.parser;
        delete clone.languageOptions.parserOptions.projectService;
        delete clone.languageOptions.parserOptions.tsconfigRootDir;
      }
    }

    if (config.processor && typeof config.processor !== 'string') {
      clone.processor = config.processor.meta?.name ?? 'unknown';
    }

    if (config.rules) {
      clone.rules = Object.entries(config.rules)
        .map(([rule, value]) => {
          if (value === 'off' || value === 0) {
            return `- ${rule}`;
          }

          return rule;
        });
    }

    return clone;
  });
}

describe('defineConfig', () => {
  for (const { name, configs } of SUITES) {
    test.concurrent(`factory ${name}`, async ({ expect }) => {
      const config = await defineConfig(configs);
      await expect(serializeConfigs(config)).toMatchFileSnapshot(`./__snapshots__/factories/define-config/${name}.snap.js`);
    });
  }
});
