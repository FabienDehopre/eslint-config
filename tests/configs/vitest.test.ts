import type { MockedFunction } from 'vitest';

import { beforeEach, describe, expect, test, vi } from 'vitest';

import { vitest as vitestConfig } from '../../src/configs/vitest';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

// Mock external dependencies
vi.mock('local-pkg');

describe('vitest', () => {
  let mockIsPackageExists: MockedFunction<(pkg: string) => boolean>;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockIsPackageExists = vi.fn().mockReturnValue(false);
    const { isPackageExists } = await import('local-pkg');
    vi.mocked(isPackageExists).mockImplementation(mockIsPackageExists);
  });

  describe('basic configuration', () => {
    test('should return valid ESLint config array', async () => {
      const config = await vitestConfig();

      expect(validateEslintConfig(config)).toBeTruthy();
    });

    test('should include vitest rules config', async () => {
      const config = await vitestConfig();

      expect(hasConfigWithName(config, 'fabdeh/vitest/rules')).toBeTruthy();
    });

    test('should include vitest plugin', async () => {
      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.plugins?.vitest).toBeDefined();
    });

    test('should include vitest globals', async () => {
      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.languageOptions?.globals).toBeDefined();
    });

    test('should include vitest settings', async () => {
      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect((vitestConfigItem?.settings?.vitest as { typecheck: boolean }).typecheck).toBeTruthy();
    });
  });

  describe('jest-dom plugin', () => {
    test('should include jest-dom plugin when useJestDom is true', async () => {
      const config = await vitestConfig({ useJestDom: true });
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.plugins?.['jest-dom']).toBeDefined();
    });

    test('should not include jest-dom plugin when useJestDom is false', async () => {
      const config = await vitestConfig({ useJestDom: false });
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.plugins?.['jest-dom']).toBeUndefined();
    });

    test('should auto-detect jest-dom when @testing-library/jest-dom is installed', async () => {
      mockIsPackageExists.mockImplementation((pkg) => pkg === '@testing-library/jest-dom');

      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(mockIsPackageExists).toHaveBeenCalledWithExactlyOnceWith('@testing-library/jest-dom');
      expect(vitestConfigItem?.plugins?.['jest-dom']).toBeDefined();
    });
  });

  describe('testing-library plugin', () => {
    test('should include testing-library plugin when useTestingLibrary is true', async () => {
      const config = await vitestConfig({ useTestingLibrary: true });
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.plugins?.['testing-library']).toBeDefined();
    });

    test('should not include testing-library plugin when useTestingLibrary is false', async () => {
      const config = await vitestConfig({ useTestingLibrary: false });
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.plugins?.['testing-library']).toBeUndefined();
    });

    test('should auto-detect testing-library when @testing-library/angular is installed', async () => {
      mockIsPackageExists.mockImplementation((pkg) => pkg === '@testing-library/angular');

      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(mockIsPackageExists).toHaveBeenCalledWithExactlyOnceWith('@testing-library/angular');
      expect(vitestConfigItem?.plugins?.['testing-library']).toBeDefined();
    });
  });

  describe('combined plugins', () => {
    test('should include both jest-dom and testing-library when both are enabled', async () => {
      const config = await vitestConfig({
        useJestDom: true,
        useTestingLibrary: true,
      });
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.plugins?.vitest).toBeDefined();
      expect(vitestConfigItem?.plugins?.['jest-dom']).toBeDefined();
      expect(vitestConfigItem?.plugins?.['testing-library']).toBeDefined();
    });

    test('should include all plugins when both packages are detected', async () => {
      mockIsPackageExists.mockReturnValue(true);

      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.plugins?.vitest).toBeDefined();
      expect(vitestConfigItem?.plugins?.['jest-dom']).toBeDefined();
      expect(vitestConfigItem?.plugins?.['testing-library']).toBeDefined();
    });
  });

  describe('rules configuration', () => {
    test('should include vitest rules', async () => {
      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.rules?.['vitest/consistent-test-it']).toEqual(['error', { fn: 'test' }]);
      expect(vitestConfigItem?.rules?.['vitest/require-top-level-describe']).toBe('error');
    });

    test('should disable TypeScript strict rules for tests', async () => {
      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.rules?.['@typescript-eslint/no-unsafe-assignment']).toBe('off');
      expect(vitestConfigItem?.rules?.['@typescript-eslint/no-unsafe-call']).toBe('off');
      expect(vitestConfigItem?.rules?.['@typescript-eslint/unbound-method']).toBe('off');
    });

    test('should disable general strict rules for tests', async () => {
      const config = await vitestConfig();
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.rules?.['max-classes-per-file']).toBe('off');
      expect(vitestConfigItem?.rules?.['max-lines']).toBe('off');
    });
  });

  describe('overrides configuration', () => {
    test('should apply custom overrides', async () => {
      const config = await vitestConfig({
        overrides: {
          'vitest/consistent-test-it': 'warn',
          'custom-rule': 'error',
        },
      });
      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');

      expect(vitestConfigItem?.rules?.['vitest/consistent-test-it']).toBe('warn');
      expect(vitestConfigItem?.rules?.['custom-rule']).toBe('error');
    });
  });

  describe('combined options', () => {
    test('should work with all options combined', async () => {
      const config = await vitestConfig({
        useJestDom: true,
        useTestingLibrary: true,
        overrides: {
          'vitest/prefer-to-be': 'warn',
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();

      const vitestConfigItem = config.find((c) => c.name === 'fabdeh/vitest/rules');
      expect(vitestConfigItem?.plugins?.vitest).toBeDefined();
      expect(vitestConfigItem?.plugins?.['jest-dom']).toBeDefined();
      expect(vitestConfigItem?.plugins?.['testing-library']).toBeDefined();
      expect(vitestConfigItem?.rules?.['vitest/prefer-to-be']).toBe('warn');
    });
  });
});
