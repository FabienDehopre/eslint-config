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

/**
 * A glob pattern that matches all CSS, LESS, and SCSS files.
 */
export const GLOB_STYLE = '**/*.{c,le,sc}ss';

/**
 * A glob pattern that matches all CSS files.
 */
export const GLOB_CSS = '**/*.css';

/**
 * A glob pattern that matches all PostCSS files.
 */
export const GLOB_POSTCSS = '**/*.{p,post}css';

/**
 * A glob pattern that matches all LESS files.
 */
export const GLOB_LESS = '**/*.less';

/**
 * A glob pattern that matches all SCSS files.
 */
export const GLOB_SCSS = '**/*.scss';

/**
 * A glob pattern that matches all JSON files.
 */
export const GLOB_JSON = '**/*.json';

/**
 * A glob pattern that matches all JSON5 files.
 */
export const GLOB_JSON5 = '**/*.json5';

/**
 * A glob pattern that matches all JSONC files.
 */
export const GLOB_JSONC = '**/*.jsonc';

/**
 * A glob pattern that matches all Markdown files.
 */
export const GLOB_MARKDOWN = '**/*.md';

/**
 * A glob pattern that matches all Markdown blocks embedded into a Markdown file.
 */
export const GLOB_MARKDOWN_IN_MARKDOWN = '**/*.md/*.md';

/**
 * A glob pattern that matches all JavaScript/TypeScript source code block embedded in a markdown file.
 */
export const GLOB_MARKDOWN_CODE = `${GLOB_MARKDOWN}/${GLOB_SRC}`;

/**
 * A glob pattern that matches YAML files.
 */
export const GLOB_YAML = '**/*.y?(a)ml';

/**
 * A glob pattern that matches TOML files.
 */
export const GLOB_TOML = '**/*.toml';

/**
 * A glob pattern that matches XML files.
 */
export const GLOB_XML = '**/*.xml';

/**
 * A glob pattern that matches SVG files.
 */
export const GLOB_SVG = '**/*.svg';

/**
 * A glob pattern that matches GraphQL files.
 */
export const GLOB_GRAPHQL = '**/*.{g,graph}ql';

/**
 * A glob pattern that matches HTML files.
 */
export const GLOB_HTML = '**/*.htm?(l)';

/**
 * A glob pattern that matches test files.
 */
export const GLOB_TESTS: string[] = [`**/*.spec.?([cm])[jt]s`, `**/*.test.?([cm])[jt]s`, `**/test-setup.?([cm])[jt]s`];

/**
 * A glob pattern that matches all source files.
 */
export const GLOB_ALL_SRC: string[] = [
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
export const GLOB_EXCLUDE: string[] = [
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
