import type { MockedFunction } from 'vitest';

import { join } from 'node:path';

import { beforeEach, describe, expect, test, vi } from 'vitest';

import { playwright } from '../../src/configs/playwright';
import { GLOB_TESTS } from '../../src/shared/globs';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

vi.mock('../../src/shared/utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('../../src/shared/utils')>();
  return {
    ...original,
    isDirectory: vi.fn(),
  };
});

describe('playwright', () => {
  let mockIsDirectory: MockedFunction<(path: import('node:fs').PathLike) => boolean>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { isDirectory } = await import('../../src/shared/utils');
    mockIsDirectory = vi.mocked(isDirectory);
    mockIsDirectory.mockReturnValue(true);
  });

  describe('when e2e folder does not exist', () => {
    test('should return empty array when e2eFolderPath is not a directory', async () => {
      mockIsDirectory.mockReturnValue(false);

      const config = await playwright();

      expect(config).toEqual([]);
    });

    test('should return empty array when custom e2eFolderPath does not exist', async () => {
      mockIsDirectory.mockReturnValue(false);

      const config = await playwright({ e2eFolderPath: 'tests/e2e' });

      expect(config).toEqual([]);
    });
  });

  describe('basic configuration', () => {
    test('should return valid ESLint config array when e2e folder exists', async () => {
      const config = await playwright();

      expect(validateEslintConfig(config)).toBeTruthy();
    });

    test('should include playwright rules config', async () => {
      const config = await playwright();

      expect(hasConfigWithName(config, 'fabdeh/playwright/rules')).toBeTruthy();
    });

    test('should include playwright plugin', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.plugins?.playwright).toBeDefined();
    });

    test('should contain exactly one config entry', async () => {
      const config = await playwright();

      expect(config).toHaveLength(1);
    });
  });

  describe('files configuration', () => {
    test('should use default e2e folder path when not specified', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      const expectedFiles = GLOB_TESTS.map((glob) => join('e2e', glob));
      expect(rulesConfig?.files).toEqual(expectedFiles);
    });

    test('should prepend custom e2eFolderPath to GLOB_TESTS when files not provided', async () => {
      const config = await playwright({ e2eFolderPath: 'tests/e2e' });
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      const expectedFiles = GLOB_TESTS.map((glob) => join('tests/e2e', glob));
      expect(rulesConfig?.files).toEqual(expectedFiles);
    });

    test('should use custom files glob when provided', async () => {
      const customFiles = ['e2e/**/*.spec.ts', 'e2e/**/*.test.ts'];
      const config = await playwright({ files: customFiles });
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.files).toEqual(customFiles);
    });

    test('should use custom files regardless of e2eFolderPath', async () => {
      const customFiles = ['custom/**/*.spec.ts'];
      const config = await playwright({ e2eFolderPath: 'tests/e2e', files: customFiles });
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.files).toEqual(customFiles);
    });

    test('should check existence of the e2eFolderPath directory', async () => {
      await playwright({ e2eFolderPath: 'custom-e2e' });

      expect(mockIsDirectory).toHaveBeenCalledWith('custom-e2e');
    });
  });

  describe('rules configuration', () => {
    test('should disable TypeScript strict rules', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['@typescript-eslint/consistent-type-assertions']).toBe('off');
      expect(rulesConfig?.rules?.['@typescript-eslint/no-empty-function']).toBe('off');
      expect(rulesConfig?.rules?.['@typescript-eslint/no-unsafe-assignment']).toBe('off');
      expect(rulesConfig?.rules?.['@typescript-eslint/no-unsafe-call']).toBe('off');
      expect(rulesConfig?.rules?.['@typescript-eslint/no-unsafe-member-access']).toBe('off');
      expect(rulesConfig?.rules?.['@typescript-eslint/unbound-method']).toBe('off');
    });

    test('should disable max-lines rule', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['max-lines']).toBe('off');
    });

    test('should disable unicorn/no-null rule', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['unicorn/no-null']).toBe('off');
    });

    test('should enable playwright/no-get-by-title as error', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['playwright/no-get-by-title']).toBe('error');
    });

    test('should enable playwright/no-nth-methods as error', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['playwright/no-nth-methods']).toBe('error');
    });

    test('should enable playwright comparison and equality matcher rules', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['playwright/prefer-comparison-matcher']).toBe('error');
      expect(rulesConfig?.rules?.['playwright/prefer-equality-matcher']).toBe('error');
    });

    test('should enable playwright/prefer-lowercase-title with HTTP method allowedPrefixes', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['playwright/prefer-lowercase-title']).toEqual([
        'error',
        { allowedPrefixes: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] },
      ]);
    });

    test('should enable playwright/prefer-native-locators as error', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['playwright/prefer-native-locators']).toBe('error');
    });

    test('should enable playwright/prefer-to-be and prefer-to-contain as error', async () => {
      const config = await playwright();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['playwright/prefer-to-be']).toBe('error');
      expect(rulesConfig?.rules?.['playwright/prefer-to-contain']).toBe('error');
    });
  });

  describe('overrides configuration', () => {
    test('should apply custom overrides', async () => {
      const config = await playwright({
        overrides: {
          'playwright/no-page-pause': 'off',
          'playwright/no-get-by-title': 'warn',
        },
      });
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['playwright/no-page-pause']).toBe('off');
      expect(rulesConfig?.rules?.['playwright/no-get-by-title']).toBe('warn');
    });

    test('should allow overrides to change rules set to error', async () => {
      const config = await playwright({
        overrides: {
          'playwright/prefer-to-be': 'warn',
        },
      });
      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');

      expect(rulesConfig?.rules?.['playwright/prefer-to-be']).toBe('warn');
    });
  });

  describe('combined options', () => {
    test('should work with all options combined', async () => {
      const customFiles = ['custom-e2e/**/*.spec.ts'];
      const config = await playwright({
        e2eFolderPath: 'custom-e2e',
        files: customFiles,
        overrides: {
          'playwright/no-page-pause': 'off',
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();

      const rulesConfig = config.find((c) => c.name === 'fabdeh/playwright/rules');
      expect(rulesConfig?.files).toEqual(customFiles);
      expect(rulesConfig?.plugins?.playwright).toBeDefined();
      expect(rulesConfig?.rules?.['playwright/no-page-pause']).toBe('off');
      expect(rulesConfig?.rules?.['playwright/prefer-to-be']).toBe('error');
    });
  });
});
