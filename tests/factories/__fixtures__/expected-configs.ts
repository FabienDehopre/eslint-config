/**
 * Expected configuration names for different scenarios
 */

export const BASIC_CONFIG_NAMES = [
  'fabdeh/gitignore',
  'fabdeh/ignores',
  'fabdeh/javascript/setup',
  'fabdeh/javascript/rules',
  'fabdeh/comments/rules',
  'fabdeh/node/rules',
  'fabdeh/imports/rules',
  'fabdeh/imports/ts-disables',
  'fabdeh/perfectionist/rules',
] as const as string[];

export const TYPESCRIPT_CONFIG_NAMES = [
  ...BASIC_CONFIG_NAMES,
  'fabdeh/typescript/setup',
  'fabdeh/typescript/rules',
] as const as string[];

export const ANGULAR_CONFIG_NAMES = [
  ...TYPESCRIPT_CONFIG_NAMES,
  'fabdeh/angular/setup',
  'fabdeh/angular/template',
] as const as string[];

export const NGRX_CONFIG_NAMES = [
  ...ANGULAR_CONFIG_NAMES,
  'fabdeh/ngrx',
] as const as string[];

export const VITEST_CONFIG_NAMES = [
  'fabdeh/vitest',
] as const as string[];

export const STYLISTIC_CONFIG_NAMES = [
  'fabdeh/stylistic/rules',
] as const as string[];

export const UNICORN_CONFIG_NAMES = [
  'fabdeh/unicorn/rules',
] as const as string[];

export const JSDOC_CONFIG_NAMES = [
  'fabdeh/jsdoc/rules',
  'fabdeh/jsdoc/ts-only/rules',
] as const as string[];

export const REGEXP_CONFIG_NAMES = [
  'fabdeh/regexp/rules',
] as const as string[];

export const JSONC_CONFIG_NAMES = [
  'fabdeh/jsonc/setup',
  'fabdeh/jsonc/rules',
  'fabdeh/sort/package-json',
  'fabdeh/sort/tsconfig-json',
] as const as string[];

export const YAML_CONFIG_NAMES = [
  'fabdeh/yaml/setup',
  'fabdeh/yaml/rules',
] as const as string[];

export const TOML_CONFIG_NAMES = [
  'fabdeh/toml/setup',
  'fabdeh/toml/rules',
] as const as string[];

export const MARKDOWN_CONFIG_NAMES = [
  'fabdeh/markdown/setup',
  'fabdeh/markdown/processor',
  'fabdeh/markdown/parser',
  'fabdeh/markdown/disables',
  'fabdeh/markdown/rules',
] as const as string[];

/**
 * Package detection scenarios for testing
 */
export const PACKAGE_SCENARIOS = {
  noPackages: {},

  typescriptOnly: {
    typescript: true,
  },

  angularBasic: {
    typescript: true,
    '@angular/core': true,
  },

  angularWithNgrx: {
    typescript: true,
    '@angular/core': true,
    '@ngrx/store': true,
  },

  vitestOnly: {
    vitest: true,
  },

  fullStack: {
    typescript: true,
    '@angular/core': true,
    '@ngrx/store': true,
    '@ngrx/effects': true,
    vitest: true,
  },
} as const;
