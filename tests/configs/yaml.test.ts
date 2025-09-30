import { describe, expect, test } from 'vitest';

import { yaml } from '../../src/configs/yaml';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

describe('yaml', () => {
  test('should return valid ESLint config array', async () => {
    const config = await yaml();

    expect(validateEslintConfig(config)).toBeTruthy();
  });

  test('should include yaml setup and rules configs', async () => {
    const config = await yaml();

    expect(hasConfigWithName(config, 'fabdeh/yaml/setup')).toBeTruthy();
    expect(hasConfigWithName(config, 'fabdeh/yaml/rules')).toBeTruthy();
  });

  test('should include yaml plugin', async () => {
    const config = await yaml();
    const setupConfig = config.find((c) => c.name === 'fabdeh/yaml/setup');

    expect(setupConfig?.plugins?.yaml).toBeDefined();
  });

  test('should include stylistic rules when stylistic is true', async () => {
    const config = await yaml({ stylistic: true });
    const rulesConfig = config.find((c) => c.name === 'fabdeh/yaml/rules');

    expect(rulesConfig?.rules?.['yaml/indent']).toBeDefined();
    expect(rulesConfig?.rules?.['yaml/quotes']).toBeDefined();
  });

  test('should not include stylistic rules when stylistic is false', async () => {
    const config = await yaml({ stylistic: false });
    const rulesConfig = config.find((c) => c.name === 'fabdeh/yaml/rules');

    expect(rulesConfig?.rules?.['yaml/indent']).toBeUndefined();
    expect(rulesConfig?.rules?.['yaml/quotes']).toBeUndefined();
  });

  test('should configure indent with custom value', async () => {
    const config = await yaml({ stylistic: { indent: 4 } });
    const rulesConfig = config.find((c) => c.name === 'fabdeh/yaml/rules');

    const indentRule = rulesConfig?.rules?.['yaml/indent'] as [string, number];
    expect(indentRule[1]).toBe(4);
  });

  test('should configure indent as 2 when indent is tab', async () => {
    const config = await yaml({ stylistic: { indent: 'tab' } });
    const rulesConfig = config.find((c) => c.name === 'fabdeh/yaml/rules');

    const indentRule = rulesConfig?.rules?.['yaml/indent'] as [string, number];
    expect(indentRule[1]).toBe(2);
  });

  test('should configure quotes with single', async () => {
    const config = await yaml({ stylistic: { quotes: 'single' } });
    const rulesConfig = config.find((c) => c.name === 'fabdeh/yaml/rules');

    const quotesRule = rulesConfig?.rules?.['yaml/quotes'] as [string, { prefer: string }];
    expect(quotesRule[1].prefer).toBe('single');
  });

  test('should configure quotes with double', async () => {
    const config = await yaml({ stylistic: { quotes: 'double' } });
    const rulesConfig = config.find((c) => c.name === 'fabdeh/yaml/rules');

    const quotesRule = rulesConfig?.rules?.['yaml/quotes'] as [string, { prefer: string }];
    expect(quotesRule[1].prefer).toBe('double');
  });

  test('should map backtick to single for quotes', async () => {
    const config = await yaml({ stylistic: { quotes: 'backtick' } });
    const rulesConfig = config.find((c) => c.name === 'fabdeh/yaml/rules');

    const quotesRule = rulesConfig?.rules?.['yaml/quotes'] as [string, { prefer: string }];
    expect(quotesRule[1].prefer).toBe('single');
  });
});
