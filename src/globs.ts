/**
 * A glob pattern that matches the extension of JavaScript and TypeScript source files.
 */
export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)';

/**
 * A glob pattern that matches JavaScript and TypeScript source files (including JSX/TSX).
 */
export const GLOB_SRC = `**/*.${GLOB_SRC_EXT}`;

/**
 * A glob pattern that matches JavaScript source files (including JSX).
 */
export const GLOB_JS = '**/*.?([cm])js?(x)';

/**
 * A glob pattern that matches the extensions of TypeScript source files (including TSX).
 */
export const GLOB_TS_EXT = '?([cm])ts?(x)';

/**
 * A glob pattern that matches TypeScript source files (including TSX).
 */
export const GLOB_TS = `**/*.${GLOB_TS_EXT}`;

export const GLOB_STYLE = '**/*.{c,le,sc}ss';
export const GLOB_CSS = '**/*.css';
export const GLOB_POSTCSS = '**/*.{p,post}css';
export const GLOB_LESS = '**/*.less';
export const GLOB_SCSS = '**/*.scss';

export const GLOB_JSON = '**/*.json';
export const GLOB_JSON5 = '**/*.json5';
export const GLOB_JSONC = '**/*.jsonc';

export const GLOB_MARKDOWN = '**/*.md';
export const GLOB_MARKDOWN_IN_MARKDOWN = '**/*.md/*.md';
export const GLOB_YAML = '**/*.y?(a)ml';
export const GLOB_TOML = '**/*.toml';
export const GLOB_XML = '**/*.xml';
export const GLOB_SVG = '**/*.svg';
export const GLOB_GRAPHQL = '**/*.{g,graph}ql';

export const GLOB_MARKDOWN_CODE = `${GLOB_MARKDOWN}/${GLOB_SRC}`;

/**
 * A glob pattern that matches HTML files.
 */
export const GLOB_HTML = '**/*.htm?(l)';

/**
 * A glob pattern that matches test files.
 */
export const GLOB_TESTS = [`**/*.spec.${GLOB_SRC_EXT}`, `**/*.test.${GLOB_SRC_EXT}`, `**/test-setup.${GLOB_SRC_EXT}`];

export const GLOB_ALL_SRC = [
  GLOB_SRC,
  GLOB_STYLE,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_MARKDOWN,
  GLOB_YAML,
  GLOB_XML,
  GLOB_HTML,
];

/**
 * A glob pattern that matches files to exclude from linting.
 */
export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.svelte-kit',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.tsup',
  '**/.vite-inspect',
  '**/.yarn',
  '**/vite.config.*.timestamp-*',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
  '**/prettier-types.ts',
];
