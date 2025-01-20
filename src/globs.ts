export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)';
export const GLOB_SRC = `**/*.${GLOB_SRC_EXT}`;
export const GLOB_JS = '**/*.?([cm])js?(x)';
export const GLOB_TS_EXT = '?([cm])ts?(x)';
export const GLOB_TS = `**/*.${GLOB_TS_EXT}`;
export const GLOB_HTML = '**/*.htm?(l)';
export const GLOB_TESTS = [`**/*.spec.${GLOB_SRC_EXT}`, `**/*.test.${GLOB_SRC_EXT}`, `**/test-setup.${GLOB_SRC_EXT}`];
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
  '**/.vite-inspect',
  '**/.yarn',
  '**/vite.config.*.timestamp-*',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
];
