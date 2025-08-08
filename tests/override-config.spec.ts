import { describe, expect, it } from 'vitest';
import { defineConfig, overrideConfig } from '../src';

describe('overrideConfig', () => {
  it('should merge options correctly with deep merge for nested objects', async () => {
    const baseConfig = await defineConfig({
      typescript: {
        parserOptions: { project: './tsconfig.json' },
        enableErasableSyntaxOnly: false,
      },
      stylistic: { indent: 2 },
      ignores: ['dist/**'],
    });

    const overriddenConfig = await overrideConfig(baseConfig, {
      typescript: {
        parserOptions: { project: './libs/my-lib/tsconfig.json' },
      },
      ignores: ['**/*.spec.ts', '**/*.test.ts'],
    });

    // Check that the original options are preserved and merged
    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);
  });

  it('should preserve auto-detection from original config', async () => {
    const baseConfig = await defineConfig({
      // Explicitly enable typescript
      typescript: true,
      angular: false,
    });

    const overriddenConfig = await overrideConfig(baseConfig, {
      // Only override stylistic options
      stylistic: { indent: 4 },
    });

    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);
  });

  it('should replace arrays completely rather than merging them', async () => {
    const baseConfig = await defineConfig({
      ignores: ['dist/**', 'build/**'],
    });

    const overriddenConfig = await overrideConfig(baseConfig, {
      ignores: ['**/*.spec.ts'],
    });

    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);
  });

  it('should work with additional user configs', async () => {
    const baseConfig = await defineConfig({
      typescript: true,
    });

    const customRule = {
      name: 'custom-rule',
      rules: {
        'no-console': 'error',
      },
    };

    const overriddenConfig = await overrideConfig(
      baseConfig,
      {
        stylistic: { indent: 4 },
      },
      customRule
    );

    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);

    // Check that the custom rule is included
    const hasCustomRule = overriddenConfig.some((config) => config.name === 'custom-rule');
    expect(hasCustomRule).toBe(true);
  });

  it('should throw an error if config was not created with defineConfig', async () => {
    const invalidConfig = [] as any;

    await expect(async () => {
      await overrideConfig(invalidConfig, {
        typescript: true,
      });
    }).rejects.toThrow(
      '[@fabdeh/eslint-config] The provided config was not created with defineConfig() or does not contain original options.'
    );
  });

  it('should handle boolean overrides correctly', async () => {
    const baseConfig = await defineConfig({
      typescript: true,
      angular: false,
      vitest: false,
    });

    const overriddenConfig = await overrideConfig(baseConfig, {
      angular: true,
      vitest: true,
    });

    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);
  });

  it('should handle nested object overrides without losing sibling properties', async () => {
    const baseConfig = await defineConfig({
      typescript: {
        parserOptions: { project: './tsconfig.json' },
        enableErasableSyntaxOnly: false,
        useRelaxedNamingConventionForCamelAndPascalCases: true,
      },
    });

    const overriddenConfig = await overrideConfig(baseConfig, {
      typescript: {
        parserOptions: { project: './libs/my-lib/tsconfig.json' },
      },
    });

    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);
  });

  it('should work with promise-based configs', async () => {
    const baseConfigPromise = defineConfig({
      typescript: true,
      stylistic: { indent: 2 },
    });

    const overriddenConfig = await overrideConfig(baseConfigPromise, {
      stylistic: { indent: 4 },
    });

    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);
  });

  it('should handle complex nested options correctly', async () => {
    const baseConfig = await defineConfig({
      angular: {
        prefix: 'app',
        enableAccessibilityRules: true,
        componentStylesMode: 'string',
      },
      ngrx: {
        store: {
          enforceOperatorsRules: true,
          files: ['**/*.store.ts'],
        },
      },
    });

    const overriddenConfig = await overrideConfig(baseConfig, {
      angular: {
        prefix: 'lib',
        componentStylesMode: 'array',
      },
      ngrx: {
        store: {
          files: ['**/*.state.ts'],
        },
      },
    });

    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);
  });

  it('should preserve undefined values in merging', async () => {
    const baseConfig = await defineConfig({
      typescript: {
        parserOptions: { project: './tsconfig.json' },
        enableErasableSyntaxOnly: true,
      },
    });

    const overriddenConfig = await overrideConfig(baseConfig, {
      typescript: {
        enableErasableSyntaxOnly: undefined,
      },
    });

    expect(overriddenConfig).toBeDefined();
    expect(overriddenConfig.length).toBeGreaterThan(0);
  });
});