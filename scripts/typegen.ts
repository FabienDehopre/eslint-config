import { writeFile } from 'node:fs/promises';

import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import { combine, comments, ignores, imports, javascript, jsdoc, perfectionist, stylistic, unicorn } from '../src';

const CONFIGS = await combine(
  {
    plugins: {
      '': {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  comments(),
  ignores(),
  imports(),
  javascript(),
  jsdoc(),
  perfectionist(),
  stylistic(),
  unicorn()
);

/**
 *
 * @param item
 */
function defined(item: string | undefined): item is string {
  return item !== undefined;
}

const CONFIG_NAMES = CONFIGS.map((i) => i.name).filter(defined);
let dts = await flatConfigsToRulesDTS(CONFIGS, { includeAugmentation: false });
dts += `
// Names of all the configs
export type ConfigNames = ${CONFIG_NAMES.toSorted()
  .map((i) => `'${i}'`)
  .join(' | ')};
`;

await writeFile('src/typegen.d.ts', dts);
