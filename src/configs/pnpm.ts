import type { IsInEditorOptions, PnpmOptions, TypedConfig } from '../shared/types';

import { readFile } from 'node:fs/promises';

import { findUp } from 'find-up-simple';

import { interopDefault } from '../shared/utils';

/**
 *
 */
async function detectCatalogUsage(): Promise<boolean> {
  const workspaceFile = await findUp('pnpm-workspace.yaml');
  if (!workspaceFile) {
    return false;
  }

  const yaml = await readFile(workspaceFile, 'utf-8');
  return yaml.includes('catalog:') || yaml.includes('catalogs:');
}

/**
 * Generates an array containing configuration settings for PNPM workspace-specific rules and plugins.
 *
 * @param options - The options
 * @returns An array defining PNPM workspace rules, plugins, and their configurations.
 */
export async function pnpm(options: IsInEditorOptions & PnpmOptions = {}): Promise<TypedConfig[]> {
  const [
    pluginPnpm,
    pluginYaml,
    yamlParser,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-pnpm')),
    interopDefault(import('eslint-plugin-yml')),
    interopDefault(import('yaml-eslint-parser')),
  ]);

  const {
    catalogs = await detectCatalogUsage(),
    isInEditor = false,
    json = true,
    sort = true,
    yaml = true,
  } = options;

  const configs: TypedConfig[] = [];
  if (json) {
    configs.push(
      {
        name: 'fabdeh/pnpm/package-json',
        files: ['package.json', '**/package.json'],
        language: 'jsonc/x',
        plugins: {
          pnpm: pluginPnpm,
        },
        rules: {
          ...(catalogs
            ? {
                'pnpm/json-enforce-catalog': [
                  'error',
                  {
                    autofix: !isInEditor,
                    ignore: ['@types/vscode'],
                  },
                ],
              }
            : {}),
          'pnpm/json-prefer-workspace-settings': [
            'error',
            { autofix: !isInEditor },
          ],
          'pnpm/json-valid-catalog': [
            'error',
            { autofix: !isInEditor },
          ],
        },
      }
    );
  }

  if (yaml) {
    configs.push(
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
          'pnpm/yaml-enforce-settings': ['error', {
            settings: {
              shellEmulator: true,
              trustPolicy: 'no-downgrade',
            },
          }],
          'pnpm/yaml-no-duplicate-catalog-item': 'error',
          'pnpm/yaml-no-unused-catalog-item': 'error',
        },
      }
    );
  }

  if (sort) {
    configs.push({
      files: ['pnpm-workspace.yaml'],
      languageOptions: {
        parser: yamlParser,
      },
      name: 'antfu/pnpm/pnpm-workspace-yaml-sort',
      plugins: {
        yaml: pluginYaml,
      },
      rules: {
        'yaml/sort-keys': [
          'error',
          {
            order: [
              // Settings
              // @keep-sorted
              // eslint-disable-next-line unicorn/no-useless-spread
              ...[
                'cacheDir',
                'catalogMode',
                'cleanupUnusedCatalogs',
                'dedupeDirectDeps',
                'deployAllFiles',
                'enablePrePostScripts',
                'engineStrict',
                'extendNodePath',
                'hoist',
                'hoistPattern',
                'hoistWorkspacePackages',
                'ignoreCompatibilityDb',
                'ignoreDepScripts',
                'ignoreScripts',
                'ignoreWorkspaceRootCheck',
                'managePackageManagerVersions',
                'minimumReleaseAge',
                'minimumReleaseAgeExclude',
                'modulesDir',
                'nodeLinker',
                'nodeVersion',
                'optimisticRepeatInstall',
                'packageManagerStrict',
                'packageManagerStrictVersion',
                'preferSymlinkedExecutables',
                'preferWorkspacePackages',
                'publicHoistPattern',
                'registrySupportsTimeField',
                'requiredScripts',
                'resolutionMode',
                'savePrefix',
                'scriptShell',
                'shamefullyHoist',
                'shellEmulator',
                'stateDir',
                'supportedArchitectures',
                'symlink',
                'tag',
                'trustPolicy',
                'trustPolicyExclude',
                'updateNotifier',
              ],

              // Packages and dependencies
              'packages',
              'overrides',
              'patchedDependencies',
              'catalog',
              'catalogs',

              // Other
              // @keep-sorted
              // eslint-disable-next-line unicorn/no-useless-spread
              ...[
                'allowedDeprecatedVersions',
                'allowNonAppliedPatches',
                'configDependencies',
                'ignoredBuiltDependencies',
                'ignoredOptionalDependencies',
                'neverBuiltDependencies',
                'onlyBuiltDependencies',
                'onlyBuiltDependenciesFile',
                'packageExtensions',
                'peerDependencyRules',
              ],
            ],
            pathPattern: '^$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '.*',
          },
        ],
      },
    });
  }

  return configs;
}
