import type { MockedFunction } from 'vitest';

import { beforeEach, describe, expect, test, vi } from 'vitest';

import { defineProjectConfig } from '../../src/factories/project-config';
import { defineWorkspaceConfig } from '../../src/factories/workspace-config';
import { OPTIONS_SYMBOL } from '../../src/shared/constants';
import { extractConfigNames, hasConfigWithName, MOCK_GIT_IGNORE_CONFIG, setupPackageScenario, validateEslintConfig } from '../utils/test-helpers';
import { PACKAGE_SCENARIOS } from './__fixtures__/expected-configs';

// Mock external dependencies
vi.mock('local-pkg');
vi.mock('eslint-config-flat-gitignore', () => ({
  default: MOCK_GIT_IGNORE_CONFIG,
}));

describe('defineProjectConfig', () => {
  let mockIsPackageExists: MockedFunction<(pkg: string) => boolean>;
  let baseConfig: Awaited<ReturnType<typeof defineWorkspaceConfig>>;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockIsPackageExists = vi.fn();
    const { isPackageExists } = await import('local-pkg');
    vi.mocked(isPackageExists).mockImplementation(mockIsPackageExists);

    // Create a base workspace config for project tests
    setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);
    baseConfig = await defineWorkspaceConfig({
      typescript: true,
      stylistic: { semi: false },
    });
  });

  describe('project-specific features', () => {
    test('should extend base config with project-specific features', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularBasic);

      const config = await defineProjectConfig(baseConfig, {
        angular: true,
        jsdoc: true,
      });

      expect(validateEslintConfig(config)).toBeTruthy();

      // Should include base workspace configs
      expect(hasConfigWithName(config, 'fabdeh/gitignore')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/javascript')).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();

      // Should include project-specific features
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/jsdoc')).toBeTruthy();
    });

    test('should auto-detect Angular when package is present', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularBasic);

      const config = await defineProjectConfig(baseConfig);

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();

      // Verify isPackageExists was called with '@angular/core'
      expect(mockIsPackageExists).toHaveBeenCalledWith('@angular/core');
    });

    test('should auto-detect NgRx when packages are present', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularWithNgrx);

      const config = await defineProjectConfig(baseConfig);

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();
      expect(hasConfigWithName(config, 'ngrx')).toBeTruthy();

      // Verify NgRx packages were checked
      expect(mockIsPackageExists).toHaveBeenCalledWith('@ngrx/store');
    });

    test('should auto-detect Vitest when package is present', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.vitestOnly);

      const config = await defineProjectConfig(baseConfig, {
        vitest: true,
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'vitest')).toBeTruthy();
    });

    test('should NOT include JSDoc by default unless type is lib', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineProjectConfig(baseConfig);

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/jsdoc')).toBeFalsy();
    });

    test('should include JSDoc when type is lib', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineProjectConfig(baseConfig, { type: 'lib' });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/jsdoc')).toBeTruthy();
    });

    test('should disable JSDoc when explicitly set to false', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineProjectConfig(baseConfig, { jsdoc: false });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/jsdoc')).toBeFalsy();
    });
  });

  describe('error handling', () => {
    test('should throw error when NgRx is enabled without Angular', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      await expect(defineProjectConfig(baseConfig, {
        angular: false,
        ngrx: true,
      })).rejects.toThrow(
        'NgRx rules can only be enabled if Angular rules are also enabled.'
      );
    });

    test('should throw error when project TypeScript is enabled without workspace TypeScript', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      // Create base config without TypeScript
      const baseConfigNoTs = await defineWorkspaceConfig({ typescript: false });

      await expect(defineProjectConfig(baseConfigNoTs, {
        typescript: { parserOptions: { project: './tsconfig.json' } },
      })).rejects.toThrow(
        'Project-specific TypeScript configuration requires a base configuration with TypeScript support.'
      );
    });
  });

  describe('typeScript project-specific configuration', () => {
    test('should add project-specific TypeScript config when provided', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineProjectConfig(baseConfig, {
        typescript: {
          parserOptions: { project: './tsconfig.json' },
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();
    });

    test('should work without project-specific TypeScript if base has TypeScript', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineProjectConfig(baseConfig);

      expect(validateEslintConfig(config)).toBeTruthy();
      // Should inherit TypeScript from base config
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();
    });
  });

  describe('angular and formatter interaction', () => {
    test('should modify HTML formatter when Angular is enabled and formatters exist in workspace', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularBasic);

      // Create base config with formatters
      const baseConfigWithFormatters = await defineWorkspaceConfig({
        typescript: true,
        formatters: { html: true, css: true },
      });

      const config = await defineProjectConfig(baseConfigWithFormatters, {
        angular: true,
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();
      expect(hasConfigWithName(config, 'formatter')).toBeTruthy();
    });

    test('should work with Angular when no formatters in workspace', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularBasic);

      const config = await defineProjectConfig(baseConfig, {
        angular: true,
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();
    });
  });

  describe('tailwindCSS support', () => {
    test('should include TailwindCSS config when enabled', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineProjectConfig(baseConfig, {
        tailwindcss: true,
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'tailwindcss')).toBeTruthy();
    });

    test('should not include TailwindCSS config by default', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineProjectConfig(baseConfig);

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'tailwindcss')).toBeFalsy();
    });
  });

  describe('workspace option inheritance', () => {
    test('should use workspace stylistic options for JSDoc', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineProjectConfig(baseConfig, {
        jsdoc: true,
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/jsdoc')).toBeTruthy();
    });

    test('should inherit workspace TypeScript naming conventions for NgRx', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularWithNgrx);

      // Create base config with TypeScript naming convention options
      const baseConfigWithNaming = await defineWorkspaceConfig({
        typescript: {
          useRelaxedNamingConventionForCamelAndPascalCases: true,
        },
      });

      const config = await defineProjectConfig(baseConfigWithNaming, {
        angular: true,
        ngrx: true,
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'ngrx')).toBeTruthy();
    });
  });

  describe('config composition', () => {
    test('should compose configs in correct order: base + project-specific + user configs', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularBasic);

      const config = await defineProjectConfig(
        baseConfig,
        { angular: true },
        {
          name: 'user/custom',
          rules: { 'no-console': 'error' },
        }
      );

      expect(validateEslintConfig(config)).toBeTruthy();

      const configNames = extractConfigNames(config);

      // Should have base configs first
      expect(configNames).toContain('fabdeh/gitignore');
      expect(configNames).toContain('fabdeh/javascript/setup');

      // Should have project-specific configs
      expect(configNames.some((name) => name.includes('angular'))).toBeTruthy();

      // Should have user config last
      expect(configNames).toContain('user/custom');
    });

    test('should return a standard TypedConfigArray (not with OPTIONS_SYMBOL)', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineProjectConfig(baseConfig);

      expect(validateEslintConfig(config)).toBeTruthy();
      // Project config should not have OPTIONS_SYMBOL (unlike workspace config)
      expect(OPTIONS_SYMBOL in config).toBeFalsy();
    });
  });

  describe('type parameter handling', () => {
    test('should pass type parameter to TypeScript config', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineProjectConfig(baseConfig, {
        type: 'app',
        typescript: {
          parserOptions: { project: './tsconfig.json' },
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();
    });

    test('should work without type parameter', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineProjectConfig(baseConfig, {
        typescript: {
          parserOptions: { project: './tsconfig.json' },
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();
    });
  });
});
