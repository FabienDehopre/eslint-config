import { describe, expect, test } from 'vitest';

import { tailwindcss } from '../../src/configs/tailwindcss';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

describe('tailwindcss', () => {
  describe('basic configuration', () => {
    test('should return valid ESLint config array', async () => {
      const config = await tailwindcss();

      expect(validateEslintConfig(config)).toBeTruthy();
    });

    test('should include rules config', async () => {
      const config = await tailwindcss();

      expect(hasConfigWithName(config, '@fabdeh/tailwindcss/rules')).toBeTruthy();
    });

    test('should include better-tailwindcss plugin', async () => {
      const config = await tailwindcss();
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.plugins?.['better-tailwindcss']).toBeDefined();
    });

    test('should use default files glob when not specified', async () => {
      const config = await tailwindcss();
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.files).toEqual(['**/*.?([cm])[jt]s?(x)', '**/*.htm?(l)']);
    });
  });

  describe('files configuration', () => {
    test('should use custom files glob when provided', async () => {
      const customFiles = ['**/*.tsx', '**/*.jsx'];
      const config = await tailwindcss({ files: customFiles });
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.files).toEqual(customFiles);
    });
  });

  describe('parsers configuration', () => {
    test('should create parser configs when parsers option is provided', async () => {
      const mockParser = {};
      const config = await tailwindcss({
        parsers: {
          '**/*.custom': mockParser,
          '**/*.special': mockParser,
        },
      });

      expect(hasConfigWithName(config, 'fabdeh/tailwindcss/parser-1')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/tailwindcss/parser-2')).toBeTruthy();
    });

    test('should configure parser for each glob pattern', async () => {
      const mockParser1 = { name: 'parser1' };
      const mockParser2 = { name: 'parser2' };
      const config = await tailwindcss({
        parsers: {
          '**/*.custom': mockParser1,
          '**/*.special': mockParser2,
        },
      });

      const parser1Config = config.find((c) => c.name === 'fabdeh/tailwindcss/parser-1');
      const parser2Config = config.find((c) => c.name === 'fabdeh/tailwindcss/parser-2');

      expect(parser1Config?.languageOptions?.parser).toBe(mockParser1);
      expect(parser2Config?.languageOptions?.parser).toBe(mockParser2);
    });

    test('should use parser globs as files in rules config when parsers provided', async () => {
      const mockParser = {};
      const config = await tailwindcss({
        parsers: {
          '**/*.custom': mockParser,
          '**/*.special': mockParser,
        },
      });
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.files).toEqual(['**/*.custom', '**/*.special']);
    });

    test('should use unique parser globs as files', async () => {
      const mockParser = {};
      const config = await tailwindcss({
        parsers: {
          '**/*.custom': mockParser,
        },
      });
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.files).toEqual(['**/*.custom']);
    });
  });

  describe('enableAllRules option', () => {
    test('should include recommended rules when enableAllRules is false', async () => {
      const config = await tailwindcss({ enableAllRules: false });
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.rules).toBeDefined();
      expect(rulesConfig?.rules?.['better-tailwindcss/enforce-consistent-variable-syntax']).toBeUndefined();
    });

    test('should include additional rules when enableAllRules is true', async () => {
      const config = await tailwindcss({ enableAllRules: true });
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.rules?.['better-tailwindcss/enforce-consistent-variable-syntax']).toBe('warn');
      expect(rulesConfig?.rules?.['better-tailwindcss/no-conflicting-classes']).toBe('error');
      expect(rulesConfig?.rules?.['better-tailwindcss/no-restricted-classes']).toBe('error');
    });
  });

  describe('settings configuration', () => {
    test('should pass settings to better-tailwindcss', async () => {
      const customSettings = {
        callees: ['clsx', 'cn'],
        classRegex: '^class(Name)?$',
      };
      const config = await tailwindcss(customSettings);
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.settings?.['better-tailwindcss']).toEqual(customSettings);
    });

    test('should exclude non-setting options from settings', async () => {
      const config = await tailwindcss({
        files: ['**/*.tsx'],
        overrides: {},
        enableAllRules: true,
        customSetting: 'value',
      });
      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');

      expect(rulesConfig?.settings?.['better-tailwindcss']).toEqual({
        customSetting: 'value',
      });
    });
  });

  describe('combined options', () => {
    test('should work with all options combined', async () => {
      const mockParser = {};
      const config = await tailwindcss({
        parsers: {
          '**/*.custom': mockParser,
        },
        enableAllRules: true,
        callees: ['cn'],
      });

      expect(hasConfigWithName(config, 'fabdeh/tailwindcss/parser-1')).toBeTruthy();
      expect(hasConfigWithName(config, '@fabdeh/tailwindcss/rules')).toBeTruthy();

      const rulesConfig = config.find((c) => c.name === '@fabdeh/tailwindcss/rules');
      expect(rulesConfig?.rules?.['better-tailwindcss/enforce-consistent-variable-syntax']).toBe('warn');
      expect(rulesConfig?.settings?.['better-tailwindcss']).toEqual({
        callees: ['cn'],
      });
    });
  });
});
