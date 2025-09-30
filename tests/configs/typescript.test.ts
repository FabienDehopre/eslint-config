import { describe, expect, test } from 'vitest';

import { typescript } from '../../src/configs/typescript';
import { validateEslintConfig } from '../utils/test-helpers';

describe('typescript', () => {
  test('should return valid ESLint config array', async () => {
    const config = await typescript();

    expect(validateEslintConfig(config)).toBeTruthy();
  });

  test('should include TypeScript parser in setup', async () => {
    const config = await typescript();
    const setupConfig = config.find((c) => c.name?.includes('typescript/setup'));

    expect(setupConfig?.languageOptions?.parser).toBeDefined();
  });

  describe('project type - app', () => {
    test('should not include explicit-function-return-type for app type', async () => {
      const config = await typescript({ type: 'app' });
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/explicit-function-return-type']).toBeUndefined();
    });

    test('should include explicit-module-boundary-types for app type', async () => {
      const config = await typescript({ type: 'app' });
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/explicit-module-boundary-types']).toBe('error');
    });
  });

  describe('project type - lib', () => {
    test('should include explicit-function-return-type for lib type', async () => {
      const config = await typescript({ type: 'lib' });
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/explicit-function-return-type']).toEqual([
        'error',
        {
          allowExpressions: true,
          allowIIFEs: true,
        },
      ]);
    });

    test('should include explicit-module-boundary-types for lib type', async () => {
      const config = await typescript({ type: 'lib' });
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/explicit-module-boundary-types']).toBe('error');
    });
  });

  describe('project type - workspace', () => {
    test('should not include explicit-module-boundary-types for workspace type', async () => {
      const config = await typescript({ type: 'workspace' });
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/explicit-module-boundary-types']).toBeUndefined();
    });
  });

  describe('stylistic option', () => {
    test('should include stylistic rules when stylistic is true', async () => {
      const config = await typescript({ stylistic: true });
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules).toBeDefined();
    });

    test('should not include stylistic rules when stylistic is false', async () => {
      const config = await typescript({ stylistic: false });

      expect(validateEslintConfig(config)).toBeTruthy();
    });
  });

  describe('workspace project mode', () => {
    test('should use simplified rules for workspace projects', async () => {
      const config = await typescript({ type: 'lib' }, true);
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.plugins?.['unused-imports']).toBeUndefined();
      expect(rulesConfig?.rules?.['@typescript-eslint/explicit-module-boundary-types']).toBe('error');
    });

    test('should include explicit-function-return-type for lib workspace projects', async () => {
      const config = await typescript({ type: 'lib' }, true);
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/explicit-function-return-type']).toEqual([
        'error',
        {
          allowExpressions: true,
          allowIIFEs: true,
        },
      ]);
    });
  });

  describe('overrides', () => {
    test('should apply custom overrides', async () => {
      const config = await typescript({
        overrides: {
          '@typescript-eslint/no-unused-vars': 'warn',
        },
      });
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/no-unused-vars']).toBe('warn');
    });
  });

  describe('naming convention', () => {
    test('should use strict naming convention by default', async () => {
      const config = await typescript();
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/naming-convention']).toBeDefined();
    });

    test('should use relaxed naming convention when specified', async () => {
      const config = await typescript({
        useRelaxedNamingConventionForCamelAndPascalCases: true,
      });
      const rulesConfig = config.find((c) => c.name?.includes('typescript/rules'));

      expect(rulesConfig?.rules?.['@typescript-eslint/naming-convention']).toBeDefined();
    });
  });
});
