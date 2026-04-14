import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 60_000,
  },
  server: {
    watch: {
      ignored: ['**/fixtures/**', '**/_fixtures/**'],
    },
  },
});
