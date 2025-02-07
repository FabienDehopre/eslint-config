import type { ChangelogenOptions } from 'changelogithub';

export default {
  types: {
    feat: { title: '🚀 Features' },
    fix: { title: '🐞 Bug Fixes' },
    perf: { title: '🏎 Performance' },
    refactor: { title: '💅 Refactor' },
  },
} satisfies Partial<ChangelogenOptions>;
