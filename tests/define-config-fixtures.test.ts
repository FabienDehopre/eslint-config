import type { DefineConfigOptions, TypedConfigArray } from '../src';

import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import process from 'node:process';

import { execa } from 'execa';
import { glob } from 'glob';
import { afterAll, beforeAll, describe, test } from 'vitest';

import { CONFIG_PRESET_FULL_OFF, CONFIG_PRESET_FULL_ON } from '../src/config-presets';

describe('fixtures', () => {
  const isWindows = process.platform === 'win32';
  const timeout = isWindows ? 300_000 : 60_000;

  beforeAll(async () => {
    await rm('_fixtures', { recursive: true, force: true });
  });
  afterAll(async () => {
    await rm('_fixtures', { recursive: true, force: true });
  });

  function runWithConfig(name: string, configs: DefineConfigOptions, ...items: TypedConfigArray): void {
    test.concurrent(name, async ({ expect }) => {
      const from = resolve('fixtures/input');
      const output = resolve('fixtures/output', name);
      const target = resolve('_fixtures', name);

      await cp(from, target, {
        recursive: true,
        filter: (src) => !src.includes('node_modules'),
      });
      await writeFile(join(target, 'eslint.config.js'), `
import { defineConfig } from '@fabdeh/eslint-config';

export default defineConfig(
  ${JSON.stringify(configs, null, 2)},
  ...${JSON.stringify(items, null, 2) ?? []},
);
`);

      await execa('pnpx', ['eslint', '.', '--fix'], {
        cwd: target,
        stdio: 'pipe',
      });

      const files = await glob('**/*', {
        cwd: target,
        ignore: ['node_modules', 'eslint.config.js'],
      });

      await Promise.all(files.map(async (file) => {
        const content = await readFile(join(target, file), 'utf8');
        const source = await readFile(join(from, file), 'utf8');
        const outputPath = join(output, file);
        if (content === source) {
          await rm(outputPath, { force: true });
          return;
        }

        await expect.soft(content).toMatchFileSnapshot(join(output, file));
      }));
    }, timeout);
  }

  runWithConfig('default', {});
  runWithConfig('full-off', CONFIG_PRESET_FULL_OFF);
  runWithConfig('full-on', CONFIG_PRESET_FULL_ON);
  runWithConfig('pnpm-without-jsonc', {
    jsonc: false,
    pnpm: true,
  });
  runWithConfig('pnpm-without-yaml', {
    pnpm: true,
    yaml: false,
  });
  runWithConfig('lib', {
    type: 'lib',
  });
});
