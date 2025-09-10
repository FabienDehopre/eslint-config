/* eslint-disable @typescript-eslint/naming-convention */
import type { StylisticConfig } from '../src/shared/types';

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { formatters } from '../src/configs/formatters';

// Mock external dependencies
vi.mock('typescript-eslint', () => ({
  default: {
    config: vi.fn((configs: unknown[]) => configs),
  },
}));

vi.mock('../src/shared/utils', () => ({
  ensurePackages: vi.fn(),
  interopDefault: vi.fn(),
  isPackageInScope: vi.fn(),
}));

vi.mock('local-pkg', () => ({
  isPackageExists: vi.fn(),
}));

vi.mock('../src/configs/stylistic', () => ({
  STYLISTIC_CONFIG_DEFAULT: {
    semi: true,
    quotes: 'single',
    indent: 2,
  },
}));

// Mock eslint-plugin-format module
const MOCK_FORMAT_PLUGIN = {
  parserPlain: { name: 'format-parser-plain' },
};

describe('formatters', () => {
  beforeEach(async () => {
    vi.clearAllMocks();

    // Mock interopDefault to return our mock format plugin
    const { interopDefault } = await import('../src/shared/utils');
    vi.mocked(interopDefault).mockResolvedValue(MOCK_FORMAT_PLUGIN);

    // Mock ensurePackages to resolve immediately
    const { ensurePackages } = await import('../src/shared/utils');
    vi.mocked(ensurePackages).mockResolvedValue();

    // Default package scope checks
    const { isPackageInScope } = await import('../src/shared/utils');
    vi.mocked(isPackageInScope).mockReturnValue(false);

    const { isPackageExists } = await import('local-pkg');
    vi.mocked(isPackageExists).mockReturnValue(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('default options', () => {
    test('should return only setup config with empty options', async () => {
      const result = await formatters();

      expect(result).toHaveLength(1);

      const setupConfig = result.at(0);
      expect(setupConfig?.name).toBe('fabdeh/formatter/setup');
      expect(setupConfig?.plugins).toEqual({ format: MOCK_FORMAT_PLUGIN });
    });
  });

  describe('options = true (auto-detection)', () => {
    test('should auto-detect and enable basic formatters', async () => {
      const result = await formatters(true);

      expect(result.length).toBeGreaterThan(1);

      const setupConfig = result.at(0);
      expect(setupConfig?.name).toBe('fabdeh/formatter/setup');

      // Should have CSS, GraphQL, HTML, and Markdown configs enabled by default
      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/css');
      expect(configNames).toContain('fabdeh/formatter/scss');
      expect(configNames).toContain('fabdeh/formatter/less');
      expect(configNames).toContain('fabdeh/formatter/graphql');
      expect(configNames).toContain('fabdeh/formatter/html');
      expect(configNames).toContain('fabdeh/formatter/markdown');
    });

    test('should enable XML and SVG when @prettier/plugin-xml is in scope', async () => {
      const { isPackageInScope } = await import('../src/shared/utils');
      vi.mocked(isPackageInScope).mockImplementation((pkg) => pkg === '@prettier/plugin-xml');

      const result = await formatters(true);

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/xml');
      expect(configNames).toContain('fabdeh/formatter/svg');
    });

    test('should enable Slidev when @slidev/cli is available', async () => {
      const { isPackageExists } = await import('local-pkg');
      vi.mocked(isPackageExists).mockImplementation((pkg) => pkg === '@slidev/cli');

      const result = await formatters(true);

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/markdown');
      expect(configNames).toContain('fabdeh/formatter/slidev');
    });
  });

  describe('individual boolean options', () => {
    test('should add CSS formatters when css: true', async () => {
      const result = await formatters({ css: true });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/css');
      expect(configNames).toContain('fabdeh/formatter/scss');
      expect(configNames).toContain('fabdeh/formatter/less');

      // Check CSS config structure
      const cssConfig = result.find((config) => config.name === 'fabdeh/formatter/css');
      expect(cssConfig?.languageOptions?.parser).toBe(MOCK_FORMAT_PLUGIN.parserPlain);
      expect(cssConfig?.files).toEqual(['**/*.css', '**/*.{p,post}css']);
      expect(cssConfig?.rules).toHaveProperty('format/prettier');
    });

    test('should add HTML formatter when html: true', async () => {
      const result = await formatters({ html: true });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/html');

      const htmlConfig = result.find((config) => config.name === 'fabdeh/formatter/html');
      expect(htmlConfig?.languageOptions?.parser).toBe(MOCK_FORMAT_PLUGIN.parserPlain);
      expect(htmlConfig?.files).toEqual(['**/*.htm?(l)']);
      expect(htmlConfig?.rules).toHaveProperty('format/prettier');
    });

    test('should add XML formatter when xml: true', async () => {
      const result = await formatters({ xml: true });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/xml');

      const xmlConfig = result.find((config) => config.name === 'fabdeh/formatter/xml');
      expect(xmlConfig?.languageOptions?.parser).toBe(MOCK_FORMAT_PLUGIN.parserPlain);
      expect(xmlConfig?.files).toEqual(['**/*.xml']);
      expect(xmlConfig?.rules).toHaveProperty('format/prettier');

      // Check that it includes XML plugin
      const ruleOptions = xmlConfig?.rules?.['format/prettier'] as [string, object];
      expect(ruleOptions[1]).toMatchObject({ parser: 'xml', plugins: ['@prettier/plugin-xml'] });
    });

    test('should add SVG formatter when svg: true', async () => {
      const result = await formatters({ svg: true });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/svg');

      const svgConfig = result.find((config) => config.name === 'fabdeh/formatter/svg');
      expect(svgConfig?.languageOptions?.parser).toBe(MOCK_FORMAT_PLUGIN.parserPlain);
      expect(svgConfig?.files).toEqual(['**/*.svg']);
      expect(svgConfig?.rules).toHaveProperty('format/prettier');
    });

    test('should add Markdown formatter when markdown: true', async () => {
      const result = await formatters({ markdown: true });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/markdown');

      const markdownConfig = result.find((config) => config.name === 'fabdeh/formatter/markdown');
      expect(markdownConfig?.languageOptions?.parser).toBe(MOCK_FORMAT_PLUGIN.parserPlain);
      expect(markdownConfig?.files).toEqual(['**/*.md']);
      expect(markdownConfig?.ignores).toEqual([]);
      expect(markdownConfig?.rules).toHaveProperty('format/prettier');
    });

    test('should add GraphQL formatter when graphql: true', async () => {
      const result = await formatters({ graphql: true });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/graphql');

      const graphqlConfig = result.find((config) => config.name === 'fabdeh/formatter/graphql');
      expect(graphqlConfig?.languageOptions?.parser).toBe(MOCK_FORMAT_PLUGIN.parserPlain);
      expect(graphqlConfig?.files).toEqual(['**/*.{g,graph}ql']);
      expect(graphqlConfig?.rules).toHaveProperty('format/prettier');
    });
  });

  describe('slidev option', () => {
    test('should handle slidev: true', async () => {
      const result = await formatters({ markdown: true, slidev: true });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/markdown');
      expect(configNames).toContain('fabdeh/formatter/slidev');

      const markdownConfig = result.find((config) => config.name === 'fabdeh/formatter/markdown');
      expect(markdownConfig?.ignores).toEqual(['**/.slides.md']);

      const slidevConfig = result.find((config) => config.name === 'fabdeh/formatter/slidev');
      expect(slidevConfig?.files).toEqual(['**/.slides.md']);
      expect(slidevConfig?.rules).toHaveProperty('format/prettier');
    });

    test('should handle slidev with custom files', async () => {
      const customFiles = ['**/custom-slides.md', '**/presentations/*.md'];
      const result = await formatters({
        markdown: true,
        slidev: { files: customFiles },
      });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/markdown');
      expect(configNames).toContain('fabdeh/formatter/slidev');

      const markdownConfig = result.find((config) => config.name === 'fabdeh/formatter/markdown');
      expect(markdownConfig?.ignores).toEqual(customFiles);

      const slidevConfig = result.find((config) => config.name === 'fabdeh/formatter/slidev');
      expect(slidevConfig?.files).toEqual(customFiles);
    });

    test('should not add slidev config when slidev is false', async () => {
      const result = await formatters({ markdown: true, slidev: false });

      const configNames = result.map((config) => config.name);
      expect(configNames).toContain('fabdeh/formatter/markdown');
      expect(configNames).not.toContain('fabdeh/formatter/slidev');

      const markdownConfig = result.find((config) => config.name === 'fabdeh/formatter/markdown');
      expect(markdownConfig?.ignores).toEqual([]);
    });
  });

  describe('prettier options override', () => {
    test('should merge custom prettier options', async () => {
      const customOptions = {
        printWidth: 100,
        tabWidth: 4,
        singleQuote: false,
      };

      const result = await formatters({ css: true, options: customOptions });

      const cssConfig = result.find((config) => config.name === 'fabdeh/formatter/css');
      const ruleOptions = cssConfig?.rules?.['format/prettier'] as [string, object];

      expect(ruleOptions[1]).toMatchObject({
        parser: 'css',
        printWidth: 100,
        tabWidth: 4,
        singleQuote: false,
      });
    });
  });

  describe('stylistic config parameter', () => {
    test('should use default stylistic config', async () => {
      const result = await formatters({ css: true });

      const cssConfig = result.find((config) => config.name === 'fabdeh/formatter/css');
      const ruleOptions = cssConfig?.rules?.['format/prettier'] as [string, object];

      // Should use defaults: semi: true, singleQuote: true (from quotes: 'single'), tabWidth: 2
      expect(ruleOptions[1]).toMatchObject({
        parser: 'css',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
      });
    });

    test('should override stylistic config', async () => {
      const stylisticConfig: StylisticConfig = {
        semi: false,
        quotes: 'double',
        indent: 4,
      };

      const result = await formatters({ css: true }, stylisticConfig);

      const cssConfig = result.find((config) => config.name === 'fabdeh/formatter/css');
      const ruleOptions = cssConfig?.rules?.['format/prettier'] as [string, object];

      expect(ruleOptions[1]).toMatchObject({
        parser: 'css',
        semi: false,
        singleQuote: false,
        tabWidth: 4,
      });
    });

    test('should handle tab indentation', async () => {
      const stylisticConfig: StylisticConfig = {
        indent: 'tab',
      };

      const result = await formatters({ css: true }, stylisticConfig);

      const cssConfig = result.find((config) => config.name === 'fabdeh/formatter/css');
      const ruleOptions = cssConfig?.rules?.['format/prettier'] as [string, object];

      expect(ruleOptions[1]).toMatchObject({
        parser: 'css',
        useTabs: true,
        tabWidth: 2, // Default tab width when using tabs
      });
    });
  });

  describe('hasAngularTemplateParser parameter', () => {
    test('should include parser for HTML when hasAngularTemplateParser is false', async () => {
      const result = await formatters({ html: true }, {}, false);

      const htmlConfig = result.find((config) => config.name === 'fabdeh/formatter/html');
      expect(htmlConfig?.languageOptions?.parser).toBe(MOCK_FORMAT_PLUGIN.parserPlain);
    });

    test('should not include parser for HTML when hasAngularTemplateParser is true', async () => {
      const result = await formatters({ html: true }, {}, true);

      const htmlConfig = result.find((config) => config.name === 'fabdeh/formatter/html');
      expect(htmlConfig?.languageOptions).toBeUndefined();
    });
  });

  describe('package installation', () => {
    test('should call ensurePackages with correct dependencies', async () => {
      const { ensurePackages } = await import('../src/shared/utils');

      await formatters({ xml: true, svg: true, markdown: true, slidev: true });

      expect(ensurePackages).toHaveBeenCalledWith([
        'eslint-plugin-format',
        'prettier-plugin-slidev',
        '@prettier/plugin-xml',
      ]);
    });

    test('should not include optional dependencies when not needed', async () => {
      const { ensurePackages } = await import('../src/shared/utils');

      await formatters({ css: true, html: true });

      expect(ensurePackages).toHaveBeenCalledWith([
        'eslint-plugin-format',
        undefined, // no slidev
        undefined, // no xml/svg
      ]);
    });
  });

  describe('configuration structure validation', () => {
    test('should always include setup configuration', async () => {
      const result = await formatters({ css: true });

      expect(result).toHaveLength(4); // setup + css + scss + less

      const setupConfig = result.at(0);
      expect(setupConfig).toMatchObject({
        name: 'fabdeh/formatter/setup',
        plugins: { format: MOCK_FORMAT_PLUGIN },
      });
    });

    test('should call interopDefault with correct import', async () => {
      const { interopDefault } = await import('../src/shared/utils');

      await formatters();

      expect(interopDefault).toHaveBeenCalledTimes(1);
      expect(interopDefault).toHaveBeenCalledWith(expect.any(Promise));
    });

    test('should return TypedConfigArray from tseslint.config', async () => {
      const result = await formatters({ css: true });

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);

      // Each config should have expected structure
      for (const config of result) {
        expect(config).toHaveProperty('name');
        expect(typeof config.name).toBe('string');
        expect(config.name).toMatch(/^fabdeh\/formatter\//);
      }
    });
  });

  describe('multiple formatters combination', () => {
    test('should handle multiple formatters correctly', async () => {
      const result = await formatters({
        css: true,
        html: true,
        xml: true,
        svg: true,
        markdown: true,
        graphql: true,
        slidev: true,
      });

      const configNames = result.map((config) => config.name);

      expect(configNames).toContain('fabdeh/formatter/setup');
      expect(configNames).toContain('fabdeh/formatter/css');
      expect(configNames).toContain('fabdeh/formatter/scss');
      expect(configNames).toContain('fabdeh/formatter/less');
      expect(configNames).toContain('fabdeh/formatter/html');
      expect(configNames).toContain('fabdeh/formatter/xml');
      expect(configNames).toContain('fabdeh/formatter/svg');
      expect(configNames).toContain('fabdeh/formatter/markdown');
      expect(configNames).toContain('fabdeh/formatter/slidev');
      expect(configNames).toContain('fabdeh/formatter/graphql');

      // Should have unique names
      const uniqueNames = new Set(configNames);
      expect(uniqueNames.size).toBe(configNames.length);
    });

    test('should preserve configuration order', async () => {
      const result = await formatters({
        css: true,
        html: true,
        xml: true,
        svg: true,
        markdown: true,
        graphql: true,
      });

      const configNames = result.map((config) => config.name);

      // Setup should always be first
      expect(configNames.at(0)).toBe('fabdeh/formatter/setup');

      // CSS configs should come before other formatters
      const cssIndex = configNames.indexOf('fabdeh/formatter/css');
      const htmlIndex = configNames.indexOf('fabdeh/formatter/html');
      const xmlIndex = configNames.indexOf('fabdeh/formatter/xml');
      const graphqlIndex = configNames.indexOf('fabdeh/formatter/graphql');

      expect(cssIndex).toBeLessThan(htmlIndex);
      expect(htmlIndex).toBeLessThan(xmlIndex);
      expect(xmlIndex).toBeLessThan(graphqlIndex);
    });
  });
});
