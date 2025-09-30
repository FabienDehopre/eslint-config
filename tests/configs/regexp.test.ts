import { describe, expect, test } from 'vitest';

import { regexp } from '../../src/configs/regexp';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

describe('regexp', () => {
  test('should return valid ESLint config array', () => {
    const config = regexp();

    expect(validateEslintConfig(config)).toBeTruthy();
  });

  test('should include regexp rules config', () => {
    const config = regexp();

    expect(hasConfigWithName(config, 'fabdeh/regexp/rules')).toBeTruthy();
  });

  test('should use recommended rules by default', () => {
    const config = regexp();
    const regexpConfig = config.find((c) => c.name === 'fabdeh/regexp/rules');

    expect(regexpConfig?.rules).toBeDefined();
    expect(Object.keys(regexpConfig?.rules ?? {}).length).toBeGreaterThan(0);
  });

  test('should set all rules to warn when level is warn', () => {
    const config = regexp({ level: 'warn' });
    const regexpConfig = config.find((c) => c.name === 'fabdeh/regexp/rules');

    const rules = Object.values(regexpConfig?.rules ?? {});
    const allWarn = rules.every((rule) => rule === 'warn' || (Array.isArray(rule) && rule[0] === 'warn'));
    expect(allWarn).toBeTruthy();
  });

  test('should apply custom overrides', () => {
    const config = regexp({
      overrides: {
        'regexp/no-unused-capturing-group': 'off',
      },
    });
    const regexpConfig = config.find((c) => c.name === 'fabdeh/regexp/rules');

    expect(regexpConfig?.rules?.['regexp/no-unused-capturing-group']).toBe('off');
  });
});
