import type { ConfigWithExtends } from 'typescript-eslint';
import type { DefineConfigOptions } from '../src';

import { existsSync } from 'node:fs';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { execa } from 'execa';
import { copy, remove } from 'fs-extra/esm';
import { glob } from 'glob';
import { afterAll, beforeAll, describe, test } from 'vitest';

interface TestParams {
  name: string;
  config: DefineConfigOptions;
  items?: ConfigWithExtends[];
}

describe.skip('fixtures', () => {
  beforeAll(async () => {
    await rm('_fixtures', { recursive: true, force: true });
  });

  afterAll(async () => {
    await rm('_fixtures', { recursive: true, force: true });
  });

  test.concurrent.for([
    { name: 'all', config: {} },
    { name: 'js', config: {}, items: [] },
  ] as TestParams[])('$name', async ({ name, config, items }, { expect }) => {
    const from = resolve('fixtures/input');
    const output = resolve('fixtures/output', name);
    const target = resolve('_fixtures', name);

    await copy(from, target, {
      filter: (src) => {
        return !src.includes('node_modules');
      },
    });
    await writeFile(join(target, 'eslint.config.ts'), `
// @eslint-disable
import { createConfig } from '@fabdeh/eslint-config';

export default createConfig(
  ${JSON.stringify(config, null, 2)},
  ...${JSON.stringify(items, null, 2)},
);
`);

    await execa('pnpx', ['eslint', '.', '--fix'], {
      cmd: target,
      stdio: 'pipe',
    });

    const files = await glob('**/*', {
      ignore: ['**/node_modules/**', '**/eslint.config.ts'],
      cwd: target,
    });

    await Promise.all(files.map(async (file) => {
      const content = await readFile(join(target, file), 'utf8');
      const source = await readFile(join(from, file), 'utf8');
      const outputPath = join(output, file);
      if (content === source) {
        if (existsSync(outputPath)) {
          await remove(outputPath);
        }

        return;
      }

      await expect.soft(content).toMatchFileSnapshot(join(output, file));
    }));
  });
});
