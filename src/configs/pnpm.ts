import type { IsInEditorOptions, PnpmOptions, TypedConfig } from '../shared/types';

import { readFile } from 'node:fs/promises';

import { findUp } from 'find-up-simple';

import { interopDefault } from '../shared/utils';

/**
 * Detects whether the current PNPM workspace uses catalog definitions.
 *
 * Searches for a `pnpm-workspace.yaml` file and checks whether it contains
 * either the `catalog:` or `catalogs:` keys, which are used to define shared
 * dependency version catalogs in PNPM workspaces.
 *
 * @returns `true` when catalog configuration is present; otherwise `false`.
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
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-pnpm')),
    interopDefault(import('eslint-plugin-yml')),
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
        plugins: {
          pnpm: pluginPnpm,
        },
        language: 'jsonc/x',
        rules: {
          ...(catalogs
            ? {
                'pnpm/json-enforce-catalog': [
                  'error',
                  {
                    autofix: !isInEditor,
                    ignores: ['@types/vscode'],
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
        plugins: {
          pnpm: pluginPnpm,
        },
        language: 'yaml/yaml',
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
      name: 'fabdeh/pnpm/pnpm-workspace-yaml-sort',
      files: ['pnpm-workspace.yaml'],
      plugins: {
        yaml: pluginYaml,
      },
      language: 'yaml/yaml',
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
