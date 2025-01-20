import nx from '@nx/eslint-plugin';
import tseslint from 'typescript-eslint';

import { GLOB_HTML, GLOB_TS } from '../globs';

export default tseslint.config(
  nx.configs['flat/angular'],
  nx.configs['flat/angular-template'],
  {
    name: 'fabdeh/angular/rules',
    files: [GLOB_TS],
    rules: {
      '@angular-eslint/component-max-inline-declarations': 'error',
      '@angular-eslint/contextual-decorator': 'error',
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
    },
  },
  {
    name: 'fabdeh/angular-template/rules',
    files: [GLOB_HTML],
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

      // accessibility
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/elements-content': 'error',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/label-has-associated-control': 'error',
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/role-has-required-aria': 'error',
      '@angular-eslint/template/table-scope': 'error',
      '@angular-eslint/template/valid-aria': 'error',
    },
  }
);
