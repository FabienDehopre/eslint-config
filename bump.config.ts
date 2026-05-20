import { defineConfig } from 'bumpp';

export default defineConfig({
  all: true,
  commit: 'chore: release version %s',
  sign: true,
  preid: 'next',
});
