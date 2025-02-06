import type { ConfigArray, ConfigWithExtends } from 'typescript-eslint';
import type { FormattersOptions, StylisticConfig } from '../types';
import type { VendoredPrettierOptions, VendoredPrettierRuleOptions } from '../vendor/prettier-types';

import { isPackageExists } from 'local-pkg';
import tseslint from 'typescript-eslint';

import {
  GLOB_CSS,
  GLOB_GRAPHQL,
  GLOB_HTML,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_POSTCSS,
  GLOB_SCSS,
  GLOB_SVG,
  GLOB_XML
} from '../globs';
import { ensurePackages, interopDefault, isPackageInScope } from '../utils';
import { STYLISTIC_CONFIG_DEFAULT } from './stylistic';

/**
 * Merges the provided Prettier options with any overrides.
 *
 * @param options - The base Prettier options to merge.
 * @param overrides - Optional overrides for the Prettier options.
 * @returns The merged Prettier options.
 */
function mergePrettierOptions(
  options: VendoredPrettierOptions,
  overrides: VendoredPrettierRuleOptions = {}
): VendoredPrettierRuleOptions {
  return {
    ...options,
    ...overrides,
    plugins: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...(overrides.plugins ?? []),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...(options.plugins ?? []),
    ],
  };
}

/**
 * Configures and returns an array of formatters based on the provided options.
 *
 * @param options - The options for configuring the formatters. If set to `true`, default options will be used.
 * @param stylistic - The stylistic options for the formatters.
 * @returns A promise that resolves to a `ConfigArray` containing the configured formatters.
 */
export async function formatters(
  options: FormattersOptions | true = {},
  stylistic: StylisticConfig = {}
): Promise<ConfigArray> {
  if (options === true) {
    const isPrettierPluginXmlInScope = isPackageInScope('@prettier/plugin-xml');
    options = {
      css: true,
      graphql: true,
      html: true,
      markdown: true,
      slidev: isPackageExists('@slidev/cli'),
      svg: isPrettierPluginXmlInScope,
      xml: isPrettierPluginXmlInScope,
    };
  }

  await ensurePackages([
    'eslint-plugin-format',
    options.markdown && options.slidev ? 'prettier-plugin-slidev' : undefined,
    (options.xml || options.svg) ? '@prettier/plugin-xml' : undefined,
  ]);

  const {
    indent,
    quotes,
    semi,
  } = {
    ...STYLISTIC_CONFIG_DEFAULT,
    ...stylistic,
  };

  const prettierOptions: VendoredPrettierOptions = {
    endOfLine: 'auto',
    printWidth: 120,
    semi,
    singleQuote: quotes === 'single',
    tabWidth: typeof indent === 'number' ? indent : 2,
    trailingComma: 'all',
    useTabs: indent === 'tab',
    ...options.options,
  };

  const prettierXmlOptions: VendoredPrettierOptions = {
    xmlQuoteAttributes: 'double',
    xmlSelfClosingSpace: true,
    xmlSortAttributesByKey: false,
    xmlWhitespaceSensitivity: 'ignore',
  };

  const formatPlugin = await interopDefault(import('eslint-plugin-format'));
  const configs: ConfigWithExtends[] = [
    {
      name: 'fabdeh/formatter/setup',
      plugins: {
        format: formatPlugin,
      },
    },
  ];

  if (options.css) {
    configs.push(
      {
        name: 'fabdeh/formatter/css',
        languageOptions: {
          parser: formatPlugin.parserPlain,
        },
        files: [GLOB_CSS, GLOB_POSTCSS],
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(prettierOptions, { parser: 'css' }),
          ],
        },
      },
      {
        name: 'fabdeh/formatter/scss',
        languageOptions: {
          parser: formatPlugin.parserPlain,
        },
        files: [GLOB_SCSS],
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(prettierOptions, { parser: 'scss' }),
          ],
        },
      },
      {
        name: 'fabdeh/formatter/less',
        languageOptions: {
          parser: formatPlugin.parserPlain,
        },
        files: [GLOB_LESS],
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(prettierOptions, { parser: 'less' }),
          ],
        },
      }
    );
  }

  if (options.html) {
    configs.push({
      name: 'fabdeh/formatter/html',
      languageOptions: {
        parser: formatPlugin.parserPlain,
      },
      files: [GLOB_HTML],
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(prettierOptions, { parser: 'html' }),
        ],
      },
    });
  }

  if (options.xml) {
    configs.push({
      name: 'fabdeh/formatter/xml',
      languageOptions: {
        parser: formatPlugin.parserPlain,
      },
      files: [GLOB_XML],
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions({ ...prettierXmlOptions, ...prettierOptions }, {
            parser: 'xml',
            plugins: ['@prettier/plugin-xml'],
          }),
        ],
      },
    });
  }

  if (options.svg) {
    configs.push({
      name: 'fabdeh/formatter/svg',
      languageOptions: {
        parser: formatPlugin.parserPlain,
      },
      files: [GLOB_SVG],
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions({ ...prettierXmlOptions, ...prettierOptions }, {
            parser: 'xml',
            plugins: ['@prettier/plugin-xml'],
          }),
        ],
      },
    });
  }

  if (options.markdown) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const GLOB_SLIDEV = options.slidev
      ? options.slidev === true
        ? ['**/.slides.md']
        : options.slidev.files
      : [];

    configs.push({
      name: 'fabdeh/formatter/markdown',
      languageOptions: {
        parser: formatPlugin.parserPlain,
      },
      files: [GLOB_MARKDOWN],
      ignores: GLOB_SLIDEV,
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(prettierOptions, {
            parser: 'markdown',
            embeddedLanguageFormatting: 'off',
          }),
        ],
      },
    });

    if (options.slidev) {
      configs.push({
        name: 'fabdeh/formatter/slidev',
        languageOptions: {
          parser: formatPlugin.parserPlain,
        },
        files: GLOB_SLIDEV,
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(prettierOptions, {
              embeddedLanguageFormatting: 'off',
              parser: 'slidev',
              plugins: ['prettier-plugin-slidev'],
            }),
          ],
        },
      });
    }
  }

  if (options.graphql) {
    configs.push({
      name: 'fabdeh/formatter/graphql',
      languageOptions: {
        parser: formatPlugin.parserPlain,
      },
      files: [GLOB_GRAPHQL],
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(prettierOptions, { parser: 'graphql' }),
        ],
      },
    });
  }

  return tseslint.config(configs);
}
