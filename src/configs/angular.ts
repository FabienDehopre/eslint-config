import type { ConfigArray } from 'typescript-eslint';
import type { AngularOptions } from '../types';

import tseslint from 'typescript-eslint';

import { GLOB_HTML, GLOB_TS } from '../globs';
import { interopDefault } from '../utils';

/**
 * Generates an ESLint configuration for Angular projects.
 *
 * @param options - Configuration options for Angular ESLint.
 * @param options.enableAccessibilityRules - Whether to enable accessibility rules for HTML templates.
 * @param options.tsOverrides - Additional TypeScript rule overrides.
 * @param options.htmlOverrides - Additional HTML rule overrides.
 * @param options.prefix - The prefix to use for Angular component and directive selectors.
 * @returns A promise that resolves to an array of ESLint configurations.
 */
export async function angular(options: AngularOptions = {}): Promise<ConfigArray> {
  const angularEslint = await interopDefault(import('angular-eslint'));
  const { enableAccessibilityRules = true, tsOverrides = {}, htmlOverrides = {}, prefix = 'app' } = options;
  return tseslint.config(
    {
      name: 'fabdeh/angular/rules',
      plugins: {
        '@angular-eslint': angularEslint.tsPlugin,
      },
      processor: angularEslint.processInlineTemplates,
      files: [GLOB_TS],
      extends: [angularEslint.configs.tsRecommended],
      rules: {
        'max-classes-per-file': ['error', 1],
        'max-lines': ['error', 400],
        '@angular-eslint/component-max-inline-declarations': 'error',
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix,
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/contextual-decorator': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix,
            style: 'camelCase',
          },
        ],
        '@angular-eslint/no-async-lifecycle-method': 'error',
        '@angular-eslint/no-attribute-decorator': 'error',
        '@angular-eslint/no-conflicting-lifecycle': 'error',
        '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
        '@angular-eslint/no-forward-ref': 'error',
        '@angular-eslint/no-lifecycle-call': 'error',
        '@angular-eslint/no-pipe-impure': 'error',
        '@angular-eslint/no-queries-metadata-property': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/prefer-signals': 'error',
        '@angular-eslint/relative-url-prefix': 'error',
        '@angular-eslint/sort-lifecycle-methods': 'error',
        '@angular-eslint/use-component-selector': 'error',
        '@angular-eslint/use-component-view-encapsulation': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
        ...tsOverrides,
      },
    },
    {
      name: 'fabdeh/angular-template/rules',
      plugins: {
        '@angular-eslint': angularEslint.tsPlugin,
      },
      files: [GLOB_HTML],
      extends: [
        ...angularEslint.configs.templateRecommended,
        ...(enableAccessibilityRules ? angularEslint.configs.templateAccessibility : []),
      ],
      rules: {
        '@angular-eslint/template/attributes-order': ['error', { alphabetical: true }],
        '@angular-eslint/template/button-has-type': 'error',
        '@angular-eslint/template/conditional-complexity': 'error',
        '@angular-eslint/template/eqeqeq': ['error', { allowNullOrUndefined: true }],
        '@angular-eslint/template/no-any': 'error',
        '@angular-eslint/template/no-duplicate-attributes': 'error',
        '@angular-eslint/template/no-interpolation-in-attributes': 'error',
        '@angular-eslint/template/no-positive-tabindex': 'error',
        '@angular-eslint/template/prefer-control-flow': 'error',
        '@angular-eslint/template/prefer-ngsrc': 'error',
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
        ...htmlOverrides,
      },
    }
  );
}
