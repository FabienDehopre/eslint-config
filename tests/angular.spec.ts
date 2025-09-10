import type { AngularOptions } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { angular } from '../src/configs/angular';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((...configs: unknown[]) => configs),
  },
}));

vi.mock('../src/shared/utils', () => ({
  interopDefault: vi.fn(),
}));

// Mock angular-eslint module
const MOCK_ANGULAR_ESLINT = {
  tsPlugin: { name: 'angular-eslint-ts' },
  templatePlugin: { name: 'angular-eslint-template' },
  templateParser: { name: 'angular-eslint-template-parser' },
  processInlineTemplates: { name: 'angular-eslint-inline-processor' },
  configs: {
    tsRecommended: [
      {
        name: 'angular-eslint/ts-recommended',
        rules: {
          '@angular-eslint/component-class-suffix': 'error',
          '@angular-eslint/directive-class-suffix': 'error',
        },
      },
    ],
    templateRecommended: [
      {
        name: 'angular-eslint/template-recommended',
        rules: {
          '@angular-eslint/template/banana-in-box': 'error',
          '@angular-eslint/template/no-negated-async': 'error',
        },
      },
    ],
    templateAccessibility: [
      {
        name: 'angular-eslint/template-accessibility',
        rules: {
          '@angular-eslint/template/alt-text': 'error',
          '@angular-eslint/template/click-events-have-key-events': 'error',
        },
      },
    ],
  },
};

describe('angular', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock interopDefault to return our mock angular-eslint
    const { interopDefault } = await import('../src/shared/utils');
    vi.mocked(interopDefault).mockResolvedValue(MOCK_ANGULAR_ESLINT);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should apply all default values correctly', async () => {
      const result = await angular();

      expect(result).toHaveLength(2);

      // Check TypeScript configuration
      const tsConfig = result.at(0);
      expect(tsConfig?.name).toBe('fabdeh/angular/rules');
      expect(tsConfig?.plugins).toEqual({ '@angular-eslint': MOCK_ANGULAR_ESLINT.tsPlugin });
      expect(tsConfig?.processor).toBe(MOCK_ANGULAR_ESLINT.processInlineTemplates);
      expect(tsConfig?.files).toEqual(['**/*.?([cm])ts?(x)']);

      // Check default option values are applied to rules
      expect(tsConfig?.rules).toMatchObject({
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'app', style: 'kebab-case' },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'app', style: 'camelCase' },
        ],
        '@angular-eslint/consistent-component-styles': ['error', 'string'],
        '@angular-eslint/prefer-on-push-component-change-detection': 'error',
        '@angular-eslint/no-experimental': 'error',
        '@angular-eslint/no-developer-preview': 'error',
        '@angular-eslint/use-injectable-provided-in': 'error',
      });

      // Check HTML configuration
      const htmlConfig = result.at(1);
      expect(htmlConfig?.name).toBe('fabdeh/angular-template/rules');
      expect(htmlConfig?.plugins).toEqual({ '@angular-eslint/template': MOCK_ANGULAR_ESLINT.templatePlugin });
      expect(htmlConfig?.languageOptions?.parser).toBe(MOCK_ANGULAR_ESLINT.templateParser);
      expect(htmlConfig?.files).toEqual(['**/*.htm?(l)']);

      // Check accessibility rules are included by default
      expect(htmlConfig?.rules).toMatchObject({
        '@angular-eslint/template/alt-text': 'error',
        '@angular-eslint/template/click-events-have-key-events': 'error',
      });
    });
  });

  describe('enableAccessibilityRules option', () => {
    test('should include accessibility rules when true', async () => {
      const result = await angular({ enableAccessibilityRules: true });

      const htmlConfig = result.at(1);
      expect(htmlConfig?.rules).toMatchObject({
        '@angular-eslint/template/alt-text': 'error',
        '@angular-eslint/template/click-events-have-key-events': 'error',
      });
    });

    test('should exclude accessibility rules when false', async () => {
      const result = await angular({ enableAccessibilityRules: false });

      const htmlConfig = result.at(1);
      expect(htmlConfig?.rules).not.toHaveProperty('@angular-eslint/template/alt-text');
      expect(htmlConfig?.rules).not.toHaveProperty('@angular-eslint/template/click-events-have-key-events');
    });
  });

  describe('preferOnPushOnly option', () => {
    test('should include prefer-on-push rule when true', async () => {
      const result = await angular({ preferOnPushOnly: true });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toHaveProperty('@angular-eslint/prefer-on-push-component-change-detection', 'error');
    });

    test('should exclude prefer-on-push rule when false', async () => {
      const result = await angular({ preferOnPushOnly: false });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).not.toHaveProperty('@angular-eslint/prefer-on-push-component-change-detection');
    });
  });

  describe('banExperimentalApi option', () => {
    test('should include no-experimental rule when true', async () => {
      const result = await angular({ banExperimentalApi: true });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toHaveProperty('@angular-eslint/no-experimental', 'error');
    });

    test('should exclude no-experimental rule when false', async () => {
      const result = await angular({ banExperimentalApi: false });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).not.toHaveProperty('@angular-eslint/no-experimental');
    });
  });

  describe('banDeveloperPreviewApi option', () => {
    test('should include no-developer-preview rule when true', async () => {
      const result = await angular({ banDeveloperPreviewApi: true });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toHaveProperty('@angular-eslint/no-developer-preview', 'error');
    });

    test('should exclude no-developer-preview rule when false', async () => {
      const result = await angular({ banDeveloperPreviewApi: false });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).not.toHaveProperty('@angular-eslint/no-developer-preview');
    });
  });

  describe('componentStylesMode option', () => {
    test('should use "string" mode correctly', async () => {
      const result = await angular({ componentStylesMode: 'string' });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toHaveProperty('@angular-eslint/consistent-component-styles', ['error', 'string']);
    });

    test('should use "array" mode correctly', async () => {
      const result = await angular({ componentStylesMode: 'array' });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toHaveProperty('@angular-eslint/consistent-component-styles', ['error', 'array']);
    });
  });

  describe('prefix option', () => {
    test('should use string prefix correctly', async () => {
      const result = await angular({ prefix: 'my-app' });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toMatchObject({
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'my-app', style: 'kebab-case' },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'my-app', style: 'camelCase' },
        ],
      });
    });

    test('should use array prefix correctly', async () => {
      const result = await angular({ prefix: ['app', 'shared'] });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toMatchObject({
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: ['app', 'shared'], style: 'kebab-case' },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: ['app', 'shared'], style: 'camelCase' },
        ],
      });
    });
  });

  describe('ignoreClassNamePatternForInjectableProvidedIn option', () => {
    test('should add pattern to use-injectable-provided-in rule when provided', async () => {
      const pattern = '^.*Service$';
      const result = await angular({ ignoreClassNamePatternForInjectableProvidedIn: pattern });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toHaveProperty('@angular-eslint/use-injectable-provided-in', ['error', { ignoreClassNamePattern: pattern }]);
    });

    test('should use simple error level when pattern is not provided', async () => {
      const result = await angular();

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toHaveProperty('@angular-eslint/use-injectable-provided-in', 'error');
    });
  });

  describe('tsOverrides and htmlOverrides options', () => {
    test('should merge tsOverrides into TypeScript configuration', async () => {
      const tsOverrides = {
        '@angular-eslint/component-selector': 'off' as const,
        'max-lines': ['error', 300] as ['error', 300],
      };

      const result = await angular({ tsOverrides });

      const tsConfig = result.at(0);
      expect(tsConfig?.rules).toMatchObject(tsOverrides);
      expect(tsConfig?.rules?.['@angular-eslint/component-selector']).toBe('off');
      expect(tsConfig?.rules?.['max-lines']).toEqual(['error', 300]);
    });

    test('should merge htmlOverrides into HTML configuration', async () => {
      const htmlOverrides = {
        '@angular-eslint/template/no-any': 'off' as const,
        '@angular-eslint/template/button-has-type': 'warn' as const,
      };

      const result = await angular({ htmlOverrides });

      const htmlConfig = result.at(1);
      expect(htmlConfig?.rules).toMatchObject(htmlOverrides);
      expect(htmlConfig?.rules?.['@angular-eslint/template/no-any']).toBe('off');
      expect(htmlConfig?.rules?.['@angular-eslint/template/button-has-type']).toBe('warn');
    });

    test('should merge both override options together', async () => {
      const tsOverrides = { '@angular-eslint/component-selector': 'off' as const };
      const htmlOverrides = { '@angular-eslint/template/no-any': 'warn' as const };

      const result = await angular({ tsOverrides, htmlOverrides });

      const tsConfig = result.at(0);
      const htmlConfig = result.at(1);

      expect(tsConfig?.rules).toMatchObject(tsOverrides);
      expect(htmlConfig?.rules).toMatchObject(htmlOverrides);
    });
  });

  describe('configuration structure validation', () => {
    test('should return array with exactly 2 configurations', async () => {
      const result = await angular();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(2);
    });

    test('should have correctly structured TypeScript configuration', async () => {
      const result = await angular();
      const tsConfig = result.at(0);

      expect(tsConfig).toMatchObject({
        name: 'fabdeh/angular/rules',
        plugins: { '@angular-eslint': MOCK_ANGULAR_ESLINT.tsPlugin },
        processor: MOCK_ANGULAR_ESLINT.processInlineTemplates,
        files: ['**/*.?([cm])ts?(x)'],
        rules: expect.any(Object),
      });

      // Verify it includes base rules from angular-eslint
      expect(tsConfig?.rules).toMatchObject({
        '@angular-eslint/component-class-suffix': 'error',
        '@angular-eslint/directive-class-suffix': 'error',
      });
    });

    test('should have correctly structured HTML configuration', async () => {
      const result = await angular();
      const htmlConfig = result.at(1);

      expect(htmlConfig).toMatchObject({
        name: 'fabdeh/angular-template/rules',
        plugins: { '@angular-eslint/template': MOCK_ANGULAR_ESLINT.templatePlugin },
        languageOptions: {
          parser: MOCK_ANGULAR_ESLINT.templateParser,
        },
        files: ['**/*.htm?(l)'],
        rules: expect.any(Object),
      });

      // Verify it includes base rules from angular-eslint
      expect(htmlConfig?.rules).toMatchObject({
        '@angular-eslint/template/banana-in-box': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
      });
    });

    test('should call interopDefault with correct import', async () => {
      const { interopDefault } = await import('../src/shared/utils');

      await angular();

      expect(vi.mocked(interopDefault)).toHaveBeenCalledTimes(1);
      // We can't easily test the exact import call, but we can verify it was called
      expect(vi.mocked(interopDefault)).toHaveBeenCalledWith(expect.any(Promise));
    });
  });

  describe('complex option combinations', () => {
    test('should handle all options set to non-default values', async () => {
      const options: AngularOptions = {
        enableAccessibilityRules: false,
        prefix: ['custom', 'app'],
        componentStylesMode: 'array',
        preferOnPushOnly: false,
        banExperimentalApi: false,
        banDeveloperPreviewApi: false,
        ignoreClassNamePatternForInjectableProvidedIn: '^Test.*$',
        tsOverrides: { '@angular-eslint/component-selector': 'warn' as const },
        htmlOverrides: { '@angular-eslint/template/no-any': 'off' as const },
      };

      const result = await angular(options);

      const tsConfig = result.at(0);
      const htmlConfig = result.at(1);

      // Verify boolean options work correctly
      expect(tsConfig?.rules).not.toHaveProperty('@angular-eslint/prefer-on-push-component-change-detection');
      expect(tsConfig?.rules).not.toHaveProperty('@angular-eslint/no-experimental');
      expect(tsConfig?.rules).not.toHaveProperty('@angular-eslint/no-developer-preview');
      expect(htmlConfig?.rules).not.toHaveProperty('@angular-eslint/template/alt-text');

      // Verify other options work correctly
      expect(tsConfig?.rules).toMatchObject({
        '@angular-eslint/component-selector': 'warn', // Override applied
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: ['custom', 'app'], style: 'camelCase' },
        ],
        '@angular-eslint/consistent-component-styles': ['error', 'array'],
        '@angular-eslint/use-injectable-provided-in': ['error', { ignoreClassNamePattern: '^Test.*$' }],
      });

      expect(htmlConfig?.rules).toMatchObject({
        '@angular-eslint/template/no-any': 'off', // Override applied
      });
    });
  });
});
