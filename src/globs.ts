/**
 * A glob pattern that matches the extension of JavaScript and TypeScript source files.
 */
export const GLOB_SRC_EXT: string = '?([cm])[jt]s?(x)' as const satisfies string;

/**
 * A glob pattern that matches JavaScript and TypeScript source files (including JSX/TSX).
 */
export const GLOB_SRC: string = `**/*.${GLOB_SRC_EXT}` as const satisfies string;

/**
 * A glob pattern that matches JavaScript source files (including JSX).
 */
export const GLOB_JS: string = '**/*.?([cm])js?(x)' as const satisfies string;

/**
 * A glob pattern that matches the extensions of TypeScript source files (including TSX).
 */
export const GLOB_TS_EXT: string = '?([cm])ts?(x)' as const satisfies string;

/**
 * A glob pattern that matches TypeScript source files (including TSX).
 */
export const GLOB_TS: string = `**/*.${GLOB_TS_EXT}` as const satisfies string;

/**
 * A glob pattern that matches all CSS, LESS, and SCSS files.
 */
export const GLOB_STYLE: string = '**/*.{c,le,sc}ss' as const satisfies string;

/**
 * A glob pattern that matches all CSS files.
 */
export const GLOB_CSS: string = '**/*.css' as const satisfies string;

/**
 * A glob pattern that matches all PostCSS files.
 */
export const GLOB_POSTCSS: string = '**/*.{p,post}css' as const satisfies string;

/**
 * A glob pattern that matches all LESS files.
 */
export const GLOB_LESS: string = '**/*.less' as const satisfies string;

/**
 * A glob pattern that matches all SCSS files.
 */
export const GLOB_SCSS: string = '**/*.scss' as const satisfies string;

/**
 * A glob pattern that matches all JSON files.
 */
export const GLOB_JSON: string = '**/*.json' as const satisfies string;

/**
 * A glob pattern that matches all JSON5 files.
 */
export const GLOB_JSON5: string = '**/*.json5' as const satisfies string;

/**
 * A glob pattern that matches all JSONC files.
 */
export const GLOB_JSONC: string = '**/*.jsonc' as const satisfies string;

/**
 * A glob pattern that matches all Markdown files.
 */
export const GLOB_MARKDOWN: string = '**/*.md' as const satisfies string;

/**
 * A glob pattern that matches all Markdown blocks embedded into a Markdown file.
 */
export const GLOB_MARKDOWN_IN_MARKDOWN: string = '**/*.md/*.md' as const satisfies string;

/**
 * A glob pattern that matches all JavaScript/TypeScript source code block embedded in a markdown file.
 */
export const GLOB_MARKDOWN_CODE: string = `${GLOB_MARKDOWN}/${GLOB_SRC}` as const satisfies string;

/**
 * A glob pattern that matches YAML files.
 */
export const GLOB_YAML: string = '**/*.y?(a)ml' as const satisfies string;

/**
 * A glob pattern that matches TOML files.
 */
export const GLOB_TOML: string = '**/*.toml' as const satisfies string;

/**
 * A glob pattern that matches XML files.
 */
export const GLOB_XML: string = '**/*.xml' as const satisfies string;

/**
 * A glob pattern that matches SVG files.
 */
export const GLOB_SVG: string = '**/*.svg' as const satisfies string;

/**
 * A glob pattern that matches GraphQL files.
 */
export const GLOB_GRAPHQL: string = '**/*.{g,graph}ql' as const satisfies string;

/**
 * A glob pattern that matches HTML files.
 */
export const GLOB_HTML: string = '**/*.htm?(l)' as const satisfies string;

/**
 * A glob pattern that matches test files.
 */
export const GLOB_TESTS: string[] = [`**/*.spec.?([cm])[jt]s`, `**/*.test.?([cm])[jt]s`, `**/test-setup.?([cm])[jt]s`] as const satisfies string[];

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
] as const satisfies string[];

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
] as const satisfies string[];
