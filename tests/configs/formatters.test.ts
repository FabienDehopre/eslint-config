import type { MockedFunction } from 'vitest';

import { beforeEach, describe, expect, test, vi } from 'vitest';

import { formatters } from '../../src/configs/formatters';
import { hasConfigWithName, validateEslintConfig } from '../utils/test-helpers';

// Mock external dependencies
vi.mock('local-pkg');

describe('formatters', () => {
  let mockIsPackageExists: MockedFunction<(pkg: string) => boolean>;

  beforeEach(async () => {
    vi.clearAllMocks();
    mockIsPackageExists = vi.fn();
    const { isPackageExists } = await import('local-pkg');
    vi.mocked(isPackageExists).mockImplementation(mockIsPackageExists);
  });

  describe('basic configuration', () => {
    test('should return valid ESLint config array with default options', async () => {
      const config = await formatters();

      expect(validateEslintConfig(config)).toBeTruthy();
    });

    test('should include setup config', async () => {
      const config = await formatters();

      expect(hasConfigWithName(config, 'fabdeh/formatter/setup')).toBeTruthy();
    });

    test('should not include any formatter configs with empty options', async () => {
      const config = await formatters({});

      expect(hasConfigWithName(config, 'fabdeh/formatter/css')).toBeFalsy();
      expect(hasConfigWithName(config, 'fabdeh/formatter/html')).toBeFalsy();
      expect(hasConfigWithName(config, 'fabdeh/formatter/markdown')).toBeFalsy();
    });
  });

  describe('options = true (auto-detection)', () => {
    test('should enable all formatters when options = true', async () => {
      mockIsPackageExists.mockReturnValue(false);

      const config = await formatters(true);

      expect(hasConfigWithName(config, 'fabdeh/formatter/css')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/formatter/html')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/formatter/markdown')).toBeTruthy();
      expect(hasConfigWithName(config, 'fabdeh/formatter/graphql')).toBeTruthy();
    });

    test('should auto-detect slidev when @slidev/cli is present', async () => {
      mockIsPackageExists.mockImplementation((pkg) => pkg === '@slidev/cli');

      const config = await formatters(true);

      expect(mockIsPackageExists).toHaveBeenCalledExactlyOnceWith('@slidev/cli');
      expect(hasConfigWithName(config, 'fabdeh/formatter/slidev')).toBeTruthy();
    });
  });

  describe('cSS formatters', () => {
    test('should include CSS formatter when css option is enabled', async () => {
      const config = await formatters({ css: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/css')).toBeTruthy();
    });

    test('should include SCSS formatter when css option is enabled', async () => {
      const config = await formatters({ css: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/scss')).toBeTruthy();
    });

    test('should include LESS formatter when css option is enabled', async () => {
      const config = await formatters({ css: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/less')).toBeTruthy();
    });

    test('should configure CSS formatter with correct parser', async () => {
      const config = await formatters({ css: true });
      const cssConfig = config.find((c) => c.name === 'fabdeh/formatter/css');

      expect(cssConfig?.rules?.['format/prettier']).toBeDefined();
      const ruleConfig = cssConfig?.rules?.['format/prettier'] as [string, { parser: string }];
      expect(ruleConfig[1].parser).toBe('css');
    });
  });

  describe('hTML formatter', () => {
    test('should include HTML formatter when html option is enabled', async () => {
      const config = await formatters({ html: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/html')).toBeTruthy();
    });

    test('should configure HTML formatter without Angular template parser by default', async () => {
      const config = await formatters({ html: true }, {}, false);
      const htmlConfig = config.find((c) => c.name === 'fabdeh/formatter/html');

      expect(htmlConfig?.languageOptions?.parser).toBeDefined();
    });

    test('should configure HTML formatter with Angular template parser when provided', async () => {
      const config = await formatters({ html: true }, {}, true);
      const htmlConfig = config.find((c) => c.name === 'fabdeh/formatter/html');

      expect(htmlConfig?.languageOptions?.parser).toBeUndefined();
    });
  });

  describe('xML and SVG formatters', () => {
    test('should include XML formatter when xml option is enabled', async () => {
      const config = await formatters({ xml: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/xml')).toBeTruthy();
    });

    test('should include SVG formatter when svg option is enabled', async () => {
      const config = await formatters({ svg: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/svg')).toBeTruthy();
    });

    test('should configure XML formatter with correct parser and plugins', async () => {
      const config = await formatters({ xml: true });
      const xmlConfig = config.find((c) => c.name === 'fabdeh/formatter/xml');

      expect(xmlConfig?.rules?.['format/prettier']).toBeDefined();
      const ruleConfig = xmlConfig?.rules?.['format/prettier'] as [string, { parser: string; plugins: string[] }];
      expect(ruleConfig[1].parser).toBe('xml');
      expect(ruleConfig[1].plugins).toContain('@prettier/plugin-xml');
    });
  });

  describe('markdown formatter', () => {
    test('should include Markdown formatter when markdown option is enabled', async () => {
      const config = await formatters({ markdown: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/markdown')).toBeTruthy();
    });

    test('should configure Markdown formatter with embeddedLanguageFormatting off', async () => {
      const config = await formatters({ markdown: true });
      const markdownConfig = config.find((c) => c.name === 'fabdeh/formatter/markdown');

      expect(markdownConfig?.rules?.['format/prettier']).toBeDefined();
      const ruleConfig = markdownConfig?.rules?.['format/prettier'] as [string, { embeddedLanguageFormatting: string }];
      expect(ruleConfig[1].embeddedLanguageFormatting).toBe('off');
    });

    test('should include slidev formatter when slidev option is true', async () => {
      const config = await formatters({ markdown: true, slidev: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/slidev')).toBeTruthy();
    });

    test('should configure slidev formatter with custom files', async () => {
      const config = await formatters({ markdown: true, slidev: { files: ['**/*.slides.md', '**/slides.md'] } });
      const slidevConfig = config.find((c) => c.name === 'fabdeh/formatter/slidev');

      expect(slidevConfig?.files).toEqual(['**/*.slides.md', '**/slides.md']);
    });

    test('should use default slidev files when slidev is true', async () => {
      const config = await formatters({ markdown: true, slidev: true });
      const slidevConfig = config.find((c) => c.name === 'fabdeh/formatter/slidev');

      expect(slidevConfig?.files).toEqual(['**/.slides.md']);
    });

    test('should configure markdown ignores with slidev files', async () => {
      const config = await formatters({ markdown: true, slidev: { files: ['**/custom.md'] } });
      const markdownConfig = config.find((c) => c.name === 'fabdeh/formatter/markdown');

      expect(markdownConfig?.ignores).toEqual(['**/custom.md']);
    });
  });

  describe('graphQL formatter', () => {
    test('should include GraphQL formatter when graphql option is enabled', async () => {
      const config = await formatters({ graphql: true });

      expect(hasConfigWithName(config, 'fabdeh/formatter/graphql')).toBeTruthy();
    });

    test('should configure GraphQL formatter with correct parser', async () => {
      const config = await formatters({ graphql: true });
      const graphqlConfig = config.find((c) => c.name === 'fabdeh/formatter/graphql');

      expect(graphqlConfig?.rules?.['format/prettier']).toBeDefined();
      const ruleConfig = graphqlConfig?.rules?.['format/prettier'] as [string, { parser: string }];
      expect(ruleConfig[1].parser).toBe('graphql');
    });
  });

  describe('stylistic options integration', () => {
    test('should apply custom indent to prettier options', async () => {
      const config = await formatters({ css: true }, { indent: 4 });
      const cssConfig = config.find((c) => c.name === 'fabdeh/formatter/css');

      const ruleConfig = cssConfig?.rules?.['format/prettier'] as [string, { tabWidth: number }];
      expect(ruleConfig[1].tabWidth).toBe(4);
    });

    test('should apply tab indent to prettier options', async () => {
      const config = await formatters({ css: true }, { indent: 'tab' });
      const cssConfig = config.find((c) => c.name === 'fabdeh/formatter/css');

      const ruleConfig = cssConfig?.rules?.['format/prettier'] as [string, { useTabs: boolean }];
      expect(ruleConfig[1].useTabs).toBeTruthy();
    });

    test('should apply single quotes to prettier options', async () => {
      const config = await formatters({ css: true }, { quotes: 'single' });
      const cssConfig = config.find((c) => c.name === 'fabdeh/formatter/css');

      const ruleConfig = cssConfig?.rules?.['format/prettier'] as [string, { singleQuote: boolean }];
      expect(ruleConfig[1].singleQuote).toBeTruthy();
    });

    test('should apply double quotes to prettier options', async () => {
      const config = await formatters({ css: true }, { quotes: 'double' });
      const cssConfig = config.find((c) => c.name === 'fabdeh/formatter/css');

      const ruleConfig = cssConfig?.rules?.['format/prettier'] as [string, { singleQuote: boolean }];
      expect(ruleConfig[1].singleQuote).toBeFalsy();
    });

    test('should apply semi option to prettier options', async () => {
      const config = await formatters({ css: true }, { semi: false });
      const cssConfig = config.find((c) => c.name === 'fabdeh/formatter/css');

      const ruleConfig = cssConfig?.rules?.['format/prettier'] as [string, { semi: boolean }];
      expect(ruleConfig[1].semi).toBeFalsy();
    });
  });

  describe('custom prettier options', () => {
    test('should merge custom prettier options', async () => {
      const config = await formatters({ css: true, options: { printWidth: 80 } });
      const cssConfig = config.find((c) => c.name === 'fabdeh/formatter/css');

      const ruleConfig = cssConfig?.rules?.['format/prettier'] as [string, { printWidth: number }];
      expect(ruleConfig[1].printWidth).toBe(80);
    });

    test('should preserve default options when not overridden', async () => {
      const config = await formatters({ css: true, options: { printWidth: 80 } });
      const cssConfig = config.find((c) => c.name === 'fabdeh/formatter/css');

      const ruleConfig = cssConfig?.rules?.['format/prettier'] as [string, { trailingComma: string }];
      expect(ruleConfig[1].trailingComma).toBe('all');
    });
  });
});
