import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      '_fixtures/**',
      'fixtures/**',
    ],

    // Timeout configuration
    testTimeout: 60_000,

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '_fixtures/**',
        'fixtures/**',
        'scripts/**',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
        perFile: true,
        autoUpdate: true,
      },
    },

    // File watching configuration for development
    watch: false,

    // Reporter configuration
    reporters: ['verbose'],

    // Pool configuration for Node.js
    pool: 'threads',
  },
});
