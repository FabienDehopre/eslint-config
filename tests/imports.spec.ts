/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { StylisticOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { imports } from '../src/configs/imports';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((...configs: unknown[]) => configs),
  },
}));

vi.mock('eslint-plugin-import-x', () => {
  return { name: 'import-x-plugin' };
});

describe('imports', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return correct configuration structure', () => {
      const result = imports();

      expect(result).toHaveLength(2);

      const mainConfig = result[0]!;
      expect(mainConfig.name).toBe('fabdeh/imports/rules');
      expect(mainConfig.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
      expect(mainConfig.plugins).toEqual({
        'import-x': expect.objectContaining({ name: 'import-x-plugin' }),
      });

      const tsConfig = result[1]!;
      expect(tsConfig.name).toBe('fabdeh/imports/ts-disables');
      expect(tsConfig.files).toEqual(['**/*.?([cm])ts?(x)']);
    });

    test('should include stylistic rules by default', () => {
      const result = imports();
      const mainConfig = result[0]!;

      expect(mainConfig.rules).toHaveProperty('import-x/newline-after-import');
      expect(mainConfig.rules!['import-x/newline-after-import']).toEqual([
        'error',
        { considerComments: true, count: 1 },
      ]);
    });

    test('should include core import-x rules', () => {
      const result = imports();
      const mainConfig = result[0]!;

      const expectedRules = {
        'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import-x/default': 'error',
        'import-x/export': 'error',
        'import-x/first': 'error',
        'import-x/named': 'error',
        'import-x/no-absolute-path': 'error',
        'import-x/no-deprecated': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/no-empty-named-blocks': 'error',
        'import-x/no-extraneous-dependencies': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-named-as-default': 'warn',
        'import-x/no-named-as-default-member': 'warn',
        'import-x/no-named-default': 'error',
        'import-x/no-self-import': 'error',
        'import-x/no-useless-path-segments': 'error',
        'import-x/no-webpack-loader-syntax': 'error',
      };

      for (const [ruleName, ruleConfig] of Object.entries(expectedRules)) {
        expect(mainConfig.rules).toHaveProperty(ruleName, ruleConfig);
      }
    });

    test('should include TypeScript-specific disables', () => {
      const result = imports();
      const tsConfig = result[1]!;

      expect(tsConfig.rules).toEqual({
        'import-x/named': 'off',
        'import-x/no-deprecated': 'off',
      });
    });
  });

  describe('stylistic option', () => {
    test('should exclude stylistic rules when stylistic is false', () => {
      const options: StylisticOptions = { stylistic: false };
      const result = imports(options);
      const mainConfig = result[0]!;

      expect(mainConfig.rules).not.toHaveProperty('import-x/newline-after-import');
    });

    test('should include stylistic rules when stylistic is true', () => {
      const options: StylisticOptions = { stylistic: true };
      const result = imports(options);
      const mainConfig = result[0]!;

      expect(mainConfig.rules).toHaveProperty('import-x/newline-after-import');
      expect(mainConfig.rules!['import-x/newline-after-import']).toEqual([
        'error',
        { considerComments: true, count: 1 },
      ]);
    });

    test('should include stylistic rules when stylistic is undefined (default)', () => {
      const options: StylisticOptions = {};
      const result = imports(options);
      const mainConfig = result[0]!;

      expect(mainConfig.rules).toHaveProperty('import-x/newline-after-import');
    });
  });

  describe('function behavior', () => {
    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      imports();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith(
        {
          name: 'fabdeh/imports/rules',
          files: ['**/*.?([cm])[jt]s?(x)'],
          plugins: expect.objectContaining({
            'import-x': expect.any(Object),
          }),
          rules: expect.objectContaining({
            'import-x/default': 'error',
            'import-x/export': 'error',
            'import-x/newline-after-import': ['error', { considerComments: true, count: 1 }],
          }),
        },
        {
          name: 'fabdeh/imports/ts-disables',
          files: ['**/*.?([cm])ts?(x)'],
          rules: {
            'import-x/named': 'off',
            'import-x/no-deprecated': 'off',
          },
        }
      );
    });

    test('should return TypedConfigArray from tseslint.config', () => {
      const result = imports();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(2);

      // Each config should have expected structure
      for (const config of result) {
        expect(config).toHaveProperty('name');
        expect(typeof config.name).toBe('string');
        expect(config.name).toMatch(/^fabdeh\//);
      }
    });

    test('should have correct function signature', () => {
      // Should accept optional StylisticOptions parameter
      expect(imports).toHaveLength(0); // Optional parameter

      // Should work with different parameter combinations
      expect(() => imports()).not.toThrow();
      expect(() => imports({})).not.toThrow();
      expect(() => imports({ stylistic: true })).not.toThrow();
      expect(() => imports({ stylistic: false })).not.toThrow();
    });
  });

  describe('configuration structure validation', () => {
    test('should have two configurations with proper structure', () => {
      const result = imports();

      expect(result).toHaveLength(2);

      // Main configuration
      const mainConfig = result[0]!;
      expect(mainConfig).toMatchObject({
        name: 'fabdeh/imports/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: { 'import-x': expect.objectContaining({ name: 'import-x-plugin' }) },
        rules: expect.any(Object),
      });

      // TypeScript-specific configuration
      const tsConfig = result[1]!;
      expect(tsConfig).toMatchObject({
        name: 'fabdeh/imports/ts-disables',
        files: ['**/*.?([cm])ts?(x)'],
        rules: expect.any(Object),
      });
    });

    test('should use correct glob patterns', () => {
      const result = imports();

      const mainConfig = result[0]!;
      expect(mainConfig.files).toEqual(['**/*.?([cm])[jt]s?(x)']); // GLOB_SRC

      const tsConfig = result[1]!;
      expect(tsConfig.files).toEqual(['**/*.?([cm])ts?(x)']); // GLOB_TS
    });

    test('should have proper plugin configuration', () => {
      const result = imports();
      const mainConfig = result[0]!;

      expect(mainConfig.plugins).toHaveProperty('import-x');
      expect(mainConfig.plugins!['import-x']).toMatchObject({ name: 'import-x-plugin' });
    });
  });

  describe('rule configuration validation', () => {
    test('should have proper rule severity levels', () => {
      const result = imports();
      const mainConfig = result[0]!;

      const rules = mainConfig.rules!;
      const ruleEntries = Object.entries(rules);

      for (const [ruleName, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          expect(['error', 'warn', 'off']).toContain(ruleConfig[0]);
        } else {
          expect(['error', 'warn', 'off']).toContain(ruleConfig);
        }
        expect(ruleName).toMatch(/^import-x\//);
      }
    });

    test('should have warning level rules for specific cases', () => {
      const result = imports();
      const mainConfig = result[0]!;

      expect(mainConfig.rules!['import-x/no-named-as-default']).toBe('warn');
      expect(mainConfig.rules!['import-x/no-named-as-default-member']).toBe('warn');
    });

    test('should have rules with configuration objects', () => {
      const result = imports();
      const mainConfig = result[0]!;

      expect(mainConfig.rules!['import-x/consistent-type-specifier-style']).toEqual([
        'error',
        'prefer-top-level',
      ]);

      // When stylistic is enabled
      expect(mainConfig.rules!['import-x/newline-after-import']).toEqual([
        'error',
        { considerComments: true, count: 1 },
      ]);
    });

    test('should disable specific rules for TypeScript files', () => {
      const result = imports();
      const tsConfig = result[1]!;

      expect(tsConfig.rules!['import-x/named']).toBe('off');
      expect(tsConfig.rules!['import-x/no-deprecated']).toBe('off');
    });
  });

  describe('plugin integration', () => {
    test('should use eslint-plugin-import-x plugin', () => {
      const result = imports();
      const mainConfig = result[0]!;

      expect(mainConfig.plugins).toHaveProperty('import-x');
      expect(mainConfig.plugins!['import-x']).toMatchObject({ name: 'import-x-plugin' });
    });

    test('should have all rules prefixed with import-x', () => {
      const result = imports();
      const mainConfig = result[0]!;
      const tsConfig = result[1]!;

      const allRuleKeys = [
        ...Object.keys(mainConfig.rules!),
        ...Object.keys(tsConfig.rules!),
      ];

      for (const ruleKey of allRuleKeys) {
        expect(ruleKey).toMatch(/^import-x\//);
      }
    });

    test('should have comprehensive rule coverage', () => {
      const result = imports();
      const mainConfig = result[0]!;

      const importXRules = Object.keys(mainConfig.rules!).filter((key) =>
        key.startsWith('import-x/')
      );

      // Should have a good number of import-x rules
      expect(importXRules.length).toBeGreaterThan(15);
    });
  });
});
