import tailwindcss from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';

import { GLOB_HTML, GLOB_SRC } from '../globs';

export default tseslint.config({
  name: 'fabdeh/tailwindcss/rules',
  plugins: {
    tailwindcss,
  },
  files: [GLOB_SRC, GLOB_HTML],
  rules: {
    'tailwindcss/classnames-order': 'error', // replace by prettier plugin ???
    'tailwindcss/enforces-negative-arbitrary-values': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/no-unnecessary-arbitrary-value': 'error',
  },
});
