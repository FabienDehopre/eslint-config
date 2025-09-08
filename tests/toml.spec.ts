/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { FilesOptions, OverridesOptions, StylisticOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { toml } from '../src/configs/toml';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((...configs: unknown[]) => configs),
  },
}));

vi.mock('../src/shared/utils', () => ({
  interopDefault: vi.fn(),
}));

// Mock plugins
const MOCK_TOML_PLUGIN = { name: 'toml-plugin' };
const MOCK_TOML_PARSER = { name: 'toml-parser' };

describe('toml', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock interopDefault to return our mock plugins
    const { interopDefault } = await import('../src/shared/utils');
    vi.mocked(interopDefault)
      .mockResolvedValueOnce(MOCK_TOML_PLUGIN)
      .mockResolvedValueOnce(MOCK_TOML_PARSER);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return correct configuration structure', async () => {
      const result = await toml();

      expect(result).toHaveLength(2);

      const setupConfig = result[0]!;
      expect(setupConfig.name).toBe('fabdeh/toml/setup');
      expect(setupConfig.plugins).toEqual({ toml: MOCK_TOML_PLUGIN });

      const rulesConfig = result[1]!;
      expect(rulesConfig.name).toBe('fabdeh/toml/rules');
      expect(rulesConfig.languageOptions?.parser).toBe(MOCK_TOML_PARSER);
      expect(rulesConfig.files).toEqual(['**/*.toml']);
    });

    test('should include stylistic rules by default', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('toml/array-bracket-newline', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/array-bracket-spacing', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/array-element-newline', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/indent', ['error', 2]);
      expect(rulesConfig.rules).toHaveProperty('toml/inline-table-curly-spacing', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/key-spacing', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/padding-line-between-pairs', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/padding-line-between-tables', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/quoted-keys', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/spaced-comment', 'error');
      expect(rulesConfig.rules).toHaveProperty('toml/table-bracket-spacing', 'error');
    });

    test('should include core TOML rules', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      const expectedRules = {
        '@stylistic/spaced-comment': 'off',
        'toml/comma-style': 'error',
        'toml/keys-order': 'error',
        'toml/no-space-dots': 'error',
        'toml/no-unreadable-number-separator': 'error',
        'toml/precision-of-fractional-seconds': 'error',
        'toml/precision-of-integer': 'error',
        'toml/tables-order': 'error',
        'toml/vue-custom-block/no-parsing-error': 'error',
      };

      for (const [ruleName, ruleConfig] of Object.entries(expectedRules)) {
        expect(rulesConfig.rules).toHaveProperty(ruleName, ruleConfig);
      }
    });

    test('should disable @stylistic/spaced-comment rule', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('@stylistic/spaced-comment', 'off');
    });
  });

  describe('files option', () => {
    test('should use custom files when provided', async () => {
      const options: FilesOptions = { files: ['custom/**/*.toml', '*.config.toml'] };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.files).toEqual(['custom/**/*.toml', '*.config.toml']);
    });

    test('should use default TOML files when not provided', async () => {
      const result = await toml({});
      const rulesConfig = result[1]!;

      expect(rulesConfig.files).toEqual(['**/*.toml']);
    });
  });

  describe('stylistic option', () => {
    test('should exclude stylistic rules when stylistic is false', async () => {
      const options: StylisticOptions = { stylistic: false };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).not.toHaveProperty('toml/array-bracket-newline');
      expect(rulesConfig.rules).not.toHaveProperty('toml/array-bracket-spacing');
      expect(rulesConfig.rules).not.toHaveProperty('toml/indent');
      expect(rulesConfig.rules).not.toHaveProperty('toml/spaced-comment');
    });

    test('should include stylistic rules when stylistic is true', async () => {
      const options: StylisticOptions = { stylistic: true };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('toml/array-bracket-newline');
      expect(rulesConfig.rules).toHaveProperty('toml/indent');
      expect(rulesConfig.rules).toHaveProperty('toml/spaced-comment');
    });

    test('should handle stylistic object with custom indent', async () => {
      const options: StylisticOptions = { stylistic: { indent: 4 } };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('toml/indent', ['error', 4]);
    });

    test('should handle stylistic object with tab indent', async () => {
      const options: StylisticOptions = { stylistic: { indent: 'tab' } };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('toml/indent', ['error', 2]); // tab gets converted to 2
    });

    test('should handle stylistic object with default indent', async () => {
      const options: StylisticOptions = { stylistic: {} };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('toml/indent', ['error', 2]);
    });
  });

  describe('overrides option', () => {
    test('should merge overrides into rules', async () => {
      const options: OverridesOptions = {
        overrides: {
          'toml/keys-order': 'warn',
          'toml/custom-rule': 'error',
        },
      };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('toml/keys-order', 'warn');
      expect(rulesConfig.rules).toHaveProperty('toml/custom-rule', 'error');
    });

    test('should handle empty overrides', async () => {
      const options: OverridesOptions = { overrides: {} };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('toml/keys-order', 'error');
    });
  });

  describe('function behavior', () => {
    test('should call interopDefault with correct imports', async () => {
      const { interopDefault } = await import('../src/shared/utils');

      await toml();

      expect(interopDefault).toHaveBeenCalledTimes(2);
      expect(interopDefault).toHaveBeenNthCalledWith(1, expect.any(Promise));
      expect(interopDefault).toHaveBeenNthCalledWith(2, expect.any(Promise));
    });

    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      await toml();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith(
        {
          name: 'fabdeh/toml/setup',
          plugins: {
            toml: MOCK_TOML_PLUGIN,
          },
        },
        {
          name: 'fabdeh/toml/rules',
          languageOptions: {
            parser: MOCK_TOML_PARSER,
          },
          files: ['**/*.toml'],
          rules: expect.objectContaining({
            'toml/keys-order': 'error',
            'toml/indent': ['error', 2],
            '@stylistic/spaced-comment': 'off',
          }),
        }
      );
    });

    test('should return TypedConfigArray from tseslint.config', async () => {
      const result = await toml();

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
      // Should accept optional parameters
      expect(toml).toHaveLength(0); // Optional parameter

      // Should work with different parameter combinations
      expect(() => toml()).not.toThrow();
      expect(() => toml({})).not.toThrow();
    });
  });

  describe('configuration structure validation', () => {
    test('should have two configurations with proper structure', async () => {
      const result = await toml();

      expect(result).toHaveLength(2);

      // Setup configuration
      const setupConfig = result[0]!;
      expect(setupConfig).toMatchObject({
        name: 'fabdeh/toml/setup',
        plugins: { toml: MOCK_TOML_PLUGIN },
      });

      // Rules configuration
      const rulesConfig = result[1]!;
      expect(rulesConfig).toMatchObject({
        name: 'fabdeh/toml/rules',
        languageOptions: { parser: MOCK_TOML_PARSER },
        files: expect.any(Array),
        rules: expect.any(Object),
      });
    });

    test('should use correct TOML glob pattern by default', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      expect(rulesConfig.files).toEqual(['**/*.toml']);
    });

    test('should have proper plugin configuration', async () => {
      const result = await toml();
      const setupConfig = result[0]!;

      expect(setupConfig.plugins).toHaveProperty('toml');
      expect(setupConfig.plugins!.toml).toStrictEqual(MOCK_TOML_PLUGIN);
    });

    test('should have proper parser configuration', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      expect(rulesConfig.languageOptions?.parser).toBe(MOCK_TOML_PARSER);
    });
  });

  describe('rule configuration validation', () => {
    test('should have rules prefixed with toml/ or @stylistic/', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      const ruleKeys = Object.keys(rulesConfig.rules!);
      for (const ruleKey of ruleKeys) {
        expect(ruleKey).toMatch(/^(toml\/|@stylistic\/)/);
      }
    });

    test('should have proper rule severity levels', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      const rules = rulesConfig.rules!;
      const ruleEntries = Object.entries(rules);

      for (const [, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          expect(ruleConfig[0]).toBe('error');
        } else {
          expect(['error', 'off']).toContain(ruleConfig);
        }
      }
    });

    test('should have comprehensive TOML rule coverage', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      const tomlRules = Object.keys(rulesConfig.rules!).filter((key) =>
        key.startsWith('toml/')
      );

      // Should have a good number of toml rules
      expect(tomlRules.length).toBeGreaterThan(15);
    });

    test('should have rules with proper configurations', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      // Rule with configuration object
      expect(rulesConfig.rules!['toml/indent']).toEqual(['error', 2]);

      // Simple error rules
      expect(rulesConfig.rules!['toml/keys-order']).toBe('error');
      expect(rulesConfig.rules!['toml/comma-style']).toBe('error');

      // Disabled stylistic rule
      expect(rulesConfig.rules!['@stylistic/spaced-comment']).toBe('off');
    });
  });

  describe('plugin integration', () => {
    test('should use eslint-plugin-toml plugin', async () => {
      const result = await toml();
      const setupConfig = result[0]!;

      expect(setupConfig.plugins).toHaveProperty('toml');
      expect(setupConfig.plugins!.toml).toBe(MOCK_TOML_PLUGIN);
    });

    test('should use toml-eslint-parser parser', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      expect(rulesConfig.languageOptions?.parser).toBe(MOCK_TOML_PARSER);
    });
  });

  describe('complex option combinations', () => {
    test('should handle all options together', async () => {
      const options: FilesOptions & OverridesOptions & StylisticOptions = {
        files: ['custom.toml'],
        stylistic: { indent: 8 },
        overrides: { 'toml/keys-order': 'warn' },
      };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.files).toEqual(['custom.toml']);
      expect(rulesConfig.rules).toHaveProperty('toml/indent', ['error', 8]);
      expect(rulesConfig.rules).toHaveProperty('toml/keys-order', 'warn');
    });

    test('should handle stylistic false with overrides', async () => {
      const options: OverridesOptions & StylisticOptions = {
        stylistic: false,
        overrides: { 'toml/indent': ['error', 4] },
      };
      const result = await toml(options);
      const rulesConfig = result[1]!;

      // Stylistic rules should be excluded
      expect(rulesConfig.rules).not.toHaveProperty('toml/array-bracket-newline');
      // But override should still apply
      expect(rulesConfig.rules).toHaveProperty('toml/indent', ['error', 4]);
    });
  });

  describe('specific rule validation', () => {
    test('should configure TOML formatting rules', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules!['toml/comma-style']).toBe('error');
      expect(rulesConfig.rules!['toml/keys-order']).toBe('error');
      expect(rulesConfig.rules!['toml/tables-order']).toBe('error');
    });

    test('should configure TOML validation rules', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules!['toml/no-space-dots']).toBe('error');
      expect(rulesConfig.rules!['toml/no-unreadable-number-separator']).toBe('error');
      expect(rulesConfig.rules!['toml/precision-of-fractional-seconds']).toBe('error');
      expect(rulesConfig.rules!['toml/precision-of-integer']).toBe('error');
    });

    test('should configure Vue custom block rule', async () => {
      const result = await toml();
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules!['toml/vue-custom-block/no-parsing-error']).toBe('error');
    });

    test('should configure stylistic rules when enabled', async () => {
      const result = await toml({ stylistic: true });
      const rulesConfig = result[1]!;

      const stylisticRules = [
        'toml/array-bracket-newline',
        'toml/array-bracket-spacing',
        'toml/array-element-newline',
        'toml/inline-table-curly-spacing',
        'toml/key-spacing',
        'toml/padding-line-between-pairs',
        'toml/padding-line-between-tables',
        'toml/quoted-keys',
        'toml/spaced-comment',
        'toml/table-bracket-spacing',
      ];

      for (const ruleName of stylisticRules) {
        expect(rulesConfig.rules).toHaveProperty(ruleName, 'error');
      }
    });
  });
});
