import type { ConfigWithExtends } from 'typescript-eslint';
import type { CreateConfigOptions } from '../src';

import { join, resolve } from 'node:path';

import { execa } from 'execa';
import fg from 'fast-glob';
import fs from 'fs-extra';
import { afterAll, beforeAll, describe, test } from 'vitest';

describe('fixtures', () => {
  beforeAll(async () => {
    await fs.rm('_fixtures', { recursive: true, force: true });
  });

  afterAll(async () => {
    await fs.rm('_fixtures', { recursive: true, force: true });
  });

  runWithConfig('all', { /* TODO */ });
});

/**
 * Execute the test {@link name} with the specified {@link config} and optionally the specified additional {@link items}.
 *
 * @param name - The name of the test.
 * @param config - The configuration to use for the test.
 * @param items - The optional additional ESLint configuration.
 */
function runWithConfig(name: string, config: CreateConfigOptions, ...items: ConfigWithExtends[]): void {
  // eslint-disable-next-line vitest/require-top-level-describe,vitest/valid-title
  test.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input');
    const output = resolve('fixtures/output', name);
    const target = resolve('_fixtures', name);

    await fs.copy(from, target, {
      filter: (src) => {
        return !src.includes('node_modules');
      },
    });
    await fs.writeFile(join(target, 'eslint.config.js'), `
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

    const files = await fg('**/*', {
      ignore: ['node_modules', 'eslint.config.js'],
      cwd: target,
    });

    await Promise.all(files.map(async (file) => {
      const content = await fs.readFile(join(target, file), 'utf8');
      const source = await fs.readFile(join(from, file), 'utf8');
      const outputPath = join(output, file);
      if (content === source) {
        if (fs.existsSync(outputPath)) {
          await fs.remove(outputPath);
        }

        return;
      }

      await expect.soft(content).toMatchFileSnapshot(join(output, file));
    }));
  }, 30_000);
}
