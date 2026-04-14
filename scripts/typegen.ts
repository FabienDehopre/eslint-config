#!/usr/bin/env node

import type { ESLint } from 'eslint';

import { writeFile } from 'node:fs/promises';

import { kebabCase, pascalCase } from 'change-case';
import { compileRule, flatConfigsToPlugins } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import * as configs from '../src/configs';

async function writePluginRulesDeclarationsFile(pluginName: string, plugin: ESLint.Plugin): Promise<void> {
  const declarationsLines = [
    '/**',
    ' * DO NOT EDIT',
    ' * This file is generated',
    ' */',
    '',
    'import type { Linter } from \'eslint\';',
    '',
    `export interface ${pascalCase(pluginName)}RuleOptions {`,
  ];
  const typeDeclarationsLines: string[] = [];
  for (const [ruleName, rule] of Object.entries(plugin.rules ?? {}).toSorted(([a], [b]) => a.localeCompare(b))) {
    const { name, jsdoc, typeName, typeDeclarations } = await compileRule(ruleName, rule, {});
    if (jsdoc.length > 0) {
      declarationsLines.push(`  /*`, ...jsdoc.map((l) => `   * ${l.replaceAll('*/', String.raw`*\/`)}`), '   */');
    }

    declarationsLines.push(`  '${pluginName}/${name}'?: Linter.RuleEntry<${typeName}>;`);
    typeDeclarationsLines.push(...typeDeclarations);
  }

  declarationsLines.push('}', '');
  const dts = `${declarationsLines.join('\n')}\n${typeDeclarationsLines.join('\n')}\n`;
  await writeFile(`src/typegen/${kebabCase(pluginName)}-rules.d.ts`, dts);
}

const configNamesSet = new Set<string>();
const ruleOptionsSet = new Set<string>();
await writePluginRulesDeclarationsFile('default', {
  rules: Object.fromEntries(builtinRules.entries()),
});
ruleOptionsSet.add('default');
for (const config of Object.values(configs)) {
  if (typeof config !== 'function') continue;
  const resolvedConfig = await config();
  // eslint-disable-next-line unicorn/no-array-for-each
  resolvedConfig.map((c) => c.name).filter((s) => s !== undefined).forEach((name) => configNamesSet.add(name));
  // @ts-expect-error -- should be fine
  const plugins = await flatConfigsToPlugins(resolvedConfig, {});
  for (const [pluginName, plugin] of Object.entries(plugins)) {
    await writePluginRulesDeclarationsFile(pluginName, plugin);
    ruleOptionsSet.add(pluginName);
  }
}

const collator = new Intl.Collator(undefined, { numeric: true });
const ruleOptions = [...ruleOptionsSet].map((x) => x.replace(/^@/, ''));
const configNames = [...configNamesSet].toSorted((a, b) => collator.compare(a, b));
const indexLines = [
  '/**',
  ' * DO NOT EDIT',
  ' * This file is generated',
  ' */',
  '',
  ...ruleOptions.map((pluginName) => `import type { ${pascalCase(pluginName)}RuleOptions } from './${kebabCase(pluginName)}-rules';`).toSorted(),
  '',
  ...ruleOptions.map((pluginName) => `export type { ${pascalCase(pluginName)}RuleOptions } from './${kebabCase(pluginName)}-rules';`).toSorted(),
  '',
  'export type RuleOptions =',
  ...ruleOptions.slice(0, -1)
    .map((pluginName) => `${pascalCase(pluginName)}RuleOptions`)
    .toSorted((a, b) => collator.compare(a, b))
    .map((x) => `  ${x} |`),
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  `  ${pascalCase(ruleOptions.at(-1)!)}RuleOptions;`,
  '',
  `export type ConfigNames =`,
  ...configNames.slice(0, -1).map((x) => `  '${x}' |`),
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  `  '${configNames.at(-1)!}';`,
  '',
];
await writeFile('src/typegen/index.d.ts', indexLines.join('\n'));
