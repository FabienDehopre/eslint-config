import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { comments } from '../src/configs/comments';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((config: unknown) => [config]),
  },
}));

vi.mock('@eslint-community/eslint-plugin-eslint-comments', () => ({
  default: { name: 'eslint-comments-plugin' },
}));

// Mock eslint-comments plugin
const MOCK_ESLINT_COMMENTS_PLUGIN = { name: 'eslint-comments-plugin' };

describe('comments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default configuration', () => {
    test('should return correct configuration structure', () => {
      const result = comments();

      expect(result).toHaveLength(1);

      const config = result.at(0);
      expect(config?.name).toBe('fabdeh/comments/rules');
      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
      expect(config?.plugins).toEqual({
        '@eslint-community/eslint-comments': MOCK_ESLINT_COMMENTS_PLUGIN,
      });
    });

    test('should include all required ESLint comments rules', () => {
      const result = comments();
      const config = result.at(0);

      expect(config?.rules).toEqual({
        '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        '@eslint-community/eslint-comments/no-aggregating-enable': 'error',
        '@eslint-community/eslint-comments/no-duplicate-disable': 'error',
        '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
        '@eslint-community/eslint-comments/no-unused-disable': 'error',
        '@eslint-community/eslint-comments/no-unused-enable': 'error',
      });
    });

    test('should configure disable-enable-pair rule with allowWholeFile option', () => {
      const result = comments();
      const config = result.at(0);

      const rule = config?.rules?.['@eslint-community/eslint-comments/disable-enable-pair'];
      expect(rule).toEqual(['error', { allowWholeFile: true }]);
    });

    test('should configure no-aggregating-enable rule as error', () => {
      const result = comments();
      const config = result.at(0);

      const rule = config?.rules?.['@eslint-community/eslint-comments/no-aggregating-enable'];
      expect(rule).toBe('error');
    });

    test('should configure no-duplicate-disable rule as error', () => {
      const result = comments();
      const config = result.at(0);

      const rule = config?.rules?.['@eslint-community/eslint-comments/no-duplicate-disable'];
      expect(rule).toBe('error');
    });

    test('should configure no-unlimited-disable rule as error', () => {
      const result = comments();
      const config = result.at(0);

      const rule = config?.rules?.['@eslint-community/eslint-comments/no-unlimited-disable'];
      expect(rule).toBe('error');
    });

    test('should configure no-unused-disable rule as error', () => {
      const result = comments();
      const config = result.at(0);

      const rule = config?.rules?.['@eslint-community/eslint-comments/no-unused-disable'];
      expect(rule).toBe('error');
    });

    test('should configure no-unused-enable rule as error', () => {
      const result = comments();
      const config = result.at(0);

      const rule = config?.rules?.['@eslint-community/eslint-comments/no-unused-enable'];
      expect(rule).toBe('error');
    });
  });

  describe('function behavior', () => {
    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      comments();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith({
        name: 'fabdeh/comments/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: {
          '@eslint-community/eslint-comments': MOCK_ESLINT_COMMENTS_PLUGIN,
        },
        rules: {
          '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
          '@eslint-community/eslint-comments/no-aggregating-enable': 'error',
          '@eslint-community/eslint-comments/no-duplicate-disable': 'error',
          '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
          '@eslint-community/eslint-comments/no-unused-disable': 'error',
          '@eslint-community/eslint-comments/no-unused-enable': 'error',
        },
      });
    });

    test('should return TypedConfigArray from tseslint.config', () => {
      const result = comments();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);

      // Each config should have expected structure
      for (const config of result) {
        expect(config).toHaveProperty('name');
        expect(typeof config.name).toBe('string');
        expect(config.name).toMatch(/^fabdeh\//);
      }
    });

    test('should not accept any parameters', () => {
      // Verify function signature
      expect(comments).toHaveLength(0);

      // Should work without any arguments
      expect(() => comments()).not.toThrow();
    });
  });

  describe('plugin integration', () => {
    test('should use correct eslint-comments plugin', () => {
      const result = comments();
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('@eslint-community/eslint-comments');
      expect(config?.plugins?.['@eslint-community/eslint-comments']).toStrictEqual(MOCK_ESLINT_COMMENTS_PLUGIN);
    });

    test('should have all rules prefixed with plugin name', () => {
      const result = comments();
      const config = result.at(0);

      const ruleKeys = Object.keys(config?.rules ?? {});
      for (const ruleKey of ruleKeys) {
        expect(ruleKey).toMatch(/^@eslint-community\/eslint-comments\//);
      }
    });

    test('should have exactly 6 eslint-comments rules', () => {
      const result = comments();
      const config = result.at(0);

      const eslintCommentsRules = Object.keys(config?.rules ?? {}).filter((key) =>
        key.startsWith('@eslint-community/eslint-comments/')
      );

      expect(eslintCommentsRules).toHaveLength(6);
    });
  });

  describe('file targeting', () => {
    test('should target source files with correct glob pattern', () => {
      const result = comments();
      const config = result.at(0);

      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
    });

    test('should use GLOB_SRC pattern', () => {
      const result = comments();
      const config = result.at(0);

      // Verify it matches the expected pattern from globs
      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
    });
  });

  describe('rule configuration validation', () => {
    test('should have proper rule severity levels', () => {
      const result = comments();
      const config = result.at(0);

      const rules = config?.rules ?? {};
      const ruleEntries = Object.entries(rules);

      for (const [ruleName, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          expect(ruleConfig[0]).toBe('error');
          expect(ruleName).toBe('@eslint-community/eslint-comments/disable-enable-pair');
        } else {
          expect(ruleConfig).toBe('error');
        }
      }
    });

    test('should only have disable-enable-pair rule with options', () => {
      const result = comments();
      const config = result.at(0);

      const rules = config?.rules ?? {};
      const rulesWithOptions = Object.entries(rules).filter(([, ruleConfig]) => Array.isArray(ruleConfig));

      expect(rulesWithOptions).toHaveLength(1);
      expect(rulesWithOptions.at(0)?.at(0)).toBe('@eslint-community/eslint-comments/disable-enable-pair');
      expect(rulesWithOptions.at(0)?.at(1)).toEqual(['error', { allowWholeFile: true }]);
    });

    test('should have all other rules as simple error strings', () => {
      const result = comments();
      const config = result.at(0);

      const rules = config?.rules ?? {};
      const simpleErrorRules = Object.entries(rules).filter(([, ruleConfig]) => ruleConfig === 'error');

      expect(simpleErrorRules).toHaveLength(5);

      const expectedSimpleRules = [
        '@eslint-community/eslint-comments/no-aggregating-enable',
        '@eslint-community/eslint-comments/no-duplicate-disable',
        '@eslint-community/eslint-comments/no-unlimited-disable',
        '@eslint-community/eslint-comments/no-unused-disable',
        '@eslint-community/eslint-comments/no-unused-enable',
      ];

      const actualSimpleRules = simpleErrorRules.map(([ruleName]) => ruleName);
      expect(actualSimpleRules.sort()).toEqual(expectedSimpleRules.sort());
    });
  });
});
