import type { TypedConfigArray } from '../types';

import tseslint from 'typescript-eslint';

import { interopDefault } from '../utils';

/**
 * Generates an array containing configuration settings for PNPM workspace-specific rules and plugins.
 *
 * @returns An array defining PNPM workspace rules, plugins, and their configurations.
 */
export async function pnpm(): Promise<TypedConfigArray> {
  const [
    pluginPnpm,
    yamlParser,
    jsoncParser,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-pnpm')),
    interopDefault(import('yaml-eslint-parser')),
    interopDefault(import('jsonc-eslint-parser')),
  ]);

  return tseslint.config(
    {
      name: 'fabdeh/pnpm/package-json',
      files: ['package.json', '**/package.json'],
      languageOptions: {
        parser: jsoncParser,
      },
      plugins: {
        pnpm: pluginPnpm,
      },
      rules: {
        'pnpm/json-enforce-catalog': 'error',
        'pnpm/json-prefer-workspace-settings': 'error',
        'pnpm/json-valid-catalog': 'error',
      },
    },
    {
      name: 'fabdeh/pnpm/pnpm-workspace-yaml',
      files: ['pnpm-workspace.yaml'],
      languageOptions: {
        parser: yamlParser,
      },
      plugins: {
        pnpm: pluginPnpm,
      },
      rules: {
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'error',
      },
    }
  );
}
