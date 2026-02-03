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
});
