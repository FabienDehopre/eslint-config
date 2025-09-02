import type { Stats } from 'node:fs';
import type { AngularOptions, CreateConfigOptions, CreateWorkspaceConfigOptions } from '../src/shared/types';

import process from 'node:process';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import {
  ensurePackages,
  findNearestPackageJsonName,
  getTsConfigFileName,
  getWorkspaceRoot,
  interopDefault,
  isPackageInScope,
  resolveSubOptions
} from '../src/shared/utils';

// Mock external dependencies
vi.mock('node:fs', () => ({
  statSync: vi.fn(),
}));

vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
}));

vi.mock('node:path', () => ({
  dirname: vi.fn(),
  join: vi.fn(),
  resolve: vi.fn(),
}));

vi.mock('local-pkg', () => ({
  isPackageExists: vi.fn(() => true), // Default to true for @fabdeh/eslint-config
}));

vi.mock('@clack/prompts', () => ({
  confirm: vi.fn(),
}));

vi.mock('@antfu/install-pkg', () => ({
  installPackage: vi.fn(),
}));

describe('utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.NX_WORKSPACE_ROOT;
    delete process.env.CI;
    process.stdout.isTTY = true;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('interopDefault', () => {
    test('should return default export when it exists', async () => {
      const moduleWithDefault = Promise.resolve({ default: 'defaultValue', other: 'value' });
      const result = await interopDefault(moduleWithDefault);
      expect(result).toBe('defaultValue');
    });

    test('should return the module itself when no default export exists', async () => {
      const moduleWithoutDefault = Promise.resolve({ other: 'value' });
      const result = await interopDefault(moduleWithoutDefault);
      expect(result).toEqual({ other: 'value' });
    });

    test('should handle modules with falsy default exports', async () => {
      const moduleWithFalsyDefault = Promise.resolve({ default: null });
      const result = await interopDefault(moduleWithFalsyDefault);
      expect(result).toEqual({ default: null });
    });

    test('should handle synchronous values', async () => {
      const syncValue = { default: 'syncDefault' };
      const result = await interopDefault(syncValue);
      expect(result).toBe('syncDefault');
    });
  });

  describe('getWorkspaceRoot', () => {
    beforeEach(async () => {
      const { statSync } = await import('node:fs');
      vi.mocked(statSync).mockImplementation(() => ({ isFile: () => true }) as unknown as Stats);
    });

    test('should return NX_WORKSPACE_ROOT environment variable when set', () => {
      process.env.NX_WORKSPACE_ROOT = '/custom/workspace';
      const result = getWorkspaceRoot('/some/dir', '/candidate');
      expect(result).toBe('/custom/workspace');
    });

    test('should return candidateRoot when reaching filesystem root', async () => {
      delete process.env.NX_WORKSPACE_ROOT;
      const { dirname } = await import('node:path');
      vi.mocked(dirname).mockReturnValueOnce('/some/dir'); // Same as input, simulating root

      const result = getWorkspaceRoot('/some/dir', '/candidate');
      expect(result).toBe('/candidate');
    });

    test('should find workspace root with nx.json file', async () => {
      delete process.env.NX_WORKSPACE_ROOT;

      // Mock path operations
      const { dirname, join } = await import('node:path');
      const { statSync } = await import('node:fs');

      vi.mocked(dirname).mockReturnValueOnce('/parent');
      vi.mocked(join)
        .mockReturnValueOnce('/some/dir/nx.json')
        .mockReturnValueOnce('/some/dir/nx')
        .mockReturnValueOnce('/some/dir/nx.bat');

      // Mock file existence check - nx.json exists
      vi.mocked(statSync).mockImplementation((path) => {
        if (path === '/some/dir/nx.json') {
          return { isFile: () => true } as unknown as Stats;
        }
        throw new Error('File not found');
      });

      const result = getWorkspaceRoot('/some/dir', '/candidate');
      expect(result).toBe('/some/dir');
    });

    test('should find workspace root with nx executable', async () => {
      delete process.env.NX_WORKSPACE_ROOT;

      const { dirname, join } = await import('node:path');
      const { statSync } = await import('node:fs');

      vi.mocked(dirname).mockReturnValueOnce('/parent');
      vi.mocked(join)
        .mockReturnValueOnce('/some/dir/nx.json')
        .mockReturnValueOnce('/some/dir/nx')
        .mockReturnValueOnce('/some/dir/nx.bat');

      // Mock file existence check - nx executable exists
      vi.mocked(statSync).mockImplementation((path) => {
        if (path === '/some/dir/nx') {
          return { isFile: () => true } as unknown as Stats;
        }
        throw new Error('File not found');
      });

      const result = getWorkspaceRoot('/some/dir', '/candidate');
      expect(result).toBe('/some/dir');
    });

    test('should return candidateRoot when recursing and finding nx package', async () => {
      delete process.env.NX_WORKSPACE_ROOT;

      const { dirname, join } = await import('node:path');
      const { statSync } = await import('node:fs');

      // Mock dirname for recursive calls
      vi.mocked(dirname).mockImplementation((dir) => {
        if (dir === '/some/dir') return '/parent';
        if (dir === '/parent') return '/';
        return dir;
      });

      vi.mocked(join).mockImplementation((dir, file) => `${dir}/${file}`);

      // Mock statSync to simulate the scenario:
      // 1. No nx files in /some/dir
      // 2. nx package exists in node_modules
      // 3. Continue recursion which eventually finds the candidate
      vi.mocked(statSync).mockImplementation((path) => {
        if (typeof path === 'string' && path.includes('node_modules/nx/package.json')) {
          return { isFile: () => true } as unknown as Stats;
        }
        throw new Error('File not found');
      });

      const result = getWorkspaceRoot('/some/dir', '/workspace-root');
      expect(result).toBe('/workspace-root');
    });
  });

  describe('getTsConfigFileName', () => {
    beforeEach(async () => {
      const { join } = await import('node:path');
      vi.mocked(join)
        .mockReturnValueOnce('/dir/tsconfig.base.json')
        .mockReturnValueOnce('/dir/tsconfig.json');
    });

    test('should return tsconfig.base.json when it exists', async () => {
      const { statSync } = await import('node:fs');
      vi.mocked(statSync).mockImplementation((path) => {
        if (path === '/dir/tsconfig.base.json') {
          return { isFile: () => true } as unknown as Stats;
        }
        throw new Error('File not found');
      });

      const result = getTsConfigFileName('/dir');
      expect(result).toBe('tsconfig.base.json');
    });

    test('should return tsconfig.json when tsconfig.base.json does not exist', async () => {
      const { statSync } = await import('node:fs');
      vi.mocked(statSync).mockImplementation((path) => {
        if (path === '/dir/tsconfig.json') {
          return { isFile: () => true } as unknown as Stats;
        }
        throw new Error('File not found');
      });

      const result = getTsConfigFileName('/dir');
      expect(result).toBe('tsconfig.json');
    });

    test('should return undefined when neither config file exists', async () => {
      const { statSync } = await import('node:fs');
      vi.mocked(statSync).mockImplementation(() => {
        throw new Error('File not found');
      });

      const result = getTsConfigFileName('/dir');
      expect(result).toBeUndefined();
    });

    test('should prefer tsconfig.base.json over tsconfig.json when both exist', async () => {
      const { statSync } = await import('node:fs');
      vi.mocked(statSync).mockImplementation(() => ({ isFile: () => true }) as unknown as Stats);

      const result = getTsConfigFileName('/dir');
      expect(result).toBe('tsconfig.base.json');
    });
  });

  describe('isPackageInScope', () => {
    test('should call isPackageExists with correct parameters', async () => {
      const { isPackageExists } = vi.mocked(await import('local-pkg'));
      isPackageExists.mockReturnValue(true);

      const result = isPackageInScope('test-package');

      expect(isPackageExists).toHaveBeenCalledWith('test-package', {
        paths: [expect.any(String)],
      });
      expect(result).toBeTruthy();
    });

    test('should return false when package does not exist', async () => {
      const { isPackageExists } = vi.mocked(await import('local-pkg'));
      isPackageExists.mockReturnValue(false);

      const result = isPackageInScope('non-existent-package');
      expect(result).toBeFalsy();
    });
  });

  describe('ensurePackages', () => {
    beforeEach(async () => {
      // Ensure we're in a proper test environment
      delete process.env.CI;
      process.stdout.isTTY = true;

      // Mock the IS_CWD_IN_SCOPE check by making isPackageExists return true for the config package
      const { isPackageExists } = vi.mocked(await import('local-pkg'));
      isPackageExists.mockImplementation((name, options) => {
        // When called with paths option (for scope check), return true
        if (options?.paths && name === '@fabdeh/eslint-config') {
          return true;
        }
        // For other calls (package existence checks), return false by default
        return false;
      });
    });

    test('should return early in CI environment', async () => {
      process.env.CI = 'true';
      const { confirm } = vi.mocked(await import('@clack/prompts'));

      await ensurePackages(['test-package']);

      expect(confirm).not.toHaveBeenCalled();
    });

    test('should return early when not in TTY', async () => {
      process.stdout.isTTY = false;
      const { confirm } = vi.mocked(await import('@clack/prompts'));

      await ensurePackages(['test-package']);

      expect(confirm).not.toHaveBeenCalled();
    });

    test('should return early when no packages need installation', async () => {
      const { isPackageExists } = vi.mocked(await import('local-pkg'));
      const { confirm } = vi.mocked(await import('@clack/prompts'));

      isPackageExists.mockReturnValue(true);

      await ensurePackages(['existing-package']);

      expect(confirm).not.toHaveBeenCalled();
    });

    test('should filter out undefined packages', async () => {
      const { isPackageExists } = vi.mocked(await import('local-pkg'));
      const { confirm } = vi.mocked(await import('@clack/prompts'));

      isPackageExists.mockReturnValue(true);

      await ensurePackages(['existing-package', undefined, 'another-package']);

      expect(confirm).not.toHaveBeenCalled();
    });

    test('should prompt user and install packages when confirmed', async () => {
      const { confirm } = vi.mocked(await import('@clack/prompts'));
      const { installPackage } = vi.mocked(await import('@antfu/install-pkg'));

      confirm.mockResolvedValue(true);
      installPackage.mockResolvedValue({ exitCode: 0, stdout: '', stderr: '' });

      await ensurePackages(['new-package']);

      expect(confirm).toHaveBeenCalledWith({
        message: 'Package is required for this config: new-package. Do you want to install them?',
      });
      expect(installPackage).toHaveBeenCalledWith(['new-package'], { dev: true });
    });

    test('should handle multiple packages in prompt message', async () => {
      const { confirm } = vi.mocked(await import('@clack/prompts'));

      confirm.mockResolvedValue(false);

      await ensurePackages(['package1', 'package2']);

      expect(confirm).toHaveBeenCalledWith({
        message: 'Packages are required for this config: package1, package2. Do you want to install them?',
      });
    });

    test('should not install packages when user declines', async () => {
      const { confirm } = vi.mocked(await import('@clack/prompts'));
      const { installPackage } = vi.mocked(await import('@antfu/install-pkg'));

      confirm.mockResolvedValue(false);

      await ensurePackages(['new-package']);

      expect(installPackage).not.toHaveBeenCalled();
    });
  });

  describe('findNearestPackageJsonName', () => {
    test('should return package name from nearest package.json', async () => {
      const { join } = await import('node:path');
      const { readFile } = await import('node:fs/promises');

      vi.mocked(join).mockReturnValueOnce('/test/dir/package.json');
      vi.mocked(readFile).mockResolvedValueOnce('{"name": "test-package"}');

      const result = await findNearestPackageJsonName('/test/dir');

      expect(result).toBe('test-package');
      expect(vi.mocked(readFile)).toHaveBeenCalledWith('/test/dir/package.json', 'utf8');
    });

    test('should recursively search parent directories', async () => {
      const { join, dirname } = await import('node:path');
      const { readFile } = await import('node:fs/promises');

      vi.mocked(join)
        .mockReturnValueOnce('/test/dir/package.json')
        .mockReturnValueOnce('/test/package.json');
      vi.mocked(dirname)
        .mockReturnValueOnce('/test')
        .mockReturnValueOnce('/');

      vi.mocked(readFile)
        .mockRejectedValueOnce(new Error('File not found'))
        .mockResolvedValueOnce('{"name": "parent-package"}');

      const result = await findNearestPackageJsonName('/test/dir');

      expect(result).toBe('parent-package');
    });

    test('should throw error when no package.json found', async () => {
      const { join, dirname } = await import('node:path');
      const { readFile } = await import('node:fs/promises');

      vi.mocked(join).mockReturnValue('/package.json');
      vi.mocked(dirname)
        .mockReturnValueOnce('/')
        .mockReturnValueOnce('/');

      vi.mocked(readFile).mockRejectedValue(new Error('File not found'));

      await expect(findNearestPackageJsonName('/test/dir')).rejects.toThrow('No package.json file found.');
    });

    test('should handle malformed JSON in package.json', async () => {
      const { join } = await import('node:path');
      const { readFile } = await import('node:fs/promises');

      vi.mocked(join).mockReturnValueOnce('/test/dir/package.json');
      vi.mocked(readFile).mockResolvedValueOnce('invalid json');

      await expect(findNearestPackageJsonName('/test/dir')).rejects.toThrow();
    });

    test('should use current working directory by default', async () => {
      const { join, resolve } = await import('node:path');
      const { readFile } = await import('node:fs/promises');

      vi.mocked(resolve).mockReturnValueOnce('/current/dir');
      vi.mocked(join).mockReturnValueOnce('/current/dir/package.json');
      vi.mocked(readFile).mockResolvedValueOnce('{"name": "current-package"}');

      const result = await findNearestPackageJsonName();

      expect(vi.mocked(resolve)).toHaveBeenCalledWith();
      expect(result).toBe('current-package');
    });
  });

  describe('resolveSubOptions', () => {
    test('should return empty object for boolean true', () => {
      const options: CreateConfigOptions = { typescript: true };
      const result = resolveSubOptions(options, 'typescript');
      expect(result).toEqual({});
    });

    test('should return empty object for boolean false', () => {
      const options: CreateConfigOptions = { typescript: false };
      const result = resolveSubOptions(options, 'typescript');
      expect(result).toEqual({});
    });

    test('should return the object value when not boolean', () => {
      const tsOptions = { parserOptions: { project: 'tsconfig.json' } };
      const options: CreateConfigOptions = { typescript: tsOptions };
      const result = resolveSubOptions(options, 'typescript');
      expect(result).toEqual(tsOptions);
    });

    test('should return empty object when option is undefined', () => {
      const options: CreateConfigOptions = {};
      const result = resolveSubOptions(options, 'typescript');
      expect(result).toEqual({});
    });

    test('should return empty object when option is null', () => {
      const options: CreateWorkspaceConfigOptions = { typescript: null as unknown as undefined };
      const result = resolveSubOptions(options, 'typescript');
      expect(result).toEqual({});
    });

    test('should handle nested object options correctly', () => {
      const angularOptions: AngularOptions = {
        prefix: 'app',
        preferOnPushOnly: true,
      };
      const options: CreateConfigOptions = { angular: angularOptions };
      const result = resolveSubOptions(options, 'angular');
      expect(result).toEqual(angularOptions);
    });
  });
});
