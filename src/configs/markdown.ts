import type { Linter } from 'eslint';
import type { ConfigArray } from 'typescript-eslint';
import type { FilesOptions, OverridesOptions } from '../types';

import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors';
import tseslint from 'typescript-eslint';

import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MARKDOWN_IN_MARKDOWN } from '../globs';
import { interopDefault } from '../utils';

/**
 *
 * @param options
 */
export async function markdown(options: FilesOptions & OverridesOptions = {}): Promise<ConfigArray> {
  const {
    files = [GLOB_MARKDOWN],
    overrides = {},
  } = options;
  const parserPlain = {
    meta: {
      name: 'parser-plain',
    },
    parseForESLint: (code: string) => ({
      ast: {
        body: [],
        comments: [],
        loc: { end: code.length, start: 0 },
        range: [0, code.length],
        tokens: [],
        type: 'Program',
      },
      // eslint-disable-next-line unicorn/no-null
      scopeManager: null,
      services: { isPlain: true },
      visitorKeys: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Program: [],
      },
    }),
  } satisfies Linter.Parser;

  const markdownPlugin = await interopDefault(import('@eslint/markdown'));

  return tseslint.config(
    {
      name: 'fabdeh/markdown/setup',
      plugins: {
        markdown: markdownPlugin,
      },
    },
    {
      name: 'fabdeh/markdown/processor',
      files,
      ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
      processor: mergeProcessors([
        markdownPlugin.processors.markdown,
        processorPassThrough,
      ]),
    },
    {
      name: 'fabdeh/markdown/parser',
      languageOptions: {
        parser: parserPlain,
      },
      files,
    },
    {
      name: 'fabdeh/markdown/disables',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      files: [GLOB_MARKDOWN_CODE],
      rules: {
        'import-x/newline-after-import': 'off',

        'no-alert': 'off',
        'no-console': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'no-unused-expressions': 'off',
        'no-unused-labels': 'off',
        'no-unused-vars': 'off',
        // 'node/prefer-global/process': 'off',
        '@stylistic/comma-dangle': 'off',
        '@stylistic/eol-last': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'unicode-bom': 'off',
        'unused-imports/no-unused-imports': 'off',
        'unused-imports/no-unused-vars': 'off',
        ...overrides,
      },
    }
  );
}
