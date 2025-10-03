import { describe, expect, test } from 'vitest';

import { stylistic } from '../../src/configs/stylistic';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

describe('stylistic', () => {
  test('should return valid ESLint config array', async () => {
    const config = await stylistic();

    expect(validateEslintConfig(config)).toBeTruthy();
  });

  test('should include stylistic rules config', async () => {
    const config = await stylistic();

    expect(hasConfigWithName(config, 'fabdeh/stylistic/rules')).toBeTruthy();
  });

  test('should include stylistic plugin', async () => {
    const config = await stylistic();
    const stylisticConfig = config.find((c) => c.name === 'fabdeh/stylistic/rules');

    expect(stylisticConfig?.plugins?.['@stylistic']).toBeDefined();
  });

  test('should use default options when stylistic is true', async () => {
    const config = await stylistic({ stylistic: true });
    const stylisticConfig = config.find((c) => c.name === 'fabdeh/stylistic/rules');

    expect(stylisticConfig?.rules).toBeDefined();
  });

  test('should use custom options when stylistic is object', async () => {
    const config = await stylistic({
      stylistic: {
        semi: false,
        indent: 4,
        quotes: 'double',
      },
    });

    expect(validateEslintConfig(config)).toBeTruthy();
  });
});
