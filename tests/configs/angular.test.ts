import { describe, expect, test } from 'vitest';

import { angular } from '../../src/configs/angular';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

describe('angular', () => {
  describe('basic configuration', () => {
    test('should return valid ESLint config array', async () => {
      const config = await angular();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(config).toHaveLength(2);
    });

    test('should include TypeScript rules config', async () => {
      const config = await angular();

      expect(hasConfigWithName(config, 'fabdeh/angular/rules')).toBeTruthy();
    });

    test('should include template rules config', async () => {
      const config = await angular();

      expect(hasConfigWithName(config, 'fabdeh/angular-template/rules')).toBeTruthy();
    });

    test('should include angular-eslint plugins', async () => {
      const config = await angular();
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');
      const templateConfig = config.find((c) => c.name === 'fabdeh/angular-template/rules');

      expect(tsConfig?.plugins?.['@angular-eslint']).toBeDefined();
      expect(templateConfig?.plugins?.['@angular-eslint/template']).toBeDefined();
    });
  });

  describe('typeScript configuration options', () => {
    test('should use custom prefix for component and directive selectors', async () => {
      const config = await angular({ prefix: 'custom' });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      const componentSelectorRule = tsConfig?.rules?.['@angular-eslint/component-selector'] as [string, { prefix: string }];
      const directiveSelectorRule = tsConfig?.rules?.['@angular-eslint/directive-selector'] as [string, { prefix: string }];

      expect(componentSelectorRule[1].prefix).toBe('custom');
      expect(directiveSelectorRule[1].prefix).toBe('custom');
    });

    test('should use default prefix "app" when not specified', async () => {
      const config = await angular();
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      const componentSelectorRule = tsConfig?.rules?.['@angular-eslint/component-selector'] as [string, { prefix: string }];
      expect(componentSelectorRule[1].prefix).toBe('app');
    });

    test('should apply custom component styles mode', async () => {
      const config = await angular({ componentStylesMode: 'metadata' });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      const stylesRule = tsConfig?.rules?.['@angular-eslint/consistent-component-styles'] as [string, string];
      expect(stylesRule[1]).toBe('metadata');
    });

    test('should apply tsOverrides', async () => {
      const config = await angular({
        tsOverrides: {
          '@angular-eslint/component-max-inline-declarations': 'warn',
        },
      });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/component-max-inline-declarations']).toBe('warn');
    });
  });

  describe('conditional rules - banDeveloperPreviewApi', () => {
    test('should include no-developer-preview rule when banDeveloperPreviewApi is true', async () => {
      const config = await angular({ banDeveloperPreviewApi: true });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/no-developer-preview']).toBe('error');
    });

    test('should not include no-developer-preview rule when banDeveloperPreviewApi is false', async () => {
      const config = await angular({ banDeveloperPreviewApi: false });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/no-developer-preview']).toBeUndefined();
    });

    test('should include no-developer-preview rule by default', async () => {
      const config = await angular();
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/no-developer-preview']).toBe('error');
    });
  });

  describe('conditional rules - banExperimentalApi', () => {
    test('should include no-experimental rule when banExperimentalApi is true', async () => {
      const config = await angular({ banExperimentalApi: true });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/no-experimental']).toBe('error');
    });

    test('should not include no-experimental rule when banExperimentalApi is false', async () => {
      const config = await angular({ banExperimentalApi: false });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/no-experimental']).toBeUndefined();
    });

    test('should include no-experimental rule by default', async () => {
      const config = await angular();
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/no-experimental']).toBe('error');
    });
  });

  describe('conditional rules - preferOnPushOnly', () => {
    test('should include prefer-on-push rule when preferOnPushOnly is true', async () => {
      const config = await angular({ preferOnPushOnly: true });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/prefer-on-push-component-change-detection']).toBe('error');
    });

    test('should not include prefer-on-push rule when preferOnPushOnly is false', async () => {
      const config = await angular({ preferOnPushOnly: false });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/prefer-on-push-component-change-detection']).toBeUndefined();
    });

    test('should include prefer-on-push rule by default', async () => {
      const config = await angular();
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/prefer-on-push-component-change-detection']).toBe('error');
    });
  });

  describe('conditional rules - ignoreClassNamePatternForInjectableProvidedIn', () => {
    test('should apply ignoreClassNamePattern when provided', async () => {
      const config = await angular({
        ignoreClassNamePatternForInjectableProvidedIn: '^Abstract',
      });
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      const injectableRule = tsConfig?.rules?.['@angular-eslint/use-injectable-provided-in'] as [string, { ignoreClassNamePattern: string }];
      expect(injectableRule[0]).toBe('error');
      expect(injectableRule[1].ignoreClassNamePattern).toBe('^Abstract');
    });

    test('should use simple error when ignoreClassNamePattern is not provided', async () => {
      const config = await angular();
      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');

      expect(tsConfig?.rules?.['@angular-eslint/use-injectable-provided-in']).toBe('error');
    });
  });

  describe('template configuration options', () => {
    test('should include accessibility rules when enableAccessibilityRules is true', async () => {
      const config = await angular({ enableAccessibilityRules: true });
      const templateConfig = config.find((c) => c.name === 'fabdeh/angular-template/rules');

      // Should have accessibility rules included
      expect(Object.keys(templateConfig?.rules ?? {})).toContain('@angular-eslint/template/alt-text');
    });

    test('should not include accessibility rules when enableAccessibilityRules is false', async () => {
      const config = await angular({ enableAccessibilityRules: false });
      const templateConfig = config.find((c) => c.name === 'fabdeh/angular-template/rules');

      // Should not have accessibility rules
      expect(templateConfig?.rules?.['@angular-eslint/template/alt-text']).toBeUndefined();
    });

    test('should include accessibility rules by default', async () => {
      const config = await angular();
      const templateConfig = config.find((c) => c.name === 'fabdeh/angular-template/rules');

      // Should have accessibility rules included
      expect(Object.keys(templateConfig?.rules ?? {})).toContain('@angular-eslint/template/alt-text');
    });

    test('should apply htmlOverrides', async () => {
      const config = await angular({
        htmlOverrides: {
          '@angular-eslint/template/button-has-type': 'warn',
        },
      });
      const templateConfig = config.find((c) => c.name === 'fabdeh/angular-template/rules');

      expect(templateConfig?.rules?.['@angular-eslint/template/button-has-type']).toBe('warn');
    });
  });

  describe('combined options', () => {
    test('should work with all options combined', async () => {
      const config = await angular({
        prefix: 'my',
        enableAccessibilityRules: false,
        banDeveloperPreviewApi: false,
        banExperimentalApi: false,
        preferOnPushOnly: false,
        componentStylesMode: 'metadata',
        ignoreClassNamePatternForInjectableProvidedIn: '^Base',
        tsOverrides: {
          'max-classes-per-file': 'warn',
        },
        htmlOverrides: {
          '@angular-eslint/template/eqeqeq': 'warn',
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();

      const tsConfig = config.find((c) => c.name === 'fabdeh/angular/rules');
      const templateConfig = config.find((c) => c.name === 'fabdeh/angular-template/rules');

      // Check TypeScript config
      const componentSelectorRule = tsConfig?.rules?.['@angular-eslint/component-selector'] as [string, { prefix: string }];
      expect(componentSelectorRule[1].prefix).toBe('my');
      expect(tsConfig?.rules?.['@angular-eslint/no-developer-preview']).toBeUndefined();
      expect(tsConfig?.rules?.['@angular-eslint/no-experimental']).toBeUndefined();
      expect(tsConfig?.rules?.['@angular-eslint/prefer-on-push-component-change-detection']).toBeUndefined();
      expect(tsConfig?.rules?.['max-classes-per-file']).toBe('warn');

      // Check template config
      expect(templateConfig?.rules?.['@angular-eslint/template/alt-text']).toBeUndefined();
      expect(templateConfig?.rules?.['@angular-eslint/template/eqeqeq']).toBe('warn');
    });
  });
});
