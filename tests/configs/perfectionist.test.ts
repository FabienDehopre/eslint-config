import { describe, expect, test, vi } from 'vitest';

import { perfectionist } from '../../src/configs/perfectionist';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

// Mock utilities
vi.mock('../../src/shared/utils', async () => {
  const actual = await vi.importActual('../../src/shared/utils');
  return {
    ...actual,
    findNearestPackageJsonName: vi.fn().mockResolvedValue('@some/package'),
    getWorkspaceRoot: vi.fn().mockReturnValue('/workspace/root'),
    getTsConfigFileName: vi.fn().mockReturnValue('tsconfig.json'),
  };
});

describe('perfectionist', () => {
  test('should return valid ESLint config array', async () => {
    const config = await perfectionist();

    expect(validateEslintConfig(config)).toBeTruthy();
  });

  test('should include perfectionist rules config', async () => {
    const config = await perfectionist();

    expect(hasConfigWithName(config, 'fabdeh/perfectionist/rules')).toBeTruthy();
  });

  test('should include perfectionist plugin', async () => {
    const config = await perfectionist();
    const perfectionistConfig = config.find((c) => c.name === 'fabdeh/perfectionist/rules');

    expect(perfectionistConfig?.plugins?.perfectionist).toBeDefined();
  });

  test('should configure sort-imports with tsconfig when not eslint-config package', async () => {
    const { findNearestPackageJsonName, getWorkspaceRoot, getTsConfigFileName } = await import('../../src/shared/utils');
    vi.mocked(findNearestPackageJsonName).mockResolvedValue('@some/package');
    vi.mocked(getWorkspaceRoot).mockReturnValue('/workspace/root');
    vi.mocked(getTsConfigFileName).mockReturnValue('tsconfig.json');

    const config = await perfectionist();
    const perfectionistConfig = config.find((c) => c.name === 'fabdeh/perfectionist/rules');

    const sortImportsRule = perfectionistConfig?.rules?.['perfectionist/sort-imports'] as [string, { tsconfig?: { rootDir: string; filename: string } }];
    expect(sortImportsRule[1].tsconfig).toEqual({
      rootDir: '/workspace/root',
      filename: 'tsconfig.json',
    });
  });

  test('should configure sort-imports without tsconfig when is eslint-config package', async () => {
    const { findNearestPackageJsonName } = await import('../../src/shared/utils');
    vi.mocked(findNearestPackageJsonName).mockResolvedValue('@fabdeh/eslint-config');

    const config = await perfectionist();
    const perfectionistConfig = config.find((c) => c.name === 'fabdeh/perfectionist/rules');

    const sortImportsRule = perfectionistConfig?.rules?.['perfectionist/sort-imports'] as [string, { tsconfig?: { rootDir: string; filename: string } }];
    expect(sortImportsRule[1].tsconfig).toBeUndefined();
  });
});
