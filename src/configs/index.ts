// old exports to migrate and remove later
export { default as angular } from './angular';
export { default as base } from './base';
export { default as jest } from './jest';
export * as ngrx from './ngrx';
export { default as tailwindcss } from './tailwindcss';
export { default as vitest } from './vitest';

/* eslint-disable perfectionist/sort-exports -- to be removed later */
// new exports
export * from './comments';
export * from './ignore';
export * from './imports';
export * from './jsdoc';
export * from './javascript';
export * from './perfectionist';
export * from './stylistic';
export * from './typescript';
export * from './unicorn';
/* eslint-enable perfectionist/sort-exports */
