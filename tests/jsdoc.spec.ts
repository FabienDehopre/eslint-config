import type { TSESLint } from '@typescript-eslint/utils';
import type { StylisticOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { getJsDocRules, jsdoc } from '../src/configs/jsdoc';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((...configs: unknown[]) => configs),
  },
}));

vi.mock('eslint-plugin-jsdoc', () => ({
  default: { name: 'jsdoc-plugin' },
}));

// Mock jsdoc plugin
const MOCK_JSDOC_PLUGIN = { name: 'jsdoc-plugin' };

describe('jsdoc', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('jsdoc factory function', () => {
    describe('default options', () => {
      test('should return correct configuration structure', () => {
        const result = jsdoc();

        expect(result).toHaveLength(2);

        const jsConfig = result.at(0);
        expect(jsConfig?.name).toBe('fabdeh/jsdoc/rules');
        expect(jsConfig?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
        expect(jsConfig?.plugins).toEqual({ jsdoc: MOCK_JSDOC_PLUGIN });

        const tsConfig = result.at(1);
        expect(tsConfig?.name).toBe('fabdeh/jsdoc/ts-only/rules');
        expect(tsConfig?.files).toEqual(['**/*.?([cm])ts?(x)']);
      });

      test('should include stylistic rules by default', () => {
        const result = jsdoc();
        const jsConfig = result.at(0);

        expect(jsConfig?.rules).toHaveProperty('jsdoc/check-alignment', 'warn');
        expect(jsConfig?.rules).toHaveProperty('jsdoc/multiline-blocks', 'warn');
        expect(jsConfig?.rules).toHaveProperty('jsdoc/no-multi-asterisks', 'warn');
        expect(jsConfig?.rules).toHaveProperty('jsdoc/require-asterisk-prefix', 'warn');
        expect(jsConfig?.rules).toHaveProperty('jsdoc/require-hyphen-before-param-description', 'warn');
        expect(jsConfig?.rules).toHaveProperty('jsdoc/tag-lines', ['warn', 'never', { startLines: 1 }]);
      });

      test('should include JS-only rules in first config', () => {
        const result = jsdoc();
        const jsConfig = result.at(0);

        const expectedJSRules = [
          'jsdoc/check-access',
          'jsdoc/check-param-names',
          'jsdoc/check-property-names',
          'jsdoc/check-tag-names',
          'jsdoc/check-types',
          'jsdoc/check-values',
          'jsdoc/empty-tags',
          'jsdoc/implements-on-classes',
          'jsdoc/no-defaults',
          'jsdoc/no-undefined-types',
          'jsdoc/require-jsdoc',
          'jsdoc/require-param',
          'jsdoc/require-param-description',
          'jsdoc/require-param-name',
          'jsdoc/require-param-type',
          'jsdoc/require-property',
          'jsdoc/require-property-description',
          'jsdoc/require-property-name',
          'jsdoc/require-property-type',
          'jsdoc/require-returns',
          'jsdoc/require-returns-check',
          'jsdoc/require-returns-description',
          'jsdoc/require-returns-type',
          'jsdoc/require-yields',
          'jsdoc/require-yields-check',
          'jsdoc/valid-types',
        ];

        for (const ruleName of expectedJSRules) {
          expect(jsConfig?.rules).toHaveProperty(ruleName, 'warn');
        }
      });

      test('should include TS-only rules in second config', () => {
        const result = jsdoc();
        const tsConfig = result.at(1);

        expect(tsConfig?.rules).toHaveProperty('jsdoc/check-tag-names', ['warn', { typed: true }]);
        expect(tsConfig?.rules).toHaveProperty('jsdoc/no-types', 'warn');
        expect(tsConfig?.rules).toHaveProperty('jsdoc/no-undefined-types', 'off');
        expect(tsConfig?.rules).toHaveProperty('jsdoc/require-param-type', 'off');
        expect(tsConfig?.rules).toHaveProperty('jsdoc/require-property-type', 'off');
        expect(tsConfig?.rules).toHaveProperty('jsdoc/require-returns-type', 'off');
      });
    });

    describe('stylistic option', () => {
      test('should exclude stylistic rules when stylistic is false', () => {
        const options: StylisticOptions = { stylistic: false };
        const result = jsdoc(options);
        const jsConfig = result.at(0);

        expect(jsConfig?.rules).not.toHaveProperty('jsdoc/check-alignment');
        expect(jsConfig?.rules).not.toHaveProperty('jsdoc/multiline-blocks');
        expect(jsConfig?.rules).not.toHaveProperty('jsdoc/no-multi-asterisks');
        expect(jsConfig?.rules).not.toHaveProperty('jsdoc/require-asterisk-prefix');
        expect(jsConfig?.rules).not.toHaveProperty('jsdoc/require-hyphen-before-param-description');
        expect(jsConfig?.rules).not.toHaveProperty('jsdoc/tag-lines');
      });

      test('should include stylistic rules when stylistic is true', () => {
        const options: StylisticOptions = { stylistic: true };
        const result = jsdoc(options);
        const jsConfig = result.at(0);

        expect(jsConfig?.rules).toHaveProperty('jsdoc/check-alignment', 'warn');
        expect(jsConfig?.rules).toHaveProperty('jsdoc/multiline-blocks', 'warn');
        expect(jsConfig?.rules).toHaveProperty('jsdoc/tag-lines', ['warn', 'never', { startLines: 1 }]);
      });

      test('should include stylistic rules when stylistic is undefined (default)', () => {
        const options: StylisticOptions = {};
        const result = jsdoc(options);
        const jsConfig = result.at(0);

        expect(jsConfig?.rules).toHaveProperty('jsdoc/check-alignment', 'warn');
        expect(jsConfig?.rules).toHaveProperty('jsdoc/multiline-blocks', 'warn');
      });
    });

    describe('function behavior', () => {
      test('should call tseslint.config with correct parameters', async () => {
        const tseslint = await import('typescript-eslint');
        const configSpy = vi.mocked(tseslint.default.config);

        jsdoc();

        expect(configSpy).toHaveBeenCalledTimes(1);
        expect(configSpy).toHaveBeenCalledWith(
          {
            name: 'fabdeh/jsdoc/rules',
            files: ['**/*.?([cm])[jt]s?(x)'],
            plugins: { jsdoc: MOCK_JSDOC_PLUGIN },
            rules: expect.objectContaining({
              'jsdoc/check-access': 'warn',
              'jsdoc/require-jsdoc': 'warn',
              'jsdoc/check-alignment': 'warn',
            }),
          },
          {
            name: 'fabdeh/jsdoc/ts-only/rules',
            files: ['**/*.?([cm])ts?(x)'],
            rules: expect.objectContaining({
              'jsdoc/check-tag-names': ['warn', { typed: true }],
              'jsdoc/no-types': 'warn',
              'jsdoc/no-undefined-types': 'off',
            }),
          }
        );
      });

      test('should return TypedConfigArray from tseslint.config', () => {
        const result = jsdoc();

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
        expect(jsdoc).toHaveLength(0); // Optional parameter

        // Should work with different parameter combinations
        expect(() => jsdoc()).not.toThrow();
        expect(() => jsdoc({})).not.toThrow();
        expect(() => jsdoc({ stylistic: true })).not.toThrow();
        expect(() => jsdoc({ stylistic: false })).not.toThrow();
      });
    });
  });

  describe('getJsDocRules helper function', () => {
    describe('mode parameter', () => {
      test('should return only JS rules when mode is "jsOnly"', () => {
        const rules = getJsDocRules('error', true, 'jsOnly');

        expect(rules).toHaveProperty('jsdoc/check-access', 'error');
        expect(rules).toHaveProperty('jsdoc/require-param-type', 'error');
        expect(rules).not.toHaveProperty('jsdoc/no-types');
      });

      test('should return only TS rules when mode is "tsOnly"', () => {
        const rules = getJsDocRules('error', true, 'tsOnly');

        expect(rules).toHaveProperty('jsdoc/check-tag-names', ['error', { typed: true }]);
        expect(rules).toHaveProperty('jsdoc/no-types', 'error');
        expect(rules).toHaveProperty('jsdoc/no-undefined-types', 'off');
        expect(rules).toHaveProperty('jsdoc/require-param-type', 'off');
        expect(rules).not.toHaveProperty('jsdoc/check-access');
        expect(rules).not.toHaveProperty('jsdoc/require-param');
      });

      test('should return both JS and TS rules when mode is "both"', () => {
        const rules = getJsDocRules('error', true, 'both');

        // Should have JS rules
        expect(rules).toHaveProperty('jsdoc/check-access', 'error');
        expect(rules).toHaveProperty('jsdoc/require-param', 'error');

        // Should have TS rules with overrides
        expect(rules).toHaveProperty('jsdoc/check-tag-names', ['error', { typed: true }]);
        expect(rules).toHaveProperty('jsdoc/no-types', 'error');
        expect(rules).toHaveProperty('jsdoc/require-param-type', 'off'); // TS override
      });
    });

    describe('level parameter', () => {
      test('should set all rules to the specified level', () => {
        const rules = getJsDocRules('warn', false, 'jsOnly');

        const ruleEntries = Object.entries(rules ?? {});
        for (const [, ruleConfig] of ruleEntries) {
          if (Array.isArray(ruleConfig)) {
            expect(ruleConfig[0]).toBe('warn');
          } else if (ruleConfig !== 'off') {
            expect(ruleConfig).toBe('warn');
          }
        }
      });

      test('should work with different rule levels', () => {
        const errorRules = getJsDocRules('error' as TSESLint.SharedConfig.RuleLevel, false, 'jsOnly');
        const warnRules = getJsDocRules('warn' as TSESLint.SharedConfig.RuleLevel, false, 'jsOnly');

        expect(errorRules?.['jsdoc/check-access']).toBe('error');
        expect(warnRules?.['jsdoc/check-access']).toBe('warn');
      });
    });

    describe('stylistic parameter', () => {
      test('should include stylistic rules when stylistic is true', () => {
        const rules = getJsDocRules('error', true, 'jsOnly');

        expect(rules).toHaveProperty('jsdoc/check-alignment', 'error');
        expect(rules).toHaveProperty('jsdoc/multiline-blocks', 'error');
        expect(rules).toHaveProperty('jsdoc/no-multi-asterisks', 'error');
        expect(rules).toHaveProperty('jsdoc/require-asterisk-prefix', 'error');
        expect(rules).toHaveProperty('jsdoc/require-hyphen-before-param-description', 'error');
        expect(rules).toHaveProperty('jsdoc/tag-lines', ['error', 'never', { startLines: 1 }]);
      });

      test('should exclude stylistic rules when stylistic is false', () => {
        const rules = getJsDocRules('error', false, 'jsOnly');

        expect(rules).not.toHaveProperty('jsdoc/check-alignment');
        expect(rules).not.toHaveProperty('jsdoc/multiline-blocks');
        expect(rules).not.toHaveProperty('jsdoc/no-multi-asterisks');
        expect(rules).not.toHaveProperty('jsdoc/require-asterisk-prefix');
        expect(rules).not.toHaveProperty('jsdoc/require-hyphen-before-param-description');
        expect(rules).not.toHaveProperty('jsdoc/tag-lines');
      });
    });

    describe('typeScript rule overrides', () => {
      test('should disable type-related rules in TypeScript mode', () => {
        const rules = getJsDocRules('error', false, 'tsOnly');

        expect(rules).toHaveProperty('jsdoc/no-undefined-types', 'off');
        expect(rules).toHaveProperty('jsdoc/require-param-type', 'off');
        expect(rules).toHaveProperty('jsdoc/require-property-type', 'off');
        expect(rules).toHaveProperty('jsdoc/require-returns-type', 'off');
      });

      test('should configure check-tag-names with typed option', () => {
        const rules = getJsDocRules('error', false, 'tsOnly');

        expect(rules).toHaveProperty('jsdoc/check-tag-names', ['error', { typed: true }]);
      });

      test('should enable no-types rule for TypeScript', () => {
        const rules = getJsDocRules('error', false, 'tsOnly');

        expect(rules).toHaveProperty('jsdoc/no-types', 'error');
      });
    });
  });

  describe('configuration structure validation', () => {
    test('should have two configurations with proper structure', () => {
      const result = jsdoc();

      expect(result).toHaveLength(2);

      // JS configuration
      const jsConfig = result.at(0);
      expect(jsConfig).toMatchObject({
        name: 'fabdeh/jsdoc/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: { jsdoc: MOCK_JSDOC_PLUGIN },
        rules: expect.any(Object),
      });

      // TS configuration
      const tsConfig = result.at(1);
      expect(tsConfig).toMatchObject({
        name: 'fabdeh/jsdoc/ts-only/rules',
        files: ['**/*.?([cm])ts?(x)'],
        rules: expect.any(Object),
      });
    });

    test('should use correct glob patterns', () => {
      const result = jsdoc();

      const jsConfig = result.at(0);
      expect(jsConfig?.files).toEqual(['**/*.?([cm])[jt]s?(x)']); // GLOB_SRC

      const tsConfig = result.at(1);
      expect(tsConfig?.files).toEqual(['**/*.?([cm])ts?(x)']); // GLOB_TS
    });

    test('should have proper plugin configuration', () => {
      const result = jsdoc();
      const jsConfig = result.at(0);

      expect(jsConfig?.plugins).toHaveProperty('jsdoc');
      expect(jsConfig?.plugins?.jsdoc).toStrictEqual(MOCK_JSDOC_PLUGIN);
    });
  });

  describe('rule configuration validation', () => {
    test('should have all rules prefixed with jsdoc', () => {
      const result = jsdoc();
      const jsConfig = result.at(0);
      const tsConfig = result.at(1);

      const allRuleKeys = [
        ...Object.keys(jsConfig?.rules ?? {}),
        ...Object.keys(tsConfig?.rules ?? {}),
      ];

      for (const ruleKey of allRuleKeys) {
        expect(ruleKey).toMatch(/^jsdoc\//);
      }
    });

    test('should use warn level by default', () => {
      const result = jsdoc();
      const jsConfig = result.at(0);
      const tsConfig = result.at(1);

      const allRules = { ...jsConfig?.rules, ...tsConfig?.rules };
      const ruleEntries = Object.entries(allRules);

      for (const [, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          if (ruleConfig[0] !== 'off') {
            expect(ruleConfig[0]).toBe('warn');
          }
        } else if (ruleConfig !== 'off') {
          expect(ruleConfig).toBe('warn');
        }
      }
    });

    test('should have comprehensive rule coverage', () => {
      const result = jsdoc();
      const jsConfig = result.at(0);
      const tsConfig = result.at(1);

      const jsRules = Object.keys(jsConfig?.rules ?? {});
      const tsRules = Object.keys(tsConfig?.rules ?? {});

      // Should have a good number of jsdoc rules
      expect(jsRules.length).toBeGreaterThan(20);
      expect(tsRules.length).toBeGreaterThan(3);
    });
  });
});
