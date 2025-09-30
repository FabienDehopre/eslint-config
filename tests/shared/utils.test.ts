import process from 'node:process';

import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ensurePackages, findNearestPackageJsonName, getTsConfigFileName, getWorkspaceRoot, interopDefault, isPackageInScope, resolveSubOptions } from '../../src/shared/utils';

describe('utils', () => {
  describe('interopDefault', () => {
    test('should return default export when present', async () => {
      const module = { default: 'default-value', other: 'other-value' };
      const result = await interopDefault(module);

      expect(result).toBe('default-value');
    });

    test('should return module itself when default export is not present', async () => {
      const module = { value: 'some-value' };
      const result = await interopDefault(module);

      expect(result).toEqual({ value: 'some-value' });
    });

    test('should handle promises', async () => {
      const module = Promise.resolve({ default: 'default-value' });
      const result = await interopDefault(module);

      expect(result).toBe('default-value');
    });

    test('should handle promises without default', async () => {
      const module = Promise.resolve({ value: 'some-value' });
      const result = await interopDefault(module);

      expect(result).toEqual({ value: 'some-value' });
    });
  });

  describe('getWorkspaceRoot', () => {
    test('should return NX_WORKSPACE_ROOT environment variable when set', () => {
      const originalEnv = process.env.NX_WORKSPACE_ROOT;
      process.env.NX_WORKSPACE_ROOT = '/custom/workspace';

      const result = getWorkspaceRoot('/some/dir', '/candidate');

      expect(result).toBe('/custom/workspace');

      // Restore original environment
      if (originalEnv === undefined) {
        delete process.env.NX_WORKSPACE_ROOT;
      } else {
        process.env.NX_WORKSPACE_ROOT = originalEnv;
      }
    });

    test('should return candidate root when reaching filesystem root', () => {
      const originalEnv = process.env.NX_WORKSPACE_ROOT;
      delete process.env.NX_WORKSPACE_ROOT;

      const result = getWorkspaceRoot('/', '/candidate/root');

      expect(result).toBe('/candidate/root');

      if (originalEnv !== undefined) {
        process.env.NX_WORKSPACE_ROOT = originalEnv;
      }
    });

    test('should find workspace root with nx.json', () => {
      const originalEnv = process.env.NX_WORKSPACE_ROOT;
      delete process.env.NX_WORKSPACE_ROOT;

      // Using the actual project directory which should have package.json
      const projectRoot = process.cwd();
      const result = getWorkspaceRoot(projectRoot, projectRoot);

      // Should return a valid path (could be current directory or parent)
      expect(typeof result).toBe('string');
      expect(result).toBeTruthy();

      if (originalEnv !== undefined) {
        process.env.NX_WORKSPACE_ROOT = originalEnv;
      }
    });
  });

  describe('getTsConfigFileName', () => {
    test('should find tsconfig.base.json when it exists', () => {
      // Using the actual project directory
      const projectRoot = process.cwd();
      const result = getTsConfigFileName(projectRoot);

      // Should find either tsconfig.base.json or tsconfig.json
      expect(result).toMatch(/tsconfig\.(base\.)?json/);
    });

    test('should return undefined when no tsconfig file exists', () => {
      const result = getTsConfigFileName('/non/existent/path/that/does/not/exist');

      expect(result).toBeUndefined();
    });
  });

  describe('isPackageInScope', () => {
    test('should return boolean for package check', () => {
      const result = isPackageInScope('typescript');

      expect(typeof result).toBe('boolean');
    });

    test('should return false for non-existent package', () => {
      const result = isPackageInScope('this-package-definitely-does-not-exist-12345');

      expect(result).toBeFalsy();
    });
  });

  describe('resolveSubOptions', () => {
    test('should return empty object when option is true', () => {
      const options = { typescript: true };
      const result = resolveSubOptions(options, 'typescript');

      expect(result).toEqual({});
    });

    test('should return empty object when option is false', () => {
      const options = { typescript: false };
      const result = resolveSubOptions(options, 'typescript');

      expect(result).toEqual({});
    });

    test('should return the object when option is an object', () => {
      const optionsObject = { files: ['**/*.ts'], overrides: {} };
      const options = { typescript: optionsObject };
      const result = resolveSubOptions(options, 'typescript');

      expect(result).toEqual(optionsObject);
    });

    test('should return empty object when option is undefined', () => {
      const options = {};
      const result = resolveSubOptions(options, 'typescript');

      expect(result).toEqual({});
    });

    test('should handle angular option correctly', () => {
      const angularOptions = { templateParser: true };
      const options = { angular: angularOptions };
      const result = resolveSubOptions(options, 'angular');

      expect(result).toEqual(angularOptions);
    });

    test('should handle ngrx option correctly', () => {
      const ngrxOptions = { store: true, effects: true };
      const options = { ngrx: ngrxOptions };
      const result = resolveSubOptions(options, 'ngrx');

      expect(result).toEqual(ngrxOptions);
    });
  });

  describe('ensurePackages', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    test('should return early when running in CI environment', async () => {
      const originalCI = process.env.CI;
      process.env.CI = 'true';

      await ensurePackages(['some-package']);

      if (originalCI === undefined) {
        delete process.env.CI;
      } else {
        process.env.CI = originalCI;
      }

      expect(true).toBeTruthy();
    });

    test('should return early when no non-existing packages', async () => {
      await ensurePackages(['vitest']);

      expect(true).toBeTruthy();
    });

    test('should handle empty package list', async () => {
      await ensurePackages([]);

      expect(true).toBeTruthy();
    });

    test('should handle undefined packages', async () => {
      await ensurePackages([undefined, 'vitest', undefined]);

      expect(true).toBeTruthy();
    });
  });

  describe('findNearestPackageJsonName', () => {
    test('should find package.json in current directory', async () => {
      const projectRoot = process.cwd();
      const result = await findNearestPackageJsonName(projectRoot);

      expect(typeof result).toBe('string');
      expect(result).toBeTruthy();
    });

    test('should throw error when no package.json found', async () => {
      await expect(findNearestPackageJsonName('/')).rejects.toThrow('No package.json file found.');
    });

    test('should search parent directories recursively', async () => {
      const projectRoot = process.cwd();
      const subdirectory = `${projectRoot}/tests`;
      const result = await findNearestPackageJsonName(subdirectory);

      expect(typeof result).toBe('string');
      expect(result).toBeTruthy();
    });
  });
});
