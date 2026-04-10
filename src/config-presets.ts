import type { DefineConfigOptions } from './shared/types';

export const CONFIG_PRESET_FULL_ON: DefineConfigOptions = {
  angular: true,
  gitignore: true,
  jsdoc: true,
  jsonc: true,
  markdown: true,
  ngrx: true,
  playwright: true,
  pnpm: true,
  regexp: true,
  stylistic: { experimental: true },
  tailwindcss: true,
  toml: true,
  typescript: {
    enableErasableSyntaxOnly: true,
  },
  unicorn: true,
  vitest: true,
  yaml: true,
};

export const CONFIG_PRESET_FULL_OFF: DefineConfigOptions = {
  angular: false,
  gitignore: false,
  jsdoc: false,
  jsonc: false,
  markdown: false,
  ngrx: false,
  playwright: false,
  pnpm: false,
  regexp: false,
  stylistic: false,
  tailwindcss: false,
  toml: false,
  typescript: false,
  unicorn: false,
  vitest: false,
  yaml: false,
};
