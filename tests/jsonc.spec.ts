/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { FilesOptions, OverridesOptions, StylisticOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { jsonc } from '../src/configs/jsonc';

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
const MOCK_JSONC_PLUGIN = { name: 'jsonc-plugin' };
const MOCK_JSONC_PARSER = { name: 'jsonc-parser' };

describe('jsonc', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock interopDefault to return our mock plugins
    const { interopDefault } = await import('../src/shared/utils');
    vi.mocked(interopDefault)
      .mockResolvedValueOnce(MOCK_JSONC_PLUGIN)
      .mockResolvedValueOnce(MOCK_JSONC_PARSER);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return correct configuration structure', async () => {
      const result = await jsonc();

      expect(result).toHaveLength(2);

      const setupConfig = result[0]!;
      expect(setupConfig.name).toBe('fabdeh/jsonc/setup');
      expect(setupConfig.plugins).toEqual({ jsonc: MOCK_JSONC_PLUGIN });

      const rulesConfig = result[1]!;
      expect(rulesConfig.name).toBe('fabdeh/jsonc/rules');
      expect(rulesConfig.languageOptions?.parser).toBe(MOCK_JSONC_PARSER);
      expect(rulesConfig.files).toEqual(['**/*.json', '**/*.json5', '**/*.jsonc']);
    });

    test('should include stylistic rules by default', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('jsonc/array-bracket-spacing', ['error', 'never']);
      expect(rulesConfig.rules).toHaveProperty('jsonc/comma-dangle', ['error', 'never']);
      expect(rulesConfig.rules).toHaveProperty('jsonc/comma-style', ['error', 'last']);
      expect(rulesConfig.rules).toHaveProperty('jsonc/indent', ['error', 2]);
      expect(rulesConfig.rules).toHaveProperty('jsonc/key-spacing', ['error', { afterColon: true, beforeColon: false }]);
      expect(rulesConfig.rules).toHaveProperty('jsonc/object-curly-newline', ['error', { consistent: true, multiline: true }]);
      expect(rulesConfig.rules).toHaveProperty('jsonc/object-curly-spacing', ['error', 'always']);
      expect(rulesConfig.rules).toHaveProperty('jsonc/object-property-newline', ['error', { allowMultiplePropertiesPerLine: true }]);
      expect(rulesConfig.rules).toHaveProperty('jsonc/quote-props', 'error');
      expect(rulesConfig.rules).toHaveProperty('jsonc/quotes', 'error');
    });

    test('should include core JSONC rules', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      const expectedRules = {
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/space-unary-ops': 'error',
        'jsonc/valid-json-number': 'error',
        'jsonc/vue-custom-block/no-parsing-error': 'error',
      };

      for (const [ruleName, ruleConfig] of Object.entries(expectedRules)) {
        expect(rulesConfig.rules).toHaveProperty(ruleName, ruleConfig);
      }
    });
  });

  describe('files option', () => {
    test('should use custom files when provided', async () => {
      const options: FilesOptions = { files: ['custom/**/*.json', '*.config.json'] };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.files).toEqual(['custom/**/*.json', '*.config.json']);
    });

    test('should use default files when not provided', async () => {
      const result = await jsonc({});
      const rulesConfig = result[1]!;

      expect(rulesConfig.files).toEqual(['**/*.json', '**/*.json5', '**/*.jsonc']);
    });
  });

  describe('stylistic option', () => {
    test('should exclude stylistic rules when stylistic is false', async () => {
      const options: StylisticOptions = { stylistic: false };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).not.toHaveProperty('jsonc/array-bracket-spacing');
      expect(rulesConfig.rules).not.toHaveProperty('jsonc/comma-dangle');
      expect(rulesConfig.rules).not.toHaveProperty('jsonc/indent');
      expect(rulesConfig.rules).not.toHaveProperty('jsonc/object-curly-spacing');
    });

    test('should include stylistic rules when stylistic is true', async () => {
      const options: StylisticOptions = { stylistic: true };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('jsonc/array-bracket-spacing');
      expect(rulesConfig.rules).toHaveProperty('jsonc/comma-dangle');
      expect(rulesConfig.rules).toHaveProperty('jsonc/indent');
    });

    test('should handle stylistic object with custom indent', async () => {
      const options: StylisticOptions = { stylistic: { indent: 4 } };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('jsonc/indent', ['error', 4]);
    });

    test('should handle stylistic object with default indent', async () => {
      const options: StylisticOptions = { stylistic: {} };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('jsonc/indent', ['error', 2]);
    });
  });

  describe('overrides option', () => {
    test('should merge overrides into rules', async () => {
      const options: OverridesOptions = {
        overrides: {
          'jsonc/no-dupe-keys': 'warn',
          'jsonc/custom-rule': 'error',
        },
      };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('jsonc/no-dupe-keys', 'warn');
      expect(rulesConfig.rules).toHaveProperty('jsonc/custom-rule', 'error');
    });

    test('should handle empty overrides', async () => {
      const options: OverridesOptions = { overrides: {} };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('jsonc/no-dupe-keys', 'error');
    });
  });

  describe('function behavior', () => {
    test('should call interopDefault with correct imports', async () => {
      const { interopDefault } = await import('../src/shared/utils');

      await jsonc();

      expect(interopDefault).toHaveBeenCalledTimes(2);
      expect(interopDefault).toHaveBeenNthCalledWith(1, expect.any(Promise));
      expect(interopDefault).toHaveBeenNthCalledWith(2, expect.any(Promise));
    });

    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      await jsonc();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith(
        {
          name: 'fabdeh/jsonc/setup',
          plugins: {
            jsonc: MOCK_JSONC_PLUGIN,
          },
        },
        {
          name: 'fabdeh/jsonc/rules',
          languageOptions: {
            parser: MOCK_JSONC_PARSER,
          },
          files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
          rules: expect.objectContaining({
            'jsonc/no-dupe-keys': 'error',
            'jsonc/indent': ['error', 2],
          }),
        }
      );
    });

    test('should return TypedConfigArray from tseslint.config', async () => {
      const result = await jsonc();

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
      expect(jsonc).toHaveLength(0); // Optional parameter

      // Should work with different parameter combinations
      expect(() => jsonc()).not.toThrow();
      expect(() => jsonc({})).not.toThrow();
    });
  });

  describe('configuration structure validation', () => {
    test('should have two configurations with proper structure', async () => {
      const result = await jsonc();

      expect(result).toHaveLength(2);

      // Setup configuration
      const setupConfig = result[0]!;
      expect(setupConfig).toMatchObject({
        name: 'fabdeh/jsonc/setup',
        plugins: { jsonc: MOCK_JSONC_PLUGIN },
      });

      // Rules configuration
      const rulesConfig = result[1]!;
      expect(rulesConfig).toMatchObject({
        name: 'fabdeh/jsonc/rules',
        languageOptions: { parser: MOCK_JSONC_PARSER },
        files: expect.any(Array),
        rules: expect.any(Object),
      });
    });

    test('should use correct glob patterns by default', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      expect(rulesConfig.files).toEqual(['**/*.json', '**/*.json5', '**/*.jsonc']);
    });

    test('should have proper plugin configuration', async () => {
      const result = await jsonc();
      const setupConfig = result[0]!;

      expect(setupConfig.plugins).toHaveProperty('jsonc');
      expect(setupConfig.plugins!.jsonc).toStrictEqual(MOCK_JSONC_PLUGIN);
    });

    test('should have proper parser configuration', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      expect(rulesConfig.languageOptions?.parser).toBe(MOCK_JSONC_PARSER);
    });
  });

  describe('rule configuration validation', () => {
    test('should have all rules prefixed with jsonc', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      const ruleKeys = Object.keys(rulesConfig.rules!);
      for (const ruleKey of ruleKeys) {
        expect(ruleKey).toMatch(/^jsonc\//);
      }
    });

    test('should have proper rule severity levels', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      const rules = rulesConfig.rules!;
      const ruleEntries = Object.entries(rules);

      for (const [, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          expect(ruleConfig[0]).toBe('error');
        } else {
          expect(ruleConfig).toBe('error');
        }
      }
    });

    test('should have comprehensive rule coverage', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      const jsoncRules = Object.keys(rulesConfig.rules!).filter((key) =>
        key.startsWith('jsonc/')
      );

      // Should have a good number of jsonc rules
      expect(jsoncRules.length).toBeGreaterThan(25);
    });

    test('should have rules with configuration objects', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      // Rules with configuration objects
      expect(rulesConfig.rules!['jsonc/array-bracket-spacing']).toEqual(['error', 'never']);
      expect(rulesConfig.rules!['jsonc/comma-dangle']).toEqual(['error', 'never']);
      expect(rulesConfig.rules!['jsonc/indent']).toEqual(['error', 2]);
      expect(rulesConfig.rules!['jsonc/key-spacing']).toEqual(['error', { afterColon: true, beforeColon: false }]);

      // Simple error rules
      expect(rulesConfig.rules!['jsonc/no-dupe-keys']).toBe('error');
      expect(rulesConfig.rules!['jsonc/valid-json-number']).toBe('error');
    });
  });

  describe('plugin integration', () => {
    test('should use eslint-plugin-jsonc plugin', async () => {
      const result = await jsonc();
      const setupConfig = result[0]!;

      expect(setupConfig.plugins).toHaveProperty('jsonc');
      expect(setupConfig.plugins!.jsonc).toBe(MOCK_JSONC_PLUGIN);
    });

    test('should use jsonc-eslint-parser parser', async () => {
      const result = await jsonc();
      const rulesConfig = result[1]!;

      expect(rulesConfig.languageOptions?.parser).toBe(MOCK_JSONC_PARSER);
    });
  });

  describe('complex option combinations', () => {
    test('should handle all options together', async () => {
      const options: FilesOptions & OverridesOptions & StylisticOptions = {
        files: ['custom.json'],
        stylistic: { indent: 'tab' },
        overrides: { 'jsonc/no-dupe-keys': 'warn' },
      };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.files).toEqual(['custom.json']);
      expect(rulesConfig.rules).toHaveProperty('jsonc/indent', ['error', 'tab']);
      expect(rulesConfig.rules).toHaveProperty('jsonc/no-dupe-keys', 'warn');
    });

    test('should handle numeric indent in stylistic object', async () => {
      const options: StylisticOptions = { stylistic: { indent: 8 } };
      const result = await jsonc(options);
      const rulesConfig = result[1]!;

      expect(rulesConfig.rules).toHaveProperty('jsonc/indent', ['error', 8]);
    });
  });
});
