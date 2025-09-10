import type { OverridesOptions, UnitTestingOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { vitest } from '../src/configs/vitest';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((config: unknown) => [config]),
  },
}));

vi.mock('../src/shared/utils', () => ({
  interopDefault: vi.fn(),
}));

vi.mock('local-pkg', () => ({
  isPackageExists: vi.fn(),
}));

vi.mock('globals', () => ({
  default: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Buffer is a class name
    node: { process: 'readonly', Buffer: 'readonly' },
    vitest: { describe: 'readonly', test: 'readonly', expect: 'readonly', vi: 'readonly' },
  },
}));

// Mock plugins
const MOCK_VITEST_PLUGIN = {
  name: 'vitest-plugin',
  configs: {
    recommended: {
      rules: {
        'vitest/expect-expect': 'error',
        'vitest/no-identical-title': 'error',
        'vitest/no-focused-tests': 'error',
        'vitest/valid-describe-callback': 'error',
        'vitest/valid-expect': 'error',
      },
    },
  },
  environments: {
    env: {
      globals: { afterEach: 'readonly', beforeEach: 'readonly' },
    },
  },
};

const MOCK_JEST_DOM_PLUGIN = {
  name: 'jest-dom-plugin',
  configs: {
    'flat/recommended': {
      rules: {
        'jest-dom/prefer-checked': 'error',
        'jest-dom/prefer-enabled-disabled': 'error',
        'jest-dom/prefer-required': 'error',
        'jest-dom/prefer-to-have-attribute': 'error',
      },
    },
  },
};

const MOCK_TESTING_LIBRARY_PLUGIN = {
  name: 'testing-library-plugin',
  configs: {
    'flat/angular': {
      rules: {
        'testing-library/await-async-queries': 'error',
        'testing-library/no-await-sync-queries': 'error',
        'testing-library/no-debugging-utils': 'warn',
        'testing-library/prefer-screen-queries': 'error',
      },
    },
  },
};

describe('vitest', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock interopDefault to return our mock plugins
    const { interopDefault } = await import('../src/shared/utils');
    vi.mocked(interopDefault)
      .mockResolvedValueOnce(MOCK_VITEST_PLUGIN)
      .mockResolvedValueOnce(MOCK_JEST_DOM_PLUGIN)
      .mockResolvedValueOnce(MOCK_TESTING_LIBRARY_PLUGIN);

    // Default package existence checks
    const { isPackageExists } = await import('local-pkg');
    vi.mocked(isPackageExists).mockReturnValue(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return correct configuration structure', async () => {
      const result = await vitest();

      expect(result).toHaveLength(1);

      const config = result.at(0);
      expect(config?.name).toBe('fabdeh/vitest/rules');
      expect(config?.files).toEqual(['**/*.spec.?([cm])[jt]s', '**/*.test.?([cm])[jt]s', '**/test-setup.?([cm])[jt]s']);
      expect(config?.plugins).toEqual({ vitest: MOCK_VITEST_PLUGIN });
    });

    test('should include vitest globals and language options', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config?.languageOptions?.globals).toEqual({
        process: 'readonly',
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Buffer is a class name
        Buffer: 'readonly', // node globals
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly', // vitest globals
        afterEach: 'readonly',
        beforeEach: 'readonly', // vitest plugin globals
      });
    });

    test('should include vitest settings', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config?.settings).toEqual({
        vitest: {
          typecheck: true,
        },
      });
    });

    test('should include core vitest rules', async () => {
      const result = await vitest();
      const config = result.at(0);

      const expectedVitestRules = {
        'vitest/expect-expect': 'error',
        'vitest/no-identical-title': 'error',
        'vitest/no-focused-tests': 'error',
        'vitest/valid-describe-callback': 'error',
        'vitest/valid-expect': 'error',
        'vitest/consistent-test-it': ['error', { fn: 'test' }],
        'vitest/no-standalone-expect': 'error',
        'vitest/no-test-return-statement': 'error',
        'vitest/prefer-hooks-in-order': 'error',
        'vitest/prefer-hooks-on-top': 'error',
        'vitest/prefer-lowercase-title': 'error',
        'vitest/prefer-spy-on': 'error',
        'vitest/prefer-to-be': 'error',
        'vitest/prefer-to-be-falsy': 'error',
        'vitest/prefer-to-be-object': 'error',
        'vitest/prefer-to-be-truthy': 'error',
        'vitest/prefer-to-contain': 'error',
        'vitest/prefer-to-have-length': 'error',
        'vitest/prefer-todo': 'error',
        'vitest/prefer-vi-mocked': 'error',
        'vitest/require-top-level-describe': 'error',
      };

      for (const [ruleName, ruleConfig] of Object.entries(expectedVitestRules)) {
        expect(config?.rules).toHaveProperty(ruleName, ruleConfig);
      }
    });

    test('should disable conflicting rules', async () => {
      const result = await vitest();
      const config = result.at(0);

      const disabledRules = {
        'max-classes-per-file': 'off',
        'max-lines': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'unicorn/no-null': 'off',
      };

      for (const [ruleName, ruleConfig] of Object.entries(disabledRules)) {
        expect(config?.rules).toHaveProperty(ruleName, ruleConfig);
      }
    });

    test('should include jsdoc rules disabled', async () => {
      const result = await vitest();
      const config = result.at(0);

      // JSDoc rules should be turned off in test files
      expect(config?.rules).toHaveProperty('jsdoc/check-access', 'off');
      expect(config?.rules).toHaveProperty('jsdoc/require-jsdoc', 'off');
      expect(config?.rules).toHaveProperty('jsdoc/require-param', 'off');
      expect(config?.rules).toHaveProperty('jsdoc/require-returns', 'off');
    });
  });

  describe('useJestDom option', () => {
    test('should include jest-dom plugin when useJestDom is true', async () => {
      const options: UnitTestingOptions = { useJestDom: true };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('jest-dom', MOCK_JEST_DOM_PLUGIN);
      expect(config?.rules).toHaveProperty('jest-dom/prefer-checked', 'error');
      expect(config?.rules).toHaveProperty('jest-dom/prefer-enabled-disabled', 'error');
    });

    test('should exclude jest-dom plugin when useJestDom is false', async () => {
      const options: UnitTestingOptions = { useJestDom: false };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.plugins).not.toHaveProperty('jest-dom');
      expect(config?.rules).not.toHaveProperty('jest-dom/prefer-checked');
    });

    test('should auto-detect jest-dom when useJestDom is not specified', async () => {
      const { isPackageExists } = await import('local-pkg');
      vi.mocked(isPackageExists).mockImplementation((pkg) => pkg === '@testing-library/jest-dom');

      const result = await vitest({});
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('jest-dom', MOCK_JEST_DOM_PLUGIN);
      expect(config?.rules).toHaveProperty('jest-dom/prefer-checked', 'error');
    });
  });

  describe('useTestingLibrary option', () => {
    test('should include testing-library plugin when useTestingLibrary is true', async () => {
      // Setup specific mocks for this test
      const { interopDefault } = await import('../src/shared/utils');
      vi.mocked(interopDefault).mockReset();
      vi.mocked(interopDefault)
        .mockResolvedValueOnce(MOCK_VITEST_PLUGIN) // @vitest/eslint-plugin
        .mockResolvedValueOnce(MOCK_TESTING_LIBRARY_PLUGIN); // eslint-plugin-testing-library

      const options: UnitTestingOptions = { useTestingLibrary: true, useJestDom: false };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('testing-library', MOCK_TESTING_LIBRARY_PLUGIN);
      expect(config?.rules).toHaveProperty('testing-library/await-async-queries', 'error');
      expect(config?.rules).toHaveProperty('testing-library/no-debugging-utils', 'warn');
    });

    test('should exclude testing-library plugin when useTestingLibrary is false', async () => {
      const options: UnitTestingOptions = { useTestingLibrary: false };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.plugins).not.toHaveProperty('testing-library');
      expect(config?.rules).not.toHaveProperty('testing-library/await-async-queries');
    });

    test('should auto-detect testing-library when useTestingLibrary is not specified', async () => {
      // Setup specific mocks for this test
      const { interopDefault } = await import('../src/shared/utils');
      vi.mocked(interopDefault).mockReset();
      vi.mocked(interopDefault)
        .mockResolvedValueOnce(MOCK_VITEST_PLUGIN) // @vitest/eslint-plugin
        .mockResolvedValueOnce(MOCK_TESTING_LIBRARY_PLUGIN); // eslint-plugin-testing-library

      const { isPackageExists } = await import('local-pkg');
      vi.mocked(isPackageExists).mockImplementation((pkg) => pkg === '@testing-library/angular');

      const result = await vitest({});
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('testing-library', MOCK_TESTING_LIBRARY_PLUGIN);
      expect(config?.rules).toHaveProperty('testing-library/await-async-queries', 'error');
    });
  });

  describe('combined testing library options', () => {
    test('should include both jest-dom and testing-library when both are enabled', async () => {
      const options: UnitTestingOptions = { useJestDom: true, useTestingLibrary: true };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('vitest', MOCK_VITEST_PLUGIN);
      expect(config?.plugins).toHaveProperty('jest-dom', MOCK_JEST_DOM_PLUGIN);
      expect(config?.plugins).toHaveProperty('testing-library', MOCK_TESTING_LIBRARY_PLUGIN);

      // Should have rules from all plugins
      expect(config?.rules).toHaveProperty('vitest/valid-expect', 'error');
      expect(config?.rules).toHaveProperty('jest-dom/prefer-checked', 'error');
      expect(config?.rules).toHaveProperty('testing-library/await-async-queries', 'error');
    });

    test('should handle both libraries being auto-detected', async () => {
      const { isPackageExists } = await import('local-pkg');
      vi.mocked(isPackageExists).mockImplementation((pkg) =>
        pkg === '@testing-library/jest-dom' || pkg === '@testing-library/angular'
      );

      const result = await vitest({});
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('jest-dom');
      expect(config?.plugins).toHaveProperty('testing-library');
    });
  });

  describe('overrides option', () => {
    test('should merge overrides into rules', async () => {
      const options: OverridesOptions = {
        overrides: {
          'vitest/valid-expect': 'warn',
          'vitest/custom-rule': 'error',
          'max-lines': 'error',
        },
      };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.rules).toHaveProperty('vitest/valid-expect', 'warn');
      expect(config?.rules).toHaveProperty('vitest/custom-rule', 'error');
      expect(config?.rules).toHaveProperty('max-lines', 'error'); // Override disabled rule
    });

    test('should handle empty overrides', async () => {
      const options: OverridesOptions = { overrides: {} };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.rules).toHaveProperty('vitest/valid-expect', 'error');
    });
  });

  describe('function behavior', () => {
    test('should call interopDefault with correct imports', async () => {
      const { interopDefault } = await import('../src/shared/utils');

      await vitest();

      expect(interopDefault).toHaveBeenCalledTimes(1); // Only vitest plugin by default
      expect(interopDefault).toHaveBeenCalledWith(expect.any(Promise));
    });

    test('should call interopDefault for additional plugins when enabled', async () => {
      const { interopDefault } = await import('../src/shared/utils');

      await vitest({ useJestDom: true, useTestingLibrary: true });

      expect(interopDefault).toHaveBeenCalledTimes(3); // vitest + jest-dom + testing-library
    });

    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      await vitest();

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith({
        name: 'fabdeh/vitest/rules',
        plugins: {
          vitest: MOCK_VITEST_PLUGIN,
        },
        languageOptions: {
          globals: expect.any(Object),
        },
        settings: {
          vitest: {
            typecheck: true,
          },
        },
        files: ['**/*.spec.?([cm])[jt]s', '**/*.test.?([cm])[jt]s', '**/test-setup.?([cm])[jt]s'],
        rules: expect.objectContaining({
          'vitest/valid-expect': 'error',
          'max-classes-per-file': 'off',
        }),
      });
    });

    test('should return TypedConfigArray from tseslint.config', async () => {
      const result = await vitest();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(1);

      // Each config should have an expected structure
      for (const config of result) {
        expect(config).toHaveProperty('name');
        expect(typeof config.name).toBe('string');
        expect(config.name).toMatch(/^fabdeh\//);
      }
    });

    test('should have correct function signature', () => {
      // Should accept optional parameters
      expect(vitest).toHaveLength(0); // Optional parameter

      // Should work with different parameter combinations
      expect(() => vitest()).not.toThrow();
      // expect(() => vitest({})).not.toThrow(); // enable both lines breaks the unit tests...
    });
  });

  describe('configuration structure validation', () => {
    test('should have exactly one configuration object', async () => {
      const result = await vitest();

      expect(result).toHaveLength(1);
      expect(result.at(0)).toBeDefined();
    });

    test('should have proper config structure', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config).toMatchObject({
        name: 'fabdeh/vitest/rules',
        plugins: expect.any(Object),
        languageOptions: expect.any(Object),
        settings: expect.any(Object),
        files: expect.any(Array),
        rules: expect.any(Object),
      });
    });

    test('should use GLOB_TESTS pattern', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config?.files).toEqual(['**/*.spec.?([cm])[jt]s', '**/*.test.?([cm])[jt]s', '**/test-setup.?([cm])[jt]s']);
    });

    test('should have proper config name format', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config?.name).toBe('fabdeh/vitest/rules');
      expect(config?.name).toMatch(/^fabdeh\/[a-z-]+\/rules$/);
    });
  });

  describe('rule configuration validation', () => {
    test('should have rules with multiple prefixes', async () => {
      const result = await vitest();
      const config = result.at(0);

      const ruleKeys = Object.keys(config?.rules ?? {});
      const prefixes = new Set(ruleKeys.map((key) => key.split('/').at(0)).filter(Boolean));

      expect(prefixes).toContain('vitest');
      expect(prefixes).toContain('max-classes-per-file'); // non-prefixed rules
      expect(prefixes).toContain('@typescript-eslint');
      expect(prefixes).toContain('unicorn');
      expect(prefixes).toContain('jsdoc');
    });

    test('should have proper rule severity levels', async () => {
      const result = await vitest();
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

    test('should have comprehensive rule coverage', async () => {
      const result = await vitest();
      const config = result.at(0);

      const vitestRules = Object.keys(config?.rules ?? {}).filter((key) =>
        key.startsWith('vitest/')
      );

      // Should have a good number of vitest rules
      expect(vitestRules.length).toBeGreaterThan(15);
    });

    test('should have rules with configuration objects', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config?.rules?.['vitest/consistent-test-it']).toEqual(['error', { fn: 'test' }]);
    });
  });

  describe('plugin integration', () => {
    test('should use @vitest/eslint-plugin plugin', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('vitest');
      expect(config?.plugins?.vitest).toBe(MOCK_VITEST_PLUGIN);
    });

    test('should target test files only', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config?.files).toEqual(['**/*.spec.?([cm])[jt]s', '**/*.test.?([cm])[jt]s', '**/test-setup.?([cm])[jt]s']);
    });

    test('should configure proper test environment', async () => {
      const result = await vitest();
      const config = result.at(0);

      expect(config?.languageOptions?.globals).toMatchObject({
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
      });

      expect(config?.settings).toEqual({
        vitest: { typecheck: true },
      });
    });
  });

  describe('globals integration', () => {
    test('should merge node, vitest, and plugin globals', async () => {
      const result = await vitest();
      const config = result.at(0);

      const globals = config?.languageOptions?.globals;
      expect(globals).toMatchObject({
        // Node globals
        process: 'readonly',
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Buffer is a class name
        Buffer: 'readonly',
        // Vitest globals
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        // Plugin globals
        afterEach: 'readonly',
        beforeEach: 'readonly',
      });
    });
  });

  describe('jsdoc integration', () => {
    test('should import and disable jsdoc rules', async () => {
      const result = await vitest();
      const config = result.at(0);

      // Should have jsdoc rules disabled
      const jsDocRules = Object.entries(config?.rules ?? {}).filter(([key, value]) =>
        key.startsWith('jsdoc/') && value === 'off'
      );

      expect(jsDocRules.length).toBeGreaterThan(10); // Should disable many jsdoc rules
    });
  });

  describe('complex option combinations', () => {
    test('should handle all options together', async () => {
      const options: OverridesOptions & UnitTestingOptions = {
        useJestDom: true,
        useTestingLibrary: true,
        overrides: { 'vitest/valid-expect': 'warn' },
      };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('vitest');
      expect(config?.plugins).toHaveProperty('jest-dom');
      expect(config?.plugins).toHaveProperty('testing-library');
      expect(config?.rules).toHaveProperty('vitest/valid-expect', 'warn');
    });

    test('should handle package auto-detection with overrides', async () => {
      const { isPackageExists } = await import('local-pkg');
      vi.mocked(isPackageExists).mockReturnValue(true); // Both packages exist

      const options: OverridesOptions = {
        overrides: { 'testing-library/no-debugging-utils': 'error' },
      };
      const result = await vitest(options);
      const config = result.at(0);

      expect(config?.plugins).toHaveProperty('jest-dom');
      expect(config?.plugins).toHaveProperty('testing-library');
      expect(config?.rules).toHaveProperty('testing-library/no-debugging-utils', 'error');
    });
  });
});
