import type { UnicornOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { unicorn } from '../src/configs/unicorn';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((config: unknown) => [config]),
  },
}));

// Mock unicorn plugin with recommended config
const MOCK_UNICORN_RECOMMENDED_RULES = {
  'unicorn/better-regex': 'error',
  'unicorn/catch-error-name': 'error',
  'unicorn/consistent-destructuring': 'error',
  'unicorn/consistent-function-scoping': 'error',
  'unicorn/custom-error-definition': 'off',
  'unicorn/error-message': 'error',
  'unicorn/escape-case': 'error',
  'unicorn/expiring-todo-comments': 'error',
  'unicorn/explicit-length-check': 'error',
  'unicorn/filename-case': 'error',
  'unicorn/import-style': 'error',
  'unicorn/new-for-builtins': 'error',
  'unicorn/no-abusive-eslint-disable': 'error',
  'unicorn/no-array-callback-reference': 'error',
  'unicorn/no-array-for-each': 'error',
  'unicorn/no-array-method-this-argument': 'error',
  'unicorn/no-array-push-push': 'error',
  'unicorn/no-array-reduce': 'error',
  'unicorn/no-await-expression-member': 'error',
  'unicorn/no-console-spaces': 'error',
  'unicorn/no-document-cookie': 'error',
  'unicorn/no-empty-file': 'error',
  'unicorn/no-for-loop': 'error',
  'unicorn/no-hex-escape': 'error',
  'unicorn/no-instanceof-builtin': 'error',
  'unicorn/no-invalid-remove-event-listener': 'error',
  'unicorn/no-lonely-if': 'error',
  'unicorn/no-negated-condition': 'error',
  'unicorn/no-nested-ternary': 'error',
  'unicorn/no-new-array': 'error',
  'unicorn/no-new-buffer': 'error',
  'unicorn/no-null': 'error',
  'unicorn/no-object-as-default-parameter': 'error',
  'unicorn/no-process-exit': 'error',
  'unicorn/no-static-only-class': 'error',
  'unicorn/no-thenable': 'error',
  'unicorn/no-this-assignment': 'error',
  'unicorn/no-typeof-undefined': 'error',
  'unicorn/no-unnecessary-await': 'error',
  'unicorn/no-unreadable-array-destructuring': 'error',
  'unicorn/no-unreadable-iife': 'error',
  'unicorn/no-unused-properties': 'off',
  'unicorn/no-useless-fallback-in-spread': 'error',
  'unicorn/no-useless-length-check': 'error',
  'unicorn/no-useless-promise-resolve-reject': 'error',
  'unicorn/no-useless-spread': 'error',
  'unicorn/no-useless-switch-case': 'error',
  'unicorn/no-zero-fractions': 'error',
  'unicorn/number-literal-case': 'error',
  'unicorn/numeric-separators-style': 'error',
  'unicorn/prefer-add-event-listener': 'error',
  'unicorn/prefer-array-find': 'error',
  'unicorn/prefer-array-flat': 'error',
  'unicorn/prefer-array-flat-map': 'error',
  'unicorn/prefer-array-index-of': 'error',
  'unicorn/prefer-array-some': 'error',
  'unicorn/prefer-at': 'error',
  'unicorn/prefer-code-point': 'error',
  'unicorn/prefer-date-now': 'error',
  'unicorn/prefer-default-parameters': 'error',
  'unicorn/prefer-dom-node-append': 'error',
  'unicorn/prefer-dom-node-dataset': 'error',
  'unicorn/prefer-dom-node-remove': 'error',
  'unicorn/prefer-dom-node-text-content': 'error',
  'unicorn/prefer-export-from': 'error',
  'unicorn/prefer-includes': 'error',
  'unicorn/prefer-keyboard-event-key': 'error',
  'unicorn/prefer-logical-operator-over-ternary': 'error',
  'unicorn/prefer-math-trunc': 'error',
  'unicorn/prefer-modern-dom-apis': 'error',
  'unicorn/prefer-modern-math-apis': 'error',
  'unicorn/prefer-module': 'error',
  'unicorn/prefer-negative-index': 'error',
  'unicorn/prefer-node-protocol': 'error',
  'unicorn/prefer-number-properties': 'error',
  'unicorn/prefer-object-from-entries': 'error',
  'unicorn/prefer-optional-catch-binding': 'error',
  'unicorn/prefer-prototype-methods': 'error',
  'unicorn/prefer-query-selector': 'error',
  'unicorn/prefer-reflect-apply': 'error',
  'unicorn/prefer-regexp-test': 'error',
  'unicorn/prefer-set-has': 'error',
  'unicorn/prefer-set-size': 'error',
  'unicorn/prefer-spread': 'error',
  'unicorn/prefer-string-replace-all': 'error',
  'unicorn/prefer-string-slice': 'error',
  'unicorn/prefer-string-starts-ends-with': 'error',
  'unicorn/prefer-string-trim-start-end': 'error',
  'unicorn/prefer-switch': 'error',
  'unicorn/prefer-ternary': 'error',
  'unicorn/prefer-top-level-await': 'error',
  'unicorn/prefer-type-error': 'error',
  'unicorn/prevent-abbreviations': 'error',
  'unicorn/relative-url-style': 'error',
  'unicorn/require-array-join-separator': 'error',
  'unicorn/require-number-to-fixed-digits-argument': 'error',
  'unicorn/require-post-message-target-origin': 'error',
  'unicorn/string-content': 'off',
  'unicorn/switch-case-braces': 'error',
  'unicorn/template-indent': 'warn',
  'unicorn/text-encoding-identifier-case': 'error',
  'unicorn/throw-new-error': 'error',
};

vi.mock('eslint-plugin-unicorn', () => ({
  default: {
    name: 'unicorn-plugin',
    configs: {
      recommended: {
        rules: {
          'unicorn/better-regex': 'error',
          'unicorn/catch-error-name': 'error',
          'unicorn/consistent-destructuring': 'error',
          'unicorn/consistent-function-scoping': 'error',
          'unicorn/custom-error-definition': 'off',
          'unicorn/error-message': 'error',
          'unicorn/escape-case': 'error',
          'unicorn/expiring-todo-comments': 'error',
          'unicorn/explicit-length-check': 'error',
          'unicorn/filename-case': 'error',
          'unicorn/import-style': 'error',
          'unicorn/new-for-builtins': 'error',
          'unicorn/no-abusive-eslint-disable': 'error',
          'unicorn/no-array-callback-reference': 'error',
          'unicorn/no-array-for-each': 'error',
          'unicorn/no-array-method-this-argument': 'error',
          'unicorn/no-array-push-push': 'error',
          'unicorn/no-array-reduce': 'error',
          'unicorn/no-await-expression-member': 'error',
          'unicorn/no-console-spaces': 'error',
          'unicorn/no-document-cookie': 'error',
          'unicorn/no-empty-file': 'error',
          'unicorn/no-for-loop': 'error',
          'unicorn/no-hex-escape': 'error',
          'unicorn/no-instanceof-builtin': 'error',
          'unicorn/no-invalid-remove-event-listener': 'error',
          'unicorn/no-lonely-if': 'error',
          'unicorn/no-negated-condition': 'error',
          'unicorn/no-nested-ternary': 'error',
          'unicorn/no-new-array': 'error',
          'unicorn/no-new-buffer': 'error',
          'unicorn/no-null': 'error',
          'unicorn/no-object-as-default-parameter': 'error',
          'unicorn/no-process-exit': 'error',
          'unicorn/no-static-only-class': 'error',
          'unicorn/no-thenable': 'error',
          'unicorn/no-this-assignment': 'error',
          'unicorn/no-typeof-undefined': 'error',
          'unicorn/no-unnecessary-await': 'error',
          'unicorn/no-unreadable-array-destructuring': 'error',
          'unicorn/no-unreadable-iife': 'error',
          'unicorn/no-unused-properties': 'off',
          'unicorn/no-useless-fallback-in-spread': 'error',
          'unicorn/no-useless-length-check': 'error',
          'unicorn/no-useless-promise-resolve-reject': 'error',
          'unicorn/no-useless-spread': 'error',
          'unicorn/no-useless-switch-case': 'error',
          'unicorn/no-zero-fractions': 'error',
          'unicorn/number-literal-case': 'error',
          'unicorn/numeric-separators-style': 'error',
          'unicorn/prefer-add-event-listener': 'error',
          'unicorn/prefer-array-find': 'error',
          'unicorn/prefer-array-flat': 'error',
          'unicorn/prefer-array-flat-map': 'error',
          'unicorn/prefer-array-index-of': 'error',
          'unicorn/prefer-array-some': 'error',
          'unicorn/prefer-at': 'error',
          'unicorn/prefer-code-point': 'error',
          'unicorn/prefer-date-now': 'error',
          'unicorn/prefer-default-parameters': 'error',
          'unicorn/prefer-dom-node-append': 'error',
          'unicorn/prefer-dom-node-dataset': 'error',
          'unicorn/prefer-dom-node-remove': 'error',
          'unicorn/prefer-dom-node-text-content': 'error',
          'unicorn/prefer-export-from': 'error',
          'unicorn/prefer-includes': 'error',
          'unicorn/prefer-keyboard-event-key': 'error',
          'unicorn/prefer-logical-operator-over-ternary': 'error',
          'unicorn/prefer-math-trunc': 'error',
          'unicorn/prefer-modern-dom-apis': 'error',
          'unicorn/prefer-modern-math-apis': 'error',
          'unicorn/prefer-module': 'error',
          'unicorn/prefer-negative-index': 'error',
          'unicorn/prefer-node-protocol': 'error',
          'unicorn/prefer-number-properties': 'error',
          'unicorn/prefer-object-from-entries': 'error',
          'unicorn/prefer-optional-catch-binding': 'error',
          'unicorn/prefer-prototype-methods': 'error',
          'unicorn/prefer-query-selector': 'error',
          'unicorn/prefer-reflect-apply': 'error',
          'unicorn/prefer-regexp-test': 'error',
          'unicorn/prefer-set-has': 'error',
          'unicorn/prefer-set-size': 'error',
          'unicorn/prefer-spread': 'error',
          'unicorn/prefer-string-replace-all': 'error',
          'unicorn/prefer-string-slice': 'error',
          'unicorn/prefer-string-starts-ends-with': 'error',
          'unicorn/prefer-string-trim-start-end': 'error',
          'unicorn/prefer-switch': 'error',
          'unicorn/prefer-ternary': 'error',
          'unicorn/prefer-top-level-await': 'error',
          'unicorn/prefer-type-error': 'error',
          'unicorn/prevent-abbreviations': 'error',
          'unicorn/relative-url-style': 'error',
          'unicorn/require-array-join-separator': 'error',
          'unicorn/require-number-to-fixed-digits-argument': 'error',
          'unicorn/require-post-message-target-origin': 'error',
          'unicorn/string-content': 'off',
          'unicorn/switch-case-braces': 'error',
          'unicorn/template-indent': 'warn',
          'unicorn/text-encoding-identifier-case': 'error',
          'unicorn/throw-new-error': 'error',
        },
      },
    },
  },
}));

// Mock unicorn plugin
const MOCK_UNICORN_PLUGIN = {
  name: 'unicorn-plugin',
  configs: {
    recommended: {
      rules: MOCK_UNICORN_RECOMMENDED_RULES,
    },
  },
};

describe('unicorn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return correct configuration structure', () => {
      const result = unicorn();

      expect(result).toHaveLength(1);

      const config = result.at(0);
      expect(config?.name).toBe('fabdeh/unicorn/rules');
      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
      expect(config?.plugins).toEqual({ unicorn: MOCK_UNICORN_PLUGIN });
    });

    test('should include custom curated rules by default (not all recommended)', () => {
      const result = unicorn();
      const config = result.at(0);

      // Should have custom curated rules, not all recommended
      const expectedCustomRules = [
        'unicorn/catch-error-name',
        'unicorn/consistent-date-clone',
        'unicorn/consistent-empty-array-spread',
        'unicorn/consistent-existence-index-check',
        'unicorn/custom-error-definition',
        'unicorn/error-message',
        'unicorn/escape-case',
        'unicorn/explicit-length-check',
        'unicorn/new-for-builtins',
        'unicorn/no-abusive-eslint-disable',
        'unicorn/no-anonymous-default-export',
        'unicorn/no-array-for-each',
        'unicorn/no-array-method-this-argument',
        'unicorn/no-array-reduce',
        'unicorn/prefer-array-find',
        'unicorn/prefer-node-protocol',
        'unicorn/throw-new-error',
      ];

      for (const ruleName of expectedCustomRules) {
        expect(config?.rules).toHaveProperty(ruleName);
      }

      // Should NOT have all recommended rules by default
      expect(config?.rules).not.toHaveProperty('unicorn/better-regex');
      expect(config?.rules).not.toHaveProperty('unicorn/consistent-destructuring');
      expect(config?.rules).not.toHaveProperty('unicorn/expiring-todo-comments');
      expect(config?.rules).not.toHaveProperty('unicorn/import-style');
    });

    test('should configure filename-case rule with custom options', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.rules?.['unicorn/filename-case']).toEqual([
        'error',
        { case: 'kebabCase', ignore: [/^[A-Z0-9_-]+\.md$/] },
      ]);
    });

    test('should configure consistent-function-scoping with custom options', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.rules?.['unicorn/consistent-function-scoping']).toEqual([
        'error',
        { checkArrowFunctions: false },
      ]);
    });

    test('should have no-unused-properties as warning', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.rules?.['unicorn/no-unused-properties']).toBe('warn');
    });
  });

  describe('allRecommended option', () => {
    test('should use all recommended rules when allRecommended is true', () => {
      const options: UnicornOptions = { allRecommended: true };
      const result = unicorn(options);
      const config = result.at(0);

      // Should have all recommended rules
      expect(config?.rules).toEqual(MOCK_UNICORN_RECOMMENDED_RULES);

      // Should include rules that are normally not in custom config
      expect(config?.rules).toHaveProperty('unicorn/better-regex', 'error');
      expect(config?.rules).toHaveProperty('unicorn/consistent-destructuring', 'error');
      expect(config?.rules).toHaveProperty('unicorn/expiring-todo-comments', 'error');
      expect(config?.rules).toHaveProperty('unicorn/import-style', 'error');
    });

    test('should use custom curated rules when allRecommended is false', () => {
      const options: UnicornOptions = { allRecommended: false };
      const result = unicorn(options);
      const config = result.at(0);

      // Should NOT have all recommended rules
      expect(config?.rules).not.toEqual(MOCK_UNICORN_RECOMMENDED_RULES);

      // Should have custom rules
      expect(config?.rules).toHaveProperty('unicorn/catch-error-name', 'error');
      expect(config?.rules).toHaveProperty('unicorn/no-array-for-each', 'error');

      // Should NOT have some recommended rules
      expect(config?.rules).not.toHaveProperty('unicorn/better-regex');
      expect(config?.rules).not.toHaveProperty('unicorn/import-style');
    });

    test('should use custom curated rules when allRecommended is undefined', () => {
      const options: UnicornOptions = {};
      const result = unicorn(options);
      const config = result.at(0);

      // Should use custom rules by default
      expect(config?.rules).toHaveProperty('unicorn/catch-error-name', 'error');
      expect(config?.rules).not.toHaveProperty('unicorn/better-regex');
    });
  });

  describe('function behavior', () => {
    test('should call tseslint.config with correct parameters for custom rules', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      unicorn();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith({
        name: 'fabdeh/unicorn/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: { unicorn: MOCK_UNICORN_PLUGIN },
        rules: expect.objectContaining({
          'unicorn/catch-error-name': 'error',
          'unicorn/no-array-for-each': 'error',
          'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: [/^[A-Z0-9_-]+\.md$/] }],
        }),
      });

      // Should NOT contain all recommended rules
      const callArgs = configSpy.mock.calls.at(0)?.[0] as { rules: Record<string, unknown> };
      expect(callArgs.rules).not.toHaveProperty('unicorn/better-regex');
    });

    test('should call tseslint.config with recommended rules when allRecommended is true', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      unicorn({ allRecommended: true });

      expect(configSpy).toHaveBeenCalledWith({
        name: 'fabdeh/unicorn/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: { unicorn: MOCK_UNICORN_PLUGIN },
        rules: MOCK_UNICORN_RECOMMENDED_RULES,
      });
    });

    test('should return TypedConfigArray from tseslint.config', () => {
      const result = unicorn();

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
      // Should accept optional UnicornOptions parameter
      expect(unicorn).toHaveLength(0); // Optional parameter

      // Should work with different parameter combinations
      expect(() => unicorn()).not.toThrow();
      expect(() => unicorn({})).not.toThrow();
      expect(() => unicorn({ allRecommended: true })).not.toThrow();
      expect(() => unicorn({ allRecommended: false })).not.toThrow();
    });
  });

  describe('configuration structure validation', () => {
    test('should have exactly one configuration object', () => {
      const result = unicorn();

      expect(result).toHaveLength(1);
      expect(result[0]).toBeDefined();
    });

    test('should have proper config structure', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config).toMatchObject({
        name: 'fabdeh/unicorn/rules',
        files: ['**/*.?([cm])[jt]s?(x)'],
        plugins: { unicorn: MOCK_UNICORN_PLUGIN },
        rules: expect.any(Object),
      });

      expect(Object.keys(config ?? {})).toEqual(['name', 'files', 'plugins', 'rules']);
    });

    test('should use GLOB_SRC pattern', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
    });

    test('should have proper config name format', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.name).toBe('fabdeh/unicorn/rules');
      expect(config?.name).toMatch(/^fabdeh\/[a-z-]+\/rules$/);
    });
  });

  describe('rule configuration validation', () => {
    test('should have all rules prefixed with unicorn/', () => {
      const result = unicorn();
      const config = result.at(0);

      const ruleKeys = Object.keys(config?.rules ?? {});
      for (const ruleKey of ruleKeys) {
        expect(ruleKey).toMatch(/^unicorn\//);
      }
    });

    test('should have proper rule severity levels', () => {
      const result = unicorn();
      const config = result.at(0);

      const rules = config?.rules ?? {};
      const ruleEntries = Object.entries(rules);

      for (const [, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          expect(['error', 'warn', 'off']).toContain(ruleConfig.at(0));
        } else {
          expect(['error', 'warn', 'off']).toContain(ruleConfig);
        }
      }
    });

    test('should have comprehensive custom rule coverage', () => {
      const result = unicorn();
      const config = result.at(0);

      const unicornRules = Object.keys(config?.rules ?? {}).filter((key) =>
        key.startsWith('unicorn/')
      );

      // Should have a significant number of custom unicorn rules
      expect(unicornRules.length).toBeGreaterThan(80);
    });

    test('should have rules with configuration objects', () => {
      const result = unicorn();
      const config = result.at(0);

      const rulesWithConfig = Object.entries(config?.rules ?? {}).filter(
        ([, ruleConfig]) => Array.isArray(ruleConfig)
      );

      expect(rulesWithConfig.length).toBeGreaterThan(0);

      // Specific rules with configuration
      expect(config?.rules?.['unicorn/filename-case']).toEqual([
        'error',
        { case: 'kebabCase', ignore: [/^[A-Z0-9_-]+\.md$/] },
      ]);
      expect(config?.rules?.['unicorn/consistent-function-scoping']).toEqual([
        'error',
        { checkArrowFunctions: false },
      ]);
    });

    test('should have specific rule configurations', () => {
      const result = unicorn();
      const config = result.at(0);

      // Check specific important rules
      expect(config?.rules?.['unicorn/no-null']).toBe('error');
      expect(config?.rules?.['unicorn/prefer-node-protocol']).toBe('error');
      expect(config?.rules?.['unicorn/no-array-for-each']).toBe('error');
      expect(config?.rules?.['unicorn/prefer-ternary']).toBe('error');
      expect(config?.rules?.['unicorn/throw-new-error']).toBe('error');
    });
  });

  describe('plugin integration', () => {
    test('should use eslint-plugin-unicorn plugin', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('unicorn');
      expect(config?.plugins?.unicorn).toStrictEqual(MOCK_UNICORN_PLUGIN);
    });

    test('should target source files only', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.files).toEqual(['**/*.?([cm])[jt]s?(x)']);
    });
  });

  describe('specific curated rules validation', () => {
    test('should include error prevention rules', () => {
      const result = unicorn();
      const config = result.at(0);

      const errorPreventionRules = [
        'unicorn/catch-error-name',
        'unicorn/error-message',
        'unicorn/custom-error-definition',
        'unicorn/throw-new-error',
        'unicorn/no-thenable',
        'unicorn/no-this-assignment',
      ];

      for (const ruleName of errorPreventionRules) {
        expect(config?.rules).toHaveProperty(ruleName, 'error');
      }
    });

    test('should include modern JavaScript rules', () => {
      const result = unicorn();
      const config = result.at(0);

      const modernJsRules = [
        'unicorn/prefer-node-protocol',
        'unicorn/prefer-array-find',
        'unicorn/prefer-array-flat-map',
        'unicorn/prefer-array-some',
        'unicorn/prefer-string-starts-ends-with',
        'unicorn/prefer-string-trim-start-end',
        'unicorn/prefer-optional-catch-binding',
        'unicorn/prefer-default-parameters',
      ];

      for (const ruleName of modernJsRules) {
        expect(config?.rules).toHaveProperty(ruleName, 'error');
      }
    });

    test('should include code quality rules', () => {
      const result = unicorn();
      const config = result.at(0);

      const codeQualityRules = [
        'unicorn/no-array-for-each',
        'unicorn/no-array-reduce',
        'unicorn/no-for-loop',
        'unicorn/no-lonely-if',
        'unicorn/no-negated-condition',
        'unicorn/prefer-ternary',
        'unicorn/prefer-switch',
        'unicorn/explicit-length-check',
      ];

      for (const ruleName of codeQualityRules) {
        expect(config?.rules).toHaveProperty(ruleName, 'error');
      }
    });

    test('should include security and best practice rules', () => {
      const result = unicorn();
      const config = result.at(0);

      const securityRules = [
        'unicorn/no-document-cookie',
        'unicorn/require-post-message-target-origin',
        'unicorn/no-abusive-eslint-disable',
        'unicorn/no-process-exit',
        'unicorn/no-hex-escape',
      ];

      for (const ruleName of securityRules) {
        expect(config?.rules).toHaveProperty(ruleName, 'error');
      }
    });

    test('should configure filename-case for kebab-case with MD exception', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.rules?.['unicorn/filename-case']).toEqual([
        'error',
        { case: 'kebabCase', ignore: [/^[A-Z0-9_-]+\.md$/] },
      ]);
    });

    test('should set no-unused-properties to warn level', () => {
      const result = unicorn();
      const config = result.at(0);

      expect(config?.rules?.['unicorn/no-unused-properties']).toBe('warn');
    });
  });

  describe('comparison with all recommended', () => {
    test('should have fewer rules than all recommended', () => {
      const customResult = unicorn({ allRecommended: false });
      const recommendedResult = unicorn({ allRecommended: true });

      const customRuleCount = Object.keys(customResult.at(0)?.rules ?? {}).length;
      const recommendedRuleCount = Object.keys(recommendedResult.at(0)?.rules ?? {}).length;

      expect(customRuleCount).toBeLessThan(recommendedRuleCount);
    });

    test('should be a subset of recommended rules (mostly)', () => {
      const customResult = unicorn({ allRecommended: false });
      const customRules = Object.keys(customResult.at(0)?.rules ?? {});

      // Most custom rules should exist in recommended (some may be custom additions)
      const commonRulesInRecommended = customRules.filter((ruleName) =>
        Object.prototype.hasOwnProperty.call(MOCK_UNICORN_RECOMMENDED_RULES, ruleName)
      );

      // Should have a high overlap
      expect(commonRulesInRecommended.length).toBeGreaterThanOrEqual(Math.floor(customRules.length * 0.8));
    });
  });
});
