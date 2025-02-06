import { createConfig } from './factory';

export * from './configs';
export * from './factory';
export { GLOB_HTML, GLOB_JS, GLOB_SRC, GLOB_TESTS, GLOB_TS } from './globs';
export * from './types';
export * from './utils';

// eslint-disable-next-line unicorn/prefer-export-from
export default createConfig;
