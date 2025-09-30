import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,tsdown,build,bump,changelogithub,commitlint,eslint}.config.*',
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
        'coverage/**',
        'dist/**',
        '**/node_modules/**',
        '**/[.]**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\u0000*',
        'cypress/**',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,tsdown,build,bump,changelogithub,commitlint,eslint}.config.*',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        '_fixtures/**',
        'fixtures/**',
        'scripts/**',
      ],
      thresholds: {
        lines: 86.74,
        functions: 100,
        branches: 81.81,
        statements: 86.74,
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
