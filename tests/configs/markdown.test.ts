import { describe, expect, test } from 'vitest';

import { markdown } from '../../src/configs/markdown';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

describe('markdown', () => {
  describe('basic configuration', () => {
    test('should return valid ESLint config array', async () => {
      const config = await markdown();

      expect(validateEslintConfig(config)).toBeTruthy();
      expect(config).toHaveLength(5);
    });

    test('should include all required configs', async () => {
      const config = await markdown();

      expect(hasConfigWithName(config, 'fabdeh/markdown/setup')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/markdown/processor')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/markdown/parser')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/markdown/disables')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/markdown/rules')).toBeTruthy();
    });

    test('should include markdown plugin', async () => {
      const config = await markdown();
      const setupConfig = config.find((c) => c.name === 'fabdeh/markdown/setup');

      expect(setupConfig?.plugins?.markdown).toBeDefined();
    });

    test('should use default glob patterns when not specified', async () => {
      const config = await markdown();
      const processorConfig = config.find((c) => c.name === 'fabdeh/markdown/processor');

      expect(processorConfig?.files).toEqual(['**/*.md']);
    });
  });

  describe('files configuration', () => {
    test('should use custom files glob when provided', async () => {
      const customFiles = ['docs/**/*.md', 'README.md'];
      const config = await markdown({ files: customFiles });
      const processorConfig = config.find((c) => c.name === 'fabdeh/markdown/processor');
      const parserConfig = config.find((c) => c.name === 'fabdeh/markdown/parser');
      const rulesConfig = config.find((c) => c.name === 'fabdeh/markdown/rules');

      expect(processorConfig?.files).toEqual(customFiles);
      expect(parserConfig?.files).toEqual(customFiles);
      expect(rulesConfig?.files).toEqual(customFiles);
    });
  });

  describe('parser configuration', () => {
    test('should configure plain parser for markdown files', async () => {
      const config = await markdown();
      const parserConfig = config.find((c) => c.name === 'fabdeh/markdown/parser');

      expect(parserConfig?.languageOptions?.parser).toBeDefined();
      expect(parserConfig?.languageOptions?.parser?.meta?.name).toBe('parser-plain');
    });

    test('should have parseForESLint function in parser', async () => {
      const config = await markdown();
      const parserConfig = config.find((c) => c.name === 'fabdeh/markdown/parser');

      expect(parserConfig?.languageOptions?.parser?.parseForESLint).toBeTypeOf('function');
    });

    test('should parse empty code correctly', async () => {
      const config = await markdown();
      const parserConfig = config.find((c) => c.name === 'fabdeh/markdown/parser');
      const parser = parserConfig?.languageOptions?.parser;

      const result = parser?.parseForESLint?.('');

      expect(result).toBeDefined();
      expect(result?.ast?.type).toBe('Program');
      expect(result?.ast?.body).toEqual([]);
      expect(result?.ast?.loc).toEqual({ start: 0, end: 0 });
      expect(result?.ast?.range).toEqual([0, 0]);
      expect(result?.services?.isPlain).toBeTruthy();
    });

    test('should parse markdown code correctly', async () => {
      const config = await markdown();
      const parserConfig = config.find((c) => c.name === 'fabdeh/markdown/parser');
      const parser = parserConfig?.languageOptions?.parser;

      const code = '# Hello World\n\nThis is markdown.';
      const result = parser?.parseForESLint?.(code);

      expect(result).toBeDefined();
      expect(result?.ast?.type).toBe('Program');
      expect(result?.ast?.body).toEqual([]);
      expect(result?.ast?.loc?.end).toBe(code.length);
      expect(result?.ast?.range).toEqual([0, code.length]);
    });
  });

  describe('processor configuration', () => {
    test('should configure markdown processor with ignores', async () => {
      const config = await markdown();
      const processorConfig = config.find((c) => c.name === 'fabdeh/markdown/processor');

      expect(processorConfig?.processor).toBeDefined();
      expect(processorConfig?.ignores).toEqual(['**/*.md/*.md']);
    });
  });

  describe('disables configuration', () => {
    test('should disable type checking and specific rules for markdown code', async () => {
      const config = await markdown();
      const disablesConfig = config.find((c) => c.name === 'fabdeh/markdown/disables');

      expect(disablesConfig?.rules?.['no-console']).toBe('off');
      expect(disablesConfig?.rules?.['no-undef']).toBe('off');
      expect(disablesConfig?.rules?.['@typescript-eslint/no-unused-vars']).toBe('off');
      expect(disablesConfig?.rules?.['import-x/newline-after-import']).toBe('off');
    });

    test('should apply impliedStrict for markdown code', async () => {
      const config = await markdown();
      const disablesConfig = config.find((c) => c.name === 'fabdeh/markdown/disables');

      expect(disablesConfig?.languageOptions?.parserOptions?.ecmaFeatures?.impliedStrict).toBeTruthy();
    });
  });

  describe('rules configuration', () => {
    test('should include markdown rules', async () => {
      const config = await markdown();
      const rulesConfig = config.find((c) => c.name === 'fabdeh/markdown/rules');

      expect(rulesConfig?.rules?.['markdown/no-duplicate-headings']).toBe('error');
    });
  });

  describe('overrides configuration', () => {
    test('should apply custom overrides', async () => {
      const config = await markdown({
        overrides: {
          'no-console': 'warn',
          'custom-rule': 'error',
        },
      });
      const disablesConfig = config.find((c) => c.name === 'fabdeh/markdown/disables');

      expect(disablesConfig?.rules?.['no-console']).toBe('warn');
      expect(disablesConfig?.rules?.['custom-rule']).toBe('error');
    });

    test('should override disabled rules with custom values', async () => {
      const config = await markdown({
        overrides: {
          'no-undef': 'error',
          '@typescript-eslint/no-unused-vars': 'warn',
        },
      });
      const disablesConfig = config.find((c) => c.name === 'fabdeh/markdown/disables');

      expect(disablesConfig?.rules?.['no-undef']).toBe('error');
      expect(disablesConfig?.rules?.['@typescript-eslint/no-unused-vars']).toBe('warn');
    });
  });

  describe('combined options', () => {
    test('should work with all options combined', async () => {
      const config = await markdown({
        files: ['**/*.markdown', 'docs/**/*.md'],
        overrides: {
          'no-console': 'warn',
          'custom-rule': 'error',
        },
      });

      expect(validateEslintConfig(config)).toBeTruthy();

      const processorConfig = config.find((c) => c.name === 'fabdeh/markdown/processor');
      const disablesConfig = config.find((c) => c.name === 'fabdeh/markdown/disables');

      expect(processorConfig?.files).toEqual(['**/*.markdown', 'docs/**/*.md']);
      expect(disablesConfig?.rules?.['no-console']).toBe('warn');
      expect(disablesConfig?.rules?.['custom-rule']).toBe('error');
    });
  });
});
