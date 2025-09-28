import { describe, expect, test } from 'vitest';

import * as exports from '../src/index';

describe('index exports', () => {
  test('should export the main factory functions', () => {
    expect(exports.defineConfig).toBeDefined();
    expect(exports.defineWorkspaceConfig).toBeDefined();
    expect(exports.defineProjectConfig).toBeDefined();
    expect(typeof exports.defineConfig).toBe('function');
    expect(typeof exports.defineWorkspaceConfig).toBe('function');
    expect(typeof exports.defineProjectConfig).toBe('function');
  });

  test('should export all config functions', () => {
    expect(exports.angular).toBeDefined();
    expect(exports.comments).toBeDefined();
    expect(exports.formatters).toBeDefined();
    expect(exports.ignores).toBeDefined();
    expect(exports.imports).toBeDefined();
    expect(exports.javascript).toBeDefined();
    expect(exports.jsdoc).toBeDefined();
    expect(exports.jsonc).toBeDefined();
    expect(exports.markdown).toBeDefined();
    expect(exports.ngrx).toBeDefined();
    expect(exports.node).toBeDefined();
    expect(exports.perfectionist).toBeDefined();
    expect(exports.pnpm).toBeDefined();
    expect(exports.regexp).toBeDefined();
    expect(exports.sortPackageJson).toBeDefined();
    expect(exports.sortTsConfig).toBeDefined();
    expect(exports.stylistic).toBeDefined();
    expect(exports.tailwindcss).toBeDefined();
    expect(exports.toml).toBeDefined();
    expect(exports.typescript).toBeDefined();
    expect(exports.unicorn).toBeDefined();
    expect(exports.vitest).toBeDefined();
    expect(exports.yaml).toBeDefined();
  });

  test('should export glob constants', () => {
    expect(exports.GLOB_HTML).toBeDefined();
    expect(exports.GLOB_JS).toBeDefined();
    expect(exports.GLOB_SRC).toBeDefined();
    expect(exports.GLOB_TESTS).toBeDefined();
    expect(exports.GLOB_TS).toBeDefined();
    expect(typeof exports.GLOB_HTML).toBe('string');
    expect(typeof exports.GLOB_JS).toBe('string');
    expect(typeof exports.GLOB_SRC).toBe('string');
    expect(Array.isArray(exports.GLOB_TESTS)).toBeTruthy();
    expect(typeof exports.GLOB_TS).toBe('string');
  });

  test('should export utility functions', () => {
    expect(exports.interopDefault).toBeDefined();
    expect(exports.resolveSubOptions).toBeDefined();
    expect(typeof exports.interopDefault).toBe('function');
    expect(typeof exports.resolveSubOptions).toBe('function');
  });
});
