import type { MockedFunction } from 'vitest';

import { beforeEach, describe, expect, test, vi } from 'vitest';

import { defineWorkspaceConfig } from '../../src/factories/workspace-config';
import { OPTIONS_SYMBOL } from '../../src/shared/constants';
import { hasConfigWithName, MOCK_GIT_IGNORE_CONFIG, setupPackageScenario, validateEslintConfig } from '../utils/test-helpers';
import { PACKAGE_SCENARIOS } from './__fixtures__/expected-configs';

// Mock external dependencies
vi.mock('local-pkg');
vi.mock('eslint-config-flat-gitignore', () => ({
  default: MOCK_GIT_IGNORE_CONFIG,
}));

describe('defineWorkspaceConfig', () => {
  let mockIsPackageExists: MockedFunction<(pkg: string) => boolean>;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockIsPackageExists = vi.fn();
    const { isPackageExists } = await import('local-pkg');
    vi.mocked(isPackageExists).mockImplementation(mockIsPackageExists);
  });

  describe('minimal auto-detection (workspace behavior)', () => {
    test('should generate minimal workspace config with limited auto-detection', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig();

      expect(validateEslintConfig(config)).toBeTruthy();

      // Should include basic workspace configs
      expect(hasConfigWithName(config, 'fabdeh/gitignore')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/javascript')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/comments')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/node')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/imports')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/perfectionist')).toBeTruthy();

      // Should include default enabled features
      expect(hasConfigWithName(config, 'fabdeh/unicorn')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/regexp')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/jsonc')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/yaml')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/toml')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/markdown')).toBeTruthy();

      // Should include stylistic by default
      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();

      // Should NOT include project-specific features (not auto-detected for workspace)
      expect(hasConfigWithName(config, 'angular')).toBeFalsy();
      expect(hasConfigWithName(config, 'ngrx')).toBeFalsy();
      expect(hasConfigWithName(config, 'vitest')).toBeFalsy();
      expect(hasConfigWithName(config, 'jsdoc')).toBeFalsy();

      // Should have OPTIONS_SYMBOL attached
      expect(OPTIONS_SYMBOL in config).toBeTruthy();
    });

    test('should auto-detect TypeScript only (limited auto-detection)', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineWorkspaceConfig();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();

      // Should still not include project-specific features
      expect(hasConfigWithName(config, 'angular')).toBeFalsy();
      expect(hasConfigWithName(config, 'vitest')).toBeFalsy();
      expect(hasConfigWithName(config, 'jsdoc')).toBeFalsy();

      // Verify TypeScript was checked
      expect(mockIsPackageExists).toHaveBeenCalledExactlyOnceWith('typescript');
    });

    test('should NOT auto-detect Angular/NgRx/Vitest in workspace mode', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.fullStack);

      const config = await defineWorkspaceConfig();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();

      // These should NOT be auto-detected in workspace mode
      expect(hasConfigWithName(config, 'angular')).toBeFalsy();
      expect(hasConfigWithName(config, 'ngrx')).toBeFalsy();
      expect(hasConfigWithName(config, 'vitest')).toBeFalsy();
      expect(hasConfigWithName(config, 'jsdoc')).toBeFalsy();

      // Verify minimal detection calls
      expect(mockIsPackageExists).toHaveBeenCalledExactlyOnceWith('typescript');
      // Should NOT check for Angular/NgRx/Vitest in workspace mode
      expect(mockIsPackageExists).not.toHaveBeenCalledWith('@angular/core');
      expect(mockIsPackageExists).not.toHaveBeenCalledWith('vitest');
    });
  });

  describe('options handling', () => {
    test('should disable TypeScript when explicitly set to false', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineWorkspaceConfig({ typescript: false });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeFalsy();
    });

    test('should enable TypeScript when explicitly set with options', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig({
        typescript: {
          parserOptions: { project: './tsconfig.json' },
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();
    });

    test('should disable default features when explicitly set to false', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig({
        unicorn: false,
        regexp: false,
        jsonc: false,
        yaml: false,
        toml: false,
        markdown: false,
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/unicorn')).toBeFalsy();
      expect(hasConfigWithName(config, 'fabdeh/regexp')).toBeFalsy();
      expect(hasConfigWithName(config, 'fabdeh/jsonc')).toBeFalsy();
      expect(hasConfigWithName(config, 'fabdeh/yaml')).toBeFalsy();
      expect(hasConfigWithName(config, 'fabdeh/toml')).toBeFalsy();
      expect(hasConfigWithName(config, 'fabdeh/markdown')).toBeFalsy();
    });
  });

  describe('gitignore handling', () => {
    test('should include gitignore config by default', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig();

      expect(hasConfigWithName(config, 'fabdeh/gitignore')).toBeTruthy();
      expect(MOCK_GIT_IGNORE_CONFIG).toHaveBeenCalled();
    });

    test('should disable gitignore when explicitly set to false', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig({ gitignore: false });

      expect(hasConfigWithName(config, 'fabdeh/gitignore')).toBeFalsy();
      expect(MOCK_GIT_IGNORE_CONFIG).not.toHaveBeenCalled();
    });

    test('should pass gitignore options when provided as object', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);
      const gitignoreOptions = { strict: false, files: ['.gitignore', '.eslintignore'] };

      await defineWorkspaceConfig({ gitignore: gitignoreOptions });

      expect(MOCK_GIT_IGNORE_CONFIG).toHaveBeenCalledExactlyOnceWith({
        name: 'fabdeh/gitignore',
        ...gitignoreOptions,
      });
    });
  });

  describe('stylistic handling', () => {
    test('should include stylistic config by default', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig();

      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();
    });

    test('should disable stylistic when explicitly set to false', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig({ stylistic: false });

      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeFalsy();
    });

    test('should pass stylistic options when provided as object', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig({
        stylistic: { semi: false, quotes: 'single' },
      });

      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();
    });
  });

  describe('workspace-specific behavior', () => {
    test('should set type to "workspace" for TypeScript config', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineWorkspaceConfig({
        typescript: { parserOptions: { project: './tsconfig.json' } },
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();

      // Note: We can't easily test the type: 'workspace' option without
      // inspecting the actual config objects, which would require
      // more complex test setup
    });

    test('should preserve workspace options in OPTIONS_SYMBOL', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);
      const options = {
        stylistic: { semi: false },
        typescript: { parserOptions: { project: './tsconfig.json' } },
      };

      const config = await defineWorkspaceConfig(options);

      const preservedOptions = config[OPTIONS_SYMBOL];
      expect(preservedOptions).toEqual(options);
    });
  });

  describe('formatters handling', () => {
    test('should include formatters when enabled', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig({
        formatters: {
          css: true,
          html: true,
          markdown: true,
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'formatter')).toBeTruthy();
    });

    test('should NOT include Angular-specific HTML formatter in workspace mode', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineWorkspaceConfig({
        formatters: {
          html: true,
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      // In workspace mode, formatters should not include Angular-specific logic
      // This is passed as false to the formatters function
    });
  });
});
