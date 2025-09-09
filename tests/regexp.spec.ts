/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { OverridesOptions, RegExpOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { regexp } from '../src/configs/regexp';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((config: unknown) => [config]),
  },
}));

// Mock eslint-plugin-regexp with its configs
const MOCK_REGEXP_PLUGIN = { name: 'regexp-plugin' };
vi.mock('eslint-plugin-regexp', () => ({
  configs: {
    'flat/recommended': {
      plugins: { regexp: { name: 'regexp-plugin' } },
      rules: {
        'regexp/confusing-quantifier': 'error',
        'regexp/control-character-escape': 'error',
        'regexp/hexadecimal-escape': ['error', 'always'],
        'regexp/letter-case': ['error', { caseInsensitive: 'lowercase', unicodeFlag: 'ignore' }],
        'regexp/match-any': 'error',
        'regexp/negation': 'error',
        'regexp/no-assertion-capturing-group': 'error',
        'regexp/no-control-character': 'error',
        'regexp/no-dupe-characters-character-class': 'error',
        'regexp/no-dupe-disjunctions': 'error',
        'regexp/no-empty-alternative': 'error',
        'regexp/no-empty-capturing-group': 'error',
        'regexp/no-empty-character-class': 'error',
        'regexp/no-empty-group': 'error',
        'regexp/no-empty-lookarounds-assertion': 'error',
        'regexp/no-escape-backspace': 'error',
        'regexp/no-invalid-regexp': 'error',
        'regexp/no-invisible-character': 'error',
        'regexp/no-legacy-features': 'error',
        'regexp/no-misleading-capturing-group': 'error',
        'regexp/no-misleading-unicode-character': 'error',
        'regexp/no-missing-g-flag': 'error',
        'regexp/no-non-standard-flag': 'error',
        'regexp/no-obscure-range': 'error',
        'regexp/no-octal': 'error',
        'regexp/no-optional-assertion': 'error',
        'regexp/no-potentially-useless-backreference': 'error',
        'regexp/no-super-linear-backtracking': 'error',
        'regexp/no-trivially-nested-assertion': 'error',
        'regexp/no-trivially-nested-quantifier': 'error',
        'regexp/no-unused-capturing-group': 'error',
        'regexp/no-useless-assertions': 'error',
        'regexp/no-useless-backreference': 'error',
        'regexp/no-useless-character-class': 'error',
        'regexp/no-useless-dollar-replacements': 'error',
        'regexp/no-useless-escape': 'error',
        'regexp/no-useless-flag': 'error',
        'regexp/no-useless-lazy': 'error',
        'regexp/no-useless-non-capturing-group': 'error',
        'regexp/no-useless-quantifier': 'error',
        'regexp/no-useless-range': 'error',
        'regexp/no-useless-set-operand': 'error',
        'regexp/no-useless-string-literal': 'error',
        'regexp/no-useless-two-nums-quantifier': 'error',
        'regexp/no-zero-quantifier': 'error',
        'regexp/optimal-lookaround-quantifier': 'error',
        'regexp/optimal-quantifier-concatenation': 'error',
        'regexp/prefer-escape-replacement-dollar-char': 'error',
        'regexp/prefer-predefined-assertion': 'error',
        'regexp/prefer-quantifier': 'error',
        'regexp/prefer-range': 'error',
        'regexp/prefer-regexp-exec': 'error',
        'regexp/prefer-regexp-test': 'error',
        'regexp/prefer-set-operation': 'error',
        'regexp/prefer-unicode-codepoint-escapes': 'error',
        'regexp/require-unicode-regexp': 'error',
        'regexp/simplify-set-operations': 'error',
        'regexp/sort-alternatives': 'error',
        'regexp/strict': 'error',
        'regexp/unicode-escape': 'error',
        'regexp/use-ignore-case': 'error',
      },
    },
  },
}));

describe('regexp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return correct configuration structure', () => {
      const result = regexp();

      expect(result).toHaveLength(1);

      const config = result[0]!;
      expect(config.name).toBe('fabdeh/regexp/rules');
      expect(config.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
      expect(config.plugins).toEqual({ regexp: MOCK_REGEXP_PLUGIN });
    });

    test('should include recommended rules with default severity', () => {
      const result = regexp();
      const config = result[0]!;

      // Should include all recommended rules
      expect(config.rules).toHaveProperty('regexp/confusing-quantifier', 'error');
      expect(config.rules).toHaveProperty('regexp/control-character-escape', 'error');
      expect(config.rules).toHaveProperty('regexp/no-invalid-regexp', 'error');
      expect(config.rules).toHaveProperty('regexp/prefer-regexp-test', 'error');
    });

    test('should preserve rule configurations from recommended config', () => {
      const result = regexp();
      const config = result[0]!;

      // Rules with configuration objects should be preserved
      expect(config.rules!['regexp/hexadecimal-escape']).toEqual(['error', 'always']);
      expect(config.rules!['regexp/letter-case']).toEqual([
        'error',
        { caseInsensitive: 'lowercase', unicodeFlag: 'ignore' },
      ]);
    });

    test('should include comprehensive rule coverage', () => {
      const result = regexp();
      const config = result[0]!;

      const regexpRules = Object.keys(config.rules!).filter((key) =>
        key.startsWith('regexp/')
      );

      // Should have a significant number of regexp rules
      expect(regexpRules.length).toBeGreaterThan(50);
    });
  });

  describe('level option', () => {
    test('should override rule levels to warn when level is warn', () => {
      const options: RegExpOptions = { level: 'warn' };
      const result = regexp(options);
      const config = result[0]!;

      // Simple error rules should be changed to warn
      expect(config.rules!['regexp/confusing-quantifier']).toBe('warn');
      expect(config.rules!['regexp/control-character-escape']).toBe('warn');
      expect(config.rules!['regexp/no-invalid-regexp']).toBe('warn');
    });

    test('should keep original levels when level is not warn', () => {
      const options: RegExpOptions = { level: 'error' };
      const result = regexp(options);
      const config = result[0]!;

      expect(config.rules!['regexp/confusing-quantifier']).toBe('error');
      expect(config.rules!['regexp/hexadecimal-escape']).toEqual(['error', 'always']);
    });

    test('should handle undefined level (default behavior)', () => {
      const options: RegExpOptions = {};
      const result = regexp(options);
      const config = result[0]!;

      expect(config.rules!['regexp/confusing-quantifier']).toBe('error');
      expect(config.rules!['regexp/hexadecimal-escape']).toEqual(['error', 'always']);
    });
  });

  describe('overrides option', () => {
    test('should merge overrides into rules', () => {
      const options: OverridesOptions = {
        overrides: {
          'regexp/confusing-quantifier': 'off',
          'regexp/custom-rule': 'warn',
          'regexp/letter-case': 'off',
        },
      };
      const result = regexp(options);
      const config = result[0]!;

      expect(config.rules!['regexp/confusing-quantifier']).toBe('off');
      expect(config.rules!['regexp/custom-rule']).toBe('warn');
      expect(config.rules!['regexp/letter-case']).toBe('off');
    });

    test('should handle empty overrides', () => {
      const options: OverridesOptions = { overrides: {} };
      const result = regexp(options);
      const config = result[0]!;

      expect(config.rules!['regexp/confusing-quantifier']).toBe('error');
    });
  });

  describe('combined options', () => {
    test('should handle level and overrides together', () => {
      const options: OverridesOptions & RegExpOptions = {
        level: 'warn',
        overrides: {
          'regexp/confusing-quantifier': 'off',
        },
      };
      const result = regexp(options);
      const config = result[0]!;

      // Level should affect other rules
      expect(config.rules!['regexp/control-character-escape']).toBe('warn');
      // Override should take precedence
      expect(config.rules!['regexp/confusing-quantifier']).toBe('off');
    });
  });

  describe('function behavior', () => {
    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      regexp();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith({
        name: 'fabdeh/regexp/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: {
          regexp: MOCK_REGEXP_PLUGIN,
        },
        rules: expect.objectContaining({
          'regexp/confusing-quantifier': 'error',
          'regexp/no-invalid-regexp': 'error',
        }),
      });
    });

    test('should return TypedConfigArray from tseslint.config', () => {
      const result = regexp();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);

      // Each config should have expected structure
      for (const config of result) {
        expect(config).toHaveProperty('name');
        expect(typeof config.name).toBe('string');
        expect(config.name).toMatch(/^fabdeh\//);
      }
    });

    test('should have correct function signature', () => {
      // Should accept optional parameters
      expect(regexp).toHaveLength(0); // Optional parameter

      // Should work with different parameter combinations
      expect(() => regexp()).not.toThrow();
      expect(() => regexp({})).not.toThrow();
      expect(() => regexp({ level: 'warn' })).not.toThrow();
      expect(() => regexp({ overrides: {} })).not.toThrow();
    });
  });

  describe('configuration structure validation', () => {
    test('should have exactly one configuration object', () => {
      const result = regexp();

      expect(result).toHaveLength(1);
      expect(result[0]).toBeDefined();
    });

    test('should have proper config structure', () => {
      const result = regexp();
      const config = result[0]!;

      expect(config).toMatchObject({
        name: 'fabdeh/regexp/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: expect.any(Object),
        rules: expect.any(Object),
      });

      expect(Object.keys(config)).toEqual(['name', 'files', 'plugins', 'rules']);
    });

    test('should use GLOB_SRC pattern', () => {
      const result = regexp();
      const config = result[0]!;

      expect(config.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
    });

    test('should have proper config name format', () => {
      const result = regexp();
      const config = result[0]!;

      expect(config.name).toBe('fabdeh/regexp/rules');
      expect(config.name).toMatch(/^fabdeh\/[a-z-]+\/rules$/);
    });
  });

  describe('rule configuration validation', () => {
    test('should have all rules prefixed with regexp/', () => {
      const result = regexp();
      const config = result[0]!;

      const ruleKeys = Object.keys(config.rules!);
      for (const ruleKey of ruleKeys) {
        expect(ruleKey).toMatch(/^regexp\//);
      }
    });

    test('should have proper rule severity levels by default', () => {
      const result = regexp();
      const config = result[0]!;

      const rules = config.rules!;
      const ruleEntries = Object.entries(rules);

      for (const [, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          expect(ruleConfig[0]).toBe('error');
        } else {
          expect(ruleConfig).toBe('error');
        }
      }
    });

    test('should preserve plugin configuration from recommended config', () => {
      const result = regexp();
      const config = result[0]!;

      expect(config.plugins).toEqual({ regexp: MOCK_REGEXP_PLUGIN });
    });
  });

  describe('plugin integration', () => {
    test('should use eslint-plugin-regexp plugin from recommended config', () => {
      const result = regexp();
      const config = result[0]!;

      expect(config.plugins).toHaveProperty('regexp');
      expect(config.plugins!.regexp).toStrictEqual(MOCK_REGEXP_PLUGIN);
    });

    test('should target source files only', () => {
      const result = regexp();
      const config = result[0]!;

      expect(config.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
    });
  });

  describe('recommended config integration', () => {
    test('should use rules from eslint-plugin-regexp flat/recommended config', async () => {
      const { configs } = await import('eslint-plugin-regexp');
      const result = regexp();
      const config = result[0]!;

      // Should have the same number of rules as the recommended config
      expect(Object.keys(config.rules!)).toHaveLength(Object.keys(configs['flat/recommended'].rules).length);

      // Should include specific recommended rules
      const expectedRules = [
        'regexp/confusing-quantifier',
        'regexp/control-character-escape',
        'regexp/no-invalid-regexp',
        'regexp/prefer-regexp-test',
        'regexp/unicode-escape',
        'regexp/use-ignore-case',
      ];

      for (const ruleName of expectedRules) {
        expect(config.rules).toHaveProperty(ruleName);
      }
    });

    test('should preserve complex rule configurations', () => {
      const result = regexp();
      const config = result[0]!;

      // Complex configurations should be preserved exactly
      expect(config.rules!['regexp/letter-case']).toEqual([
        'error',
        { caseInsensitive: 'lowercase', unicodeFlag: 'ignore' },
      ]);
    });
  });

  describe('level transformation', () => {
    test('should correctly transform simple rule configurations', () => {
      const options: RegExpOptions = { level: 'warn' };
      const result = regexp(options);
      const config = result[0]!;

      // Simple error rules should be changed to warn
      expect(config.rules!['regexp/confusing-quantifier']).toBe('warn');
      expect(config.rules!['regexp/control-character-escape']).toBe('warn');
    });
  });
});
