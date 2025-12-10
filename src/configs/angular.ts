import type { AngularOptions, TypedConfigArray } from '../shared/types';

import tseslint from 'typescript-eslint';

import { GLOB_HTML, GLOB_TS } from '../shared/globs';
import { interopDefault } from '../shared/utils';

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
export async function angular(options: AngularOptions = {}): Promise<TypedConfigArray> {
  const angularEslint = await interopDefault(import('angular-eslint'));
  const {
    enableAccessibilityRules = true,
    tsOverrides = {},
    htmlOverrides = {},
    prefix = 'app',
    ignoreClassNamePatternForInjectableProvidedIn: ignoreClassNamePattern,
    componentStylesMode = 'string',
    preferOnPushOnly = true,
    banExperimentalApi = true,
    banDeveloperPreviewApi = true,
    inlineTemplateAndStyles = false,
  } = options;
  return tseslint.config(
    {
      name: 'fabdeh/angular/rules',
      plugins: {
        '@angular-eslint': angularEslint.tsPlugin,
      },
      processor: angularEslint.processInlineTemplates,
      files: [GLOB_TS],
      rules: {
        'max-classes-per-file': ['error', 1],
        'max-lines': ['error', 400],
        'new-cap': [
          'error',
          {
            capIsNewExceptions: [
              'Attribute',
              'Component',
              'ContentChild',
              'ContentChildren',
              'Directive',
              'Host',
              'HostBinding',
              'HostListener',
              'Inject',
              'Injectable',
              'Input',
              'NgModule',
              'Optional',
              'Output',
              'Pipe',
              'Self',
              'SkipSelf',
              'ViewChild',
              'ViewChildren',
            ],
          },
        ],
        ...angularEslint.configs.tsRecommended.find((c) => c.name === 'angular-eslint/ts-recommended')?.rules,
        ...(inlineTemplateAndStyles ? {} : { '@angular-eslint/component-max-inline-declarations': 'error' }),
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix,
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/consistent-component-styles': ['error', componentStylesMode],
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
        ...(banDeveloperPreviewApi ? { '@angular-eslint/no-developer-preview': 'error' } : {}),
        '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
        ...(banExperimentalApi ? { '@angular-eslint/no-experimental': 'error' } : {}),
        '@angular-eslint/no-forward-ref': 'error',
        '@angular-eslint/no-lifecycle-call': 'error',
        '@angular-eslint/no-pipe-impure': 'error',
        '@angular-eslint/no-queries-metadata-property': 'error',
        '@angular-eslint/no-uncalled-signals': 'error',
        '@angular-eslint/prefer-output-emitter-ref': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/prefer-signals': 'error',
        ...(preferOnPushOnly ? { '@angular-eslint/prefer-on-push-component-change-detection': 'error' } : {}),
        '@angular-eslint/relative-url-prefix': 'error',
        '@angular-eslint/require-lifecycle-on-prototype': 'error',
        '@angular-eslint/sort-keys-in-type-decorator': 'error',
        '@angular-eslint/sort-lifecycle-methods': 'error',
        '@angular-eslint/use-component-selector': 'error',
        '@angular-eslint/use-component-view-encapsulation': 'error',
        '@angular-eslint/use-injectable-provided-in': ignoreClassNamePattern ? ['error', { ignoreClassNamePattern }] : 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
        ...tsOverrides,
      },
    },
    {
      name: 'fabdeh/angular-template/rules',
      plugins: {
        '@angular-eslint/template': angularEslint.templatePlugin,
      },
      languageOptions: {
        parser: angularEslint.templateParser,
      },
      files: [GLOB_HTML],
      rules: {
        ...angularEslint.configs.templateRecommended.find((c) => c.name === 'angular-eslint/template-recommended')?.rules,
        '@angular-eslint/template/attributes-order': ['error', { alphabetical: true }],
        '@angular-eslint/template/button-has-type': 'error',
        '@angular-eslint/template/conditional-complexity': 'error',
        '@angular-eslint/template/eqeqeq': ['error', { allowNullOrUndefined: true }],
        '@angular-eslint/template/no-any': 'error',
        '@angular-eslint/template/no-duplicate-attributes': 'error',
        '@angular-eslint/template/no-interpolation-in-attributes': 'error',
        '@angular-eslint/template/no-positive-tabindex': 'error',
        '@angular-eslint/template/prefer-ngsrc': 'error',
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
        '@angular-eslint/template/prefer-static-string-properties': 'error',
        ...(enableAccessibilityRules
          ? angularEslint.configs.templateAccessibility.find((c) => c.name === 'angular-eslint/template-accessibility')?.rules
          : {}),
        ...htmlOverrides,
      },
    }
  );
}
