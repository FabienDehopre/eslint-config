import type { TSESLint } from '@typescript-eslint/utils';
import type { ConfigArray } from 'typescript-eslint';

import fs from 'node:fs/promises';

import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import { angular, comments, formatters, imports, javascript, jsdoc, jsonc, markdown, ngrx, node, perfectionist, regexp, sortPackageJson, stylistic, tailwindcss, toml, typescript, unicorn, vitest, yaml } from '../src';

type Awaitable<T> = Promise<T> | T;

/**
 *
 * @param configs
 */
async function combine(...configs: Awaitable<ConfigArray | TSESLint.FlatConfig.Config>[]): Promise<ConfigArray> {
  const resolved = await Promise.all(configs);
  return resolved.flat();
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const configs = await combine(
  {
    plugins: {
      '': {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  angular(),
  comments(),
  formatters(),
  imports(),
  javascript(),
  jsdoc(),
  jsonc(),
  markdown(),
  ngrx(),
  node(),
  perfectionist(),
  regexp(),
  sortPackageJson(),
  stylistic(),
  tailwindcss(),
  toml(),
  typescript(),
  unicorn(),
  vitest(),
  yaml()
);

// eslint-disable-next-line @typescript-eslint/naming-convention
const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

// @ts-expect-error -- should be fine
let dts = await flatConfigsToRulesDTS(configs, { includeAugmentation: false });

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')};
`;

await fs.writeFile('src/typegen.d.ts', dts);
