/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { ignores } from '../src/configs/ignore';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((config: unknown) => [config]),
  },
}));

describe('ignores', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return correct configuration structure with empty user ignores', () => {
      const result = ignores();

      expect(result).toHaveLength(1);

      const config = result[0]!;
      expect(config.name).toBe('fabdeh/ignores');
      expect(config.ignores).toBeDefined();
      expect(Array.isArray(config.ignores)).toBeTruthy();
    });

    test('should include default GLOB_EXCLUDE patterns', () => {
      const result = ignores();
      const config = result[0]!;

      // Check for some expected default patterns from GLOB_EXCLUDE
      expect(config.ignores).toEqual(
        expect.arrayContaining([
          '**/node_modules',
          '**/dist',
          '**/package-lock.json',
          '**/yarn.lock',
          '**/coverage',
          '**/.temp',
          '**/.cache',
          '**/CHANGELOG*.md',
          '**/*.min.*',
          '**/LICENSE*',
        ])
      );
    });

    test('should contain expected number of default ignore patterns', () => {
      const result = ignores();
      const config = result[0]!;

      // Based on GLOB_EXCLUDE from globs.ts, should have many patterns
      expect(config.ignores!.length).toBeGreaterThan(20);
    });
  });

  describe('with user ignores', () => {
    test('should merge user ignores with default patterns', () => {
      const userIgnores = ['custom-dir/**', '*.tmp', 'build/**'];
      const result = ignores(userIgnores);
      const config = result[0]!;

      // Should include both default and user patterns
      expect(config.ignores).toEqual(
        expect.arrayContaining([
          // Default patterns
          '**/node_modules',
          '**/dist',
          '**/coverage',
          // User patterns
          'custom-dir/**',
          '*.tmp',
          'build/**',
        ])
      );
    });

    test('should handle empty user ignores array', () => {
      const result = ignores([]);
      const config = result[0]!;

      // Should only contain default patterns
      expect(config.ignores).toEqual(
        expect.arrayContaining([
          '**/node_modules',
          '**/dist',
          '**/coverage',
        ])
      );
      expect(config.ignores).not.toEqual(expect.arrayContaining(['']));
    });

    test('should handle single user ignore pattern', () => {
      const userIgnores = ['my-custom-folder/**'];
      const result = ignores(userIgnores);
      const config = result[0]!;

      expect(config.ignores).toEqual(expect.arrayContaining(['my-custom-folder/**']));
    });

    test('should preserve order with default patterns first', () => {
      const userIgnores = ['user-pattern-1', 'user-pattern-2'];
      const result = ignores(userIgnores);
      const config = result[0]!;

      const ignoresArray = config.ignores!;
      const userPatternStart = ignoresArray.indexOf('user-pattern-1');
      const nodeModulesIndex = ignoresArray.indexOf('**/node_modules');

      // User patterns should come after default patterns
      expect(userPatternStart).toBeGreaterThan(nodeModulesIndex);
      expect(ignoresArray).toEqual(expect.arrayContaining(['user-pattern-1', 'user-pattern-2']));
    });
  });

  describe('function behavior', () => {
    test('should call tseslint.config with correct parameters', async () => {
      const tseslint = await import('typescript-eslint');
      const configSpy = vi.mocked(tseslint.default.config);

      const userIgnores = ['test-pattern'];
      ignores(userIgnores);

      expect(configSpy).toHaveBeenCalledTimes(1);
      expect(configSpy).toHaveBeenCalledWith({
        name: 'fabdeh/ignores',
        ignores: expect.arrayContaining([
          '**/node_modules', // default pattern
          'test-pattern', // user pattern
        ]),
      });
    });

    test('should return TypedConfigArray from tseslint.config', () => {
      const result = ignores();

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
      // Should accept optional string array parameter
      expect(ignores).toHaveLength(0); // Optional parameter

      // Should work with different parameter types
      expect(() => ignores()).not.toThrow();
      expect(() => ignores([])).not.toThrow();
      expect(() => ignores(['pattern'])).not.toThrow();
    });
  });

  describe('configuration structure validation', () => {
    test('should only have ignores property in config object', () => {
      const result = ignores();
      const config = result[0]!;

      expect(Object.keys(config)).toEqual(['name', 'ignores']);
      expect(config).not.toHaveProperty('files');
      expect(config).not.toHaveProperty('rules');
      expect(config).not.toHaveProperty('plugins');
    });

    test('should have proper config name format', () => {
      const result = ignores();
      const config = result[0]!;

      expect(config.name).toBe('fabdeh/ignores');
      expect(config.name).toMatch(/^fabdeh\/[a-z]+$/);
    });

    test('should return exactly one configuration object', () => {
      const result = ignores(['test']);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeDefined();
    });
  });

  describe('glob pattern validation', () => {
    test('should include common build and dependency folders', () => {
      const result = ignores();
      const config = result[0]!;

      const expectedPatterns = [
        '**/node_modules',
        '**/dist',
        '**/coverage',
        '**/temp',
        '**/.temp',
        '**/tmp',
        '**/.tmp',
        '**/.cache',
        '**/output',
        '**/.output',
      ];

      for (const pattern of expectedPatterns) {
        expect(config.ignores).toEqual(expect.arrayContaining([pattern]));
      }
    });

    test('should include common lock and meta files', () => {
      const result = ignores();
      const config = result[0]!;

      const expectedPatterns = [
        '**/package-lock.json',
        '**/yarn.lock',
        '**/pnpm-lock.yaml',
        '**/bun.lockb',
        '**/CHANGELOG*.md',
        '**/*.min.*',
        '**/LICENSE*',
      ];

      for (const pattern of expectedPatterns) {
        expect(config.ignores).toEqual(expect.arrayContaining([pattern]));
      }
    });

    test('should include framework-specific folders', () => {
      const result = ignores();
      const config = result[0]!;

      const expectedPatterns = [
        '**/.nuxt',
        '**/.next',
        '**/.svelte-kit',
        '**/.vercel',
        '**/.vitepress/cache',
      ];

      for (const pattern of expectedPatterns) {
        expect(config.ignores).toEqual(expect.arrayContaining([pattern]));
      }
    });
  });
});
