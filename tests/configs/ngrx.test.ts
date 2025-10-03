import type { MockedFunction } from 'vitest';

import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ngrx } from '../../src/configs/ngrx';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

// Mock external dependencies
vi.mock('local-pkg');

describe('ngrx', () => {
  let mockIsPackageExists: MockedFunction<(pkg: string) => boolean>;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockIsPackageExists = vi.fn().mockReturnValue(false);
    const { isPackageExists } = await import('local-pkg');
    vi.mocked(isPackageExists).mockImplementation(mockIsPackageExists);
  });

  describe('basic configuration', () => {
    test('should return empty config when no options and packages are not detected', async () => {
      mockIsPackageExists.mockReturnValue(false);

      const config = await ngrx();

      expect(config).toHaveLength(0);
    });

    test('should return valid ESLint config array when packages are detected', async () => {
      mockIsPackageExists.mockReturnValue(true);

      const config = await ngrx();

      expect(validateEslintConfig(config)).toBeTruthy();
    });
  });

  describe('store configuration', () => {
    test('should include store config when @ngrx/store is detected', async () => {
      mockIsPackageExists.mockImplementation((pkg) => pkg === '@ngrx/store');

      const config = await ngrx();

      expect(hasConfigWithName(config, 'fabdeh/ngrx-store/rules')).toBeTruthy();
    });

    test('should include store config when store option is true', async () => {
      const config = await ngrx({ store: true });

      expect(hasConfigWithName(config, 'fabdeh/ngrx-store/rules')).toBeTruthy();
    });

    test('should use default store glob patterns', async () => {
      const config = await ngrx({ store: true });
      const storeConfig = config.find((c) => c.name === 'fabdeh/ngrx-store/rules');

      expect(storeConfig?.files).toEqual([
        '**/*.actions.?([cm])ts?(x)',
        '**/*.feature.?([cm])ts?(x)',
        '**/*.reducer.?([cm])ts?(x)',
        '**/*.state.?([cm])ts?(x)',
      ]);
    });

    test('should use custom store glob patterns when provided', async () => {
      const customFiles = ['**/custom.store.ts'];
      const config = await ngrx({ store: { files: customFiles } });
      const storeConfig = config.find((c) => c.name === 'fabdeh/ngrx-store/rules');

      expect(storeConfig?.files).toEqual(customFiles);
    });

    test('should include ngrx plugin in store config', async () => {
      const config = await ngrx({ store: true });
      const storeConfig = config.find((c) => c.name === 'fabdeh/ngrx-store/rules');

      expect(storeConfig?.plugins?.['@ngrx']).toBeDefined();
    });

    test('should apply store rule overrides', async () => {
      const config = await ngrx({
        store: {
          overrides: {
            '@ngrx/avoid-cyclic-effects': 'warn',
          },
        },
      });
      const storeConfig = config.find((c) => c.name === 'fabdeh/ngrx-store/rules');

      expect(storeConfig?.rules?.['@ngrx/avoid-cyclic-effects']).toBe('warn');
    });
  });

  describe('effects configuration', () => {
    test('should include effects config when @ngrx/effects is detected', async () => {
      mockIsPackageExists.mockImplementation((pkg) => pkg === '@ngrx/effects');

      const config = await ngrx();

      expect(hasConfigWithName(config, 'fabdeh/ngrx-effects/rules')).toBeTruthy();
    });

    test('should include effects config when effects option is true', async () => {
      const config = await ngrx({ effects: true });

      expect(hasConfigWithName(config, 'fabdeh/ngrx-effects/rules')).toBeTruthy();
    });

    test('should use default effects glob patterns', async () => {
      const config = await ngrx({ effects: true });
      const effectsConfig = config.find((c) => c.name === 'fabdeh/ngrx-effects/rules');

      expect(effectsConfig?.files).toEqual(['**/*.effects.?([cm])ts?(x)']);
    });

    test('should use custom effects glob patterns when provided', async () => {
      const customFiles = ['**/custom.effects.ts'];
      const config = await ngrx({ effects: { files: customFiles } });
      const effectsConfig = config.find((c) => c.name === 'fabdeh/ngrx-effects/rules');

      expect(effectsConfig?.files).toEqual(customFiles);
    });

    test('should apply effects rule overrides', async () => {
      const config = await ngrx({
        effects: {
          overrides: {
            '@ngrx/prefer-effect-callback-in-block-statement': 'warn',
          },
        },
      });
      const effectsConfig = config.find((c) => c.name === 'fabdeh/ngrx-effects/rules');

      expect(effectsConfig?.rules?.['@ngrx/prefer-effect-callback-in-block-statement']).toBe('warn');
    });
  });

  describe('signals configuration', () => {
    test('should include signals config when @ngrx/signals is detected', async () => {
      mockIsPackageExists.mockImplementation((pkg) => pkg === '@ngrx/signals');

      const config = await ngrx();

      expect(hasConfigWithName(config, 'fabdeh/ngrx-signals/rules')).toBeTruthy();
    });

    test('should include signals config when signals option is true', async () => {
      const config = await ngrx({ signals: true });

      expect(hasConfigWithName(config, 'fabdeh/ngrx-signals/rules')).toBeTruthy();
    });

    test('should use default signals glob patterns', async () => {
      const config = await ngrx({ signals: true });
      const signalsConfig = config.find((c) => c.name === 'fabdeh/ngrx-signals/rules');

      expect(signalsConfig?.files).toEqual(['**/*.store.?([cm])ts?(x)']);
    });

    test('should use custom signals glob patterns when provided', async () => {
      const customFiles = ['**/custom.signals.ts'];
      const config = await ngrx({ signals: { files: customFiles } });
      const signalsConfig = config.find((c) => c.name === 'fabdeh/ngrx-signals/rules');

      expect(signalsConfig?.files).toEqual(customFiles);
    });

    test('should apply signals rule overrides', async () => {
      const config = await ngrx({
        signals: {
          overrides: {
            '@ngrx/prefer-inline-action-props': 'warn',
          },
        },
      });
      const signalsConfig = config.find((c) => c.name === 'fabdeh/ngrx-signals/rules');

      expect(signalsConfig?.rules?.['@ngrx/prefer-inline-action-props']).toBe('warn');
    });
  });

  describe('operators configuration', () => {
    test('should include operators config when @ngrx/operators is detected with store', async () => {
      mockIsPackageExists.mockImplementation((pkg) =>
        pkg === '@ngrx/store' || pkg === '@ngrx/operators');

      const config = await ngrx();

      expect(hasConfigWithName(config, 'fabdeh/ngrx-operators/rules')).toBeTruthy();
    });

    test('should include operators config when enforceOperatorsRules is true for store', async () => {
      const config = await ngrx({ store: { enforceOperatorsRules: true } });

      expect(hasConfigWithName(config, 'fabdeh/ngrx-operators/rules')).toBeTruthy();
    });

    test('should include operators config when enforceOperatorsRules is true for effects', async () => {
      const config = await ngrx({ effects: { enforceOperatorsRules: true } });

      expect(hasConfigWithName(config, 'fabdeh/ngrx-operators/rules')).toBeTruthy();
    });

    test('should include operators config when enforceOperatorsRules is true for signals', async () => {
      const config = await ngrx({ signals: { enforceOperatorsRules: true } });

      expect(hasConfigWithName(config, 'fabdeh/ngrx-operators/rules')).toBeTruthy();
    });

    test('should not include operators config when not enabled', async () => {
      const config = await ngrx({ store: true });

      expect(hasConfigWithName(config, 'fabdeh/ngrx-operators/rules')).toBeFalsy();
    });

    test('should aggregate files from all enabled configs for operators', async () => {
      const config = await ngrx({
        store: { enforceOperatorsRules: true },
        effects: { enforceOperatorsRules: true },
      });
      const operatorsConfig = config.find((c) => c.name === 'fabdeh/ngrx-operators/rules');

      expect(operatorsConfig?.files).toEqual([
        [
          '**/*.actions.?([cm])ts?(x)',
          '**/*.feature.?([cm])ts?(x)',
          '**/*.reducer.?([cm])ts?(x)',
          '**/*.state.?([cm])ts?(x)',
        ],
        ['**/*.effects.?([cm])ts?(x)'],
      ]);
    });
  });

  describe('naming convention options', () => {
    test('should apply strict naming convention by default', async () => {
      const config = await ngrx({ store: true });
      const storeConfig = config.find((c) => c.name === 'fabdeh/ngrx-store/rules');

      expect(storeConfig?.rules?.['@typescript-eslint/naming-convention']).toBeDefined();
    });

    test('should apply relaxed naming convention when useRelaxedNamingConventionForCamelAndPascalCases is true', async () => {
      const config = await ngrx({
        store: true,
        useRelaxedNamingConventionForCamelAndPascalCases: true,
      });
      const storeConfig = config.find((c) => c.name === 'fabdeh/ngrx-store/rules');

      expect(storeConfig?.rules?.['@typescript-eslint/naming-convention']).toBeDefined();
    });
  });

  describe('combined configuration', () => {
    test('should include all configs when all packages are detected', async () => {
      mockIsPackageExists.mockReturnValue(true);

      const config = await ngrx();

      expect(hasConfigWithName(config, 'fabdeh/ngrx-store/rules')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/ngrx-effects/rules')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/ngrx-signals/rules')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/ngrx-operators/rules')).toBeTruthy();
    });

    test('should include all configs when all options are explicitly enabled', async () => {
      const config = await ngrx({
        store: true,
        effects: true,
        signals: true,
      });

      expect(hasConfigWithName(config, 'fabdeh/ngrx-store/rules')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/ngrx-effects/rules')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/ngrx-signals/rules')).toBeTruthy();
    });
  });
});
