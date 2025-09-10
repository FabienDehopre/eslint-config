import type { FilesOptions, OverridesOptions, StylisticOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { yaml } from '../src/configs/yaml';

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
const MOCK_YAML_PLUGIN = { name: 'yaml-plugin' };
const MOCK_YAML_PARSER = { name: 'yaml-parser' };

describe('yaml', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock interopDefault to return our mock plugins
    const { interopDefault } = await import('../src/shared/utils');
    vi.mocked(interopDefault)
      .mockResolvedValueOnce(MOCK_YAML_PLUGIN)
      .mockResolvedValueOnce(MOCK_YAML_PARSER);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return correct configuration structure', async () => {
      const result = await yaml();

      expect(result).toHaveLength(2);

      const setupConfig = result.at(0);
      expect(setupConfig?.name).toBe('fabdeh/yaml/setup');
      expect(setupConfig?.plugins).toEqual({ yaml: MOCK_YAML_PLUGIN });

      const rulesConfig = result.at(1);
      expect(rulesConfig?.name).toBe('fabdeh/yaml/rules');
      expect(rulesConfig?.languageOptions?.parser).toBe(MOCK_YAML_PARSER);
      expect(rulesConfig?.files).toEqual(['**/*.y?(a)ml']);
    });

    test('should include stylistic rules by default', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/block-mapping-question-indicator-newline', 'error');
      expect(rulesConfig?.rules).toHaveProperty('yaml/block-sequence-hyphen-indicator-newline', 'error');
      expect(rulesConfig?.rules).toHaveProperty('yaml/flow-mapping-curly-newline', 'error');
      expect(rulesConfig?.rules).toHaveProperty('yaml/flow-mapping-curly-spacing', 'error');
      expect(rulesConfig?.rules).toHaveProperty('yaml/flow-sequence-bracket-newline', 'error');
      expect(rulesConfig?.rules).toHaveProperty('yaml/flow-sequence-bracket-spacing', 'error');
      expect(rulesConfig?.rules).toHaveProperty('yaml/indent', ['error', 2]);
      expect(rulesConfig?.rules).toHaveProperty('yaml/key-spacing', 'error');
      expect(rulesConfig?.rules).toHaveProperty('yaml/no-tab-indent', 'error');
      expect(rulesConfig?.rules).toHaveProperty('yaml/quotes', ['error', { avoidEscape: true, prefer: 'single' }]);
      expect(rulesConfig?.rules).toHaveProperty('yaml/spaced-comment', 'error');
    });

    test('should include core YAML rules', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      const expectedRules = {
        '@stylistic/spaced-comment': 'off',
        'yaml/block-mapping': 'error',
        'yaml/block-sequence': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/plain-scalar': 'error',
        'yaml/vue-custom-block/no-parsing-error': 'error',
      };

      for (const [ruleName, ruleConfig] of Object.entries(expectedRules)) {
        expect(rulesConfig?.rules).toHaveProperty(ruleName, ruleConfig);
      }
    });

    test('should disable @stylistic/spaced-comment rule', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('@stylistic/spaced-comment', 'off');
    });
  });

  describe('files option', () => {
    test('should use custom files when provided', async () => {
      const options: FilesOptions = { files: ['custom/**/*.yaml', '*.config.yml'] };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.files).toEqual(['custom/**/*.yaml', '*.config.yml']);
    });

    test('should use default YAML files when not provided', async () => {
      const result = await yaml({});
      const rulesConfig = result.at(1);

      expect(rulesConfig?.files).toEqual(['**/*.y?(a)ml']);
    });
  });

  describe('stylistic option', () => {
    test('should exclude stylistic rules when stylistic is false', async () => {
      const options: StylisticOptions = { stylistic: false };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).not.toHaveProperty('yaml/block-mapping-question-indicator-newline');
      expect(rulesConfig?.rules).not.toHaveProperty('yaml/indent');
      expect(rulesConfig?.rules).not.toHaveProperty('yaml/quotes');
      expect(rulesConfig?.rules).not.toHaveProperty('yaml/spaced-comment');
    });

    test('should include stylistic rules when stylistic is true', async () => {
      const options: StylisticOptions = { stylistic: true };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/indent');
      expect(rulesConfig?.rules).toHaveProperty('yaml/quotes');
      expect(rulesConfig?.rules).toHaveProperty('yaml/spaced-comment');
    });

    test('should handle stylistic object with custom indent', async () => {
      const options: StylisticOptions = { stylistic: { indent: 4 } };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/indent', ['error', 4]);
    });

    test('should handle stylistic object with tab indent', async () => {
      const options: StylisticOptions = { stylistic: { indent: 'tab' } };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/indent', ['error', 2]); // tab gets converted to 2
    });

    test('should handle stylistic object with custom quotes', async () => {
      const options: StylisticOptions = { stylistic: { quotes: 'double' } };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/quotes', ['error', { avoidEscape: true, prefer: 'double' }]);
    });

    test('should handle backtick quotes as single', async () => {
      const options: StylisticOptions = { stylistic: { quotes: 'backtick' } };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/quotes', ['error', { avoidEscape: true, prefer: 'single' }]);
    });

    test('should handle stylistic object with defaults', async () => {
      const options: StylisticOptions = { stylistic: {} };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/indent', ['error', 2]);
      expect(rulesConfig?.rules).toHaveProperty('yaml/quotes', ['error', { avoidEscape: true, prefer: 'single' }]);
    });
  });

  describe('overrides option', () => {
    test('should merge overrides into rules', async () => {
      const options: OverridesOptions = {
        overrides: {
          'yaml/block-mapping': 'warn',
          'yaml/custom-rule': 'error',
        },
      };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/block-mapping', 'warn');
      expect(rulesConfig?.rules).toHaveProperty('yaml/custom-rule', 'error');
    });

    test('should handle empty overrides', async () => {
      const options: OverridesOptions = { overrides: {} };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules).toHaveProperty('yaml/block-mapping', 'error');
    });
  });

  describe('function behavior', () => {
    test('should call interopDefault with correct imports', async () => {
      const { interopDefault } = await import('../src/shared/utils');

      await yaml();

      expect(interopDefault).toHaveBeenCalledTimes(2);
      expect(interopDefault).toHaveBeenNthCalledWith(1, expect.any(Promise));
      expect(interopDefault).toHaveBeenNthCalledWith(2, expect.any(Promise));
    });

    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      await yaml();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith(
        {
          name: 'fabdeh/yaml/setup',
          plugins: {
            yaml: MOCK_YAML_PLUGIN,
          },
        },
        {
          name: 'fabdeh/yaml/rules',
          languageOptions: {
            parser: MOCK_YAML_PARSER,
          },
          files: ['**/*.y?(a)ml'],
          rules: expect.objectContaining({
            'yaml/block-mapping': 'error',
            'yaml/indent': ['error', 2],
            '@stylistic/spaced-comment': 'off',
          }),
        }
      );
    });

    test('should return TypedConfigArray from tseslint.config', async () => {
      const result = await yaml();

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
      expect(yaml).toHaveLength(0); // Optional parameter

      // Should work with different parameter combinations
      expect(() => yaml()).not.toThrow();
      expect(() => yaml({})).not.toThrow();
    });
  });

  describe('configuration structure validation', () => {
    test('should have two configurations with proper structure', async () => {
      const result = await yaml();

      expect(result).toHaveLength(2);

      // Setup configuration
      const setupConfig = result.at(0);
      expect(setupConfig).toMatchObject({
        name: 'fabdeh/yaml/setup',
        plugins: { yaml: MOCK_YAML_PLUGIN },
      });

      // Rules configuration
      const rulesConfig = result.at(1);
      expect(rulesConfig).toMatchObject({
        name: 'fabdeh/yaml/rules',
        languageOptions: { parser: MOCK_YAML_PARSER },
        files: expect.any(Array),
        rules: expect.any(Object),
      });
    });

    test('should use correct YAML glob pattern by default', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      expect(rulesConfig?.files).toEqual(['**/*.y?(a)ml']);
    });

    test('should have proper plugin configuration', async () => {
      const result = await yaml();
      const setupConfig = result.at(0);

      expect(setupConfig?.plugins).toHaveProperty('yaml');
      expect(setupConfig?.plugins?.yaml).toStrictEqual(MOCK_YAML_PLUGIN);
    });

    test('should have proper parser configuration', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      expect(rulesConfig?.languageOptions?.parser).toBe(MOCK_YAML_PARSER);
    });
  });

  describe('rule configuration validation', () => {
    test('should have rules prefixed with yaml/ or @stylistic/', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      const ruleKeys = Object.keys(rulesConfig?.rules ?? {});
      for (const ruleKey of ruleKeys) {
        expect(ruleKey).toMatch(/^(yaml\/|@stylistic\/)/);
      }
    });

    test('should have proper rule severity levels', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      const rules = rulesConfig?.rules ?? {};
      const ruleEntries = Object.entries(rules);

      for (const [, ruleConfig] of ruleEntries) {
        if (Array.isArray(ruleConfig)) {
          expect(ruleConfig[0]).toBe('error');
        } else {
          expect(['error', 'off']).toContain(ruleConfig);
        }
      }
    });

    test('should have comprehensive YAML rule coverage', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      const yamlRules = Object.keys(rulesConfig?.rules ?? {}).filter((key) =>
        key.startsWith('yaml/')
      );

      // Should have a good number of yaml rules
      expect(yamlRules.length).toBeGreaterThan(15);
    });

    test('should have rules with proper configurations', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      // Rules with configuration objects
      expect(rulesConfig?.rules?.['yaml/indent']).toEqual(['error', 2]);
      expect(rulesConfig?.rules?.['yaml/quotes']).toEqual(['error', { avoidEscape: true, prefer: 'single' }]);

      // Simple error rules
      expect(rulesConfig?.rules?.['yaml/block-mapping']).toBe('error');
      expect(rulesConfig?.rules?.['yaml/block-sequence']).toBe('error');

      // Disabled stylistic rule
      expect(rulesConfig?.rules?.['@stylistic/spaced-comment']).toBe('off');
    });
  });

  describe('plugin integration', () => {
    test('should use eslint-plugin-yml plugin', async () => {
      const result = await yaml();
      const setupConfig = result.at(0);

      expect(setupConfig?.plugins).toHaveProperty('yaml');
      expect(setupConfig?.plugins?.yaml).toBe(MOCK_YAML_PLUGIN);
    });

    test('should use yaml-eslint-parser parser', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      expect(rulesConfig?.languageOptions?.parser).toBe(MOCK_YAML_PARSER);
    });
  });

  describe('complex option combinations', () => {
    test('should handle all options together', async () => {
      const options: FilesOptions & OverridesOptions & StylisticOptions = {
        files: ['custom.yaml'],
        stylistic: { indent: 8, quotes: 'double' },
        overrides: { 'yaml/block-mapping': 'warn' },
      };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      expect(rulesConfig?.files).toEqual(['custom.yaml']);
      expect(rulesConfig?.rules).toHaveProperty('yaml/indent', ['error', 8]);
      expect(rulesConfig?.rules).toHaveProperty('yaml/quotes', ['error', { avoidEscape: true, prefer: 'double' }]);
      expect(rulesConfig?.rules).toHaveProperty('yaml/block-mapping', 'warn');
    });

    test('should handle stylistic false with overrides', async () => {
      const options: OverridesOptions & StylisticOptions = {
        stylistic: false,
        overrides: { 'yaml/indent': ['error', 4] },
      };
      const result = await yaml(options);
      const rulesConfig = result.at(1);

      // Stylistic rules should be excluded
      expect(rulesConfig?.rules).not.toHaveProperty('yaml/block-mapping-question-indicator-newline');
      // But override should still apply
      expect(rulesConfig?.rules).toHaveProperty('yaml/indent', ['error', 4]);
    });
  });

  describe('specific rule validation', () => {
    test('should configure YAML structure rules', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules?.['yaml/block-mapping']).toBe('error');
      expect(rulesConfig?.rules?.['yaml/block-sequence']).toBe('error');
      expect(rulesConfig?.rules?.['yaml/plain-scalar']).toBe('error');
    });

    test('should configure YAML validation rules', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules?.['yaml/no-empty-key']).toBe('error');
      expect(rulesConfig?.rules?.['yaml/no-empty-sequence-entry']).toBe('error');
      expect(rulesConfig?.rules?.['yaml/no-irregular-whitespace']).toBe('error');
    });

    test('should configure Vue custom block rule', async () => {
      const result = await yaml();
      const rulesConfig = result.at(1);

      expect(rulesConfig?.rules?.['yaml/vue-custom-block/no-parsing-error']).toBe('error');
    });

    test('should configure stylistic rules when enabled', async () => {
      const result = await yaml({ stylistic: true });
      const rulesConfig = result.at(1);

      const stylisticRules = [
        'yaml/block-mapping-question-indicator-newline',
        'yaml/block-sequence-hyphen-indicator-newline',
        'yaml/flow-mapping-curly-newline',
        'yaml/flow-mapping-curly-spacing',
        'yaml/flow-sequence-bracket-newline',
        'yaml/flow-sequence-bracket-spacing',
        'yaml/key-spacing',
        'yaml/no-tab-indent',
        'yaml/spaced-comment',
      ];

      for (const ruleName of stylisticRules) {
        expect(rulesConfig?.rules).toHaveProperty(ruleName, 'error');
      }
    });

    test('should handle different quotes preferences', async () => {
      const singleResult = await yaml({ stylistic: { quotes: 'single' } });
      const doubleResult = await yaml({ stylistic: { quotes: 'double' } });
      const backtickResult = await yaml({ stylistic: { quotes: 'backtick' } });

      expect(singleResult.at(1)?.rules?.['yaml/quotes']).toEqual(['error', { avoidEscape: true, prefer: 'single' }]);
      expect(doubleResult.at(1)?.rules?.['yaml/quotes']).toEqual(['error', { avoidEscape: true, prefer: 'double' }]);
      expect(backtickResult.at(1)?.rules?.['yaml/quotes']).toEqual(['error', { avoidEscape: true, prefer: 'single' }]); // backtick → single
    });

    test('should handle different indent preferences', async () => {
      const spaceResult = await yaml({ stylistic: { indent: 4 } });
      const tabResult = await yaml({ stylistic: { indent: 'tab' } });

      expect(spaceResult.at(1)?.rules?.['yaml/indent']).toEqual(['error', 4]);
      expect(tabResult.at(1)?.rules?.['yaml/indent']).toEqual(['error', 2]); // tab → 2 spaces
    });
  });
});
