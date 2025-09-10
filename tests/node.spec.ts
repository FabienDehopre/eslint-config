import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { node } from '../src/configs/node';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((config: unknown) => [config]),
  },
}));

vi.mock('eslint-plugin-n', () => ({
  default: { name: 'node-plugin' },
}));

// Mock node plugin
const MOCK_NODE_PLUGIN = { name: 'node-plugin' };

describe('node', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default configuration', () => {
    test('should return correct configuration structure', () => {
      const result = node();

      expect(result).toHaveLength(1);

      const config = result.at(0);
      expect(config?.name).toBe('fabdeh/node/rules');
      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
      expect(config?.plugins).toEqual({ n: MOCK_NODE_PLUGIN });
    });

    test('should include all required Node.js rules', () => {
      const result = node();
      const config = result.at(0);

      const expectedRules = {
        'n/handle-callback-err': ['error', '^(err|error)$'],
        'n/no-callback-literal': 'error',
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/prefer-global/buffer': ['error', 'never'],
        'n/prefer-global/process': ['error', 'never'],
        'n/prefer-promises/dns': 'error',
        'n/prefer-promises/fs': 'error',
        'n/process-exit-as-throw': 'error',
      };

      expect(config?.rules).toEqual(expectedRules);
    });

    test('should configure handle-callback-err rule with pattern', () => {
      const result = node();
      const config = result.at(0);

      const rule = config?.rules?.['n/handle-callback-err'];
      expect(rule).toEqual(['error', '^(err|error)$']);
    });

    test('should configure prefer-global rules with never option', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.rules?.['n/prefer-global/buffer']).toEqual(['error', 'never']);
      expect(config?.rules?.['n/prefer-global/process']).toEqual(['error', 'never']);
    });

    test('should configure prefer-promises rules as simple errors', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.rules?.['n/prefer-promises/dns']).toBe('error');
      expect(config?.rules?.['n/prefer-promises/fs']).toBe('error');
    });
  });

  describe('function behavior', () => {
    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      node();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith({
        name: 'fabdeh/node/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: {
          n: MOCK_NODE_PLUGIN,
        },
        rules: {
          'n/handle-callback-err': ['error', '^(err|error)$'],
          'n/no-callback-literal': 'error',
          'n/no-deprecated-api': 'error',
          'n/no-exports-assign': 'error',
          'n/no-new-require': 'error',
          'n/no-path-concat': 'error',
          'n/prefer-global/buffer': ['error', 'never'],
          'n/prefer-global/process': ['error', 'never'],
          'n/prefer-promises/dns': 'error',
          'n/prefer-promises/fs': 'error',
          'n/process-exit-as-throw': 'error',
        },
      });
    });

    test('should return TypedConfigArray from tseslint.config', () => {
      const result = node();

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
      expect(node).toHaveLength(0);

      // Should work without any arguments
      expect(() => node()).not.toThrow();
    });
  });

  describe('configuration structure validation', () => {
    test('should have exactly one configuration object', () => {
      const result = node();

      expect(result).toHaveLength(1);
      expect(result.at(0)).toBeDefined();
    });

    test('should have proper config structure', () => {
      const result = node();
      const config = result.at(0);

      expect(config).toMatchObject({
        name: 'fabdeh/node/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: { n: MOCK_NODE_PLUGIN },
        rules: expect.any(Object),
      });

      expect(Object.keys(config ?? {})).toEqual(['name', 'files', 'plugins', 'rules']);
    });

    test('should use GLOB_SRC pattern', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
    });

    test('should have proper config name format', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.name).toBe('fabdeh/node/rules');
      expect(config?.name).toMatch(/^fabdeh\/[a-z-]+\/rules$/);
    });
  });

  describe('rule configuration validation', () => {
    test('should have all rules prefixed with n/', () => {
      const result = node();
      const config = result.at(0);

      const ruleKeys = Object.keys(config?.rules ?? {});
      for (const ruleKey of ruleKeys) {
        expect(ruleKey).toMatch(/^n\//);
      }
    });

    test('should have proper rule severity levels', () => {
      const result = node();
      const config = result.at(0);

      const rules = config?.rules ?? {};
      const ruleEntries = Object.entries(rules);

      for (const [, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          expect(ruleConfig.at(0)).toBe('error');
        } else {
          expect(ruleConfig).toBe('error');
        }
      }
    });

    test('should have exactly 11 node rules', () => {
      const result = node();
      const config = result.at(0);

      const nodeRules = Object.keys(config?.rules ?? {}).filter((key) =>
        key.startsWith('n/')
      );

      expect(nodeRules).toHaveLength(11);
    });

    test('should have rules with configuration objects', () => {
      const result = node();
      const config = result.at(0);

      const rulesWithConfig = Object.entries(config?.rules ?? {}).filter(
        ([, ruleConfig]) => Array.isArray(ruleConfig)
      );

      expect(rulesWithConfig).toHaveLength(3); // handle-callback-err, prefer-global/buffer, prefer-global/process

      expect(rulesWithConfig.map(([ruleName]) => ruleName).sort()).toEqual([
        'n/handle-callback-err',
        'n/prefer-global/buffer',
        'n/prefer-global/process',
      ]);
    });

    test('should have simple error rules', () => {
      const result = node();
      const config = result.at(0);

      const simpleErrorRules = Object.entries(config?.rules ?? {}).filter(
        ([, ruleConfig]) => ruleConfig === 'error'
      );

      expect(simpleErrorRules).toHaveLength(8);

      const expectedSimpleRules = [
        'n/no-callback-literal',
        'n/no-deprecated-api',
        'n/no-exports-assign',
        'n/no-new-require',
        'n/no-path-concat',
        'n/prefer-promises/dns',
        'n/prefer-promises/fs',
        'n/process-exit-as-throw',
      ];

      const actualSimpleRules = simpleErrorRules.map(([ruleName]) => ruleName);
      expect(actualSimpleRules.sort()).toEqual(expectedSimpleRules.sort());
    });
  });

  describe('plugin integration', () => {
    test('should use eslint-plugin-n plugin', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('n');
      expect(config?.plugins?.n).toStrictEqual(MOCK_NODE_PLUGIN);
    });

    test('should target source files only', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
    });
  });

  describe('specific rule validation', () => {
    test('should configure callback error handling rules', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.rules?.['n/handle-callback-err']).toEqual(['error', '^(err|error)$']);
      expect(config?.rules?.['n/no-callback-literal']).toBe('error');
    });

    test('should configure Node.js API rules', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.rules?.['n/no-deprecated-api']).toBe('error');
      expect(config?.rules?.['n/no-exports-assign']).toBe('error');
      expect(config?.rules?.['n/no-new-require']).toBe('error');
      expect(config?.rules?.['n/no-path-concat']).toBe('error');
    });

    test('should configure global preference rules', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.rules?.['n/prefer-global/buffer']).toEqual(['error', 'never']);
      expect(config?.rules?.['n/prefer-global/process']).toEqual(['error', 'never']);
    });

    test('should configure promise preference rules', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.rules?.['n/prefer-promises/dns']).toBe('error');
      expect(config?.rules?.['n/prefer-promises/fs']).toBe('error');
    });

    test('should configure process exit rule', () => {
      const result = node();
      const config = result.at(0);

      expect(config?.rules?.['n/process-exit-as-throw']).toBe('error');
    });
  });
});
