import type { MockedFunction } from 'vitest';

import { beforeEach, describe, expect, test, vi } from 'vitest';

import { defineConfig } from '../../src/factories/standard-config';
import { hasConfigWithName, MOCK_GIT_IGNORE_CONFIG, setupPackageScenario, validateEslintConfig } from '../utils/test-helpers';
import { PACKAGE_SCENARIOS } from './__fixtures__/expected-configs';

// Mock external dependencies
vi.mock('local-pkg');
vi.mock('eslint-config-flat-gitignore', () => ({
  default: MOCK_GIT_IGNORE_CONFIG,
}));

describe('defineConfig', () => {
  let mockIsPackageExists: MockedFunction<(pkg: string) => boolean>;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockIsPackageExists = vi.fn();
    const { isPackageExists } = await import('local-pkg');
    vi.mocked(isPackageExists).mockImplementation(mockIsPackageExists);
  });

  describe('auto-detection', () => {
    test('should generate basic config when no packages are detected', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineConfig();

      expect(validateEslintConfig(config)).toBeTruthy();

      // Should include basic configs
      expect(hasConfigWithName(config, 'fabdeh/gitignore')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/javascript')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/comments')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/node')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/imports')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/perfectionist')).toBeTruthy();

      // Should include default enabled features
      expect(hasConfigWithName(config, 'fabdeh/unicorn')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/jsdoc')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/regexp')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/jsonc')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/yaml')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/toml')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/markdown')).toBeTruthy();

      // Should include stylistic by default (not auto-detected)
      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();

      // Should NOT include auto-detected configs
      expect(hasConfigWithName(config, 'typescript')).toBeFalsy();
      expect(hasConfigWithName(config, 'angular')).toBeFalsy();
      expect(hasConfigWithName(config, 'ngrx')).toBeFalsy();
      expect(hasConfigWithName(config, 'vitest')).toBeFalsy();
    });

    test('should auto-detect and include TypeScript config', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineConfig();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();

      // Verify isPackageExists was called with 'typescript'
      expect(mockIsPackageExists).toHaveBeenCalledWith('typescript');
    });

    test('should auto-detect and include Angular config', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularBasic);

      const config = await defineConfig();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();

      // Verify isPackageExists was called with '@angular/core'
      expect(mockIsPackageExists).toHaveBeenCalledWith('@angular/core');
    });

    test('should auto-detect and include NgRx config when Angular is present', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.angularWithNgrx);

      const config = await defineConfig();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();
      expect(hasConfigWithName(config, 'ngrx')).toBeTruthy();

      // Verify isPackageExists was called with NgRx packages
      expect(mockIsPackageExists).toHaveBeenCalledWith('@ngrx/store');
    });

    test('should auto-detect and include Vitest config', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.vitestOnly);

      const config = await defineConfig();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'vitest')).toBeTruthy();

      // Verify isPackageExists was called with 'vitest'
      expect(mockIsPackageExists).toHaveBeenCalledWith('vitest');
    });

    test('should include all auto-detected configs in full stack scenario', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.fullStack);

      const config = await defineConfig();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeTruthy();
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();
      expect(hasConfigWithName(config, 'ngrx')).toBeTruthy();
      expect(hasConfigWithName(config, 'vitest')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();
    });
  });

  describe('error handling', () => {
    test('should throw error when NgRx is detected without Angular', async () => {
      // Setup scenario where NgRx is present but Angular is not
      setupPackageScenario(mockIsPackageExists, {
        '@ngrx/store': true,
        '@angular/core': false,
      });

      await expect(defineConfig()).rejects.toThrow(
        'NgRx rules can only be enabled if Angular rules are also enabled.'
      );
    });

    test('should throw error when NgRx is explicitly enabled without Angular', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      await expect(defineConfig({
        angular: false,
        ngrx: true,
      })).rejects.toThrow(
        'NgRx rules can only be enabled if Angular rules are also enabled.'
      );
    });
  });

  describe('explicit options override auto-detection', () => {
    test('should disable TypeScript even when detected', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineConfig({ typescript: false });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'typescript')).toBeFalsy();
      // Stylistic is still included by default unless explicitly disabled
      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();
    });

    test('should enable Angular even when not detected', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineConfig({ angular: true });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'angular')).toBeTruthy();
    });

    test('should disable default features when explicitly set to false', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineConfig({
        unicorn: false,
        jsdoc: false,
        regexp: false,
        jsonc: false,
        yaml: false,
        toml: false,
        markdown: false,
      });

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/unicorn')).toBeFalsy();
      expect(hasConfigWithName(config, 'fabdeh/jsdoc')).toBeFalsy();
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

      const config = await defineConfig();

      expect(hasConfigWithName(config, 'fabdeh/gitignore')).toBeTruthy();
      expect(MOCK_GIT_IGNORE_CONFIG).toHaveBeenCalled();
    });

    test('should disable gitignore when explicitly set to false', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineConfig({ gitignore: false });

      expect(hasConfigWithName(config, 'fabdeh/gitignore')).toBeFalsy();
      expect(MOCK_GIT_IGNORE_CONFIG).not.toHaveBeenCalled();
    });

    test('should pass gitignore options when provided as object', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);
      const gitignoreOptions = { strict: false, files: ['.gitignore', '.eslintignore'] };

      await defineConfig({ gitignore: gitignoreOptions });

      expect(MOCK_GIT_IGNORE_CONFIG).toHaveBeenCalledWith({
        name: 'fabdeh/gitignore',
        ...gitignoreOptions,
      });
    });
  });

  describe('stylistic handling', () => {
    test('should include stylistic config by default regardless of TypeScript detection', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.noPackages);

      const config = await defineConfig();

      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();
    });

    test('should include stylistic config when TypeScript is detected', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineConfig();

      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeTruthy();
    });

    test('should disable stylistic when explicitly set to false', async () => {
      setupPackageScenario(mockIsPackageExists, PACKAGE_SCENARIOS.typescriptOnly);

      const config = await defineConfig({ stylistic: false });

      expect(hasConfigWithName(config, 'fabdeh/stylistic')).toBeFalsy();
    });
  });
});
