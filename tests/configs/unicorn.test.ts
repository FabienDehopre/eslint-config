import { describe, expect, test } from 'vitest';

import { unicorn } from '../../src/configs/unicorn';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

describe('unicorn', () => {
  test('should return valid ESLint config array', () => {
    const config = unicorn();

    expect(validateEslintConfig(config)).toBeTruthy();
  });

  test('should include unicorn rules config', () => {
    const config = unicorn();

    expect(hasConfigWithName(config, 'fabdeh/unicorn/rules')).toBeTruthy();
  });

  test('should include unicorn plugin', () => {
    const config = unicorn();
    const unicornConfig = config.find((c) => c.name === 'fabdeh/unicorn/rules');

    expect(unicornConfig?.plugins?.unicorn).toBeDefined();
  });

  test('should use custom rules when allRecommended is false', () => {
    const config = unicorn({ allRecommended: false });
    const unicornConfig = config.find((c) => c.name === 'fabdeh/unicorn/rules');

    expect(unicornConfig?.rules?.['unicorn/filename-case']).toBeDefined();
    expect(unicornConfig?.rules?.['unicorn/no-null']).toBe('error');
  });

  test('should use recommended rules when allRecommended is true', () => {
    const config = unicorn({ allRecommended: true });
    const unicornConfig = config.find((c) => c.name === 'fabdeh/unicorn/rules');

    expect(Object.keys(unicornConfig?.rules ?? {}).length).toBeGreaterThan(0);
  });
});
